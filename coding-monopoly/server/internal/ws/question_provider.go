package ws

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"server/internal/problems"
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
