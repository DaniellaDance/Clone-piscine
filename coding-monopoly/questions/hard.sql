BEGIN;
DELETE FROM problems WHERE topic='tomorrow_school_hard';
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000001','mcq','hard','tomorrow_school_hard','Quest 1','Quest 1','Quest 1','Why does `x := 3` fail to compile outside a function?','Почему `x := 3` вне функции не скомпилируется?','Неліктен функциядан тыс `x := 3` компиляцияланбайды?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000001','mcq',':= is allowed only inside functions',':= разрешён только внутри функций',':= тек функциялардың ішінде қолданылады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000001','mcq','Numbers cannot be used','Нельзя использовать числа','Сандарды қолдануға болмайды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000001','mcq','A loop is required','Нужен цикл','Цикл қажет',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','hard','tomorrow_school_hard','Quest 1','Quest 1','Quest 1','What does `go run main.go` do?','Что делает `go run main.go`?','`go run main.go` не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','Compiles and runs the program','Компилирует и запускает программу','Бағдарламаны компиляциялап, іске қосады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','Only formats the code','Только форматирует','Тек пішімдейді',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','Creates a Git repository','Создаёт Git-репозиторий','Git репозиторийін құрады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000003','mcq','hard','tomorrow_school_hard','Quest 1','Quest 1','Quest 1','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	x := 5
	fmt.Println(y)
}
```','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	x := 5
	fmt.Println(y)
}
```','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	x := 5
	fmt.Println(y)
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000003','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000003','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000003','mcq','5','6','5',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','hard','tomorrow_school_hard','Quest 2','Quest 2','Quest 2','What does `fmt.Print(7 / 2)` print?','Что выведет `fmt.Print(7 / 2)`?','`fmt.Print(7 / 2)` не шығарады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','3.5','3.5','3.5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','3','3','3',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','4','4','4',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','hard','tomorrow_school_hard','Quest 2','Quest 2','Quest 2','What happens with `if x := 2; x > 1 { fmt.Print(x) }`?','Что произойдёт с `if x := 2; x > 1 { fmt.Print(x) }`?','`if x := 2; x > 1 { fmt.Print(x) }` орындалғанда не болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','Prints 2','Выведет 2','2 шығарады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','Syntax error','Ошибка синтаксиса','Синтаксистік қате',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','Prints 1','Выведет 1','1 шығарады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000006','mcq','hard','tomorrow_school_hard','Quest 2','Quest 2','Quest 2','В какой строке ошибка?

```go
package main

func main() {
	x := 4
	if x > 2; 5 {
		println(x)
	}
}
```','В какой строке ошибка?

```go
package main

func main() {
	x := 4
	if x > 2; 5 {
		println(x)
	}
}
```','В какой строке ошибка?

```go
package main

func main() {
	x := 4
	if x > 2; 5 {
		println(x)
	}
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000006','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000006','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000006','mcq','6','5','6',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','hard','tomorrow_school_hard','Quest 3','Quest 3','Quest 3','What does `[]rune("кот")` produce?','Что даёт `[]rune("кот")`?','`[]rune("кот")` нәтижесі қандай?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','A slice of 3 runes','Срез из 3 рун','3 рунадан тұратын срез',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','A slice of 6 runes','Срез из 6 рун','6 рунадан тұратын срез',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','One rune','Одну руну','Бір руна',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','hard','tomorrow_school_hard','Quest 3','Quest 3','Quest 3','Why might `s[0]` not represent the first character?','Почему `s[0]` может не быть первым символом?','Неліктен `s[0]` бірінші таңба болмауы мүмкін?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','It is the first byte, not necessarily a whole rune','Это первый байт, не обязательно целая руна','Бұл бірінші байт, ол міндетті түрде толық руна емес',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','Indexing starts at 1','Индексация с 1','Индекстеу 1-ден басталады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','Strings cannot be indexed','Строки нельзя индексировать','Жолдарды индекстеуге болмайды',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000009','mcq','hard','tomorrow_school_hard','Quest 3','Quest 3','Quest 3','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	s := "Go"
	s[0] = ''N''
	fmt.Print(s)
}
```','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	s := "Go"
	s[0] = ''N''
	fmt.Print(s)
}
```','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	s := "Go"
	s[0] = ''N''
	fmt.Print(s)
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000009','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000009','mcq','5','5','5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000009','mcq','6','6','6',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','hard','tomorrow_school_hard','Quest 4','Quest 4','Quest 4','What happens if you declare `x := 1` but never use x?','Что будет, если объявить `x := 1`, но не использовать x?','`x := 1` деп жариялап, x қолданылмаса не болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','The compiler reports an error','Компилятор выдаст ошибку','Компилятор қате береді',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','Nothing happens','Ничего','Ештеңе болмайды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','x is printed automatically','x автоматически печатается','x автоматты түрде шығарылады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','hard','tomorrow_school_hard','Quest 4','Quest 4','Quest 4','What does variable shadowing mean?','Что означает затенение переменной?','Айнымалыны көлеңкелеу дегеніміз не?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','An inner variable hides an outer one','Внутренняя переменная скрывает внешнюю','Ішкі айнымалы сыртқы айнымалыны жасырады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','Deleting a value','Удаление значения','Мәнді жою',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','Changing a package type','Изменение типа пакета','Пакет типін өзгерту',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000012','mcq','hard','tomorrow_school_hard','Quest 4','Quest 4','Quest 4','В какой строке ошибка?

```go
package main

