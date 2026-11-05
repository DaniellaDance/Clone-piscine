BEGIN;
DELETE FROM problems WHERE topic='tomorrow_school_easy';
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','easy','tomorrow_school_easy','Quest 1','Quest 1','Quest 1','Что показывает команда `pwd`?','Что показывает команда `pwd`?','Что показывает команда `pwd`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','Текущую папку','Текущую папку','Текущую папку',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','Список файлов','Список файлов','Список файлов',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','Версию Go','Версию Go','Версию Go',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','easy','tomorrow_school_easy','Quest 1','Quest 1','Quest 1','Как объявить переменную с выводом типа?','Как объявить переменную с выводом типа?','Как объявить переменную с выводом типа?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','x := 5','x := 5','x := 5',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','x == 5','x == 5','x == 5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','let x = 5','let x = 5','let x = 5',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','easy','tomorrow_school_easy','Quest 1','Quest 1','Quest 1','Что выведет код?

```go
package main

import "fmt"

func main() { x := 2; fmt.Print(x + 3) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { x := 2; fmt.Print(x + 3) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { x := 2; fmt.Print(x + 3) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','5','5','5',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','23','23','23',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','easy','tomorrow_school_easy','Quest 2','Quest 2','Quest 2','Какой тип имеет `true`?','Какой тип имеет `true`?','Какой тип имеет `true`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','string','string','string',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','bool','bool','bool',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','int','int','int',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','easy','tomorrow_school_easy','Quest 2','Quest 2','Quest 2','Как записывают условие?','Как записывают условие?','Как записывают условие?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','if x > 0 { }','if x > 0 { }','if x > 0 { }',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','if (x > 0) then','if (x > 0) then','if (x > 0) then',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','when x > 0','when x > 0','when x > 0',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000006','mcq','easy','tomorrow_school_easy','Quest 2','Quest 2','Quest 2','Что выведет код?

```go
package main

import "fmt"

func main() {
	for i := 1; i < 4; i++ {
		fmt.Print(i)
	}
}
```','Что выведет код?

```go
package main

import "fmt"

func main() {
	for i := 1; i < 4; i++ {
		fmt.Print(i)
	}
}
```','Что выведет код?

```go
package main

import "fmt"

