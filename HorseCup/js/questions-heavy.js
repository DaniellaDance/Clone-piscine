/* Go examples formatted with gofumpt v0.8.0. */
window.BANK = window.BANK || [];
window.BANK.push(...[
  {
    "id": "h1-1",
    "lvl": "heavy",
    "quest": 1,
    "q": "Почему <code>x := 3</code> вне функции не скомпилируется?",
    "opts": [
      "<code>:=</code> разрешён только внутри функций",
      "Нельзя использовать числа",
      "Нужен цикл"
    ],
    "a": 0
  },
  {
    "id": "h1-2",
    "lvl": "heavy",
    "quest": 1,
    "q": "Что делает <code>go run main.go</code>?",
    "opts": [
      "Компилирует и запускает программу",
      "Только форматирует",
      "Создаёт Git-репозиторий"
    ],
    "a": 0
  },
  {
    "id": "h2-1",
    "lvl": "heavy",
    "quest": 2,
    "q": "Что выведет <code>fmt.Print(7 / 2)</code>?",
    "opts": [
      "3.5",
      "3",
      "4"
    ],
    "a": 1
  },
  {
    "id": "h2-2",
    "lvl": "heavy",
    "quest": 2,
    "q": "Что произойдёт с <code>if x := 2; x &gt; 1 { fmt.Print(x) }</code>?",
    "opts": [
      "Выведет 2",
      "Ошибка синтаксиса",
      "Выведет 1"
    ],
    "a": 0
  },
  {
    "id": "h3-1",
    "lvl": "heavy",
    "quest": 3,
    "q": "Что даёт <code>[]rune(\"кот\")</code>?",
    "opts": [
      "Срез из 3 рун",
      "Срез из 6 рун",
      "Одну руну"
    ],
    "a": 0
  },
  {
    "id": "h3-2",
    "lvl": "heavy",
    "quest": 3,
    "q": "Почему <code>s[0]</code> может не быть первым символом?",
    "opts": [
      "Это первый байт, не обязательно целая руна",
      "Индексация с 1",
      "Строки нельзя индексировать"
    ],
    "a": 0
  },
  {
    "id": "h4-1",
    "lvl": "heavy",
    "quest": 4,
    "q": "Что будет, если объявить <code>x := 1</code>, но не использовать x?",
    "opts": [
      "Компилятор выдаст ошибку",
      "Ничего",
      "x автоматически печатается"
    ],
    "a": 0
  },
  {
    "id": "h4-2",
    "lvl": "heavy",
    "quest": 4,
    "q": "Что означает затенение переменной?",
    "opts": [
      "Внутренняя переменная скрывает внешнюю",
      "Удаление значения",
      "Изменение типа пакета"
    ],
    "a": 0
  },
  {
    "id": "h5-1",
    "lvl": "heavy",
    "quest": 5,
    "q": "Что выведет <code>a := []int{1,2}; b := append(a,3); fmt.Print(len(b))</code>?",
    "opts": [
      "2",
      "3",
      "4"
    ],
    "a": 1
  },
  {
    "id": "h5-2",
    "lvl": "heavy",
    "quest": 5,
    "q": "Почему изменение элемента подсреза может изменить исходный срез?",
    "opts": [
      "Они могут разделять базовый массив",
      "Срез всегда копируется",
      "Из-за fmt"
    ],
    "a": 0
  },
  {
    "id": "h6-1",
    "lvl": "heavy",
    "quest": 6,
    "q": "Что будет при разыменовании nil-указателя?",
    "opts": [
      "Паника во время выполнения",
      "Пустая строка",
      "Всегда 0"
    ],
    "a": 0
  },
  {
    "id": "h6-2",
    "lvl": "heavy",
    "quest": 6,
    "q": "Почему <code>func f(p *Person)</code> может менять поля исходной структуры?",
    "opts": [
      "Передан указатель на структуру",
      "Go передаёт всё по ссылке",
      "Поля глобальные"
    ],
    "a": 0
  },
  {
    "id": "h7-1",
    "lvl": "heavy",
    "quest": 7,
    "q": "Сколько раз вызовется f при f(3), если f(n) вызывает f(n-1) до n=0?",
    "opts": [
      "3",
      "4",
      "5"
    ],
    "a": 1
  },
  {
    "id": "h7-2",
    "lvl": "heavy",
    "quest": 7,
    "q": "Что вероятно при бесконечной рекурсии?",
    "opts": [
      "Переполнение стека/исчерпание ресурсов",
      "Автоматическая остановка",
      "Сортировка"
    ],
    "a": 0
  },
  {
    "id": "h8-1",
    "lvl": "heavy",
    "quest": 8,
    "q": "Что возвращает <code>strconv.Atoi(\"12\")</code>?",
    "opts": [
      "(12, nil)",
      "Только строку",
      "(0, nil)"
    ],
    "a": 0
  },
  {
    "id": "h8-2",
    "lvl": "heavy",
    "quest": 8,
    "q": "Как перебрать пользовательские аргументы без имени программы?",
    "opts": [
      "<code>for _, s := range os.Args[1:]</code>",
      "<code>for _, s := range os.Args[0:0]</code>",
      "<code>for s := range os.Args[0]</code>"
    ],
    "a": 0
  },
  {
    "id": "h9-1",
    "lvl": "heavy",
    "quest": 9,
    "q": "Что будет с <code>for i := range a</code> для среза?",
    "opts": [
      "i — индексы элементов",
      "i — сами значения",
      "i — адрес среза"
    ],
    "a": 0
  },
  {
    "id": "h9-2",
    "lvl": "heavy",
    "quest": 9,
    "q": "Чем опасно изменение длины среза во время обхода range?",
    "opts": [
      "Количество итераций определяется в начале обхода",
      "Всегда ошибка компиляции",
      "range автоматически перезапускается"
    ],
    "a": 0
  },
  {
    "id": "h10-1",
    "lvl": "heavy",
    "quest": 10,
    "q": "Какова сложность поиска значения в несортированном односвязном списке?",
    "opts": [
      "O(n)",
      "O(1)",
      "O(log n) всегда"
    ],
    "a": 0
  },
  {
    "id": "h10-2",
    "lvl": "heavy",
    "quest": 10,
    "q": "Почему вставка после известного узла обычно O(1)?",
    "opts": [
      "Меняется фиксированное число ссылок",
      "Пересоздаётся весь список",
      "Нужна сортировка"
    ],
    "a": 0
  },
  {
    "id": "h11-1",
    "lvl": "heavy",
    "quest": 11,
    "q": "Чему равно <code>5 ^ 3</code>?",
    "opts": [
      "6",
      "1",
      "7"
    ],
    "a": 0
  },
  {
    "id": "h11-2",
    "lvl": "heavy",
    "quest": 11,
    "q": "Почему <code>uint8(255) + uint8(1)</code> не подходит как прямое константное выражение?",
    "opts": [
      "Константный результат 256 не представим в uint8",
      "Go не поддерживает uint8",
      "255 нечётное"
    ],
    "a": 0
  },
  {
    "id": "h12-1",
    "lvl": "heavy",
    "quest": 12,
    "q": "В каком порядке выполнятся <code>defer fmt.Print(1); defer fmt.Print(2)</code>?",
    "opts": [
      "21",
      "12",
      "Ошибка"
    ],
    "a": 0
  },
  {
    "id": "h12-2",
    "lvl": "heavy",
    "quest": 12,
    "q": "Что произойдёт, если две горутины без синхронизации изменяют одну переменную?",
    "opts": [
      "Возможна гонка данных",
      "Go всегда сериализует операции",
      "Компилятор автоматически ставит mutex"
    ],
    "a": 0
  }
,
{
  "id": "h1-fill",
  "lvl": "heavy",
  "quest": 1,
  "q": "Допишите ключевое слово для объявления пакета.",
  "code": "??? main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Print(\"ready\")\n}",
  "kind": "fill",
  "expected": "package",
  "opts": [],
  "a": 0
},
{
  "id": "h2-fill",
  "lvl": "heavy",
  "quest": 2,
  "q": "Допишите оператор сравнения в условии.",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x ??? 5 { fmt.Print(\"yes\") }\n}",
  "kind": "fill",
  "expected": "==",
  "opts": [],
  "a": 0
},
{
  "id": "h3-fill",
  "lvl": "heavy",
  "quest": 3,
  "q": "Допишите тип, чтобы перебрать Unicode-символы.",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    chars := []???(\"кот\")\n    fmt.Print(len(chars))\n}",
  "kind": "fill",
  "expected": "rune",
  "opts": [],
  "a": 0
},
{
  "id": "h4-fill",
  "lvl": "heavy",
  "quest": 4,
  "q": "Допишите тип результата функции.",
  "code": "package main\n\nfunc triple(x int) ??? {\n    return x * 3\n}",
  "kind": "fill",
  "expected": "int",
  "opts": [],
  "a": 0
},
{
  "id": "h5-fill",
  "lvl": "heavy",
  "quest": 5,
  "q": "Допишите встроенную функцию для длины среза.",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    xs := []int{1, 2, 3}\n    fmt.Print(???(xs))\n}",
  "kind": "fill",
  "expected": "len",
  "opts": [],
  "a": 0
},
{
  "id": "h6-fill",
  "lvl": "heavy",
  "quest": 6,
  "q": "Допишите операцию соединения строк.",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := \"Go\" ??? \"lang\"\n    fmt.Print(s)\n}",
  "kind": "fill",
  "expected": "+",
  "opts": [],
  "a": 0
},
{
  "id": "h7-fill",
  "lvl": "heavy",
  "quest": 7,
  "q": "Допишите рекурсивный вызов функции.",
  "code": "package main\n\nfunc sum(n int) int {\n    if n == 0 { return 0 }\n    return n + ???(n-1)\n}",
  "kind": "fill",
  "expected": "sum",
  "opts": [],
  "a": 0
},
{
  "id": "h8-fill",
  "lvl": "heavy",
  "quest": 8,
  "q": "Допишите оператор разыменования указателя.",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    n := 7\n    ptr := &n\n    fmt.Print(???ptr)\n}",
  "kind": "fill",
  "expected": "*",
  "opts": [],
  "a": 0
},
{
  "id": "h9-fill",
  "lvl": "heavy",
  "quest": 9,
  "q": "Допишите оператор взятия адреса переменной.",
  "code": "package main\n\nfunc main() {\n    n := 4\n    p := ???n\n    _ = p\n}",
  "kind": "fill",
  "expected": "&",
  "opts": [],
  "a": 0
},
{
  "id": "h10-fill",
  "lvl": "heavy",
  "quest": 10,
  "q": "Допишите имя поля структуры.",
  "code": "package main\n\ntype Node struct { Value int }\nfunc main() {\n    node := Node{Value: 12}\n    _ = node.???\n}",
  "kind": "fill",
  "expected": "Value",
  "opts": [],
  "a": 0
},
{
  "id": "h11-fill",
  "lvl": "heavy",
  "quest": 11,
  "q": "Допишите оператор побитового исключающего ИЛИ.",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Print(5 ??? 3)\n}",
  "kind": "fill",
  "expected": "^",
  "opts": [],
  "a": 0
},
{
  "id": "h12-fill",
  "lvl": "heavy",
  "quest": 12,
  "q": "Допишите проверку отсутствия ошибки.",
  "code": "package main\n\nimport \"strconv\"\n\nfunc main() {\n    _, err := strconv.Atoi(\"12\")\n    if err != ??? { return }\n}",
  "kind": "fill",
  "expected": "nil",
  "opts": [],
  "a": 0
}
]);
