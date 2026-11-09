/* 100 Exam tasks: precise output questions and inline code-completion exercises. */
export const EXAM_BANK=[
  {
    "id": "exam-2-1",
    "lvl": "exam",
    "quest": 2,
    "stage": 1,
    "kind": "choice",
    "q": "Что выведет программа, если 23 меньше 27?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 23, 27\n if a < b { fmt.Println(\"меньше\") } else { fmt.Println(\"больше\") }\n}",
    "opts": [
      "меньше",
      "больше",
      "ничего"
    ],
    "a": 0,
    "explanation": "Программа выводит меньше.",
    "term": "Go"
  },
  {
    "id": "exam-2-2",
    "lvl": "exam",
    "quest": 2,
    "stage": 2,
    "kind": "choice",
    "q": "Какое значение выведет программа после умножения 24 на 2?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 24\n x *= 2\n fmt.Println(x)\n}",
    "opts": [
      "26",
      "24",
      "48"
    ],
    "a": 2,
    "explanation": "Программа выводит 48.",
    "term": "Go"
  },
  {
    "id": "exam-2-3",
    "lvl": "exam",
    "quest": 2,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после прибавления 1 к 25. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 25\n x++\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 26.",
    "term": "Go",
    "expected": "x"
  },
  {
    "id": "exam-2-4",
    "lvl": "exam",
    "quest": 2,
    "stage": 4,
    "kind": "choice",
    "q": "Какой остаток от деления 79 на 3 выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(79 % 3)\n}",
    "opts": [
      "1",
      "0",
      "2"
    ],
    "a": 0,
    "explanation": "Программа выводит 1.",
    "term": "Go"
  },
  {
    "id": "exam-2-5",
    "lvl": "exam",
    "quest": 2,
    "stage": 5,
    "kind": "choice",
    "q": "Что выведет программа при сравнении чисел 27 и 28?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(27 == 28)\n}",
    "opts": [
      "true",
      "1",
      "false"
    ],
    "a": 2,
    "explanation": "Программа выводит false.",
    "term": "Go"
  },
  {
    "id": "exam-2-6",
    "lvl": "exam",
    "quest": 2,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: количество элементов в срезе выведет программа. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{28, 29, 30}\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 3.",
    "term": "Go",
    "expected": "len(nums)"
  },
  {
    "id": "exam-2-7",
    "lvl": "exam",
    "quest": 2,
    "stage": 7,
    "kind": "choice",
    "q": "Какую сумму выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 29\n b := 31\n fmt.Println(a+b)\n}",
    "opts": [
      "60",
      "58",
      "61"
    ],
    "a": 0,
    "explanation": "Программа выводит 60.",
    "term": "Go"
  },
  {
    "id": "exam-2-8",
    "lvl": "exam",
    "quest": 2,
    "stage": 8,
    "kind": "choice",
    "q": "Какое значение вернёт функция double(30)?",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(double(30)) }",
    "opts": [
      "30",
      "32",
      "60"
    ],
    "a": 2,
    "explanation": "Программа выводит 60.",
    "term": "Go"
  },
  {
    "id": "exam-2-9",
    "lvl": "exam",
    "quest": 2,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после вычитания 2 из 36. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 36\n x -= 2\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 34.",
    "term": "Go",
    "expected": "x"
  },
  {
    "id": "exam-2-10",
    "lvl": "exam",
    "quest": 2,
    "stage": 10,
    "kind": "choice",
    "q": "Что выведет программа после увеличения числа 32 на 3?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 32\n n += 3\n fmt.Println(n)\n}",
    "opts": [
      "35",
      "32",
      "34"
    ],
    "a": 0,
    "explanation": "Программа выводит 35.",
    "term": "Go"
  },
  {
    "id": "exam-2-11",
    "lvl": "exam",
    "quest": 2,
    "stage": 11,
    "kind": "choice",
    "q": "Что выведет программа при проверке, является ли число 66 чётным?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 66\n fmt.Println(n%2 == 0)\n}",
    "opts": [
      "false",
      "0",
      "true"
    ],
    "a": 2,
    "explanation": "Программа выводит true.",
    "term": "Go"
  },
  {
    "id": "exam-2-12",
    "lvl": "exam",
    "quest": 2,
    "stage": 12,
    "kind": "choice",
    "q": "Какое число выведет цикл, который выполняется 6 раз?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(count)\n}",
    "opts": [
      "7",
      "6",
      "5"
    ],
    "a": 1,
    "explanation": "Программа выводит 6.",
    "term": "Go"
  },
  {
    "id": "exam-3-1",
    "lvl": "exam",
    "quest": 3,
    "stage": 1,
    "kind": "choice",
    "q": "Какое значение выведет программа после умножения 34 на 2?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 34\n x *= 2\n fmt.Println(x)\n}",
    "opts": [
      "36",
      "34",
      "68"
    ],
    "a": 2,
    "explanation": "Программа выводит 68.",
    "term": "Go"
  },
  {
    "id": "exam-3-2",
    "lvl": "exam",
    "quest": 3,
    "stage": 2,
    "kind": "choice",
    "q": "Что выведет программа после прибавления 1 к 35?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 35\n x++\n fmt.Println(x)\n}",
    "opts": [
      "37",
      "36",
      "35"
    ],
    "a": 1,
    "explanation": "Программа выводит 36.",
    "term": "Go"
  },
  {
    "id": "exam-3-3",
    "lvl": "exam",
    "quest": 3,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Какой остаток от деления 109 на 3 выведет программа. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 1.",
    "term": "Go",
    "expected": "109 % 3"
  },
  {
    "id": "exam-3-4",
    "lvl": "exam",
    "quest": 3,
    "stage": 4,
    "kind": "choice",
    "q": "Что выведет программа при сравнении чисел 37 и 38?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(37 == 38)\n}",
    "opts": [
      "true",
      "1",
      "false"
    ],
    "a": 2,
    "explanation": "Программа выводит false.",
    "term": "Go"
  },
  {
    "id": "exam-3-5",
    "lvl": "exam",
    "quest": 3,
    "stage": 5,
    "kind": "choice",
    "q": "Сколько элементов в срезе выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{38, 39, 40}\n fmt.Println(len(nums))\n}",
    "opts": [
      "4",
      "3",
      "2"
    ],
    "a": 1,
    "explanation": "Программа выводит 3.",
    "term": "Go"
  },
  {
    "id": "exam-3-6",
    "lvl": "exam",
    "quest": 3,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Какую сумму выведет программа. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 39\n b := 41\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 80.",
    "term": "Go",
    "expected": "a+b"
  },
  {
    "id": "exam-3-7",
    "lvl": "exam",
    "quest": 3,
    "stage": 7,
    "kind": "choice",
    "q": "Какое значение вернёт функция double(40)?",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(double(40)) }",
    "opts": [
      "40",
      "42",
      "80"
    ],
    "a": 2,
    "explanation": "Программа выводит 80.",
    "term": "Go"
  },
  {
    "id": "exam-3-8",
    "lvl": "exam",
    "quest": 3,
    "stage": 8,
    "kind": "choice",
    "q": "Что выведет программа после вычитания 2 из 46?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 46\n x -= 2\n fmt.Println(x)\n}",
    "opts": [
      "43",
      "44",
      "46"
    ],
    "a": 1,
    "explanation": "Программа выводит 44.",
    "term": "Go"
  },
  {
    "id": "exam-3-9",
    "lvl": "exam",
    "quest": 3,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после увеличения числа 42 на 3. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 42\n n += 3\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 45.",
    "term": "Go",
    "expected": "n"
  },
  {
    "id": "exam-3-10",
    "lvl": "exam",
    "quest": 3,
    "stage": 10,
    "kind": "choice",
    "q": "Что выведет программа при проверке, является ли число 86 чётным?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 86\n fmt.Println(n%2 == 0)\n}",
    "opts": [
      "false",
      "0",
      "true"
    ],
    "a": 2,
    "explanation": "Программа выводит true.",
    "term": "Go"
  },
  {
    "id": "exam-3-11",
    "lvl": "exam",
    "quest": 3,
    "stage": 11,
    "kind": "choice",
    "q": "Какое число выведет цикл, который выполняется 6 раз?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(count)\n}",
    "opts": [
      "7",
      "6",
      "5"
    ],
    "a": 1,
    "explanation": "Программа выводит 6.",
    "term": "Go"
  },
  {
    "id": "exam-3-12",
    "lvl": "exam",
    "quest": 3,
    "stage": 12,
    "kind": "choice",
    "q": "Что выведет программа, если 45 меньше 49?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 45, 49\n if a < b { fmt.Println(\"меньше\") } else { fmt.Println(\"больше\") }\n}",
    "opts": [
      "меньше",
      "больше",
      "ничего"
    ],
    "a": 0,
    "explanation": "Программа выводит меньше.",
    "term": "Go"
  },
  {
    "id": "exam-4-1",
    "lvl": "exam",
    "quest": 4,
    "stage": 1,
    "kind": "choice",
    "q": "Что выведет программа после прибавления 1 к 45?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 45\n x++\n fmt.Println(x)\n}",
    "opts": [
      "47",
      "46",
      "45"
    ],
    "a": 1,
    "explanation": "Программа выводит 46.",
    "term": "Go"
  },
  {
    "id": "exam-4-2",
    "lvl": "exam",
    "quest": 4,
    "stage": 2,
    "kind": "choice",
    "q": "Какой остаток от деления 139 на 3 выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(139 % 3)\n}",
    "opts": [
      "1",
      "0",
      "2"
    ],
    "a": 0,
    "explanation": "Программа выводит 1.",
    "term": "Go"
  },
  {
    "id": "exam-4-3",
    "lvl": "exam",
    "quest": 4,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: при сравнении чисел 47 и 48. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(???)\n}",
    "explanation": "Программа выводит false.",
    "term": "Go",
    "expected": "47 == 48"
  },
  {
    "id": "exam-4-4",
    "lvl": "exam",
    "quest": 4,
    "stage": 4,
    "kind": "choice",
    "q": "Сколько элементов в срезе выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{48, 49, 50}\n fmt.Println(len(nums))\n}",
    "opts": [
      "4",
      "3",
      "2"
    ],
    "a": 1,
    "explanation": "Программа выводит 3.",
    "term": "Go"
  },
  {
    "id": "exam-4-5",
    "lvl": "exam",
    "quest": 4,
    "stage": 5,
    "kind": "choice",
    "q": "Какую сумму выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 49\n b := 51\n fmt.Println(a+b)\n}",
    "opts": [
      "100",
      "98",
      "101"
    ],
    "a": 0,
    "explanation": "Программа выводит 100.",
    "term": "Go"
  },
  {
    "id": "exam-4-6",
    "lvl": "exam",
    "quest": 4,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: значение вернёт функция double(50). Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(???) }",
    "explanation": "Программа выводит 100.",
    "term": "Go",
    "expected": "double(50)"
  },
  {
    "id": "exam-4-7",
    "lvl": "exam",
    "quest": 4,
    "stage": 7,
    "kind": "choice",
    "q": "Что выведет программа после вычитания 2 из 56?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 56\n x -= 2\n fmt.Println(x)\n}",
    "opts": [
      "53",
      "54",
      "56"
    ],
    "a": 1,
    "explanation": "Программа выводит 54.",
    "term": "Go"
  },
  {
    "id": "exam-4-8",
    "lvl": "exam",
    "quest": 4,
    "stage": 8,
    "kind": "choice",
    "q": "Что выведет программа после увеличения числа 52 на 3?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 52\n n += 3\n fmt.Println(n)\n}",
    "opts": [
      "55",
      "52",
      "54"
    ],
    "a": 0,
    "explanation": "Программа выводит 55.",
    "term": "Go"
  },
  {
    "id": "exam-4-9",
    "lvl": "exam",
    "quest": 4,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: при проверке, является ли число 106 чётным. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 106\n fmt.Println(???)\n}",
    "explanation": "Программа выводит true.",
    "term": "Go",
    "expected": "n%2 == 0"
  },
  {
    "id": "exam-4-10",
    "lvl": "exam",
    "quest": 4,
    "stage": 10,
    "kind": "choice",
    "q": "Какое число выведет цикл, который выполняется 6 раз?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(count)\n}",
    "opts": [
      "7",
      "6",
      "5"
    ],
    "a": 1,
    "explanation": "Программа выводит 6.",
    "term": "Go"
  },
  {
    "id": "exam-4-11",
    "lvl": "exam",
    "quest": 4,
    "stage": 11,
    "kind": "choice",
    "q": "Что выведет программа, если 55 меньше 59?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 55, 59\n if a < b { fmt.Println(\"меньше\") } else { fmt.Println(\"больше\") }\n}",
    "opts": [
      "меньше",
      "больше",
      "ничего"
    ],
    "a": 0,
    "explanation": "Программа выводит меньше.",
    "term": "Go"
  },
  {
    "id": "exam-4-12",
    "lvl": "exam",
    "quest": 4,
    "stage": 12,
    "kind": "choice",
    "q": "Какое значение выведет программа после умножения 56 на 2?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 56\n x *= 2\n fmt.Println(x)\n}",
    "opts": [
      "58",
      "56",
      "112"
    ],
    "a": 2,
    "explanation": "Программа выводит 112.",
    "term": "Go"
  },
  {
    "id": "exam-5-1",
    "lvl": "exam",
    "quest": 5,
    "stage": 1,
    "kind": "choice",
    "q": "Какой остаток от деления 169 на 3 выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(169 % 3)\n}",
    "opts": [
      "1",
      "0",
      "2"
    ],
    "a": 0,
    "explanation": "Программа выводит 1.",
    "term": "Go"
  },
  {
    "id": "exam-5-2",
    "lvl": "exam",
    "quest": 5,
    "stage": 2,
    "kind": "choice",
    "q": "Что выведет программа при сравнении чисел 57 и 58?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(57 == 58)\n}",
    "opts": [
      "true",
      "1",
      "false"
    ],
    "a": 2,
    "explanation": "Программа выводит false.",
    "term": "Go"
  },
  {
    "id": "exam-5-3",
    "lvl": "exam",
    "quest": 5,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: количество элементов в срезе выведет программа. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{58, 59, 60}\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 3.",
    "term": "Go",
    "expected": "len(nums)"
  },
  {
    "id": "exam-5-4",
    "lvl": "exam",
    "quest": 5,
    "stage": 4,
    "kind": "choice",
    "q": "Какую сумму выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 59\n b := 61\n fmt.Println(a+b)\n}",
    "opts": [
      "120",
      "118",
      "121"
    ],
    "a": 0,
    "explanation": "Программа выводит 120.",
    "term": "Go"
  },
  {
    "id": "exam-5-5",
    "lvl": "exam",
    "quest": 5,
    "stage": 5,
    "kind": "choice",
    "q": "Какое значение вернёт функция double(60)?",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(double(60)) }",
    "opts": [
      "60",
      "62",
      "120"
    ],
    "a": 2,
    "explanation": "Программа выводит 120.",
    "term": "Go"
  },
  {
    "id": "exam-5-6",
    "lvl": "exam",
    "quest": 5,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после вычитания 2 из 66. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 66\n x -= 2\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 64.",
    "term": "Go",
    "expected": "x"
  },
  {
    "id": "exam-5-7",
    "lvl": "exam",
    "quest": 5,
    "stage": 7,
    "kind": "choice",
    "q": "Что выведет программа после увеличения числа 62 на 3?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 62\n n += 3\n fmt.Println(n)\n}",
    "opts": [
      "65",
      "62",
      "64"
    ],
    "a": 0,
    "explanation": "Программа выводит 65.",
    "term": "Go"
  },
  {
    "id": "exam-5-8",
    "lvl": "exam",
    "quest": 5,
    "stage": 8,
    "kind": "choice",
    "q": "Что выведет программа при проверке, является ли число 126 чётным?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 126\n fmt.Println(n%2 == 0)\n}",
    "opts": [
      "false",
      "0",
      "true"
    ],
    "a": 2,
    "explanation": "Программа выводит true.",
    "term": "Go"
  },
  {
    "id": "exam-5-9",
    "lvl": "exam",
    "quest": 5,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Какое число выведет цикл, который выполняется 6 раз. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 6.",
    "term": "Go",
    "expected": "count"
  },
  {
    "id": "exam-5-10",
    "lvl": "exam",
    "quest": 5,
    "stage": 10,
    "kind": "choice",
    "q": "Что выведет программа, если 65 меньше 69?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 65, 69\n if a < b { fmt.Println(\"меньше\") } else { fmt.Println(\"больше\") }\n}",
    "opts": [
      "меньше",
      "больше",
      "ничего"
    ],
    "a": 0,
    "explanation": "Программа выводит меньше.",
    "term": "Go"
  },
  {
    "id": "exam-5-11",
    "lvl": "exam",
    "quest": 5,
    "stage": 11,
    "kind": "choice",
    "q": "Какое значение выведет программа после умножения 66 на 2?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 66\n x *= 2\n fmt.Println(x)\n}",
    "opts": [
      "68",
      "66",
      "132"
    ],
    "a": 2,
    "explanation": "Программа выводит 132.",
    "term": "Go"
  },
  {
    "id": "exam-5-12",
    "lvl": "exam",
    "quest": 5,
    "stage": 12,
    "kind": "choice",
    "q": "Что выведет программа после прибавления 1 к 67?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 67\n x++\n fmt.Println(x)\n}",
    "opts": [
      "69",
      "68",
      "67"
    ],
    "a": 1,
    "explanation": "Программа выводит 68.",
    "term": "Go"
  },
  {
    "id": "exam-6-1",
    "lvl": "exam",
    "quest": 6,
    "stage": 1,
    "kind": "choice",
    "q": "Что выведет программа при сравнении чисел 67 и 68?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(67 == 68)\n}",
    "opts": [
      "true",
      "1",
      "false"
    ],
    "a": 2,
    "explanation": "Программа выводит false.",
    "term": "Go"
  },
  {
    "id": "exam-6-2",
    "lvl": "exam",
    "quest": 6,
    "stage": 2,
    "kind": "choice",
    "q": "Сколько элементов в срезе выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{68, 69, 70}\n fmt.Println(len(nums))\n}",
    "opts": [
      "4",
      "3",
      "2"
    ],
    "a": 1,
    "explanation": "Программа выводит 3.",
    "term": "Go"
  },
  {
    "id": "exam-6-3",
    "lvl": "exam",
    "quest": 6,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Какую сумму выведет программа. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 69\n b := 71\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 140.",
    "term": "Go",
    "expected": "a+b"
  },
  {
    "id": "exam-6-4",
    "lvl": "exam",
    "quest": 6,
    "stage": 4,
    "kind": "choice",
    "q": "Какое значение вернёт функция double(70)?",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(double(70)) }",
    "opts": [
      "70",
      "72",
      "140"
    ],
    "a": 2,
    "explanation": "Программа выводит 140.",
    "term": "Go"
  },
  {
    "id": "exam-6-5",
    "lvl": "exam",
    "quest": 6,
    "stage": 5,
    "kind": "choice",
    "q": "Что выведет программа после вычитания 2 из 76?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 76\n x -= 2\n fmt.Println(x)\n}",
    "opts": [
      "73",
      "74",
      "76"
    ],
    "a": 1,
    "explanation": "Программа выводит 74.",
    "term": "Go"
  },
  {
    "id": "exam-6-6",
    "lvl": "exam",
    "quest": 6,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после увеличения числа 72 на 3. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 72\n n += 3\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 75.",
    "term": "Go",
    "expected": "n"
  },
  {
    "id": "exam-6-7",
    "lvl": "exam",
    "quest": 6,
    "stage": 7,
    "kind": "choice",
    "q": "Что выведет программа при проверке, является ли число 146 чётным?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 146\n fmt.Println(n%2 == 0)\n}",
    "opts": [
      "false",
      "0",
      "true"
    ],
    "a": 2,
    "explanation": "Программа выводит true.",
    "term": "Go"
  },
  {
    "id": "exam-6-8",
    "lvl": "exam",
    "quest": 6,
    "stage": 8,
    "kind": "choice",
    "q": "Какое число выведет цикл, который выполняется 6 раз?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(count)\n}",
    "opts": [
      "7",
      "6",
      "5"
    ],
    "a": 1,
    "explanation": "Программа выводит 6.",
    "term": "Go"
  },
  {
    "id": "exam-6-9",
    "lvl": "exam",
    "quest": 6,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Что выведет программа, если 75 меньше 79. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 75, 79\n if a < b { fmt.Println(???) }\n}",
    "explanation": "Программа выводит меньше.",
    "term": "Go",
    "expected": "\"меньше\") } else { fmt.Println(\"больше\""
  },
  {
    "id": "exam-6-10",
    "lvl": "exam",
    "quest": 6,
    "stage": 10,
    "kind": "choice",
    "q": "Какое значение выведет программа после умножения 76 на 2?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 76\n x *= 2\n fmt.Println(x)\n}",
    "opts": [
      "78",
      "76",
      "152"
    ],
    "a": 2,
    "explanation": "Программа выводит 152.",
    "term": "Go"
  },
  {
    "id": "exam-6-11",
    "lvl": "exam",
    "quest": 6,
    "stage": 11,
    "kind": "choice",
    "q": "Что выведет программа после прибавления 1 к 77?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 77\n x++\n fmt.Println(x)\n}",
    "opts": [
      "79",
      "78",
      "77"
    ],
    "a": 1,
    "explanation": "Программа выводит 78.",
    "term": "Go"
  },
  {
    "id": "exam-6-12",
    "lvl": "exam",
    "quest": 6,
    "stage": 12,
    "kind": "choice",
    "q": "Какой остаток от деления 235 на 3 выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(235 % 3)\n}",
    "opts": [
      "1",
      "0",
      "2"
    ],
    "a": 0,
    "explanation": "Программа выводит 1.",
    "term": "Go"
  },
  {
    "id": "exam-7-1",
    "lvl": "exam",
    "quest": 7,
    "stage": 1,
    "kind": "choice",
    "q": "Сколько элементов в срезе выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{78, 79, 80}\n fmt.Println(len(nums))\n}",
    "opts": [
      "4",
      "3",
      "2"
    ],
    "a": 1,
    "explanation": "Программа выводит 3.",
    "term": "Go"
  },
  {
    "id": "exam-7-2",
    "lvl": "exam",
    "quest": 7,
    "stage": 2,
    "kind": "choice",
    "q": "Какую сумму выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 79\n b := 81\n fmt.Println(a+b)\n}",
    "opts": [
      "160",
      "158",
      "161"
    ],
    "a": 0,
    "explanation": "Программа выводит 160.",
    "term": "Go"
  },
  {
    "id": "exam-7-3",
    "lvl": "exam",
    "quest": 7,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: значение вернёт функция double(80). Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(???) }",
    "explanation": "Программа выводит 160.",
    "term": "Go",
    "expected": "double(80)"
  },
  {
    "id": "exam-7-4",
    "lvl": "exam",
    "quest": 7,
    "stage": 4,
    "kind": "choice",
    "q": "Что выведет программа после вычитания 2 из 86?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 86\n x -= 2\n fmt.Println(x)\n}",
    "opts": [
      "83",
      "84",
      "86"
    ],
    "a": 1,
    "explanation": "Программа выводит 84.",
    "term": "Go"
  },
  {
    "id": "exam-7-5",
    "lvl": "exam",
    "quest": 7,
    "stage": 5,
    "kind": "choice",
    "q": "Что выведет программа после увеличения числа 82 на 3?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 82\n n += 3\n fmt.Println(n)\n}",
    "opts": [
      "85",
      "82",
      "84"
    ],
    "a": 0,
    "explanation": "Программа выводит 85.",
    "term": "Go"
  },
  {
    "id": "exam-7-6",
    "lvl": "exam",
    "quest": 7,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: при проверке, является ли число 166 чётным. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 166\n fmt.Println(???)\n}",
    "explanation": "Программа выводит true.",
    "term": "Go",
    "expected": "n%2 == 0"
  },
  {
    "id": "exam-7-7",
    "lvl": "exam",
    "quest": 7,
    "stage": 7,
    "kind": "choice",
    "q": "Какое число выведет цикл, который выполняется 6 раз?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(count)\n}",
    "opts": [
      "7",
      "6",
      "5"
    ],
    "a": 1,
    "explanation": "Программа выводит 6.",
    "term": "Go"
  },
  {
    "id": "exam-7-8",
    "lvl": "exam",
    "quest": 7,
    "stage": 8,
    "kind": "choice",
    "q": "Что выведет программа, если 85 меньше 89?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 85, 89\n if a < b { fmt.Println(\"меньше\") } else { fmt.Println(\"больше\") }\n}",
    "opts": [
      "меньше",
      "больше",
      "ничего"
    ],
    "a": 0,
    "explanation": "Программа выводит меньше.",
    "term": "Go"
  },
  {
    "id": "exam-7-9",
    "lvl": "exam",
    "quest": 7,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: значение выведет программа после умножения 86 на 2. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 86\n x *= 2\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 172.",
    "term": "Go",
    "expected": "x"
  },
  {
    "id": "exam-7-10",
    "lvl": "exam",
    "quest": 7,
    "stage": 10,
    "kind": "choice",
    "q": "Что выведет программа после прибавления 1 к 87?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 87\n x++\n fmt.Println(x)\n}",
    "opts": [
      "89",
      "88",
      "87"
    ],
    "a": 1,
    "explanation": "Программа выводит 88.",
    "term": "Go"
  },
  {
    "id": "exam-7-11",
    "lvl": "exam",
    "quest": 7,
    "stage": 11,
    "kind": "choice",
    "q": "Какой остаток от деления 265 на 3 выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(265 % 3)\n}",
    "opts": [
      "1",
      "0",
      "2"
    ],
    "a": 0,
    "explanation": "Программа выводит 1.",
    "term": "Go"
  },
  {
    "id": "exam-7-12",
    "lvl": "exam",
    "quest": 7,
    "stage": 12,
    "kind": "choice",
    "q": "Что выведет программа при сравнении чисел 89 и 90?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(89 == 90)\n}",
    "opts": [
      "true",
      "1",
      "false"
    ],
    "a": 2,
    "explanation": "Программа выводит false.",
    "term": "Go"
  },
  {
    "id": "exam-8-1",
    "lvl": "exam",
    "quest": 8,
    "stage": 1,
    "kind": "choice",
    "q": "Какую сумму выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 89\n b := 91\n fmt.Println(a+b)\n}",
    "opts": [
      "180",
      "178",
      "181"
    ],
    "a": 0,
    "explanation": "Программа выводит 180.",
    "term": "Go"
  },
  {
    "id": "exam-8-2",
    "lvl": "exam",
    "quest": 8,
    "stage": 2,
    "kind": "choice",
    "q": "Какое значение вернёт функция double(90)?",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(double(90)) }",
    "opts": [
      "90",
      "92",
      "180"
    ],
    "a": 2,
    "explanation": "Программа выводит 180.",
    "term": "Go"
  },
  {
    "id": "exam-8-3",
    "lvl": "exam",
    "quest": 8,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после вычитания 2 из 96. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 96\n x -= 2\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 94.",
    "term": "Go",
    "expected": "x"
  },
  {
    "id": "exam-8-4",
    "lvl": "exam",
    "quest": 8,
    "stage": 4,
    "kind": "choice",
    "q": "Что выведет программа после увеличения числа 92 на 3?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 92\n n += 3\n fmt.Println(n)\n}",
    "opts": [
      "95",
      "92",
      "94"
    ],
    "a": 0,
    "explanation": "Программа выводит 95.",
    "term": "Go"
  },
  {
    "id": "exam-8-5",
    "lvl": "exam",
    "quest": 8,
    "stage": 5,
    "kind": "choice",
    "q": "Что выведет программа при проверке, является ли число 186 чётным?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 186\n fmt.Println(n%2 == 0)\n}",
    "opts": [
      "false",
      "0",
      "true"
    ],
    "a": 2,
    "explanation": "Программа выводит true.",
    "term": "Go"
  },
  {
    "id": "exam-8-6",
    "lvl": "exam",
    "quest": 8,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Какое число выведет цикл, который выполняется 6 раз. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 6.",
    "term": "Go",
    "expected": "count"
  },
  {
    "id": "exam-8-7",
    "lvl": "exam",
    "quest": 8,
    "stage": 7,
    "kind": "choice",
    "q": "Что выведет программа, если 95 меньше 99?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 95, 99\n if a < b { fmt.Println(\"меньше\") } else { fmt.Println(\"больше\") }\n}",
    "opts": [
      "меньше",
      "больше",
      "ничего"
    ],
    "a": 0,
    "explanation": "Программа выводит меньше.",
    "term": "Go"
  },
  {
    "id": "exam-8-8",
    "lvl": "exam",
    "quest": 8,
    "stage": 8,
    "kind": "choice",
    "q": "Какое значение выведет программа после умножения 96 на 2?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 96\n x *= 2\n fmt.Println(x)\n}",
    "opts": [
      "98",
      "96",
      "192"
    ],
    "a": 2,
    "explanation": "Программа выводит 192.",
    "term": "Go"
  },
  {
    "id": "exam-8-9",
    "lvl": "exam",
    "quest": 8,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после прибавления 1 к 97. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 97\n x++\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 98.",
    "term": "Go",
    "expected": "x"
  },
  {
    "id": "exam-8-10",
    "lvl": "exam",
    "quest": 8,
    "stage": 10,
    "kind": "choice",
    "q": "Какой остаток от деления 295 на 3 выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(295 % 3)\n}",
    "opts": [
      "1",
      "0",
      "2"
    ],
    "a": 0,
    "explanation": "Программа выводит 1.",
    "term": "Go"
  },
  {
    "id": "exam-8-11",
    "lvl": "exam",
    "quest": 8,
    "stage": 11,
    "kind": "choice",
    "q": "Что выведет программа при сравнении чисел 99 и 100?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(99 == 100)\n}",
    "opts": [
      "true",
      "1",
      "false"
    ],
    "a": 2,
    "explanation": "Программа выводит false.",
    "term": "Go"
  },
  {
    "id": "exam-8-12",
    "lvl": "exam",
    "quest": 8,
    "stage": 12,
    "kind": "choice",
    "q": "Сколько элементов в срезе выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{100, 101, 102}\n fmt.Println(len(nums))\n}",
    "opts": [
      "4",
      "3",
      "2"
    ],
    "a": 1,
    "explanation": "Программа выводит 3.",
    "term": "Go"
  },
  {
    "id": "exam-9-1",
    "lvl": "exam",
    "quest": 9,
    "stage": 1,
    "kind": "choice",
    "q": "Какое значение вернёт функция double(100)?",
    "code": "package main\nimport \"fmt\"\nfunc double(x int) int { return x*2 }\nfunc main() { fmt.Println(double(100)) }",
    "opts": [
      "100",
      "102",
      "200"
    ],
    "a": 2,
    "explanation": "Программа выводит 200.",
    "term": "Go"
  },
  {
    "id": "exam-9-2",
    "lvl": "exam",
    "quest": 9,
    "stage": 2,
    "kind": "choice",
    "q": "Что выведет программа после вычитания 2 из 106?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 106\n x -= 2\n fmt.Println(x)\n}",
    "opts": [
      "103",
      "104",
      "106"
    ],
    "a": 1,
    "explanation": "Программа выводит 104.",
    "term": "Go"
  },
  {
    "id": "exam-9-3",
    "lvl": "exam",
    "quest": 9,
    "stage": 3,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: после увеличения числа 102 на 3. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 102\n n += 3\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 105.",
    "term": "Go",
    "expected": "n"
  },
  {
    "id": "exam-9-4",
    "lvl": "exam",
    "quest": 9,
    "stage": 4,
    "kind": "choice",
    "q": "Что выведет программа при проверке, является ли число 206 чётным?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n n := 206\n fmt.Println(n%2 == 0)\n}",
    "opts": [
      "false",
      "0",
      "true"
    ],
    "a": 2,
    "explanation": "Программа выводит true.",
    "term": "Go"
  },
  {
    "id": "exam-9-5",
    "lvl": "exam",
    "quest": 9,
    "stage": 5,
    "kind": "choice",
    "q": "Какое число выведет цикл, который выполняется 6 раз?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n count := 0\n for i := 0; i < 6; i++ { count++ }\n fmt.Println(count)\n}",
    "opts": [
      "7",
      "6",
      "5"
    ],
    "a": 1,
    "explanation": "Программа выводит 6.",
    "term": "Go"
  },
  {
    "id": "exam-9-6",
    "lvl": "exam",
    "quest": 9,
    "stage": 6,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Что выведет программа, если 105 меньше 109. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a, b := 105, 109\n if a < b { fmt.Println(???) }\n}",
    "explanation": "Программа выводит меньше.",
    "term": "Go",
    "expected": "\"меньше\") } else { fmt.Println(\"больше\""
  },
  {
    "id": "exam-9-7",
    "lvl": "exam",
    "quest": 9,
    "stage": 7,
    "kind": "choice",
    "q": "Какое значение выведет программа после умножения 106 на 2?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 106\n x *= 2\n fmt.Println(x)\n}",
    "opts": [
      "108",
      "106",
      "212"
    ],
    "a": 2,
    "explanation": "Программа выводит 212.",
    "term": "Go"
  },
  {
    "id": "exam-9-8",
    "lvl": "exam",
    "quest": 9,
    "stage": 8,
    "kind": "choice",
    "q": "Что выведет программа после прибавления 1 к 107?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n x := 107\n x++\n fmt.Println(x)\n}",
    "opts": [
      "109",
      "108",
      "107"
    ],
    "a": 1,
    "explanation": "Программа выводит 108.",
    "term": "Go"
  },
  {
    "id": "exam-9-9",
    "lvl": "exam",
    "quest": 9,
    "stage": 9,
    "kind": "fill",
    "q": "Допишите выражение прямо в строке fmt.Println, чтобы программа выполнила действие: Какой остаток от деления 325 на 3 выведет программа. Используйте переменные и операции из кода.",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(???)\n}",
    "explanation": "Программа выводит 1.",
    "term": "Go",
    "expected": "325 % 3"
  },
  {
    "id": "exam-9-10",
    "lvl": "exam",
    "quest": 9,
    "stage": 10,
    "kind": "choice",
    "q": "Что выведет программа при сравнении чисел 109 и 110?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n fmt.Println(109 == 110)\n}",
    "opts": [
      "true",
      "1",
      "false"
    ],
    "a": 2,
    "explanation": "Программа выводит false.",
    "term": "Go"
  },
  {
    "id": "exam-9-11",
    "lvl": "exam",
    "quest": 9,
    "stage": 11,
    "kind": "choice",
    "q": "Сколько элементов в срезе выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n nums := []int{110, 111, 112}\n fmt.Println(len(nums))\n}",
    "opts": [
      "4",
      "3",
      "2"
    ],
    "a": 1,
    "explanation": "Программа выводит 3.",
    "term": "Go"
  },
  {
    "id": "exam-9-12",
    "lvl": "exam",
    "quest": 9,
    "stage": 12,
    "kind": "choice",
    "q": "Какую сумму выведет программа?",
    "code": "package main\nimport \"fmt\"\nfunc main() {\n a := 111\n b := 113\n fmt.Println(a+b)\n}",
    "opts": [
      "224",
      "222",
      "225"
    ],
    "a": 0,
    "explanation": "Программа выводит 224.",
    "term": "Go"
  },
  {
    "id": "exam-history-1",
    "lvl": "exam",
    "quest": 9,
    "stage": 11,
    "kind": "choice",
    "q": "Когда открылась первая школа Tomorrow School в Казахстане?",
    "opts": [
      "21 октября 2024 года",
      "21 октября 2022 года",
      "10 ноября 2025 года"
    ],
    "a": 0,
    "explanation": "Tomorrow School открылась 21 октября 2024 года в Казахстане.",
    "term": "Tomorrow School"
  },
  {
    "id": "exam-history-2",
    "lvl": "exam",
    "quest": 9,
    "stage": 12,
    "kind": "choice",
    "q": "В каком году началась разработка языка программирования Go?",
    "opts": [
      "2009",
      "2007",
      "2012"
    ],
    "a": 1,
    "explanation": "Разработку Go начали в сентябре 2007 года, а публично представили язык 10 ноября 2009 года.",
    "term": "Go"
  },
  {
    "id": "exam-history-3",
    "lvl": "exam",
    "quest": 9,
    "stage": 13,
    "kind": "choice",
    "q": "Кто создал язык программирования Go?",
    "opts": [
      "Билл Гейтс, Пол Аллен и Стив Балмер",
      "Гвидо ван Россум и Джеймс Гослинг",
      "Роберт Гриземер, Роб Пайк и Кен Томпсон"
    ],
    "a": 2,
    "explanation": "Идею и первоначальный дизайн Go разработали в Google Роберт Гриземер, Роб Пайк и Кен Томпсон.",
    "term": "Go creators"
  },
  {
    "id": "exam-history-4",
    "lvl": "exam",
    "quest": 9,
    "stage": 14,
    "kind": "choice",
    "q": "Какой год считается рождением искусственного интеллекта как научной области?",
    "opts": [
      "1956",
      "1976",
      "2006"
    ],
    "a": 0,
    "explanation": "В 1956 году состоялся Дартмутский семинар, считающийся отправной точкой исследований ИИ как отдельной научной области.",
    "term": "Artificial intelligence"
  }
];
