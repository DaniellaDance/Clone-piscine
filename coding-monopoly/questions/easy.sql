BEGIN;
DELETE FROM problems WHERE topic='tomorrow_school_easy';
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','easy','tomorrow_school_easy','Quest 1','Quest 1','Quest 1','What does the `pwd` command display?','Что показывает команда `pwd`?','`pwd` командасы нені көрсетеді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','Current directory','Текущую папку','Ағымдағы қалтаны',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','List of files','Список файлов','Файлдар тізімін',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000001','mcq','Go version','Версию Go','Go нұсқасын',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','easy','tomorrow_school_easy','Quest 1','Quest 1','Quest 1','How do you declare a variable with inferred type?','Как объявить переменную с выводом типа?','Типі автоматты анықталатын айнымалы қалай жарияланады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','x := 5','x := 5','x := 5',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','x == 5','x == 5','x == 5',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000002','mcq','let x = 5','let x = 5','let x = 5',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','easy','tomorrow_school_easy','Quest 1','Quest 1','Quest 1','What does this code print?

```go
package main

import "fmt"

func main() { x := 2; fmt.Print(x + 3) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { x := 2; fmt.Print(x + 3) }
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func main() { x := 2; fmt.Print(x + 3) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','5','5','5',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','23','23','23',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000003','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','easy','tomorrow_school_easy','Quest 2','Quest 2','Quest 2','What is the type of `true`?','Какой тип имеет `true`?','`true` мәнінің типі қандай?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','string','string','string',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','bool','bool','bool',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000004','mcq','int','int','int',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','easy','tomorrow_school_easy','Quest 2','Quest 2','Quest 2','How do you write a conditional statement?','Как записывают условие?','Шартты оператор қалай жазылады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','if x > 0 { }','if x > 0 { }','if x > 0 { }',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','if (x > 0) then','if (x > 0) then','if (x > 0) then',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000005','mcq','when x > 0','when x > 0','when x > 0',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000006','mcq','easy','tomorrow_school_easy','Quest 2','Quest 2','Quest 2','What does this code print?

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
```','Бұл код экранға не шығарады?

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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','easy','tomorrow_school_easy','Quest 3','Quest 3','Quest 3','What does the `rune` type represent?','Что обозначает тип `rune`?','`rune` типі нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','A Unicode code point','Кодовую точку Unicode','Unicode кодтық нүктесін',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','An array of bytes','Массив байтов','Байттар массивін',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000007','mcq','A file','Файл','Файлды',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','easy','tomorrow_school_easy','Quest 3','Quest 3','Quest 3','How do you get the byte length of a string?','Как получить длину строки в байтах?','Жолдың байтпен өлшенетін ұзындығын қалай табуға болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','len(s)','len(s)','len(s)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','size(s)','size(s)','size(s)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000008','mcq','count(s)','count(s)','count(s)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','easy','tomorrow_school_easy','Quest 3','Quest 3','Quest 3','What does this code print?

```go
package main

import "fmt"

func main() { s := "Go"; fmt.Print(len(s)) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { s := "Go"; fmt.Print(len(s)) }
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func main() { s := "Go"; fmt.Print(len(s)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','2','2','2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','1','1','1',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000009','mcq','3','3','3',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','easy','tomorrow_school_easy','Quest 4','Quest 4','Quest 4','Which keyword starts a function declaration?','Как начинается объявление функции?','Функцияны жариялау қай түйінді сөзден басталады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','func','func','func',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','function','function','function',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000010','mcq','def','def','def',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','easy','tomorrow_school_easy','Quest 4','Quest 4','Quest 4','How do you return a value from a function?','Как вернуть значение из функции?','Функциядан мәнді қалай қайтаруға болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','return x','return x','return x',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','yield x','yield x','yield x',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000011','mcq','send x','send x','send x',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','easy','tomorrow_school_easy','Quest 4','Quest 4','Quest 4','What does this code print?

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
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func add(a, b int) int { return a + b }
func main()            { fmt.Print(add(2, 4)) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','6','6','6',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','24','24','24',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000012','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','easy','tomorrow_school_easy','Quest 5','Quest 5','Quest 5','How do you write a slice of integers?','Как записать срез целых чисел?','Бүтін сандар срезі қалай жазылады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','[]int{1,2}','[]int{1,2}','[]int{1,2}',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','int[]{1,2}','int[]{1,2}','int[]{1,2}',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000013','mcq','[int]1,2','[int]1,2','[int]1,2',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','easy','tomorrow_school_easy','Quest 5','Quest 5','Quest 5','How do you get the number of elements in a slice?','Как получить количество элементов среза?','Срез элементтерінің санын қалай табуға болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','len(a)','len(a)','len(a)',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','caponly(a)','caponly(a)','caponly(a)',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000014','mcq','size(a)','size(a)','size(a)',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','easy','tomorrow_school_easy','Quest 5','Quest 5','Quest 5','What does this code print?

```go
package main

