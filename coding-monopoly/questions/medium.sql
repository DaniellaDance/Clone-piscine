BEGIN;
DELETE FROM problems WHERE topic='tomorrow_school_medium';
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','medium','tomorrow_school_medium','Quest 1','Quest 1','Quest 1','Что делает `ls -a`?','Что делает `ls -a`?','Что делает `ls -a`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','Показывает и скрытые файлы','Показывает и скрытые файлы','Показывает и скрытые файлы',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','Удаляет файлы','Удаляет файлы','Удаляет файлы',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','Создаёт папку','Создаёт папку','Создаёт папку',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','medium','tomorrow_school_medium','Quest 1','Quest 1','Quest 1','Что выведет `fmt.Print(2 + 3 * 4)`?','Что выведет `fmt.Print(2 + 3 * 4)`?','Что выведет `fmt.Print(2 + 3 * 4)`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','20','20','20',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','14','14','14',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','24','24','24',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','medium','tomorrow_school_medium','Quest 1','Quest 1','Quest 1','Допиши строку вместо ???, чтобы код работал.

```go
package main

import "fmt"

func main() { ???; fmt.Print(x) }
```','Допиши строку вместо ???, чтобы код работал.

```go
package main

import "fmt"

func main() { ???; fmt.Print(x) }
```','Допиши строку вместо ???, чтобы код работал.

```go
package main

import "fmt"

func main() { ???; fmt.Print(x) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','x := 7','x := 7','x := 7',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','x == 7','x == 7','x == 7',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','int x = 7','int x = 7','int x = 7',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','medium','tomorrow_school_medium','Quest 2','Quest 2','Quest 2','Что означает `!=`?','Что означает `!=`?','Что означает `!=`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','Присваивание','Присваивание','Присваивание',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','Не равно','Не равно','Не равно',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','И','И','И',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','medium','tomorrow_school_medium','Quest 2','Quest 2','Quest 2','Сколько итераций у `for i := 0; i < 4; i++`?','Сколько итераций у `for i := 0; i < 4; i++`?','Сколько итераций у `for i := 0; i < 4; i++`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','5','5','5',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000006','mcq','medium','tomorrow_school_medium','Quest 2','Quest 2','Quest 2','Допиши условие вместо ???.

```go
package main

import "fmt"

func main() {
	x := 6
	if ??? {
		fmt.Print("yes")
	}
}
```','Допиши условие вместо ???.

```go
package main

import "fmt"

func main() {
	x := 6
	if ??? {
		fmt.Print("yes")
	}
}
```','Допиши условие вместо ???.

```go
package main

import "fmt"

