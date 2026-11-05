BEGIN;
DELETE FROM problems WHERE topic='tomorrow_school_medium';
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','medium','tomorrow_school_medium','Quest 1','Quest 1','Quest 1','What does `ls -a` do?','Что делает `ls -a`?','`ls -a` командасы не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','Also shows hidden files','Показывает и скрытые файлы','Жасырын файлдарды да көрсетеді',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','Deletes files','Удаляет файлы','Файлдарды жояды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000001','mcq','Creates a directory','Создаёт папку','Қалта құрады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','medium','tomorrow_school_medium','Quest 1','Quest 1','Quest 1','What does `fmt.Print(2 + 3 * 4)` print?','Что выведет `fmt.Print(2 + 3 * 4)`?','`fmt.Print(2 + 3 * 4)` не шығарады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','20','20','20',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','14','14','14',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000002','mcq','24','24','24',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','medium','tomorrow_school_medium','Quest 1','Quest 1','Quest 1','Fill in the line replacing ??? so the code works.

```go
package main

import "fmt"

func main() { ???; fmt.Print(x) }
```','Допиши строку вместо ???, чтобы код работал.

```go
package main

import "fmt"

func main() { ???; fmt.Print(x) }
```','Код жұмыс істеуі үшін ??? орнына тиісті жолды жазыңыз.

```go
package main

import "fmt"

func main() { ???; fmt.Print(x) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','x := 7','x := 7','x := 7',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','x == 7','x == 7','x == 7',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000003','mcq','int x = 7','int x = 7','int x = 7',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','medium','tomorrow_school_medium','Quest 2','Quest 2','Quest 2','What does `!=` mean?','Что означает `!=`?','`!=` нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','Assignment','Присваивание','Мән меншіктеу',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','Not equal to','Не равно','Тең емес',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000004','mcq','AND','И','ЖӘНЕ',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','medium','tomorrow_school_medium','Quest 2','Quest 2','Quest 2','How many iterations does `for i := 0; i < 4; i++` perform?','Сколько итераций у `for i := 0; i < 4; i++`?','`for i := 0; i < 4; i++` циклі неше рет орындалады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000005','mcq','5','5','5',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000006','mcq','medium','tomorrow_school_medium','Quest 2','Quest 2','Quest 2','Fill in the condition replacing ???.

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
```','??? орнына тиісті шартты жазыңыз.

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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','medium','tomorrow_school_medium','Quest 3','Quest 3','Quest 3','What does `string(''A'')` do?','Что делает `string(''A'')`?','`string(''A'')` не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','Creates the string A','Создаёт строку A','A жолын құрады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','Creates the number 65','Создаёт число 65','65 санын құрады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000007','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','medium','tomorrow_school_medium','Quest 3','Quest 3','Quest 3','What is `len("Пр")` in UTF-8?','Чему равен `len("Пр")` в UTF-8?','UTF-8 кодтауында `len("Пр")` неге тең?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','2','2','2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000008','mcq','1','1','1',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','medium','tomorrow_school_medium','Quest 3','Quest 3','Quest 3','Fill in the line replacing ???.

```go
package main

import "fmt"

func main() { s := "кот"; ???; fmt.Print(len(r)) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { s := "кот"; ???; fmt.Print(len(r)) }
```','??? орнына тиісті жолды жазыңыз.

```go
package main

import "fmt"

func main() { s := "кот"; ???; fmt.Print(len(r)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','r := []rune(s)','r := []rune(s)','r := []rune(s)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','r := []int(s)','r := []int(s)','r := []int(s)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000009','mcq','r := rune(s)','r := rune(s)','r := rune(s)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','medium','tomorrow_school_medium','Quest 4','Quest 4','Quest 4','Where is a local variable visible?','Где видна локальная переменная?','Жергілікті айнымалы қай жерде көрінеді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','Throughout the project','Во всём проекте','Бүкіл жобада',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','Within its scope','В своей области видимости','Өзінің көріну аймағында',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000010','mcq','In all packages','Во всех пакетах','Барлық пакеттерде',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','medium','tomorrow_school_medium','Quest 4','Quest 4','Quest 4','What does `func f(a int) (int, error)` mean?','Что означает `func f(a int) (int, error)`?','`func f(a int) (int, error)` нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','Two return values','Два возвращаемых значения','Екі қайтарылатын мән',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','Two arguments','Два аргумента','Екі аргумент',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000011','mcq','A method with no result','Метод без результата','Нәтижесіз әдіс',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','medium','tomorrow_school_medium','Quest 4','Quest 4','Quest 4','Complete the return statement.

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
```','Мәнді қайтару операторын толықтырыңыз.

