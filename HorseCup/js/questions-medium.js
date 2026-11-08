/* Go examples formatted with gofumpt v0.8.0. */
window.BANK = window.BANK || [];
window.BANK.push(...[
  {
    "id": "m1-1",
    "lvl": "medium",
    "quest": 1,
    "q": "Что делает <code>ls -a</code>?",
    "opts": [
      "Показывает и скрытые файлы",
      "Удаляет файлы",
      "Создаёт папку"
    ],
    "a": 0
  },
  {
    "id": "m1-2",
    "lvl": "medium",
    "quest": 1,
    "q": "Что выведет <code>fmt.Print(2 + 3 * 4)</code>?",
    "opts": [
      "20",
      "14",
      "24"
    ],
    "a": 1
  },
  {
    "id": "m1-3",
    "lvl": "medium",
    "quest": 1,
    "q": "Допиши строку вместо <code>???</code>, чтобы код работал.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\t???\n\tfmt.Print(x)\n}\n",
    "opts": [
      "<code>x := 7</code>",
      "<code>x == 7</code>",
      "<code>int x = 7</code>"
    ],
    "a": 0
  },
  {
    "id": "m2-1",
    "lvl": "medium",
    "quest": 2,
    "q": "Что означает <code>!=</code>?",
    "opts": [
      "Присваивание",
      "Не равно",
      "И"
    ],
    "a": 1
  },
  {
    "id": "m2-2",
    "lvl": "medium",
    "quest": 2,
    "q": "Сколько итераций у <code>for i := 0; i &lt; 4; i++</code>?",
    "opts": [
      "3",
      "4",
      "5"
    ],
    "a": 1
  },
  {
    "id": "m2-3",
    "lvl": "medium",
    "quest": 2,
    "q": "Допиши условие вместо <code>???</code>.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := 6\n\n\tif ??? {\n\t\tfmt.Print(\"yes\")\n\t}\n}\n",
    "opts": [
      "<code>x%2==0</code>",
      "<code>x%2=0</code>",
      "<code>x%2:=0</code>"
    ],
    "a": 0
  },
  {
    "id": "m3-1",
    "lvl": "medium",
    "quest": 3,
    "q": "Что делает <code>string('A')</code>?",
    "opts": [
      "Создаёт строку A",
      "Создаёт число 65",
      "Ошибка"
    ],
    "a": 0
  },
  {
    "id": "m3-2",
    "lvl": "medium",
    "quest": 3,
    "q": "Чему равен <code>len(\"Пр\")</code> в UTF-8?",
    "opts": [
      "2",
      "4",
      "1"
    ],
    "a": 1
  },
  {
    "id": "m3-3",
    "lvl": "medium",
    "quest": 3,
    "q": "Допиши строку вместо <code>???</code>.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := \"кот\"\n\t???\n\tfmt.Print(len(r))\n}\n",
    "opts": [
      "<code>r := []rune(s)</code>",
      "<code>r := []int(s)</code>",
      "<code>r := rune(s)</code>"
    ],
    "a": 0
  },
  {
    "id": "m4-1",
    "lvl": "medium",
    "quest": 4,
    "q": "Где видна локальная переменная?",
    "opts": [
      "Во всём проекте",
      "В своей области видимости",
      "Во всех пакетах"
    ],
    "a": 1
  },
  {
    "id": "m4-2",
    "lvl": "medium",
    "quest": 4,
    "q": "Что означает <code>func f(a int) (int, error)</code>?",
    "opts": [
      "Два возвращаемых значения",
      "Два аргумента",
      "Метод без результата"
    ],
    "a": 0
  },
  {
    "id": "m4-3",
    "lvl": "medium",
    "quest": 4,
    "q": "Допиши возвращаемую строку.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc twice(x int) int {\n\t???\n}\n\nfunc main() {\n\tfmt.Print(twice(3))\n}\n",
    "opts": [
      "<code>return x * 2</code>",
      "<code>print x * 2</code>",
      "<code>x * 2</code>"
    ],
    "a": 0
  },
  {
    "id": "m5-1",
    "lvl": "medium",
    "quest": 5,
    "q": "Что делает <code>append</code>?",
    "opts": [
      "Добавляет элементы к срезу",
      "Удаляет переменную",
      "Сортирует массив"
    ],
    "a": 0
  },
  {
    "id": "m5-2",
    "lvl": "medium",
    "quest": 5,
    "q": "Чем <code>[3]int</code> отличается от <code>[]int</code>?",
    "opts": [
      "Первое — массив фиксированной длины",
      "Ничем",
      "Первое — строка"
    ],
    "a": 0
  },
  {
    "id": "m5-3",
    "lvl": "medium",
    "quest": 5,
    "q": "Допиши строку вместо <code>???</code>.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := []int{1, 2}\n\t???\n\tfmt.Print(len(a))\n}\n",
    "opts": [
      "<code>a = append(a,3)</code>",
      "<code>append(a,3)</code>",
      "<code>a += 3</code>"
    ],
    "a": 0
  },
  {
    "id": "m6-1",
    "lvl": "medium",
    "quest": 6,
    "q": "Как обратиться к полю структуры <code>p.Name</code>?",
    "opts": [
      "<code>p.Name</code>",
      "<code>p-&gt;Name</code>",
      "<code>p::Name</code>"
    ],
    "a": 0
  },
  {
    "id": "m6-2",
    "lvl": "medium",
    "quest": 6,
    "q": "Что означает <code>*p</code> для указателя p?",
    "opts": [
      "Разыменование",
      "Создание пакета",
      "Сложение"
    ],
    "a": 0
  },
  {
    "id": "m6-3",
    "lvl": "medium",
    "quest": 6,
    "q": "Допиши строку вместо <code>???</code>.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := 5\n\t???\n\tfmt.Print(*p)\n}\n",
    "opts": [
      "<code>p := &amp;x</code>",
      "<code>p := *x</code>",
      "<code>p := x</code>"
    ],
    "a": 0
  },
  {
    "id": "m7-1",
    "lvl": "medium",
    "quest": 7,
    "q": "Что вернёт <code>f(0)</code>, если <code>if n==0 {return 1}</code>?",
    "opts": [
      "0",
      "1",
      "Ошибка"
    ],
    "a": 1
  },
  {
    "id": "m7-2",
    "lvl": "medium",
    "quest": 7,
    "q": "Что вычисляет <code>f(n)=n*f(n-1)</code> при <code>f(0)=1</code>?",
    "opts": [
      "Факториал",
      "Сумму чисел",
      "Длину строки"
    ],
    "a": 0
  },
  {
    "id": "m7-3",
    "lvl": "medium",
    "quest": 7,
    "q": "Допиши базовый случай вместо <code>???</code>.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc sum(n int) int {\n\tif n == 0 {\n\t\t???\n\t}\n\n\treturn n + sum(n-1)\n}\n\nfunc main() {\n\tfmt.Print(sum(3))\n}\n",
    "opts": [
      "<code>return 0</code>",
      "<code>return n+1</code>",
      "<code>break</code>"
    ],
    "a": 0
  },
  {
    "id": "m8-1",
    "lvl": "medium",
    "quest": 8,
    "q": "Как проверить наличие одного пользовательского аргумента?",
    "opts": [
      "<code>len(os.Args) &gt; 1</code>",
      "<code>len(os.Args) &gt; 0</code>",
      "<code>os.Args == 1</code>"
    ],
    "a": 0
  },
  {
    "id": "m8-2",
    "lvl": "medium",
    "quest": 8,
    "q": "Что произойдёт при <code>os.Args[1]</code>, если <code>len(os.Args)==1</code>?",
    "opts": [
      "Паника: индекс вне диапазона",
      "Пустая строка",
      "0"
    ],
    "a": 0
  },
  {
    "id": "m8-3",
    "lvl": "medium",
    "quest": 8,
    "q": "Допиши проверку вместо <code>???</code>.",
    "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tif ??? {\n\t\tfmt.Print(os.Args[1])\n\t}\n}\n",
    "opts": [
      "<code>len(os.Args)&gt;1</code>",
      "<code>len(os.Args)&gt;0</code>",
      "<code>os.Args[1]!=nil</code>"
    ],
    "a": 0
  },
  {
    "id": "m9-1",
    "lvl": "medium",
    "quest": 9,
    "q": "Что означает сортировка по возрастанию?",
    "opts": [
      "От меньшего к большему",
      "От большего к меньшему",
      "Случайный порядок"
    ],
    "a": 0
  },
  {
    "id": "m9-2",
    "lvl": "medium",
    "quest": 9,
    "q": "Какова сложность одного полного прохода по n элементам?",
    "opts": [
      "O(n)",
      "O(1)",
      "O(n²)"
    ],
    "a": 0
  },
  {
    "id": "m9-3",
    "lvl": "medium",
    "quest": 9,
    "q": "Допиши условие для обмена соседних элементов.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := []int{4, 2}\n\n\tif ??? {\n\t\ta[0], a[1] = a[1], a[0]\n\t}\n\n\tfmt.Print(a)\n}\n",
    "opts": [
      "<code>a[0]&gt;a[1]</code>",
      "<code>a[0]=a[1]</code>",
      "<code>a[0]:=a[1]</code>"
    ],
    "a": 0
  },
  {
    "id": "m10-1",
    "lvl": "medium",
    "quest": 10,
    "q": "Как перейти к следующему узлу?",
    "opts": [
      "<code>node = node.Next</code>",
      "<code>node++</code>",
      "<code>node[1]</code>"
    ],
    "a": 0
  },
  {
    "id": "m10-2",
    "lvl": "medium",
    "quest": 10,
    "q": "Почему перед чтением <code>node.Next</code> проверяют <code>node != nil</code>?",
    "opts": [
      "Иначе возможна паника",
      "Иначе код медленнее",
      "Иначе узел удалится"
    ],
    "a": 0
  },
  {
    "id": "m10-3",
    "lvl": "medium",
    "quest": 10,
    "q": "Допиши строку для связи узлов.",
    "code": "package main\n\nimport \"fmt\"\n\ntype Node struct {\n\tValue int\n\tNext  *Node\n}\n\nfunc main() {\n\ta := &Node{Value: 1}\n\tb := &Node{Value: 2}\n\t???\n\tfmt.Print(a.Next.Value)\n}\n",
    "opts": [
      "<code>a.Next = b</code>",
      "<code>a.Next = *b</code>",
      "<code>a = b.Next</code>"
    ],
    "a": 0
  },
  {
    "id": "m11-1",
    "lvl": "medium",
    "quest": 11,
    "q": "Что делает <code>x &lt;&lt; 1</code> для положительного x без переполнения?",
    "opts": [
      "Умножает на 2",
      "Делит на 2",
      "Добавляет 1"
    ],
    "a": 0
  },
  {
    "id": "m11-2",
    "lvl": "medium",
    "quest": 11,
    "q": "Чему равно <code>5 &amp; 3</code>?",
    "opts": [
      "1",
      "7",
      "2"
    ],
    "a": 0
  },
  {
    "id": "m11-3",
    "lvl": "medium",
    "quest": 11,
    "q": "Допиши выражение для проверки младшего бита.",
    "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := 5\n\tfmt.Print(???)\n}\n",
    "opts": [
      "<code>x&amp;1 == 1</code>",
      "<code>x&amp;&amp;1 == 1</code>",
      "<code>x&amp;1 = 1</code>"
    ],
    "a": 0
  },
  {
    "id": "m12-1",
    "lvl": "medium",
    "quest": 12,
    "q": "Как проверить ошибку после вызова <code>n, err := strconv.Atoi(s)</code>?",
    "opts": [
      "<code>if err != nil { ... }</code>",
      "<code>if n == nil { ... }</code>",
      "<code>if err == true { ... }</code>"
    ],
    "a": 0
  },
  {
    "id": "m12-2",
    "lvl": "medium",
    "quest": 12,
    "q": "Почему <code>defer</code> удобен при закрытии файла?",
    "opts": [
      "Отложенный вызов выполнится при выходе из функции",
      "Он выполняется до открытия",
      "Он подавляет ошибки"
    ],
    "a": 0
  },
  {
    "id": "m12-3",
    "lvl": "medium",
    "quest": 12,
    "q": "Допиши обработку ошибки вместо <code>???</code>.",
    "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tn, err := strconv.Atoi(\"42\")\n\t???\n\tfmt.Print(n)\n}\n",
    "opts": [
      "<code>if err != nil { return }</code>",
      "<code>if err == true { return }</code>",
      "<code>if n == nil { return }</code>"
    ],
    "a": 0
  }
,
{
  "id": "m1-error-line",
  "lvl": "medium",
  "quest": 1,
  "q": "В какой строке ошибка объявления переменной?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var score int = \"seven\"\n    fmt.Print(score)\n}",
  "kind": "line",
  "opts": [
    "Строка 6",
    "Строка 5",
    "Строка 7"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m2-error-line",
  "lvl": "medium",
  "quest": 2,
  "q": "В какой строке ошибочно записано условие?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    n := 8\n    if n = 8 {\n        fmt.Print(n)\n    }\n}",
  "kind": "line",
  "opts": [
    "Строка 7",
    "Строка 6",
    "Строка 8"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m3-error-line",
  "lvl": "medium",
  "quest": 3,
  "q": "В какой строке неверно преобразован тип?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    word := \"Go\"\n    letters := []int(word)\n    fmt.Print(letters)\n}",
  "kind": "line",
  "opts": [
    "Строка 7",
    "Строка 6",
    "Строка 8"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m4-error-line",
  "lvl": "medium",
  "quest": 4,
  "q": "В какой строке функция возвращает неверный тип?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc twice(n int) int {\n    return \"2\"\n}\nfunc main() { fmt.Print(twice(2)) }",
  "kind": "line",
  "opts": [
    "Строка 6",
    "Строка 5",
    "Строка 7"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m5-error-line",
  "lvl": "medium",
  "quest": 5,
  "q": "В какой строке ошибочно обращаются к массиву?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    nums := [2]int{3, 4}\n    fmt.Print(nums[2])\n}",
  "kind": "line",
  "opts": [
    "Строка 7",
    "Строка 6",
    "Строка 8"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m6-error-line",
  "lvl": "medium",
  "quest": 6,
  "q": "В какой строке используется неверная операция со строкой?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    text := \"go\"\n    text[0] = 'G'\n    fmt.Print(text)\n}",
  "kind": "line",
  "opts": [
    "Строка 7",
    "Строка 6",
    "Строка 8"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m7-error-line",
  "lvl": "medium",
  "quest": 7,
  "q": "В какой строке рекурсивная функция возвращает неверное значение типа?",
  "code": "package main\n\nfunc factorial(n int) int {\n    if n <= 1 { return 1 }\n    return \"n\" * factorial(n-1)\n}",
  "kind": "line",
  "opts": [
    "Строка 5",
    "Строка 4",
    "Строка 6"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m8-error-line",
  "lvl": "medium",
  "quest": 8,
  "q": "В какой строке указатель используется без разыменования?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 10\n    p := &x\n    fmt.Print(p + 1)\n}",
  "kind": "line",
  "opts": [
    "Строка 8",
    "Строка 7",
    "Строка 9"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m9-error-line",
  "lvl": "medium",
  "quest": 9,
  "q": "В какой строке нарушена типизация указателя?",
  "code": "package main\n\nfunc main() {\n    value := 9\n    var ptr *string = &value\n    _ = ptr\n}",
  "kind": "line",
  "opts": [
    "Строка 5",
    "Строка 4",
    "Строка 6"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m10-error-line",
  "lvl": "medium",
  "quest": 10,
  "q": "В какой строке неправильно инициализировано поле структуры?",
  "code": "package main\n\ntype Node struct { Value int }\nfunc main() {\n    n := Node{Value: \"7\"}\n    _ = n\n}",
  "kind": "line",
  "opts": [
    "Строка 6",
    "Строка 5",
    "Строка 7"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m11-error-line",
  "lvl": "medium",
  "quest": 11,
  "q": "В какой строке неверно применяется побитовая операция?",
  "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    n := \"5\"\n    fmt.Print(n & 3)\n}",
  "kind": "line",
  "opts": [
    "Строка 7",
    "Строка 6",
    "Строка 8"
  ],
  "a": 0,
  "numbered": true
},
{
  "id": "m12-error-line",
  "lvl": "medium",
  "quest": 12,
  "q": "В какой строке неправильно обработана ошибка преобразования?",
  "code": "package main\n\nimport \"strconv\"\n\nfunc main() {\n    _, err := strconv.Atoi(\"42\")\n    if err == 0 { return }\n}",
  "kind": "line",
  "opts": [
    "Строка 7",
    "Строка 6",
    "Строка 8"
  ],
  "a": 0,
  "numbered": true
}
]);