func main() {
	x := 6
	if ??? {
		fmt.Print("yes")
	}
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000006','mcq','x%2==0','x%2==0','x%2==0',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000006','mcq','x%2=0','x%2=0','x%2=0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000006','mcq','x%2:=0','x%2:=0','x%2:=0',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','medium','tomorrow_school_medium','Quest 3','Quest 3','Quest 3','Что делает `string(''A'')`?','Что делает `string(''A'')`?','Что делает `string(''A'')`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','Создаёт строку A','Создаёт строку A','Создаёт строку A',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','Создаёт число 65','Создаёт число 65','Создаёт число 65',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','medium','tomorrow_school_medium','Quest 3','Quest 3','Quest 3','Чему равен `len("Пр")` в UTF-8?','Чему равен `len("Пр")` в UTF-8?','Чему равен `len("Пр")` в UTF-8?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','2','2','2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','1','1','1',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','medium','tomorrow_school_medium','Quest 3','Quest 3','Quest 3','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { s := "кот"; ???; fmt.Print(len(r)) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { s := "кот"; ???; fmt.Print(len(r)) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { s := "кот"; ???; fmt.Print(len(r)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','r := []rune(s)','r := []rune(s)','r := []rune(s)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','r := []int(s)','r := []int(s)','r := []int(s)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','r := rune(s)','r := rune(s)','r := rune(s)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','medium','tomorrow_school_medium','Quest 4','Quest 4','Quest 4','Где видна локальная переменная?','Где видна локальная переменная?','Где видна локальная переменная?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','Во всём проекте','Во всём проекте','Во всём проекте',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','В своей области видимости','В своей области видимости','В своей области видимости',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','Во всех пакетах','Во всех пакетах','Во всех пакетах',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','medium','tomorrow_school_medium','Quest 4','Quest 4','Quest 4','Что означает `func f(a int) (int, error)`?','Что означает `func f(a int) (int, error)`?','Что означает `func f(a int) (int, error)`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','Два возвращаемых значения','Два возвращаемых значения','Два возвращаемых значения',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','Два аргумента','Два аргумента','Два аргумента',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','Метод без результата','Метод без результата','Метод без результата',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','medium','tomorrow_school_medium','Quest 4','Quest 4','Quest 4','Допиши возвращаемую строку.

```go
package main

import "fmt"

func twice(x int) int { ??? }
func main()           { fmt.Print(twice(3)) }
```','Допиши возвращаемую строку.

```go
package main

import "fmt"

func twice(x int) int { ??? }
func main()           { fmt.Print(twice(3)) }
```','Допиши возвращаемую строку.

```go
package main

import "fmt"

func twice(x int) int { ??? }
func main()           { fmt.Print(twice(3)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','return x * 2','return x * 2','return x * 2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','print x * 2','print x * 2','print x * 2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','x * 2','x * 2','x * 2',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','medium','tomorrow_school_medium','Quest 5','Quest 5','Quest 5','Что делает append?','Что делает append?','Что делает append?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','Добавляет элементы к срезу','Добавляет элементы к срезу','Добавляет элементы к срезу',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','Удаляет переменную','Удаляет переменную','Удаляет переменную',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','Сортирует массив','Сортирует массив','Сортирует массив',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','medium','tomorrow_school_medium','Quest 5','Quest 5','Quest 5','Чем `[3]int` отличается от `[]int`?','Чем `[3]int` отличается от `[]int`?','Чем `[3]int` отличается от `[]int`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','Первое — массив фиксированной длины','Первое — массив фиксированной длины','Первое — массив фиксированной длины',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','Ничем','Ничем','Ничем',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','Первое — строка','Первое — строка','Первое — строка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','medium','tomorrow_school_medium','Quest 5','Quest 5','Quest 5','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { a := []int{1, 2}; ???; fmt.Print(len(a)) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { a := []int{1, 2}; ???; fmt.Print(len(a)) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { a := []int{1, 2}; ???; fmt.Print(len(a)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','a = append(a,3)','a = append(a,3)','a = append(a,3)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','append(a,3)','append(a,3)','append(a,3)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','a += 3','a += 3','a += 3',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','medium','tomorrow_school_medium','Quest 6','Quest 6','Quest 6','Как обратиться к полю структуры p.Name?','Как обратиться к полю структуры p.Name?','Как обратиться к полю структуры p.Name?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','p.Name','p.Name','p.Name',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','p->Name','p->Name','p->Name',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','p::Name','p::Name','p::Name',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','medium','tomorrow_school_medium','Quest 6','Quest 6','Quest 6','Что означает `*p` для указателя p?','Что означает `*p` для указателя p?','Что означает `*p` для указателя p?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','Разыменование','Разыменование','Разыменование',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','Создание пакета','Создание пакета','Создание пакета',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','Сложение','Сложение','Сложение',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','medium','tomorrow_school_medium','Quest 6','Quest 6','Quest 6','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { x := 5; ???; fmt.Print(*p) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { x := 5; ???; fmt.Print(*p) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { x := 5; ???; fmt.Print(*p) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','p := &x','p := &x','p := &x',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','p := *x','p := *x','p := *x',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','p := x','p := x','p := x',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','medium','tomorrow_school_medium','Quest 7','Quest 7','Quest 7','Что вернёт `f(0)`, если `if n==0 {return 1}`?','Что вернёт `f(0)`, если `if n==0 {return 1}`?','Что вернёт `f(0)`, если `if n==0 {return 1}`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','0','0','0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','1','1','1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','Ошибка','Ошибка','Ошибка',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','medium','tomorrow_school_medium','Quest 7','Quest 7','Quest 7','Что вычисляет `f(n)=n*f(n-1)` при `f(0)=1`?','Что вычисляет `f(n)=n*f(n-1)` при `f(0)=1`?','Что вычисляет `f(n)=n*f(n-1)` при `f(0)=1`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','Факториал','Факториал','Факториал',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','Сумму чисел','Сумму чисел','Сумму чисел',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','Длину строки','Длину строки','Длину строки',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000021','mcq','medium','tomorrow_school_medium','Quest 7','Quest 7','Quest 7','Допиши базовый случай вместо ???.

```go
package main

import "fmt"

func sum(n int) int {
	if n == 0 {
		???
	}
	return n + sum(n-1)
}
func main() { fmt.Print(sum(3)) }
```','Допиши базовый случай вместо ???.

```go
package main

import "fmt"

func sum(n int) int {
	if n == 0 {
		???
	}
	return n + sum(n-1)
}
func main() { fmt.Print(sum(3)) }
```','Допиши базовый случай вместо ???.

```go
package main

import "fmt"

func sum(n int) int {
	if n == 0 {
		???
	}
	return n + sum(n-1)
}
func main() { fmt.Print(sum(3)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000021','mcq','return 0','return 0','return 0',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000021','mcq','return n+1','return n+1','return n+1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000021','mcq','break','break','break',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','medium','tomorrow_school_medium','Quest 8','Quest 8','Quest 8','Как проверить наличие одного пользовательского аргумента?','Как проверить наличие одного пользовательского аргумента?','Как проверить наличие одного пользовательского аргумента?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','len(os.Args) > 1','len(os.Args) > 1','len(os.Args) > 1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','len(os.Args) > 0','len(os.Args) > 0','len(os.Args) > 0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','os.Args == 1','os.Args == 1','os.Args == 1',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','medium','tomorrow_school_medium','Quest 8','Quest 8','Quest 8','Что произойдёт при os.Args[1], если len(os.Args)==1?','Что произойдёт при os.Args[1], если len(os.Args)==1?','Что произойдёт при os.Args[1], если len(os.Args)==1?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','Паника: индекс вне диапазона','Паника: индекс вне диапазона','Паника: индекс вне диапазона',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','Пустая строка','Пустая строка','Пустая строка',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','0','0','0',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000024','mcq','medium','tomorrow_school_medium','Quest 8','Quest 8','Quest 8','Допиши проверку вместо ???.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	if ??? {
		fmt.Print(os.Args[1])
	}
}
```','Допиши проверку вместо ???.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	if ??? {
		fmt.Print(os.Args[1])
	}
}
```','Допиши проверку вместо ???.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	if ??? {
		fmt.Print(os.Args[1])
	}
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000024','mcq','len(os.Args)>1','len(os.Args)>1','len(os.Args)>1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000024','mcq','len(os.Args)>0','len(os.Args)>0','len(os.Args)>0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000024','mcq','os.Args[1]!=nil','os.Args[1]!=nil','os.Args[1]!=nil',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','medium','tomorrow_school_medium','Quest 9','Quest 9','Quest 9','Что означает сортировка по возрастанию?','Что означает сортировка по возрастанию?','Что означает сортировка по возрастанию?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','От меньшего к большему','От меньшего к большему','От меньшего к большему',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','От большего к меньшему','От большего к меньшему','От большего к меньшему',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','Случайный порядок','Случайный порядок','Случайный порядок',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','medium','tomorrow_school_medium','Quest 9','Quest 9','Quest 9','Какова сложность одного полного прохода по n элементам?','Какова сложность одного полного прохода по n элементам?','Какова сложность одного полного прохода по n элементам?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','O(n)','O(n)','O(n)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','O(1)','O(1)','O(1)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','O(n²)','O(n²)','O(n²)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000027','mcq','medium','tomorrow_school_medium','Quest 9','Quest 9','Quest 9','Допиши условие для обмена соседних элементов.

```go
package main

import "fmt"

func main() {
	a := []int{4, 2}
	if ??? {
		a[0], a[1] = a[1], a[0]
	}
	fmt.Print(a)
}
```','Допиши условие для обмена соседних элементов.

```go
package main

import "fmt"

func main() {
	a := []int{4, 2}
	if ??? {
		a[0], a[1] = a[1], a[0]
	}
	fmt.Print(a)
}
```','Допиши условие для обмена соседних элементов.

```go
package main

import "fmt"

func main() {
	a := []int{4, 2}
	if ??? {
		a[0], a[1] = a[1], a[0]
	}
	fmt.Print(a)
}
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000027','mcq','a[0]>a[1]','a[0]>a[1]','a[0]>a[1]',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000027','mcq','a[0]=a[1]','a[0]=a[1]','a[0]=a[1]',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000027','mcq','a[0]:=a[1]','a[0]:=a[1]','a[0]:=a[1]',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','medium','tomorrow_school_medium','Quest 10','Quest 10','Quest 10','Как перейти к следующему узлу?','Как перейти к следующему узлу?','Как перейти к следующему узлу?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','node = node.Next','node = node.Next','node = node.Next',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','node++','node++','node++',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','node[1]','node[1]','node[1]',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','medium','tomorrow_school_medium','Quest 10','Quest 10','Quest 10','Почему перед чтением node.Next проверяют node != nil?','Почему перед чтением node.Next проверяют node != nil?','Почему перед чтением node.Next проверяют node != nil?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','Иначе возможна паника','Иначе возможна паника','Иначе возможна паника',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','Иначе код медленнее','Иначе код медленнее','Иначе код медленнее',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','Иначе узел удалится','Иначе узел удалится','Иначе узел удалится',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000030','mcq','medium','tomorrow_school_medium','Quest 10','Quest 10','Quest 10','Допиши строку для связи узлов.

```go
package main

import "fmt"

type Node struct {
	Value int
	Next  *Node
}

func main() { a := &Node{Value: 1}; b := &Node{Value: 2}; ???; fmt.Print(a.Next.Value) }
```','Допиши строку для связи узлов.

```go
package main

import "fmt"

type Node struct {
	Value int
	Next  *Node
}

func main() { a := &Node{Value: 1}; b := &Node{Value: 2}; ???; fmt.Print(a.Next.Value) }
```','Допиши строку для связи узлов.

```go
package main

import "fmt"

type Node struct {
	Value int
	Next  *Node
}

func main() { a := &Node{Value: 1}; b := &Node{Value: 2}; ???; fmt.Print(a.Next.Value) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000030','mcq','a.Next = b','a.Next = b','a.Next = b',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000030','mcq','a.Next = *b','a.Next = *b','a.Next = *b',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000030','mcq','a = b.Next','a = b.Next','a = b.Next',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','medium','tomorrow_school_medium','Quest 11','Quest 11','Quest 11','Что делает `x << 1` для положительного x без переполнения?','Что делает `x << 1` для положительного x без переполнения?','Что делает `x << 1` для положительного x без переполнения?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','Умножает на 2','Умножает на 2','Умножает на 2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','Делит на 2','Делит на 2','Делит на 2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','Добавляет 1','Добавляет 1','Добавляет 1',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','medium','tomorrow_school_medium','Quest 11','Quest 11','Quest 11','Чему равно `5 & 3`?','Чему равно `5 & 3`?','Чему равно `5 & 3`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','1','1','1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','7','7','7',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','2','2','2',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','medium','tomorrow_school_medium','Quest 11','Quest 11','Quest 11','Допиши выражение для проверки младшего бита.

```go
package main

import "fmt"

func main() { x := 5; fmt.Print(???) }
```','Допиши выражение для проверки младшего бита.

```go
package main

import "fmt"

func main() { x := 5; fmt.Print(???) }
```','Допиши выражение для проверки младшего бита.

```go
package main

import "fmt"

func main() { x := 5; fmt.Print(???) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','x&1 == 1','x&1 == 1','x&1 == 1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','x&&1 == 1','x&&1 == 1','x&&1 == 1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','x&1 = 1','x&1 = 1','x&1 = 1',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','medium','tomorrow_school_medium','Quest 12','Quest 12','Quest 12','Как проверить ошибку после вызова `n, err := strconv.Atoi(s)`?','Как проверить ошибку после вызова `n, err := strconv.Atoi(s)`?','Как проверить ошибку после вызова `n, err := strconv.Atoi(s)`?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','if err != nil { ... }','if err != nil { ... }','if err != nil { ... }',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','if n == nil { ... }','if n == nil { ... }','if n == nil { ... }',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','if err == true { ... }','if err == true { ... }','if err == true { ... }',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','medium','tomorrow_school_medium','Quest 12','Quest 12','Quest 12','Почему `defer` удобен при закрытии файла?','Почему `defer` удобен при закрытии файла?','Почему `defer` удобен при закрытии файла?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','Отложенный вызов выполнится при выходе из функции','Отложенный вызов выполнится при выходе из функции','Отложенный вызов выполнится при выходе из функции',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','Он выполняется до открытия','Он выполняется до открытия','Он выполняется до открытия',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','Он подавляет ошибки','Он подавляет ошибки','Он подавляет ошибки',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000036','mcq','medium','tomorrow_school_medium','Quest 12','Quest 12','Quest 12','Допиши обработку ошибки вместо ???.

```go
package main

import (
	"fmt"
	"strconv"
)

func main() { n, err := strconv.Atoi("42"); ???; fmt.Print(n) }
```','Допиши обработку ошибки вместо ???.

```go
package main

import (
	"fmt"
	"strconv"
)

func main() { n, err := strconv.Atoi("42"); ???; fmt.Print(n) }
```','Допиши обработку ошибки вместо ???.

```go
package main

import (
	"fmt"
	"strconv"
)

func main() { n, err := strconv.Atoi("42"); ???; fmt.Print(n) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000036','mcq','if err != nil { return }','if err != nil { return }','if err != nil { return }',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000036','mcq','if err == true { return }','if err == true { return }','if err == true { return }',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000036','mcq','if n == nil { return }','if n == nil { return }','if n == nil { return }',false);
COMMIT;