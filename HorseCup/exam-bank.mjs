/* Original Exam practice, inspired by Quest 2–9 concepts; no textbook solutions copied. */
export const EXAM_BANK=[
  {
    "id": "exam-2-1",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    total := 4\n    // Допишите 1 строку кода здесь\n}",
    "expected": "total += 3",
    "stage": 1
  },
  {
    "id": "exam-2-2",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    value := 9\n    // Допишите 1 строку кода здесь\n}",
    "expected": "value%2 == 1",
    "stage": 2
  },
  {
    "id": "exam-2-3",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    step := 2\n    // Допишите 1 строку кода здесь\n}",
    "expected": "step++",
    "stage": 3
  },
  {
    "id": "exam-2-4",
    "lvl": "exam",
    "quest": 2,
    "kind": "line",
    "q": "Условия и циклы. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    sum := 0\n    fmt.Prinln(sum += 5)\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-2-5",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    count := 1\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := count < 6\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-2-6",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    limit := 8\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := limit -= 2\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-2-7",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    a, b := 3, 7\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := a < b\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-2-8",
    "lvl": "exam",
    "quest": 2,
    "kind": "line",
    "q": "Условия и циклы. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    done := false\n    fmt.Prinln(done = true)\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-2-9",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    score := 12\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := score >= 10\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-2-10",
    "lvl": "exam",
    "quest": 2,
    "kind": "code",
    "q": "Условия и циклы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    n := 5\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := n != 0\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  },
  {
    "id": "exam-3-1",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    weight := 11\n    // Допишите 1 строку кода здесь\n}",
    "expected": "&weight",
    "stage": 1
  },
  {
    "id": "exam-3-2",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    amount := 8\n    // Допишите 1 строку кода здесь\n}",
    "expected": "amount / 3",
    "stage": 2
  },
  {
    "id": "exam-3-3",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    amount := 8\n    // Допишите 1 строку кода здесь\n}",
    "expected": "amount % 3",
    "stage": 3
  },
  {
    "id": "exam-3-4",
    "lvl": "exam",
    "quest": 3,
    "kind": "line",
    "q": "Указатели и преобразование строк. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    label := \"go\"\n    fmt.Prinln(len(label))\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-3-5",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    city := \"Астана\"\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := []rune(city)\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-3-6",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    left, right := 2, 6\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := left, right = right, left\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-3-7",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    number := 42\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := number / 10\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-3-8",
    "lvl": "exam",
    "quest": 3,
    "kind": "line",
    "q": "Указатели и преобразование строк. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    symbol := 'Ж'\n    fmt.Prinln(rune(symbol))\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-3-9",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    text := \"17\"\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := strconv.Atoi(text)\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-3-10",
    "lvl": "exam",
    "quest": 3,
    "kind": "code",
    "q": "Указатели и преобразование строк. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    value := 6\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := value *= 2\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  },
  {
    "id": "exam-4-1",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    base := 3\n    // Допишите 1 строку кода здесь\n}",
    "expected": "base * base",
    "stage": 1
  },
  {
    "id": "exam-4-2",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    number := 7\n    // Допишите 1 строку кода здесь\n}",
    "expected": "number%2 == 0",
    "stage": 2
  },
  {
    "id": "exam-4-3",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    candidate := 11\n    // Допишите 1 строку кода здесь\n}",
    "expected": "candidate > 1",
    "stage": 3
  },
  {
    "id": "exam-4-4",
    "lvl": "exam",
    "quest": 4,
    "kind": "line",
    "q": "Рекурсия и математические вычисления. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    step := 4\n    fmt.Prinln(step - 1)\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-4-5",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    power := 2\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := power *= 3\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-4-6",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    n := 0\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := n <= 0\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-4-7",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    result := 1\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := result *= 4\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-4-8",
    "lvl": "exam",
    "quest": 4,
    "kind": "line",
    "q": "Рекурсия и математические вычисления. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    index := 5\n    fmt.Prinln(index - 2)\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-4-9",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    value := 16\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := value / 2\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-4-10",
    "lvl": "exam",
    "quest": 4,
    "kind": "code",
    "q": "Рекурсия и математические вычисления. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    n := 9\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := n > 1\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  },
  {
    "id": "exam-5-1",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    word := \"снег\"\n    // Допишите 1 строку кода здесь\n}",
    "expected": "[]rune(word)",
    "stage": 1
  },
  {
    "id": "exam-5-2",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    name := \"Go\"\n    // Допишите 1 строку кода здесь\n}",
    "expected": "len(name)",
    "stage": 2
  },
  {
    "id": "exam-5-3",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    letter := 'a'\n    // Допишите 1 строку кода здесь\n}",
    "expected": "letter >= 'a' && letter <= 'z'",
    "stage": 3
  },
  {
    "id": "exam-5-4",
    "lvl": "exam",
    "quest": 5,
    "kind": "line",
    "q": "Руны и строки. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    text := \"дом\"\n    fmt.Prinln(string([]rune(text)[0]))\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-5-5",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    parts := []string{\"a\", \"b\"}\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := len(parts)\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-5-6",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    left, right := \"ко\", \"т\"\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := left + right\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-5-7",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    phrase := \"Go go\"\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := strings.ToUpper(phrase)\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-5-8",
    "lvl": "exam",
    "quest": 5,
    "kind": "line",
    "q": "Руны и строки. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    phrase := \"ЗИМА\"\n    fmt.Prinln(strings.ToLower(phrase))\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-5-9",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    text := \"a,b\"\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := strings.Split(text, \",\")\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-5-10",
    "lvl": "exam",
    "quest": 5,
    "kind": "code",
    "q": "Руны и строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    items := []string{\"x\", \"y\"}\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := strings.Join(items, \"-\")\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  },
  {
    "id": "exam-6-1",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    args := os.Args\n    // Допишите 1 строку кода здесь\n}",
    "expected": "len(args)",
    "stage": 1
  },
  {
    "id": "exam-6-2",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    args := os.Args\n    // Допишите 1 строку кода здесь\n}",
    "expected": "args[0]",
    "stage": 2
  },
  {
    "id": "exam-6-3",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    args := []string{\"app\", \"one\"}\n    // Допишите 1 строку кода здесь\n}",
    "expected": "args[1]",
    "stage": 3
  },
  {
    "id": "exam-6-4",
    "lvl": "exam",
    "quest": 6,
    "kind": "line",
    "q": "Аргументы командной строки. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    args := []string{\"app\", \"a\", \"b\"}\n    fmt.Prinln(len(args)-1)\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-6-5",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    args := []string{\"app\", \"go\"}\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := args[1] == \"go\"\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-6-6",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    args := []string{\"app\", \"x\"}\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := args[1:]\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-6-7",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    args := []string{\"app\", \"a\", \"b\"}\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := args[2]\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-6-8",
    "lvl": "exam",
    "quest": 6,
    "kind": "line",
    "q": "Аргументы командной строки. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    args := []string{\"app\"}\n    fmt.Prinln(len(args) > 1)\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-6-9",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    args := []string{\"app\", \"q\"}\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := strings.ToUpper(args[1])\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-6-10",
    "lvl": "exam",
    "quest": 6,
    "kind": "code",
    "q": "Аргументы командной строки. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    args := []string{\"app\", \"1\", \"2\"}\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := strings.Join(args[1:], \",\")\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  },
  {
    "id": "exam-7-1",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    values := []int{3, 6}\n    // Допишите 1 строку кода здесь\n}",
    "expected": "len(values)",
    "stage": 1
  },
  {
    "id": "exam-7-2",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    values := []int{3, 6}\n    // Допишите 1 строку кода здесь\n}",
    "expected": "append(values, 9)",
    "stage": 2
  },
  {
    "id": "exam-7-3",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    values := make([]int, 4)\n    // Допишите 1 строку кода здесь\n}",
    "expected": "len(values)",
    "stage": 3
  },
  {
    "id": "exam-7-4",
    "lvl": "exam",
    "quest": 7,
    "kind": "line",
    "q": "Срезы и диапазоны. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    values := []int{1, 2, 3}\n    fmt.Prinln(values[1:])\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-7-5",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    values := []int{1, 2, 3}\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := values[:2]\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-7-6",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    items := []string{\"a\", \"b\"}\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := append(items, \"c\")\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-7-7",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    values := []int{4, 5, 6}\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := values[0]\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-7-8",
    "lvl": "exam",
    "quest": 7,
    "kind": "line",
    "q": "Срезы и диапазоны. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    values := make([]int, 2, 5)\n    fmt.Prinln(cap(values))\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-7-9",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    items := []string{\"red\", \"blue\"}\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := strings.Join(items, \" \")\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-7-10",
    "lvl": "exam",
    "quest": 7,
    "kind": "code",
    "q": "Срезы и диапазоны. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    values := []int{7, 8, 9}\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := values[len(values)-1]\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  },
  {
    "id": "exam-8-1",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    type Point struct { X int }\n    // Допишите 1 строку кода здесь\n}",
    "expected": "Point{X: 4}",
    "stage": 1
  },
  {
    "id": "exam-8-2",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    type Book struct { Pages int }\n    // Допишите 1 строку кода здесь\n}",
    "expected": "Book{Pages: 12}",
    "stage": 2
  },
  {
    "id": "exam-8-3",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    type Player struct { Name string }\n    // Допишите 1 строку кода здесь\n}",
    "expected": "Player{Name: \"Лиса\"}",
    "stage": 3
  },
  {
    "id": "exam-8-4",
    "lvl": "exam",
    "quest": 8,
    "kind": "line",
    "q": "Структуры и файлы. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    type Coord struct { Row int }\n    fmt.Prinln(Coord{Row: 3})\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-8-5",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    type Box struct { Size int }\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := Box{Size: 8}\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-8-6",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    type Ticket struct { Price int }\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := Ticket{Price: 25}\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-8-7",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    type Animal struct { Age int }\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := Animal{Age: 2}\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-8-8",
    "lvl": "exam",
    "quest": 8,
    "kind": "line",
    "q": "Структуры и файлы. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    type House struct { Floors int }\n    fmt.Prinln(House{Floors: 5})\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-8-9",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    type City struct { Code string }\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := City{Code: \"PVL\"}\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-8-10",
    "lvl": "exam",
    "quest": 8,
    "kind": "code",
    "q": "Структуры и файлы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    type Item struct { Count int }\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := Item{Count: 9}\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  },
  {
    "id": "exam-9-1",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    numbers := []int{1, 2}\n    // Допишите 1 строку кода здесь\n}",
    "expected": "len(numbers)",
    "stage": 1
  },
  {
    "id": "exam-9-2",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    test := func(n int) bool { return n > 0 }\n    // Допишите 1 строку кода здесь\n}",
    "expected": "test(4)",
    "stage": 2
  },
  {
    "id": "exam-9-3",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    transform := func(n int) int { return n + 2 }\n    // Допишите 1 строку кода здесь\n}",
    "expected": "transform(3)",
    "stage": 3
  },
  {
    "id": "exam-9-4",
    "lvl": "exam",
    "quest": 9,
    "kind": "line",
    "q": "Функции как аргументы. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    test := func(n int) bool { return n%2 == 0 }\n    fmt.Prinln(test(6))\n}",
    "numbered": true,
    "expected": "4",
    "stage": 4
  },
  {
    "id": "exam-9-5",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    transform := func(n int) int { return n * 3 }\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := transform(2)\nfmt.Println(result)",
    "stage": 5
  },
  {
    "id": "exam-9-6",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; не вводите готовое решение из учебника.",
    "code": "package main\n\nfunc main() {\n    test := func(s string) bool { return len(s) > 2 }\n    // Допишите 2 строки кода здесь\n}",
    "expected": "result := test(\"Go\")\nfmt.Println(result)",
    "stage": 6
  },
  {
    "id": "exam-9-7",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    compare := func(a, b int) bool { return a < b }\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := compare(2, 5)\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 7
  },
  {
    "id": "exam-9-8",
    "lvl": "exam",
    "quest": 9,
    "kind": "line",
    "q": "Функции как аргументы. В какой строке опечатка в имени функции печати? Введите только номер строки.",
    "code": "package main\nfunc main() {\n    test := func(n int) bool { return n < 0 }\n    fmt.Prinln(test(-1))\n}",
    "numbered": true,
    "expected": "4",
    "stage": 8
  },
  {
    "id": "exam-9-9",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    transform := func(s string) string { return s + \"!\" }\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := transform(\"Go\")\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 9
  },
  {
    "id": "exam-9-10",
    "lvl": "exam",
    "quest": 9,
    "kind": "code",
    "q": "Функции как аргументы. Допишите недостающий фрагмент Go в поле редактора. Используйте переменные из примера; требуется несколько строк.",
    "code": "package main\n\nfunc main() {\n    compare := func(a, b string) bool { return a == b }\n    // Допишите 3 строки кода здесь\n}",
    "expected": "result := compare(\"a\", \"b\")\nfmt.Println(result)\nfmt.Println(\"Готово\")",
    "stage": 10
  }
];