```go
package main

import "fmt"

func twice(x int) int { ??? }
func main()           { fmt.Print(twice(3)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','return x * 2','return x * 2','return x * 2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','print x * 2','print x * 2','print x * 2',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000012','mcq','x * 2','x * 2','x * 2',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','medium','tomorrow_school_medium','Quest 5','Quest 5','Quest 5','What does append do?','Что делает append?','append не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','Adds elements to a slice','Добавляет элементы к срезу','Срезге элементтер қосады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','Deletes a variable','Удаляет переменную','Айнымалыны жояды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000013','mcq','Sorts an array','Сортирует массив','Массивті сұрыптайды',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','medium','tomorrow_school_medium','Quest 5','Quest 5','Quest 5','How does `[3]int` differ from `[]int`?','Чем `[3]int` отличается от `[]int`?','`[3]int` пен `[]int` арасындағы айырмашылық қандай?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','The first is a fixed-length array','Первое — массив фиксированной длины','Біріншісі — ұзындығы тұрақты массив',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','There is no difference','Ничем','Еш айырмашылығы жоқ',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000014','mcq','The first is a string','Первое — строка','Біріншісі — жол',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','medium','tomorrow_school_medium','Quest 5','Quest 5','Quest 5','Fill in the line replacing ???.

```go
package main

import "fmt"

