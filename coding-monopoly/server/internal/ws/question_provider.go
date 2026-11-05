package ws

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"server/internal/problems"
	"server/internal/locale"
	"server/internal/room"
)

// DBQuestionProvider assigns only published questions and keeps their answer
// data in the room engine for server-side grading.
type DBQuestionProvider struct {
	db *pgxpool.Pool
}

func NewDBQuestionProvider(db *pgxpool.Pool) room.QuestionProvider {
	return &DBQuestionProvider{db: db}
}

func (p *DBQuestionProvider) AssignQuestion(difficulty, topic string) (room.Question, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Each level has its own bank of 36 questions in Neon. The room topic
	// must not restrict players to only one difficulty.
	questionTopic := map[string]string{
		"easy": "tomorrow_school_easy",
		"medium": "tomorrow_school_medium",
		"hard": "tomorrow_school_hard",
	}[difficulty]
	if questionTopic == "" {
		return room.Question{}, fmt.Errorf("invalid question difficulty: %q", difficulty)
	}
	id, problemType, prompt, options, accepted, err := problems.SelectPublishedQuestion(ctx, p.db, difficulty, questionTopic)
	if err != nil {
		return room.Question{}, err
	}
	question := room.Question{
		ID:              id,
		Type:            problemType,
		Difficulty:      difficulty,
		Prompt:          prompt,
		AcceptedAnswers: accepted,
	}
	for _, option := range options {
		question.Options = append(question.Options, room.QuestionOption{
			ID:      option.ID,
			Text:    option.Text,
			Correct: option.Correct,
		})
	}
	return question, nil
}


// AssignUnusedQuestion returns the first unplayed question in a stable order.
// Exclusion is scoped to the room, not shared between independent games.
func (p *DBQuestionProvider) AssignUnusedQuestion(difficulty, topic string, used []string) (room.Question, error) {
	bank := map[string]string{"easy":"tomorrow_school_easy","medium":"tomorrow_school_medium","hard":"tomorrow_school_hard"}[difficulty]
	if bank == "" { return room.Question{}, fmt.Errorf("unknown difficulty %q", difficulty) }
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	var id, typ, en, ru, kz string
	err := p.db.QueryRow(ctx, `SELECT id::text, type::text, prompt_en, COALESCE(prompt_ru,''), COALESCE(prompt_kz,'')
		FROM problems WHERE is_published AND difficulty::text=$1 AND topic=$2
		AND NOT (id::text = ANY($3::text[])) ORDER BY created_at, id LIMIT 1`, difficulty, bank, used).Scan(&id,&typ,&en,&ru,&kz)
	if err != nil { return room.Question{}, fmt.Errorf("no unused %s questions: %w",difficulty,err) }
	q := room.Question{ID:id,Type:typ,Difficulty:difficulty,Prompt:locale.New(en,ru,kz)}
	rows, err := p.db.Query(ctx, `SELECT id::text, COALESCE(text_en,''), COALESCE(text_ru,''), COALESCE(text_kz,''), is_correct FROM problem_options WHERE problem_id=$1::uuid ORDER BY id`, id)
	if err != nil { return room.Question{},err }
	defer rows.Close()
	for rows.Next() {
		var oid, oe, oru, okz string
		var correct bool
		if err := rows.Scan(&oid,&oe,&oru,&okz,&correct); err != nil { return room.Question{},err }
		q.Options=append(q.Options,room.QuestionOption{ID:oid,Text:locale.New(oe,oru,okz),Correct:correct})
	}
	if err:=rows.Err(); err!=nil {return room.Question{},err}
	return q,nil
}
