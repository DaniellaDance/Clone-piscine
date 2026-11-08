// Additional deterministic Go exercises. Every code example and answer is unique per pool.
export function expandBank(original){const out=[],seen=new Set();function add(q){const key=q.code?'code:'+q.code.replace(/\s+/g,' ').trim():'text:'+q.q.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();if(seen.has(key))return;seen.add(key);out.push(q)}original.forEach(add);
function code(lvl,kind,n,body,answer,wrong){
  let q,opts,example;
  if(lvl==='easy'){
    const cases={
      1:[`Как объявить переменную x со значением ${n} внутри функции Go?`,[`x := ${n}`,`x == ${n}`,`let x = ${n}`]],
      2:[`Как увеличить переменную x на ${n} в Go?`,[`x += ${n}`,`x =+ ${n}`,`x ++ ${n}`]],
      3:[`Как проверить, что строка s имеет длину ${n} байт?`,[`len(s) == ${n}`,`size(s) == ${n}`,`s.length == ${n}`]],
      4:[`Как вызвать функцию twice с аргументом ${n}?`,[`twice(${n})`,`call twice ${n}`,`twice[${n}]`]],
      5:[`Как создать срез целых чисел, содержащий ${n}?`,[`[]int{${n}}`,`int[]{${n}}`,`[int]${n}`]],
      6:[`Как получить указатель на переменную x, равную ${n}?`,['&x','*x','@x']]
    };[q,opts]=cases[kind];
  }else if(lvl==='medium'){
    const cases={
      2:[`Дополните условие цикла, чтобы i принимало значения от 0 до ${n-1}: for i := 0; ???; i++ { }`,[`i < ${n}`,`i <= ${n}`,`i == ${n}`]],
      5:[`Как добавить число ${n} в существующий срез a и сохранить результат?`,[`a = append(a, ${n})`,`append(a, ${n})`,`a += ${n}`]],
      6:[`Как изменить значение переменной x на ${n} через указатель p := &x?`,[`*p = ${n}`,`p = ${n}`,`&p = ${n}`]],
      4:[`Как объявить функцию f, возвращающую число ${n} типа int?`,[`func f() int { return ${n} }`,`func f() { return ${n} }`,`func f() int { print(${n}) }`]],
      12:[`Как проверить, что у числа x установлен бит с маской ${n}?`,[`x & ${n} != 0`,`x && ${n} != 0`,`x | ${n} == 0`]],
      3:[`Как преобразовать строку s в срез рун перед подсчётом символов?`,['r := []rune(s)','r := []byte(s)','r := rune(s)']]
    };[q,opts]=cases[kind];
  }else{
    q='Что выведет программа?';opts=[String(answer),...wrong.map(String)];example='package main\\n\\nimport "fmt"\\n\\n'+body+'\\n';
  }
  if(new Set(opts).size!==3)throw Error('Duplicate options');
  add({id:`generated-${lvl}-${kind}-${n}-${out.length}`,lvl,quest:kind,q, ...(example?{code:example}:{}),opts,a:0});
}
for(let n=1;n<=200;n++){
code('easy',1,n,`func main() {
	x := ${n}
	fmt.Print(x + 7)
}`,n+7,[n+6,n+8]);
code('easy',2,n,`func main() {
	x := ${n}
	fmt.Print(x * 3)
}`,n*3,[n*3+1,n*3+3]);
code('easy',3,n,`func main() {
	s := "Go"
	for i := 0; i < ${n}; i++ {
		s += "!"
	}
	fmt.Print(len(s))
}`,n+2,[n+1,n+3]);
code('easy',5,n,`func main() {
	a := []int{${n}, ${n+4}, ${n+9}}
	fmt.Print(a[1])
}`,n+4,[n,n+9]);
code('easy',6,n,`func main() {
	x := ${n}
	p := &x
	*p += 5
	fmt.Print(x)
}`,n+5,[n,n+1]);
code('easy',4,n,`func twice(x int) int {
	return x * 2
}

func main() {
	fmt.Print(twice(${n}) + 1)
}`,n*2+1,[n*2,n*2+2]);
code('medium',2,n,`func main() {
	sum := 0
	for i := 1; i <= ${n}; i++ {
		sum += i
	}
	fmt.Print(sum)
}`,n*(n+1)/2,[n*(n+1)/2+1,n*(n+1)/2+n+1]);
code('medium',5,n,`func main() {
	a := []int{${n}, ${n+1}, ${n+2}}
	b := a[1:]
	b[0] = ${n+9}
	fmt.Print(a[1])
}`,n+9,[n+1,n+2]);
code('medium',6,n,`func change(x *int) {
	*x *= 4
}

func main() {
	n := ${n}
	change(&n)
	fmt.Print(n)
}`,n*4,[n,n*4+4]);
code('medium',4,n,`func main() {
	x := ${n}
	defer fmt.Print(x)
	x += 10
	fmt.Print(x, ":")
}`,`${n+10}:${n}`,[`${n}:${n+10}`,`${n+10}:${n+10}`]);
code('medium',12,n,`func main() {
	x := ${n}
	fmt.Print((x << 2) + 1)
}`,n*4+1,[n*4,n*2+1]);
code('medium',3,n,`func main() {
	s := "Ж"
	for i := 0; i < ${n}; i++ {
		s += "Я"
	}
	fmt.Print(len([]rune(s)))
}`,n+1,[n,n+2]);
code('heavy',7,n,`func f(n int) int {
	if n == 0 {
		return 0
	}
	return n + f(n-1)
}

func main() {
	fmt.Print(f(${n}))
}`,n*(n+1)/2,[n*(n+1)/2+1,n*(n+1)/2+n+1]);
code('heavy',5,n,`func main() {
	a := make([]int, 2, 4)
	a[0] = ${n}
	b := append(a, ${n+2})
	b[0] += 8
	fmt.Print(a[0])
}`,n+8,[n,n+2]);
code('heavy',5,n,`func main() {
	a := []int{${n}, ${n+1}}
	b := append(a, ${n+2})
	b[0] += 8
	fmt.Print(a[0])
}`,n,[n+8,n+2]);
code('heavy',4,n,`func main() {
	x := ${n}
	defer func() {
		fmt.Print(x)
	}()
	x += 3
	defer fmt.Print(x)
	x += 4
}`,`${n+3}${n+7}`,[`${n+7}${n+3}`,`${n}${n+7}`]);
code('heavy',12,n,`func main() {
	x := ${n}
	fmt.Print((x << 3) - (x << 1))
}`,n*6,[n*8,n*6+1]);
code('heavy',6,n,`type Item struct{ n int }

func f(x Item) {
	x.n += 9
}

func main() {
	x := Item{${n}}
	f(x)
	fmt.Print(x.n)
}`,n,[n+9,n+1]);
}return out}
