BEGIN;
DELETE FROM problems WHERE topic='tomorrow_school_hard';
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000001','mcq','hard','tomorrow_school_hard','Quest 1','Quest 1','Quest 1','Почему `x := 3` вне функции не скомпилируется?','Почему `x := 3` вне функции не скомпилируется?','Почему `x := 3` вне функции не скомпилируется?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000001','mcq',':= разрешён только внутри функций',':= разрешён только внутри функций',':= разрешён только внутри функций',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000001','mcq','Нельзя использовать числа','Нельзя использовать числа','Нельзя использовать числа',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000001','mcq','Нужен цикл','Нужен цикл','Нужен цикл',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','hard','tomorrow_school_hard','Quest 1','Quest 1','Quest 1','Что делает `go run main.go`?','Что делает `go run main.go`?','Что делает `go run main.go`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','Компилирует и запускает программу','Компилирует и запускает программу','Компилирует и запускает программу',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','Только форматирует','Только форматирует','Только форматирует',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000002','mcq','Создаёт Git-репозиторий','Создаёт Git-репозиторий','Создаёт Git-репозиторий',false);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000003','mcq','6','6','6',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','hard','tomorrow_school_hard','Quest 2','Quest 2','Quest 2','Что выведет `fmt.Print(7 / 2)`?','Что выведет `fmt.Print(7 / 2)`?','Что выведет `fmt.Print(7 / 2)`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','3.5','3.5','3.5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','3','3','3',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000004','mcq','4','4','4',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','hard','tomorrow_school_hard','Quest 2','Quest 2','Quest 2','Что произойдёт с `if x := 2; x > 1 { fmt.Print(x) }`?','Что произойдёт с `if x := 2; x > 1 { fmt.Print(x) }`?','Что произойдёт с `if x := 2; x > 1 { fmt.Print(x) }`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','Выведет 2','Выведет 2','Выведет 2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','Ошибка синтаксиса','Ошибка синтаксиса','Ошибка синтаксиса',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000005','mcq','Выведет 1','Выведет 1','Выведет 1',false);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000006','mcq','5','5','5',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','hard','tomorrow_school_hard','Quest 3','Quest 3','Quest 3','Что даёт `[]rune("кот")`?','Что даёт `[]rune("кот")`?','Что даёт `[]rune("кот")`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','Срез из 3 рун','Срез из 3 рун','Срез из 3 рун',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','Срез из 6 рун','Срез из 6 рун','Срез из 6 рун',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000007','mcq','Одну руну','Одну руну','Одну руну',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','hard','tomorrow_school_hard','Quest 3','Quest 3','Quest 3','Почему `s[0]` может не быть первым символом?','Почему `s[0]` может не быть первым символом?','Почему `s[0]` может не быть первым символом?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','Это первый байт, не обязательно целая руна','Это первый байт, не обязательно целая руна','Это первый байт, не обязательно целая руна',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','Индексация с 1','Индексация с 1','Индексация с 1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000008','mcq','Строки нельзя индексировать','Строки нельзя индексировать','Строки нельзя индексировать',false);
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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','hard','tomorrow_school_hard','Quest 4','Quest 4','Quest 4','Что будет, если объявить `x := 1`, но не использовать x?','Что будет, если объявить `x := 1`, но не использовать x?','Что будет, если объявить `x := 1`, но не использовать x?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','Компилятор выдаст ошибку','Компилятор выдаст ошибку','Компилятор выдаст ошибку',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','Ничего','Ничего','Ничего',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000010','mcq','x автоматически печатается','x автоматически печатается','x автоматически печатается',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','hard','tomorrow_school_hard','Quest 4','Quest 4','Quest 4','Что означает затенение переменной?','Что означает затенение переменной?','Что означает затенение переменной?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','Внутренняя переменная скрывает внешнюю','Внутренняя переменная скрывает внешнюю','Внутренняя переменная скрывает внешнюю',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','Удаление значения','Удаление значения','Удаление значения',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000011','mcq','Изменение типа пакета','Изменение типа пакета','Изменение типа пакета',false);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000012','mcq','6','6','6',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','hard','tomorrow_school_hard','Quest 5','Quest 5','Quest 5','Что выведет `a := []int{1,2}; b := append(a,3); fmt.Print(len(b))`?','Что выведет `a := []int{1,2}; b := append(a,3); fmt.Print(len(b))`?','Что выведет `a := []int{1,2}; b := append(a,3); fmt.Print(len(b))`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','2','2','2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','3','3','3',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000013','mcq','4','4','4',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','hard','tomorrow_school_hard','Quest 5','Quest 5','Quest 5','Почему изменение элемента подсреза может изменить исходный срез?','Почему изменение элемента подсреза может изменить исходный срез?','Почему изменение элемента подсреза может изменить исходный срез?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','Они могут разделять базовый массив','Они могут разделять базовый массив','Они могут разделять базовый массив',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','Срез всегда копируется','Срез всегда копируется','Срез всегда копируется',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000014','mcq','Из-за fmt','Из-за fmt','Из-за fmt',false);
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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','hard','tomorrow_school_hard','Quest 6','Quest 6','Quest 6','Что будет при разыменовании nil-указателя?','Что будет при разыменовании nil-указателя?','Что будет при разыменовании nil-указателя?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','Паника во время выполнения','Паника во время выполнения','Паника во время выполнения',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','Пустая строка','Пустая строка','Пустая строка',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000016','mcq','Всегда 0','Всегда 0','Всегда 0',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','hard','tomorrow_school_hard','Quest 6','Quest 6','Quest 6','Почему `func f(p *Person)` может менять поля исходной структуры?','Почему `func f(p *Person)` может менять поля исходной структуры?','Почему `func f(p *Person)` может менять поля исходной структуры?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','Передан указатель на структуру','Передан указатель на структуру','Передан указатель на структуру',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','Go передаёт всё по ссылке','Go передаёт всё по ссылке','Go передаёт всё по ссылке',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000017','mcq','Поля глобальные','Поля глобальные','Поля глобальные',false);
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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','hard','tomorrow_school_hard','Quest 7','Quest 7','Quest 7','Сколько раз вызовется f при f(3), если f(n) вызывает f(n-1) до n=0?','Сколько раз вызовется f при f(3), если f(n) вызывает f(n-1) до n=0?','Сколько раз вызовется f при f(3), если f(n) вызывает f(n-1) до n=0?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000019','mcq','5','5','5',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','hard','tomorrow_school_hard','Quest 7','Quest 7','Quest 7','Что вероятно при бесконечной рекурсии?','Что вероятно при бесконечной рекурсии?','Что вероятно при бесконечной рекурсии?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','Переполнение стека/исчерпание ресурсов','Переполнение стека/исчерпание ресурсов','Переполнение стека/исчерпание ресурсов',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','Автоматическая остановка','Автоматическая остановка','Автоматическая остановка',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000020','mcq','Сортировка','Сортировка','Сортировка',false);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000021','mcq','Бесконечная рекурсия, пока программа не исчерпает ресурсы','Бесконечная рекурсия, пока программа не исчерпает ресурсы','Бесконечная рекурсия, пока программа не исчерпает ресурсы',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000021','mcq','Функция вернёт 0','Функция вернёт 0','Функция вернёт 0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000021','mcq','Ошибка компиляции','Ошибка компиляции','Ошибка компиляции',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','hard','tomorrow_school_hard','Quest 8','Quest 8','Quest 8','Что возвращает strconv.Atoi("12")?','Что возвращает strconv.Atoi("12")?','Что возвращает strconv.Atoi("12")?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','(12, nil)','(12, nil)','(12, nil)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','Только строку','Только строку','Только строку',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000022','mcq','(0, nil)','(0, nil)','(0, nil)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000023','mcq','hard','tomorrow_school_hard','Quest 8','Quest 8','Quest 8','Как перебрать пользовательские аргументы без имени программы?','Как перебрать пользовательские аргументы без имени программы?','Как перебрать пользовательские аргументы без имени программы?',true);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000024','mcq','6','6','6',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','hard','tomorrow_school_hard','Quest 9','Quest 9','Quest 9','Что будет с `for i := range a` для среза?','Что будет с `for i := range a` для среза?','Что будет с `for i := range a` для среза?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','i — индексы элементов','i — индексы элементов','i — индексы элементов',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','i — сами значения','i — сами значения','i — сами значения',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000025','mcq','i — адрес среза','i — адрес среза','i — адрес среза',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','hard','tomorrow_school_hard','Quest 9','Quest 9','Quest 9','Чем опасно изменение длины среза во время обхода range?','Чем опасно изменение длины среза во время обхода range?','Чем опасно изменение длины среза во время обхода range?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','Количество итераций определяется в начале обхода','Количество итераций определяется в начале обхода','Количество итераций определяется в начале обхода',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','Всегда ошибка компиляции','Всегда ошибка компиляции','Всегда ошибка компиляции',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000026','mcq','range автоматически перезапускается','range автоматически перезапускается','range автоматически перезапускается',false);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000027','mcq','6','6','6',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','hard','tomorrow_school_hard','Quest 10','Quest 10','Quest 10','Какова сложность поиска значения в несортированном односвязном списке?','Какова сложность поиска значения в несортированном односвязном списке?','Какова сложность поиска значения в несортированном односвязном списке?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','O(n)','O(n)','O(n)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','O(1)','O(1)','O(1)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000028','mcq','O(log n) всегда','O(log n) всегда','O(log n) всегда',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','hard','tomorrow_school_hard','Quest 10','Quest 10','Quest 10','Почему вставка после известного узла обычно O(1)?','Почему вставка после известного узла обычно O(1)?','Почему вставка после известного узла обычно O(1)?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','Меняется фиксированное число ссылок','Меняется фиксированное число ссылок','Меняется фиксированное число ссылок',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','Пересоздаётся весь список','Пересоздаётся весь список','Пересоздаётся весь список',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000029','mcq','Нужна сортировка','Нужна сортировка','Нужна сортировка',false);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000030','mcq','6','6','6',true);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','hard','tomorrow_school_hard','Quest 11','Quest 11','Quest 11','Чему равно `5 ^ 3`?','Чему равно `5 ^ 3`?','Чему равно `5 ^ 3`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','6','6','6',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','1','1','1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000031','mcq','7','7','7',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','hard','tomorrow_school_hard','Quest 11','Quest 11','Quest 11','Почему `uint8(255) + uint8(1)` не подходит как прямое константное выражение?','Почему `uint8(255) + uint8(1)` не подходит как прямое константное выражение?','Почему `uint8(255) + uint8(1)` не подходит как прямое константное выражение?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','Константный результат 256 не представим в uint8','Константный результат 256 не представим в uint8','Константный результат 256 не представим в uint8',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','Go не поддерживает uint8','Go не поддерживает uint8','Go не поддерживает uint8',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000032','mcq','255 нечётное','255 нечётное','255 нечётное',false);
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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','hard','tomorrow_school_hard','Quest 12','Quest 12','Quest 12','В каком порядке выполнятся `defer fmt.Print(1); defer fmt.Print(2)`?','В каком порядке выполнятся `defer fmt.Print(1); defer fmt.Print(2)`?','В каком порядке выполнятся `defer fmt.Print(1); defer fmt.Print(2)`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','21','21','21',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','12','12','12',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000034','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','hard','tomorrow_school_hard','Quest 12','Quest 12','Quest 12','Что произойдёт, если две горутины без синхронизации изменяют одну переменную?','Что произойдёт, если две горутины без синхронизации изменяют одну переменную?','Что произойдёт, если две горутины без синхронизации изменяют одну переменную?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','Возможна гонка данных','Возможна гонка данных','Возможна гонка данных',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','Go всегда сериализует операции','Go всегда сериализует операции','Go всегда сериализует операции',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000035','mcq','Компилятор автоматически ставит mutex','Компилятор автоматически ставит mutex','Компилятор автоматически ставит mutex',false);
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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0002-0000-4000-8000-000000000036','mcq','7','7','7',true);
COMMIT;