func square(x int) int {
	y := x * x
	println(y)
}
func main() {}
```','В какой строке ошибка?

```go
package main

func square(x int) int {
	y := x * x
	println(y)
}
func main() {}
```','В какой строке ошибка?

```go
package main

func square(x int) int {
	y := x * x
	println(y)
}
func main() {}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000012','mcq','2','2','2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000012','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000012','mcq','5','6','5',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','hard','tomorrow_school_hard','Quest 5','Quest 5','Quest 5','What does `a := []int{1,2}; b := append(a,3); fmt.Print(len(b))` print?','Что выведет `a := []int{1,2}; b := append(a,3); fmt.Print(len(b))`?','`a := []int{1,2}; b := append(a,3); fmt.Print(len(b))` не шығарады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','2','2','2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','3','3','3',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','4','4','4',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','hard','tomorrow_school_hard','Quest 5','Quest 5','Quest 5','Why can modifying a subslice element change the original slice?','Почему изменение элемента подсреза может изменить исходный срез?','Неліктен ішкі срез элементін өзгерту бастапқы срезді өзгертуі мүмкін?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','They may share the same underlying array','Они могут разделять базовый массив','Олар бір негізгі массивті ортақ пайдалануы мүмкін',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','A slice is always copied','Срез всегда копируется','Срез әрқашан көшіріледі',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','Because of fmt','Из-за fmt','fmt салдарынан',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000015','mcq','hard','tomorrow_school_hard','Quest 5','Quest 5','Quest 5','В какой строке возникает ошибка при выполнении?

```go
package main

import "fmt"

func main() {
	a := []int{1, 2}
	fmt.Print(a[2])
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

import "fmt"

func main() {
	a := []int{1, 2}
	fmt.Print(a[2])
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

import "fmt"

func main() {
	a := []int{1, 2}
	fmt.Print(a[2])
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000015','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000015','mcq','5','5','5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000015','mcq','6','6','6',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','hard','tomorrow_school_hard','Quest 6','Quest 6','Quest 6','What happens when dereferencing a nil pointer?','Что будет при разыменовании nil-указателя?','nil көрсеткішін разыменование жасағанда не болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','A runtime panic','Паника во время выполнения','Орындау кезінде паника болады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','An empty string','Пустая строка','Бос жол шығады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','Always 0','Всегда 0','Әрқашан 0 болады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','hard','tomorrow_school_hard','Quest 6','Quest 6','Quest 6','Why can `func f(p *Person)` modify the original struct''s fields?','Почему `func f(p *Person)` может менять поля исходной структуры?','Неліктен `func f(p *Person)` бастапқы құрылым өрістерін өзгерте алады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','A pointer to the struct is passed','Передан указатель на структуру','Құрылымға көрсеткіш беріледі',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','Go passes everything by reference','Go передаёт всё по ссылке','Go барлығын сілтеме арқылы береді',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','The fields are global','Поля глобальные','Өрістер жаһандық',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000018','mcq','hard','tomorrow_school_hard','Quest 6','Quest 6','Quest 6','В какой строке возникает ошибка при выполнении?

```go
package main