func main() { a := []int{1, 2}; ???; fmt.Print(len(a)) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { a := []int{1, 2}; ???; fmt.Print(len(a)) }
```','??? орнына тиісті жолды жазыңыз.

```go
package main

import "fmt"

func main() { a := []int{1, 2}; ???; fmt.Print(len(a)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','a = append(a,3)','a = append(a,3)','a = append(a,3)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','append(a,3)','append(a,3)','append(a,3)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000015','mcq','a += 3','a += 3','a += 3',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','medium','tomorrow_school_medium','Quest 6','Quest 6','Quest 6','How do you access the Name field of struct p?','Как обратиться к полю структуры p.Name?','p құрылымының Name өрісіне қалай жүгінуге болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','p.Name','p.Name','p.Name',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','p->Name','p->Name','p->Name',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000016','mcq','p::Name','p::Name','p::Name',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','medium','tomorrow_school_medium','Quest 6','Quest 6','Quest 6','What does `*p` mean when p is a pointer?','Что означает `*p` для указателя p?','p көрсеткіш болса, `*p` нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','Dereferencing','Разыменование','Көрсеткіш арқылы мәнге қол жеткізу',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','Creating a package','Создание пакета','Пакет құру',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000017','mcq','Addition','Сложение','Қосу',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','medium','tomorrow_school_medium','Quest 6','Quest 6','Quest 6','Fill in the line replacing ???.

```go
package main

import "fmt"

func main() { x := 5; ???; fmt.Print(*p) }
```','Допиши строку вместо ???.

```go
package main

import "fmt"

func main() { x := 5; ???; fmt.Print(*p) }
```','??? орнына тиісті жолды жазыңыз.

```go
package main

import "fmt"

func main() { x := 5; ???; fmt.Print(*p) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','p := &x','p := &x','p := &x',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','p := *x','p := *x','p := *x',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000018','mcq','p := x','p := x','p := x',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','medium','tomorrow_school_medium','Quest 7','Quest 7','Quest 7','What does `f(0)` return if `if n==0 {return 1}`?','Что вернёт `f(0)`, если `if n==0 {return 1}`?','Егер `if n==0 {return 1}` болса, `f(0)` нені қайтарады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','0','0','0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','1','1','1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000019','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','medium','tomorrow_school_medium','Quest 7','Quest 7','Quest 7','What does `f(n)=n*f(n-1)` with `f(0)=1` compute?','Что вычисляет `f(n)=n*f(n-1)` при `f(0)=1`?','`f(0)=1` болғанда `f(n)=n*f(n-1)` нені есептейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','Factorial','Факториал','Факториалды',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','Sum of numbers','Сумму чисел','Сандар қосындысын',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000020','mcq','String length','Длину строки','Жол ұзындығын',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000021','mcq','medium','tomorrow_school_medium','Quest 7','Quest 7','Quest 7','Fill in the base case replacing ???.

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
```','??? орнына рекурсияның базалық жағдайын жазыңыз.

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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','medium','tomorrow_school_medium','Quest 8','Quest 8','Quest 8','How do you check that at least one user argument exists?','Как проверить наличие одного пользовательского аргумента?','Пайдаланушының кемінде бір аргументі барын қалай тексеруге болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','len(os.Args) > 1','len(os.Args) > 1','len(os.Args) > 1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','len(os.Args) > 0','len(os.Args) > 0','len(os.Args) > 0',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000022','mcq','os.Args == 1','os.Args == 1','os.Args == 1',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','medium','tomorrow_school_medium','Quest 8','Quest 8','Quest 8','What happens when accessing os.Args[1] if len(os.Args)==1?','Что произойдёт при os.Args[1], если len(os.Args)==1?','Егер len(os.Args)==1 болса, os.Args[1] мәніне жүгінгенде не болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','Panic: index out of range','Паника: индекс вне диапазона','Паника: индекс ауқымнан тыс',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','Empty string','Пустая строка','Бос жол',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000023','mcq','0','0','0',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000024','mcq','medium','tomorrow_school_medium','Quest 8','Quest 8','Quest 8','Fill in the check replacing ???.

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
```','??? орнына тексеруді жазыңыз.

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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','medium','tomorrow_school_medium','Quest 9','Quest 9','Quest 9','What does ascending sort order mean?','Что означает сортировка по возрастанию?','Өсу ретімен сұрыптау нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','Smallest to largest','От меньшего к большему','Кішіден үлкенге қарай',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','Largest to smallest','От большего к меньшему','Үлкеннен кішіге қарай',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000025','mcq','Random order','Случайный порядок','Кездейсоқ рет',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','medium','tomorrow_school_medium','Quest 9','Quest 9','Quest 9','What is the time complexity of one full pass through n elements?','Какова сложность одного полного прохода по n элементам?','n элементті бір рет толық қарап шығудың уақыттық күрделілігі қандай?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','O(n)','O(n)','O(n)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','O(1)','O(1)','O(1)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000026','mcq','O(n²)','O(n²)','O(n²)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000027','mcq','medium','tomorrow_school_medium','Quest 9','Quest 9','Quest 9','Complete the condition for swapping adjacent elements.

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
```','Көршілес элементтердің орнын ауыстыру шартын толықтырыңыз.

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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','medium','tomorrow_school_medium','Quest 10','Quest 10','Quest 10','How do you move to the next node?','Как перейти к следующему узлу?','Келесі түйінге қалай өтуге болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','node = node.Next','node = node.Next','node = node.Next',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','node++','node++','node++',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000028','mcq','node[1]','node[1]','node[1]',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','medium','tomorrow_school_medium','Quest 10','Quest 10','Quest 10','Why check node != nil before reading node.Next?','Почему перед чтением node.Next проверяют node != nil?','node.Next өрісін оқымас бұрын неге node != nil тексеріледі?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','Otherwise a panic may occur','Иначе возможна паника','Әйтпесе паника болуы мүмкін',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','Otherwise the code is slower','Иначе код медленнее','Әйтпесе код баяулайды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000029','mcq','Otherwise the node is deleted','Иначе узел удалится','Әйтпесе түйін жойылады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000030','mcq','medium','tomorrow_school_medium','Quest 10','Quest 10','Quest 10','Complete the line linking the nodes.

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
```','Түйіндерді байланыстыратын жолды толықтырыңыз.

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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','medium','tomorrow_school_medium','Quest 11','Quest 11','Quest 11','What does `x << 1` do for positive x without overflow?','Что делает `x << 1` для положительного x без переполнения?','Оң x саны үшін, толып кету болмаса, `x << 1` не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','Multiplies by 2','Умножает на 2','2-ге көбейтеді',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','Divides by 2','Делит на 2','2-ге бөледі',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000031','mcq','Adds 1','Добавляет 1','1 қосады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','medium','tomorrow_school_medium','Quest 11','Quest 11','Quest 11','What is `5 & 3`?','Чему равно `5 & 3`?','`5 & 3` неге тең?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','1','1','1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','7','7','7',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000032','mcq','2','2','2',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','medium','tomorrow_school_medium','Quest 11','Quest 11','Quest 11','Complete the expression checking the least significant bit.

```go
package main

import "fmt"

func main() { x := 5; fmt.Print(???) }
```','Допиши выражение для проверки младшего бита.

```go
package main

import "fmt"

func main() { x := 5; fmt.Print(???) }
```','Ең кіші разрядты битті тексеретін өрнекті толықтырыңыз.

```go
package main

import "fmt"

func main() { x := 5; fmt.Print(???) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','x&1 == 1','x&1 == 1','x&1 == 1',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','x&&1 == 1','x&&1 == 1','x&&1 == 1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000033','mcq','x&1 = 1','x&1 = 1','x&1 = 1',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','medium','tomorrow_school_medium','Quest 12','Quest 12','Quest 12','How do you check an error after `n, err := strconv.Atoi(s)`?','Как проверить ошибку после вызова `n, err := strconv.Atoi(s)`?','`n, err := strconv.Atoi(s)` шақыруынан кейін қатені қалай тексеруге болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','if err != nil { ... }','if err != nil { ... }','if err != nil { ... }',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','if n == nil { ... }','if n == nil { ... }','if n == nil { ... }',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000034','mcq','if err == true { ... }','if err == true { ... }','if err == true { ... }',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','medium','tomorrow_school_medium','Quest 12','Quest 12','Quest 12','Why is `defer` useful when closing a file?','Почему `defer` удобен при закрытии файла?','Файлды жабу кезінде `defer` неге ыңғайлы?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','The deferred call runs when the function returns','Отложенный вызов выполнится при выходе из функции','Кейінге қалдырылған шақыру функция аяқталғанда орындалады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','It runs before the file opens','Он выполняется до открытия','Ол файл ашылмай тұрып орындалады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0001-0000-4000-8000-000000000035','mcq','It suppresses errors','Он подавляет ошибки','Ол қателерді басады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0001-0000-4000-8000-000000000036','mcq','medium','tomorrow_school_medium','Quest 12','Quest 12','Quest 12','Complete the error handling replacing ???.

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
```','??? орнына қате өңдеуді жазыңыз.

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