func main() {
	for i := 1; i < 4; i++ {
		fmt.Print(i)
	}
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000006','mcq','123','123','123',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000006','mcq','0123','0123','0123',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000006','mcq','1234','1234','1234',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','easy','tomorrow_school_easy','Quest 3','Quest 3','Quest 3','Что обозначает тип `rune`?','Что обозначает тип `rune`?','Что обозначает тип `rune`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','Кодовую точку Unicode','Кодовую точку Unicode','Кодовую точку Unicode',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','Массив байтов','Массив байтов','Массив байтов',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','Файл','Файл','Файл',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','easy','tomorrow_school_easy','Quest 3','Quest 3','Quest 3','Как получить длину строки в байтах?','Как получить длину строки в байтах?','Как получить длину строки в байтах?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','len(s)','len(s)','len(s)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','size(s)','size(s)','size(s)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','count(s)','count(s)','count(s)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','easy','tomorrow_school_easy','Quest 3','Quest 3','Quest 3','Что выведет код?

```go
package main

import "fmt"

func main() { s := "Go"; fmt.Print(len(s)) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { s := "Go"; fmt.Print(len(s)) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { s := "Go"; fmt.Print(len(s)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','2','2','2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','1','1','1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','3','3','3',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','easy','tomorrow_school_easy','Quest 4','Quest 4','Quest 4','Как начинается объявление функции?','Как начинается объявление функции?','Как начинается объявление функции?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','func','func','func',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','function','function','function',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','def','def','def',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','easy','tomorrow_school_easy','Quest 4','Quest 4','Quest 4','Как вернуть значение из функции?','Как вернуть значение из функции?','Как вернуть значение из функции?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','return x','return x','return x',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','yield x','yield x','yield x',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','send x','send x','send x',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','easy','tomorrow_school_easy','Quest 4','Quest 4','Quest 4','Что выведет код?

```go
package main

import "fmt"

func add(a, b int) int { return a + b }
func main()            { fmt.Print(add(2, 4)) }
```','Что выведет код?

```go
package main

import "fmt"

func add(a, b int) int { return a + b }
func main()            { fmt.Print(add(2, 4)) }
```','Что выведет код?

```go
package main

import "fmt"

func add(a, b int) int { return a + b }
func main()            { fmt.Print(add(2, 4)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','6','6','6',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','24','24','24',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','easy','tomorrow_school_easy','Quest 5','Quest 5','Quest 5','Как записать срез целых чисел?','Как записать срез целых чисел?','Как записать срез целых чисел?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','[]int{1,2}','[]int{1,2}','[]int{1,2}',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','int[]{1,2}','int[]{1,2}','int[]{1,2}',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','[int]1,2','[int]1,2','[int]1,2',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','easy','tomorrow_school_easy','Quest 5','Quest 5','Quest 5','Как получить количество элементов среза?','Как получить количество элементов среза?','Как получить количество элементов среза?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','len(a)','len(a)','len(a)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','caponly(a)','caponly(a)','caponly(a)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','size(a)','size(a)','size(a)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','easy','tomorrow_school_easy','Quest 5','Quest 5','Quest 5','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 4}; fmt.Print(a[1]) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 4}; fmt.Print(a[1]) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 4}; fmt.Print(a[1]) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','easy','tomorrow_school_easy','Quest 6','Quest 6','Quest 6','Что хранит указатель?','Что хранит указатель?','Что хранит указатель?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','Адрес значения','Адрес значения','Адрес значения',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','Имя файла','Имя файла','Имя файла',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','Только строку','Только строку','Только строку',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','easy','tomorrow_school_easy','Quest 6','Quest 6','Quest 6','Как получить адрес переменной x?','Как получить адрес переменной x?','Как получить адрес переменной x?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','&x','&x','&x',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','*x','*x','*x',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','@x','@x','@x',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','easy','tomorrow_school_easy','Quest 6','Quest 6','Quest 6','Что выведет код?

```go
package main

import "fmt"

func main() { x := 8; p := &x; fmt.Print(*p) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { x := 8; p := &x; fmt.Print(*p) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { x := 8; p := &x; fmt.Print(*p) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','8','8','8',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','Адрес','Адрес','Адрес',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','easy','tomorrow_school_easy','Quest 7','Quest 7','Quest 7','Что такое рекурсия?','Что такое рекурсия?','Что такое рекурсия?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','Вызов функцией самой себя','Вызов функцией самой себя','Вызов функцией самой себя',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','Любой цикл','Любой цикл','Любой цикл',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','Импорт пакета','Импорт пакета','Импорт пакета',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','easy','tomorrow_school_easy','Quest 7','Quest 7','Quest 7','Зачем нужен базовый случай?','Зачем нужен базовый случай?','Зачем нужен базовый случай?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','Чтобы остановить вызовы','Чтобы остановить вызовы','Чтобы остановить вызовы',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','Чтобы создать массив','Чтобы создать массив','Чтобы создать массив',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','Чтобы импортировать fmt','Чтобы импортировать fmt','Чтобы импортировать fmt',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000021','mcq','easy','tomorrow_school_easy','Quest 7','Quest 7','Quest 7','Что выведет код?

```go
package main

import "fmt"

func f(n int) int {
	if n == 0 {
		return 1
	}
	return n * f(n-1)
}
func main() { fmt.Print(f(3)) }
```','Что выведет код?

```go
package main

import "fmt"

func f(n int) int {
	if n == 0 {
		return 1
	}
	return n * f(n-1)
}
func main() { fmt.Print(f(3)) }
```','Что выведет код?

```go
package main

import "fmt"

func f(n int) int {
	if n == 0 {
		return 1
	}
	return n * f(n-1)
}
func main() { fmt.Print(f(3)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000021','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000021','mcq','6','6','6',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000021','mcq','9','9','9',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','easy','tomorrow_school_easy','Quest 8','Quest 8','Quest 8','Где находятся аргументы запуска?','Где находятся аргументы запуска?','Где находятся аргументы запуска?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','os.Args','os.Args','os.Args',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','fmt.Args','fmt.Args','fmt.Args',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','go.Args','go.Args','go.Args',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','easy','tomorrow_school_easy','Quest 8','Quest 8','Quest 8','Что обычно хранится в os.Args[0]?','Что обычно хранится в os.Args[0]?','Что обычно хранится в os.Args[0]?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','Имя или путь программы','Имя или путь программы','Имя или путь программы',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','Первый пользовательский аргумент','Первый пользовательский аргумент','Первый пользовательский аргумент',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','Количество аргументов','Количество аргументов','Количество аргументов',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000024','mcq','easy','tomorrow_school_easy','Quest 8','Quest 8','Quest 8','Что выведет код при запуске без аргументов?

```go
package main

import (
	"fmt"
	"os"
)

func main() { fmt.Print(len(os.Args) >= 1) }
```','Что выведет код при запуске без аргументов?

```go
package main

import (
	"fmt"
	"os"
)

func main() { fmt.Print(len(os.Args) >= 1) }
```','Что выведет код при запуске без аргументов?

```go
package main

import (
	"fmt"
	"os"
)

func main() { fmt.Print(len(os.Args) >= 1) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000024','mcq','true','true','true',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000024','mcq','false','false','false',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000024','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','easy','tomorrow_school_easy','Quest 9','Quest 9','Quest 9','Что делает `break` в цикле?','Что делает `break` в цикле?','Что делает `break` в цикле?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','Завершает ближайший цикл','Завершает ближайший цикл','Завершает ближайший цикл',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','Пропускает одну итерацию','Пропускает одну итерацию','Пропускает одну итерацию',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','Возвращает значение','Возвращает значение','Возвращает значение',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','easy','tomorrow_school_easy','Quest 9','Quest 9','Quest 9','Что делает `continue`?','Что делает `continue`?','Что делает `continue`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','Переходит к следующей итерации','Переходит к следующей итерации','Переходит к следующей итерации',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','Завершает программу','Завершает программу','Завершает программу',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','Удаляет элемент','Удаляет элемент','Удаляет элемент',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','easy','tomorrow_school_easy','Quest 9','Quest 9','Quest 9','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 1, 2}; fmt.Print(a[0] < a[1]) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 1, 2}; fmt.Print(a[0] < a[1]) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 1, 2}; fmt.Print(a[0] < a[1]) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','true','true','true',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','false','false','false',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','easy','tomorrow_school_easy','Quest 10','Quest 10','Quest 10','Что обычно содержит узел односвязного списка?','Что обычно содержит узел односвязного списка?','Что обычно содержит узел односвязного списка?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','Данные и указатель на следующий узел','Данные и указатель на следующий узел','Данные и указатель на следующий узел',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','Только индекс','Только индекс','Только индекс',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','Только длину','Только длину','Только длину',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','easy','tomorrow_school_easy','Quest 10','Quest 10','Quest 10','Что означает nil в поле Next?','Что означает nil в поле Next?','Что означает nil в поле Next?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','Следующего узла нет','Следующего узла нет','Следующего узла нет',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','Начало массива','Начало массива','Начало массива',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','Ошибка компиляции','Ошибка компиляции','Ошибка компиляции',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000030','mcq','easy','tomorrow_school_easy','Quest 10','Quest 10','Quest 10','Что выведет код?

```go
package main

import "fmt"

type Node struct {
	Value int
	Next  *Node
}

func main() { n := Node{Value: 7}; fmt.Print(n.Value) }
```','Что выведет код?

```go
package main

import "fmt"

type Node struct {
	Value int
	Next  *Node
}

func main() { n := Node{Value: 7}; fmt.Print(n.Value) }
```','Что выведет код?

```go
package main

import "fmt"

type Node struct {
	Value int
	Next  *Node
}

func main() { n := Node{Value: 7}; fmt.Print(n.Value) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000030','mcq','7','7','7',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000030','mcq','0','0','0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000030','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','easy','tomorrow_school_easy','Quest 11','Quest 11','Quest 11','Сколько бит в байте?','Сколько бит в байте?','Сколько бит в байте?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','8','8','8',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','10','10','10',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','16','16','16',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','easy','tomorrow_school_easy','Quest 11','Quest 11','Quest 11','Что означает `&` для целых чисел?','Что означает `&` для целых чисел?','Что означает `&` для целых чисел?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','Побитовое И','Побитовое И','Побитовое И',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','Логическое ИЛИ','Логическое ИЛИ','Логическое ИЛИ',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','Деление','Деление','Деление',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','easy','tomorrow_school_easy','Quest 11','Quest 11','Quest 11','Что выведет код?

```go
package main

import "fmt"

func main() { fmt.Print(6 & 3) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { fmt.Print(6 & 3) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { fmt.Print(6 & 3) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','2','2','2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','7','7','7',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','3','3','3',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','easy','tomorrow_school_easy','Quest 12','Quest 12','Quest 12','Что делает `go test ./...`?','Что делает `go test ./...`?','Что делает `go test ./...`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','Запускает тесты всех пакетов ниже текущего модуля','Запускает тесты всех пакетов ниже текущего модуля','Запускает тесты всех пакетов ниже текущего модуля',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','Удаляет тесты','Удаляет тесты','Удаляет тесты',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','Только компилирует main.go','Только компилирует main.go','Только компилирует main.go',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','easy','tomorrow_school_easy','Quest 12','Quest 12','Quest 12','Что делает `gofmt -w main.go`?','Что делает `gofmt -w main.go`?','Что делает `gofmt -w main.go`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','Форматирует и записывает файл','Форматирует и записывает файл','Форматирует и записывает файл',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','Запускает программу','Запускает программу','Запускает программу',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','Создаёт модуль','Создаёт модуль','Создаёт модуль',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','easy','tomorrow_school_easy','Quest 12','Quest 12','Quest 12','Что выведет код?

```go
package main

import "fmt"

func main() { defer fmt.Print("B"); fmt.Print("A") }
```','Что выведет код?

```go
package main

import "fmt"

func main() { defer fmt.Print("B"); fmt.Print("A") }
```','Что выведет код?

```go
package main

import "fmt"

func main() { defer fmt.Print("B"); fmt.Print("A") }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','AB','AB','AB',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','BA','BA','BA',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','Ошибка','Ошибка','Ошибка',false);
COMMIT;