func main() {
	var p *int
	*p = 3
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

func main() {
	var p *int
	*p = 3
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

func main() {
	var p *int
	*p = 3
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000018','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000018','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000018','mcq','5','5','5',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','hard','tomorrow_school_hard','Quest 7','Quest 7','Quest 7','How many times is f called by f(3) if f(n) calls f(n-1) down to n=0?','Сколько раз вызовется f при f(3), если f(n) вызывает f(n-1) до n=0?','Егер f(n) n=0 болғанша f(n-1) шақырса, f(3) кезінде f неше рет шақырылады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','5','5','5',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','hard','tomorrow_school_hard','Quest 7','Quest 7','Quest 7','What is likely to happen with infinite recursion?','Что вероятно при бесконечной рекурсии?','Шексіз рекурсия кезінде не болуы ықтимал?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','Stack overflow or resource exhaustion','Переполнение стека/исчерпание ресурсов','Стек толып кетеді немесе ресурстар таусылады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','Automatic termination','Автоматическая остановка','Автоматты түрде тоқтайды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','Sorting','Сортировка','Сұрыптау орындалады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000021','mcq','hard','tomorrow_school_hard','Quest 7','Quest 7','Quest 7','Что произойдёт при вызове f(1)?

```go
package main

func f(n int) int {
	if n == 0 {
		return 0
	}
	return f(n + 1)
}
func main() { f(1) }
```','Что произойдёт при вызове f(1)?

```go
package main

func f(n int) int {
	if n == 0 {
		return 0
	}
	return f(n + 1)
}
func main() { f(1) }
```','Что произойдёт при вызове f(1)?

```go
package main

func f(n int) int {
	if n == 0 {
		return 0
	}
	return f(n + 1)
}
func main() { f(1) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000021','mcq','Infinite recursion until resources are exhausted','Бесконечная рекурсия, пока программа не исчерпает ресурсы','Ресурстар таусылғанша шексіз рекурсия болады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000021','mcq','The function returns 0','Функция вернёт 0','Функция 0 қайтарады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000021','mcq','Compilation error','Ошибка компиляции','Компиляция қатесі',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','hard','tomorrow_school_hard','Quest 8','Quest 8','Quest 8','What does strconv.Atoi("12") return?','Что возвращает strconv.Atoi("12")?','strconv.Atoi("12") нені қайтарады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','(12, nil)','(12, nil)','(12, nil)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','Only a string','Только строку','Тек жолды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','(0, nil)','(0, nil)','(0, nil)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000023','mcq','hard','tomorrow_school_hard','Quest 8','Quest 8','Quest 8','How do you iterate over user arguments excluding the program name?','Как перебрать пользовательские аргументы без имени программы?','Бағдарлама атауын қоспай, пайдаланушы аргументтерін қалай аралауға болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000023','mcq','for _, s := range os.Args[1:]','for _, s := range os.Args[1:]','for _, s := range os.Args[1:]',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000023','mcq','for _, s := range os.Args[0:0]','for _, s := range os.Args[0:0]','for _, s := range os.Args[0:0]',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000023','mcq','for s := range os.Args[0]','for s := range os.Args[0]','for s := range os.Args[0]',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000024','mcq','hard','tomorrow_school_hard','Quest 8','Quest 8','Quest 8','В какой строке возникает ошибка при выполнении?

```go
package main

import "os"

func main() {
	if len(os.Args) == 1 {
		println(os.Args[1])
	}
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

import "os"

func main() {
	if len(os.Args) == 1 {
		println(os.Args[1])
	}
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

import "os"

func main() {
	if len(os.Args) == 1 {
		println(os.Args[1])
	}
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000024','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000024','mcq','5','5','5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000024','mcq','7','6','7',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','hard','tomorrow_school_hard','Quest 9','Quest 9','Quest 9','What does `for i := range a` mean for a slice?','Что будет с `for i := range a` для среза?','Срез үшін `for i := range a` нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','i is an element index','i — индексы элементов','i — элемент индексі',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','i is an element value','i — сами значения','i — элемент мәні',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','i is the slice address','i — адрес среза','i — срез мекенжайы',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','hard','tomorrow_school_hard','Quest 9','Quest 9','Quest 9','Why is changing a slice''s length during range iteration risky?','Чем опасно изменение длины среза во время обхода range?','range арқылы өту кезінде срез ұзындығын өзгерту неліктен қауіпті?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','The number of iterations is determined when iteration starts','Количество итераций определяется в начале обхода','Итерациялар саны өту басталғанда анықталады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','It always causes a compilation error','Всегда ошибка компиляции','Әрқашан компиляция қатесі болады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','range restarts automatically','range автоматически перезапускается','range автоматты түрде қайта басталады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000027','mcq','hard','tomorrow_school_hard','Quest 9','Quest 9','Quest 9','В какой строке возникает ошибка при выполнении?

```go
package main

func main() {
	a := []int{1, 2, 3}
	for i := 0; i <= len(a); i++ {
		println(a[i])
	}
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

func main() {
	a := []int{1, 2, 3}
	for i := 0; i <= len(a); i++ {
		println(a[i])
	}
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

func main() {
	a := []int{1, 2, 3}
	for i := 0; i <= len(a); i++ {
		println(a[i])
	}
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000027','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000027','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000027','mcq','7','6','7',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','hard','tomorrow_school_hard','Quest 10','Quest 10','Quest 10','What is the time complexity of searching an unsorted singly linked list?','Какова сложность поиска значения в несортированном односвязном списке?','Сұрыпталмаған бір бағытты байланысқан тізімнен мән іздеудің күрделілігі қандай?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','O(n)','O(n)','O(n)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','O(1)','O(1)','O(1)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','Always O(log n)','O(log n) всегда','Әрқашан O(log n)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','hard','tomorrow_school_hard','Quest 10','Quest 10','Quest 10','Why is inserting after a known node usually O(1)?','Почему вставка после известного узла обычно O(1)?','Неліктен белгілі түйіннен кейін енгізу әдетте O(1) болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','Only a fixed number of links are changed','Меняется фиксированное число ссылок','Сілтемелердің тұрақты саны ғана өзгереді',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','The entire list is recreated','Пересоздаётся весь список','Бүкіл тізім қайта құрылады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','Sorting is required','Нужна сортировка','Сұрыптау қажет',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000030','mcq','hard','tomorrow_school_hard','Quest 10','Quest 10','Quest 10','В какой строке возникает ошибка при выполнении?

```go
package main

type Node struct{ Next *Node }

func main() {
	var head *Node
	println(head.Next)
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

type Node struct{ Next *Node }

func main() {
	var head *Node
	println(head.Next)
}
```','В какой строке возникает ошибка при выполнении?

```go
package main

type Node struct{ Next *Node }

func main() {
	var head *Node
	println(head.Next)
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000030','mcq','2','2','2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000030','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000030','mcq','5','6','5',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','hard','tomorrow_school_hard','Quest 11','Quest 11','Quest 11','What is `5 ^ 3`?','Чему равно `5 ^ 3`?','`5 ^ 3` неге тең?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','6','6','6',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','1','1','1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','7','7','7',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','hard','tomorrow_school_hard','Quest 11','Quest 11','Quest 11','Why is `uint8(255) + uint8(1)` invalid as a direct constant expression?','Почему `uint8(255) + uint8(1)` не подходит как прямое константное выражение?','Неліктен `uint8(255) + uint8(1)` тікелей константалық өрнек ретінде жарамсыз?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','The constant result 256 cannot be represented by uint8','Константный результат 256 не представим в uint8','256 константалық нәтижесі uint8 типіне сыймайды',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','Go does not support uint8','Go не поддерживает uint8','Go uint8 типін қолдамайды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','255 is odd','255 нечётное','255 тақ сан',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000033','mcq','hard','tomorrow_school_hard','Quest 11','Quest 11','Quest 11','В какой строке ошибка?

```go
package main

func main() {
	x := 4
	y := x << -1
	println(y)
}
```','В какой строке ошибка?

```go
package main

func main() {
	x := 4
	y := x << -1
	println(y)
}
```','В какой строке ошибка?

```go
package main

func main() {
	x := 4
	y := x << -1
	println(y)
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000033','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000033','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000033','mcq','5','5','5',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','hard','tomorrow_school_hard','Quest 12','Quest 12','Quest 12','In what order do `defer fmt.Print(1); defer fmt.Print(2)` execute?','В каком порядке выполнятся `defer fmt.Print(1); defer fmt.Print(2)`?','`defer fmt.Print(1); defer fmt.Print(2)` қандай ретпен орындалады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','21','21','21',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','12','12','12',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','hard','tomorrow_school_hard','Quest 12','Quest 12','Quest 12','What happens if two goroutines modify one variable without synchronization?','Что произойдёт, если две горутины без синхронизации изменяют одну переменную?','Екі горутина синхрондаусыз бір айнымалыны өзгертсе не болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','A data race may occur','Возможна гонка данных','Деректер жарысы туындауы мүмкін',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','Go always serializes operations','Go всегда сериализует операции','Go операцияларды әрқашан кезектестіреді',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','The compiler automatically adds a mutex','Компилятор автоматически ставит mutex','Компилятор mutex автоматты түрде қосады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000036','mcq','hard','tomorrow_school_hard','Quest 12','Quest 12','Quest 12','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	x := 2
	fmt.Printf("%d", x)
	fmt.Println(y)
}
```','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	x := 2
	fmt.Printf("%d", x)
	fmt.Println(y)
}
```','В какой строке ошибка?

```go
package main

import "fmt"

func main() {
	x := 2
	fmt.Printf("%d", x)
	fmt.Println(y)
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000036','mcq','4','4','4',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000036','mcq','5','5','5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000036','mcq','6','7','6',true);
COMMIT;