import "fmt"

func main() { a := []int{3, 4}; fmt.Print(a[1]) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 4}; fmt.Print(a[1]) }
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func main() { a := []int{3, 4}; fmt.Print(a[1]) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','3','3','3',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','4','4','4',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000015','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','easy','tomorrow_school_easy','Quest 6','Quest 6','Quest 6','What does a pointer store?','Что хранит указатель?','Көрсеткіш нені сақтайды?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','The address of a value','Адрес значения','Мәннің жадтағы мекенжайын',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','A file name','Имя файла','Файл атауын',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000016','mcq','Only a string','Только строку','Тек жолды',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','easy','tomorrow_school_easy','Quest 6','Quest 6','Quest 6','How do you get the address of variable x?','Как получить адрес переменной x?','x айнымалысының мекенжайын қалай алуға болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','&x','&x','&x',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','*x','*x','*x',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000017','mcq','@x','@x','@x',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','easy','tomorrow_school_easy','Quest 6','Quest 6','Quest 6','What does this code print?

```go
package main

import "fmt"

func main() { x := 8; p := &x; fmt.Print(*p) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { x := 8; p := &x; fmt.Print(*p) }
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func main() { x := 8; p := &x; fmt.Print(*p) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','8','8','8',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','An address','Адрес','Мекенжай',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000018','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','easy','tomorrow_school_easy','Quest 7','Quest 7','Quest 7','What is recursion?','Что такое рекурсия?','Рекурсия дегеніміз не?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','A function calling itself','Вызов функцией самой себя','Функцияның өзін-өзі шақыруы',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','Any loop','Любой цикл','Кез келген цикл',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000019','mcq','Importing a package','Импорт пакета','Пакетті импорттау',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','easy','tomorrow_school_easy','Quest 7','Quest 7','Quest 7','Why is a base case needed?','Зачем нужен базовый случай?','Базалық жағдай не үшін қажет?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','To stop recursive calls','Чтобы остановить вызовы','Рекурсивті шақыруларды тоқтату үшін',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','To create an array','Чтобы создать массив','Массив құру үшін',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000020','mcq','To import fmt','Чтобы импортировать fmt','fmt импорттау үшін',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000021','mcq','easy','tomorrow_school_easy','Quest 7','Quest 7','Quest 7','What does this code print?

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
```','Бұл код экранға не шығарады?

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
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','easy','tomorrow_school_easy','Quest 8','Quest 8','Quest 8','Where are command-line arguments stored?','Где находятся аргументы запуска?','Командалық жол аргументтері қайда сақталады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','os.Args','os.Args','os.Args',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','fmt.Args','fmt.Args','fmt.Args',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000022','mcq','go.Args','go.Args','go.Args',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','easy','tomorrow_school_easy','Quest 8','Quest 8','Quest 8','What does os.Args[0] usually contain?','Что обычно хранится в os.Args[0]?','os.Args[0] әдетте нені қамтиды?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','The program name or path','Имя или путь программы','Бағдарламаның атауын немесе жолын',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','The first user argument','Первый пользовательский аргумент','Пайдаланушының бірінші аргументін',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000023','mcq','The argument count','Количество аргументов','Аргументтер санын',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000024','mcq','easy','tomorrow_school_easy','Quest 8','Quest 8','Quest 8','What does this code print when run without arguments?

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
```','Аргументсіз іске қосқанда бұл код не шығарады?

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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000024','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','easy','tomorrow_school_easy','Quest 9','Quest 9','Quest 9','What does `break` do in a loop?','Что делает `break` в цикле?','Циклдегі `break` не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','Exits the nearest loop','Завершает ближайший цикл','Ең жақын циклден шығады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','Skips one iteration','Пропускает одну итерацию','Бір итерацияны өткізіп жібереді',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000025','mcq','Returns a value','Возвращает значение','Мән қайтарады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','easy','tomorrow_school_easy','Quest 9','Quest 9','Quest 9','What does `continue` do?','Что делает `continue`?','`continue` не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','Moves to the next iteration','Переходит к следующей итерации','Келесі итерацияға өтеді',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','Terminates the program','Завершает программу','Бағдарламаны аяқтайды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000026','mcq','Deletes an element','Удаляет элемент','Элементті жояды',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','easy','tomorrow_school_easy','Quest 9','Quest 9','Quest 9','What does this code print?

```go
package main

import "fmt"

func main() { a := []int{3, 1, 2}; fmt.Print(a[0] < a[1]) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { a := []int{3, 1, 2}; fmt.Print(a[0] < a[1]) }
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func main() { a := []int{3, 1, 2}; fmt.Print(a[0] < a[1]) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','true','true','true',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','false','false','false',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000027','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','easy','tomorrow_school_easy','Quest 10','Quest 10','Quest 10','What does a singly linked list node usually contain?','Что обычно содержит узел односвязного списка?','Бір бағытты байланысқан тізім түйінінде әдетте не болады?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','Data and a pointer to the next node','Данные и указатель на следующий узел','Деректер және келесі түйінге көрсеткіш',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','Only an index','Только индекс','Тек индекс',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000028','mcq','Only a length','Только длину','Тек ұзындық',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','easy','tomorrow_school_easy','Quest 10','Quest 10','Quest 10','What does nil in the Next field mean?','Что означает nil в поле Next?','Next өрісіндегі nil нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','There is no next node','Следующего узла нет','Келесі түйін жоқ',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','The start of an array','Начало массива','Массивтің басы',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000029','mcq','A compilation error','Ошибка компиляции','Компиляция қатесі',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000030','mcq','easy','tomorrow_school_easy','Quest 10','Quest 10','Quest 10','What does this code print?

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
```','Бұл код экранға не шығарады?

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
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000030','mcq','Error','Ошибка','Қате',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','easy','tomorrow_school_easy','Quest 11','Quest 11','Quest 11','How many bits are in a byte?','Сколько бит в байте?','Бір байтта қанша бит бар?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','8','8','8',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','10','10','10',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000031','mcq','16','16','16',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','easy','tomorrow_school_easy','Quest 11','Quest 11','Quest 11','What does `&` mean for integers?','Что означает `&` для целых чисел?','Бүтін сандар үшін `&` нені білдіреді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','Bitwise AND','Побитовое И','Биттік ЖӘНЕ',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','Logical OR','Логическое ИЛИ','Логикалық НЕМЕСЕ',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000032','mcq','Division','Деление','Бөлу',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','easy','tomorrow_school_easy','Quest 11','Quest 11','Quest 11','What does this code print?

```go
package main

import "fmt"

func main() { fmt.Print(6 & 3) }
```','Что выведет код?

```go
package main

import "fmt"

func main() { fmt.Print(6 & 3) }
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func main() { fmt.Print(6 & 3) }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','2','2','2',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','7','7','7',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000033','mcq','3','3','3',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','easy','tomorrow_school_easy','Quest 12','Quest 12','Quest 12','What does `go test ./...` do?','Что делает `go test ./...`?','`go test ./...` не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','Runs tests for all packages under the current module','Запускает тесты всех пакетов ниже текущего модуля','Ағымдағы модульдегі барлық пакеттердің тесттерін іске қосады',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','Deletes tests','Удаляет тесты','Тесттерді жояды',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000034','mcq','Only compiles main.go','Только компилирует main.go','Тек main.go файлын компиляциялайды',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','easy','tomorrow_school_easy','Quest 12','Quest 12','Quest 12','What does `gofmt -w main.go` do?','Что делает `gofmt -w main.go`?','`gofmt -w main.go` не істейді?',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','Formats and writes the file','Форматирует и записывает файл','Файлды пішімдеп, өзгерістерді сақтайды',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','Runs the program','Запускает программу','Бағдарламаны іске қосады',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000035','mcq','Creates a module','Создаёт модуль','Модуль құрады',false);
INSERT INTO problems (id,type,difficulty,topic,title_en,title_ru,title_kz,prompt_en,prompt_ru,prompt_kz,is_published) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','easy','tomorrow_school_easy','Quest 12','Quest 12','Quest 12','What does this code print?

```go
package main

import "fmt"

func main() { defer fmt.Print("B"); fmt.Print("A") }
```','Что выведет код?

```go
package main

import "fmt"

func main() { defer fmt.Print("B"); fmt.Print("A") }
```','Бұл код экранға не шығарады?

```go
package main

import "fmt"

func main() { defer fmt.Print("B"); fmt.Print("A") }
```',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','AB','AB','AB',true);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','BA','BA','BA',false);
INSERT INTO problem_options (problem_id,problem_type,text_en,text_ru,text_kz,is_correct) VALUES ('daae0000-0000-4000-8000-000000000036','mcq','Error','Ошибка','Қате',false);
COMMIT;