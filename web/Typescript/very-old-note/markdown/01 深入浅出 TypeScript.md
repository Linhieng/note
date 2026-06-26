# 深入浅出 TypeScript

- 首先, TS 和 JS 的区别是什么? 为什么要有 TS?

  我的理解: TS 的目的就是为 JS 提供 **类型支持**。 记住这一个就可以了! TS 是为了方便我们代码开发, 它不影响最终代码的运行效果, 因为 TS 最终还是得转译成 js 文件运行的。

  | TypeScript                                                         | JavaScript               |
  |--------------------------------------------------------------------|--------------------------|
  | JavaScript 的超集，用于解决大型项目的代码复杂性                     | 一种脚本语言             |
  | 强类型，支持静态和动态类型                                          | 动态弱类型语言           |
  | 可以在编译期间发现并纠正错误; 借助相关工具可以在编辑期间就纠正错误 | 只能在运行时发现错误     |
  | 不允许改变变量的数据类型                                           | 变量可以被赋值成不同类型 |

## 🍕 TS 基础

注意, 这里说的 "基础" 不代表简单, 而是打好 TS 类型的这块知识的基础。

### 常见类型(Everyday Types)、类型相关概念

- 基本类型([Primitives](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean))
  - `string`
  - `number`: 整数(`int`)和小数(`float`)都是 `number`。
  - `boolean`: `false` or `true`
  - 空类型。 这个可以通过 TS 的 [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) 配置项来决定是否允许空类型。 或者使用 `!` 来断言某变量的类型一定不是 `null` 和  `undefined`。
    - `undefined`
    - `null`
  - `bigint`
  - [`symbol`](https://www.typescriptlang.org/docs/handbook/symbols.html)

  举个🌰
  ```ts
  function liveDangerously(x?: number | null): string {
    return x!.toFixed()
  }
  ```

- `any`。 这个可以通过 TS 的 [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) 配置项来决定是否允许 `any` 类型。
- [`unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)

  举个🌰
  ```ts
  function f1(a: any) {
    a.b(); // ✔️
  }
  function f2(a: unknown) {
    a.b(); // ❌: 'a' is of type 'unknown'.
  }
  ```


- [`void`](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)
- [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never)

  举个🌰
  ```ts
  function noop() { } // TS 自动类型推断出返回值是 void
  function fail(msg: string): never { // 抛出错误, 不会有任何返回值(包括 void)
    throw new Error(msg);
  }
  ```

- 数组 [`Arrays`, `[]`](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-array-type)
- 元组 [`Tuples`, `[]`](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

  举个🌰
  ```ts
  let myArray: string[] = ['hello', 'world'] // 类型是数组
  let myTuple: [string, number, number] = ['add', 1, 2] // 类型是元组
  ```

- 枚举 [`enums`, `[]`](https://www.typescriptlang.org/docs/handbook/enums.html)

  举个🌰
  ```ts
  enum Direction { Up, Down }
  let action: Direction = Direction.Up // 0
  ```

- 对象 [`Objects`, `{}`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types)
- 函数, [`Function`](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- 类([Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)), `class`
- 泛型 [`Generics`, `<>`](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions)
- 接口([Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)), `interface`
- 类型别名([Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)), `type`
- 类型断言([Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)), `as` `<>`
- 类型操作, [`keyof`](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html), [`typeof`](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
- 联合类型([Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)), `|`
- 交叉类型([Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)), `&`
- 内置类型([Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html))
- 相关操作符
  - `?` 将参数设置为可选
  - `-?` 符号可以将可选参数设为必选参数
  - `!` 来断言某变量的类型一定不是 `null` 和  `undefined`
  - `&` 交叉类型的操作符
  - `|` 联合类型的操作符
  - `as` 类型断言
  - `keyof` 获取所有键的字符串形式, 并使用 `|` 将其组合起来
  - `typeof` 获取类型
  - `in` 遍历

### TS - 函数

TS 中定义函数时, 需要指定函数的 **参数类型** 和 **返回值类型**。
不过, 由于 TS 有类型推断功能, 所以有时候可以省略类型的指定, 但建议还是自己手动指定比较好。

```ts
// 参数 a 是可选的, 类型会被自动推断为 number
function f (a = 1) {
  return a.toString() // 同理返回值类型会被自动推断为 string
}

// 也可以显式声明类型。 参数有默认值, 该参数就是可选参数。 也可以通过加问号来显式声明为可选参数
function fn (a: number = 1, b?: number): string {
  return a.toString()
}

console.log(f())
console.log(fn())
```

函数本身也可以作为参数传递, 这个时候可以声明该参数的类型:

```ts
function doSomething1 (f: Function) {
  f(1, 2)
}

// type FunctionAdd = (a: number, b: number) => number // 可以用 type, 也可以用 interface
interface FunctionAdd {
  (a: number, b: number): number
}

function doSomething2 (add: FunctionAdd) {
  add(1, 2) // ✔️
  // add('1', '2') // ❌
}
```

函数的参数可以结构赋值, 此时的参数类型声明需要写在对象外面, 不能写在对象里面

🌰:
```ts
// ❌错误示例
function draw({ shape: Shape, xPos: number = 100}) {
    console.log(shape) // ❌ Cannot find name 'shape'. Did you mean 'Shape'?
    console.log(xPos) // ❌ Cannot find name 'xPos'.
}

// ✔️正确示例
function draw({ oldName: newName, xPos = 100}: {oldName: string, xPos: number}) {
    console.log(newName) // ✔️
    console.log(xPos) // ✔️
}
```

### TS - 类

TS 中的类和 JS 的类基本类似, TS 的特点在于:

- 增加了 `public`, `private`, `protected` 修饰符。 (注意: 这些修饰符在编译阶段有效, 编译后生成的 js 一般不会处理为真正的私有。 具体可以自己查看编译后的 js 代码)
- 可定义抽象类 。 抽象类特点:
  - 只能被继承(`extends`), 不能被实例化
  - 抽象类中抽象方法必须被子类实现
- 可以实现(`implements`)接口(`interface`), 通过接口来约束类。

🌰
```ts
abstract class Animal {
  public name: string

  public abstract say(): void

  constructor(name: string) {
    this.name = name
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  // 必须实现 say 函数
  say() {}
}
```

构造函数中, 如果一个属性是公开的, 则像下面这样使用 `public`, 可以省略 `this.xx = xx`
```ts
class Todo {
  constructor(public id: string, public text: string) { }
}
```

### TS - 泛型

这里简单提一下泛型, 只给出基本使用, 暂时不深入了解。

假设现在我们有这么一个需求: 将字符串数组进行反转。 我们可能会这样实现:
```ts
function reverseStrings (list: string[]): string[] {
  let reversedList: string[] = []
  for (let i = list.length - 1; i >= 0; i--) {
    reversedList.push(list[i])
  }
  return reversedList
}
let strings = ["hello", "world", "how", "are", "you"];
console.log(reverseStrings(strings))
```

没过多久, 又有新的需求: 将数字数组进行反转。
这个时候, 我们会发现明明逻辑是一样的, 但原本的函数 `reverseStrings` 却用不了(注意, **TS 是强类型**, 不是 JS, 所以不要以 JS 的方式去看待这个问题)
如果再创建新的函数 `reverseNumbers` 来解决需求, 代码就太冗余了。
这个时候, 泛型出现了。

泛型, 简单的说, 就是为 "类型" 占个位。 这个思维挺好理解的, 就像我们小学学的未知数 x 一样, 我们不知道数字是什么, 于是将它设为 x。
同理, 泛型就是, 我们不知道类型是什么, 于是将它设为 T。 注意这里的 T 只是一个别名, 如果你不喜欢, 可以把它换成 TT, TYPE 甚至 ABCD
使用泛型的效果如下：
```ts
function reverse<T> (list: T[]): T[] {
  let reversedList: T[] = []
  for (let i = list.length - 1; i >= 0; i--) {
    reversedList.push(list[i])
  }
  return reversedList
}
console.log(reverse(["hello", "world", "how", "are", "you"]))
console.log(reverse([1, 0, 2, 4]))
```

注意⚠️, 上面调用函数时, 省略了显式声明泛型的类型这一步, 因为 TS 会自动推导泛型的类型。
完整的代码应该是这样的:

```ts
console.log(reverse<string>(['h', 'e', 'l', 'l', 'o']))
console.log(reverse<number>([1, 0, 2, 4]))
```

还是上面的例子, 当我们直接设定类型为 T 时, 代码是更加通用了, 但是也少了一些限制。
所以泛型常常会与 `extends` 结合使用, 从而对泛型的类型进行约束

🌰
```ts
interface Length { length: number }
// 只接受有 length 属性的参数 arg
function identity<T extends Length>(arg: T): number {
    return arg.length
}
identity('123') // ✔️ 字符串有 length 属性
identity(123) // ❌ number 类型没有 length 属性
```

### TS - 接口 `interface`

接口用于定义对象的类型, 有以下特点:
- 可选属性: `?`
- 只读属性: `readonly`
- 可以描述函数类型
- 可以描述自定义属性

```ts
// 这就叫"描述自定义属性", 它用来表示具有任意属性名称的对象
interface MyObject {
  [_: string]: string;
}
let obj: MyObject = {
  a: 'a',
  b: 'b',
  c: 1, // ❌ 报错, 属性值不是 string 类型
}
```

> `[_: string]: string;` 这里涉及到概念 [**Index Signatures**](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

简单提一下面对对象中的接口和抽象类的区别:
- 一个类可以实现多个接口; 但只能继承一个抽象类
- 接口不提供任何具体的实现; 抽象类可以有抽象方法, 也可以实现具体的方法
- 接口中定义的属性和方法一般都是 public; 抽象类可以是 private, protected

🌰
```ts
// 定义两个接口：可写和可读
interface Writable {
  write (data: string): void
}

interface Readable {
  read (): string
}

// 实现这两个接口的类
class FileStream implements Writable, Readable {
  private buffer: string = '';

  write (data: string) {
    this.buffer += data
  }

  read (): string {
    const data = this.buffer
    this.buffer = ''
    return data
  }
}

const file = new FileStream()
file.write('Hello, ')
file.write('world!')

console.log(file.read()) // Hello, world!
```

### TS - 类型别名 `type`

`type` 用于给类型起个别名

```ts
type Animal = {
  name: string
}

type Dog = Animal & { // 虽然效果类似于 "继承", 但其实叫做合并类型更合理
  bark: string
}

let dog: Dog = {
  name: '旺财',
  bark: '汪汪',
}
```


### TS - 类型断言

有两种写法, 一种是使用 `as`, 另外一种是通过 `<>` 将类型包括起来, 具体看下面例子:

```ts
function test(a: unknown, b: unknown) {
  let len: number
  // len = a.length // ❌ TS 不知道 a 是什么类型, 所以不知道它有没有 length 属性
  // 假设我们知道它肯定是字符串
  len = (a as string).length // 使用  as
  len = (<string>b).length // 使用 <>
}
```

类型断言在某些场景下, 可以解决报错问题:

```ts
// 报错情况:

useEventListener(window, 'mousemove', (event: MouseEvent /* ❌ */ ) => {
  // ❌报错信息: 类型 Event 无法转换为类型 MouseEvent, 因为类型 Event 缺少类型 MouseEvent 的以下属性: pageX, pageY 及其他 23 个属性
  x.value = event.pageX // ✔️
})

useEventListener(window, 'mousemove', (event: Event /* ✔️ */ ) => {
  x.value = event.pageX // ❌ 类型“Event”上不存在属性“pageX”。
})

// ✔️ 正确使用方式:
useEventListener(window, 'mousemove', (event: Event) => {
  x.value = (<MouseEvent>event).pageX // 进行类型断言
})
```

### TS - 类型操作 keyof

对于任何类型 `T`, `keyof T` 的结果为 `T` 上已知的公共属性名的联合。

举个🌰
```ts
interface Person {
  name: string
  age: number
}
type P = keyof Person // 类型为 'name' | 'age',
let a: P = 'age' // 即 a 的值只能是字符串 'name' 或者字符串 'age'
```
从上面例子可以看出, `keyof` 其实可以用联合类型替代。但使用 `keyof` 的好处在于, 它更加灵活, 也节省了代码量

### TS - 类型操作 typeof

`typeof` 和原生 js 的 `typeof` 不太一样。 原生 js 的 `typeof` 返回值只有那些几个固定的字符串, 它不会给出更加具体的类型。
而 TS 中的 `typeof` 弥补了这个缺点, 它可以获取变量更具体的类型。

举个🌰
```ts
interface Person {
  name: string
  age: number
}

let a: keyof Person
type t1 = typeof a // a 还没有赋值, 此时 a 的类型是 'age' | 'name', 即 keyof  Person, 故通过 typeof 获取 a 的类型后, t1 的类型是 keyof Person

a = 'age'
type t2 = typeof a // 当 a 赋值后, 通过 a 获取的类型就只能是 'age', 所以 t2 的类型是 'age'

// 这一段可能有些人会觉得怪怪的, 想要深入认识, 只能看 TS 源码。 这里就先记住就行
```

### TS - 联合类型

可以将多个类型通过 `|` 运算符联合起来

举个🌰
```ts
type t1 = string | number // 表示该类型可以是 字符串类型, 也可以是数字类型
let a: t1 = '123'
a = 123
```

### TS - 交叉类型

顾名思义, 将多个类型通过 `&` 运算符交叉起来。需要注意, 交叉类型不能乱写, 不能没有意义。
比如 `string & number` 的结果会是 `never` 类型。 所以通常是将多个复杂类型(对象)交叉起来

🌰
```ts
type t1 = { a: number }
type t2 = { b: number }
type t3 = t1 & t2
// 此时, v1 必须要有 a b 两个属性
const v1: t3 = { a: 1 } // ❌: 缺少属性 b
const v2: t3 = { a: 1, b: 2 } // ✔️

```

🌰:`&` 和 `Record` 的结合使用:
```ts
type t = Record<'a' & 'b', number>
// t 类型只要求对象的属性有 a 和 b 其中一个, 不要求全有
const v1: t = { a: 1 }       // ✔️
const v2: t = { b: 1 }       // ✔️
const v3: t = { a: 2, b: 1 } // ✔️
```


### TS - Utility Types - `Record<Keys, Type>`

Utility Types 是 TS 官网为方便处理类型转换而提供的工具类型。
这里只介绍 `Record<Keys, Type>` , 想要查看更多, 可到 [官网](https://www.typescriptlang.org/docs/handbook/utility-types.html) 查看

这些工具类型其实我们自己也可以创建, 只不过有一些工具很常见, 所以 TS 直接内置了。
下面代码就是 `Record<Keys, Type>` 的实现, 看不懂没事, 明白自己也能创建这些类型就可以了。
> 想要查看源码, 可以在 vscode 中通过 ctrl + 鼠标左键 直接跳转
```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

先来认识一下 `Record<Keys, Type>` 的作用

> [官网解释](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) Constructs an object type whose property keys are `Keys` and whose property values are `Type`.
> This utility can be used to map the properties of a type to another type.
>
> 理解性翻译: `Record` 是一个对象类型，它的的属性是 `Keys` 类型, 属性值是 `Type` 类型。
> 它的作用就是从一种类型(`Keys`)映射到另外一种类型(`Type`)。

简单的说, 就是 `Record` 用于声明一个对象的 **键** 类型和 **值** 类型。不太理解没关系, 直接看下面给的几个例子就明白了:

🌰
```ts
type info = 'name' | 'address'
// person 对象的 key 类型是 info。 需要注意的是, key 必须有 name 和 address, 不能多也不能少。
// 每一个 key 的值类型是 string
const person: Record<info, string> = {
    name: '张三',
    address: '北京'
}
```

🌰
```ts
interface Info {
    name: string,
    address: string
}
// 其实和前面一样的, 只不过这里结合了 keyof, 而 keyof Info 其实就是 'name' | 'address'
const person: Record<keyof Info, string> = {
    name: '张三',
    address: '北京'
}
```

🌰
```ts
// 下面这两个类型是一样的
type studentScore1 = { [x: string]: number }
type studentScore2 = Record<string, number>
```

🌰
```ts
interface PersonInfo {
  name: string
  age: number
}
type CoupleName = '梁山伯' | '祝英台'

const couple: Record<CoupleName, PersonInfo> = {
  // 该对象的 key 必须是 '梁山伯', '祝英台', 不能多也不能少
  // 并且, 每个 key 的 value 类型必须是 PersonInfo 类型
  梁山伯: { name: '梁山伯', age: 20, },
  祝英台: { name: '祝英台', age: 20, }
}
```

## 🍕 TS 进阶

### 类型别名 `type` 和接口 `interface` 区别

定义类型时, 很多时候我们会发现使用 `type` 和 `interface` 是一样的。
但其实两者之间还是有些 [区别](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) 的。
`interface` 一般是用来定义类型的, `type` 一般是用来为某一个类型命名的。

- `interface` 可以合并重复声明,　`type` 不行

  ```ts
  interface Animal {
    name: string
  }

  interface Animal {
    age: number
  }

  const animal: Animal = { // 这里的 Animal 相当于前面两个接口的组合
    name: 'dog',
    age: 3,
  }

  type A = { name: string }
  type A = { age: number } // ❌ 报错
  ```

- `type` 可以对基本类型(primitives) 重命名, `interface` 不行

  ```ts
  type Str = string

  interface S extends string { } // ❌ 这是不可能的
  ```

- `interface` 可以被类实现(implements), 但 `type` 不可以

### 泛型相关的操作符

- `typeof`: 获取类型
- `keyof`: 获取所有键
- `in`: 遍历枚举类型
- `T[K]` 索引访问
- `extends` 泛型约束

具体操作符有什么作用, 还是通过例子来学习比较好:

🌰 `Record<K, T>` 的实现
```ts
// 首先看 Record<K, T>, 这里面的 K 和 T 就是表示两种类型, 之所以明明为 K 和 T,
//    是因为我们会将第一个类型作为 key, 将第二个类型作为 属性值的 type
// 然后看 K extends keyof any, 这里的 extends 是为了对 K 类型进行一个限制,
//    因为后面我们会使用 in 对 K 进行一个遍历, 所以我们要求 K 类型一定是一个联合类型
//    但具体是什么样子的联合类型, 我们不关心, 所以这里是 extends keyof any
//    如果还不理解, 那么记住: 如果没有 extends keyof any, 那么后面的 [P in K] 就会报错,
//    原因在于 in 要求 K 是一个联合类型, 这样 in 才可以遍历
//    注意, 虽然这里是 keyof any, 但实际上是 keyof string | number | symbol
//    原因在于对象的 key 只能是这三种类型之一
// 再看 [...]: T, 这种用中括号的写法, 叫做 Index Signatures, 中文好像喜欢把它叫做索引类型
//    Index Signatures 的作用在于, 我们不知道具体的 key 是什么, 但我们知道 value 的类型是什么
//    比如这里就是, 具体的 key 是什么, 我们不知道, 但是我们知道它的 value 类型一定得是 T 类型
// 最后看 [P in K], 这可能是最难理解的地方, 最好的学习方式应该是看 TS 源码, 可惜我还没到这水平。
//    in 的作用就是将 联合类型 K 中的每一个字符串都取出来
//    P in K 指的就是, P 的类型一定是 K 中的某一个字符串
//    P in K 和 [...] 结合后, 就相当于将 K 中的每一个字符串都取出来了。
//    注意: 我这里之所以说 " K 中的字符串", 是因为, keyof 的结果都是 '' | '' | ... 这样子的, 也就是若干个指定字符串的联合
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

🌰 `Readonly<T>` 的实现
```ts
// 如果大概懂了前面 Record<K, T>, 再来看这个就很简单了
//  首先, 泛型只占位了一个类型, 这个类型叫做 T
//  然后, 通过 keyof T, 将类型 T 中的所有键都取出来的, keyof T 的结果类似于 'key1' | 'key2' | 'key3'
//  P in keyof T, 就相当于 P in 'key1' | 'key2' | 'key3', 所以 P 的取值只能是 'key1', 'key2', 'key3' 中的一个
//  但是通过 [..] 的包裹, 该对象中的 key 就要覆盖 keyof T 中的每一个字符串
//  至于该对象中每个属性值的具体类型, 我们不做改变, 原本是什么样, 就是什么样, 所以我们通过 T[P] 来获取原本的类型
//  最后, 加上一个 readonly 实现只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

观察 `Readonly<T>` 的实现, 我们会发现, 如果去掉 `readonly`, 其实对象就是一模一样的。
那么我们可以创建一个 Equal 工具类型, 任意类型, 经过 Equal 的处理后, 都还是原本的值,
这个没有实际意义, 但非常有助于我们对泛型的理解!

```ts
type Equal<T> = {
  [P in keyof T]: T[P]
}
```

🌰 `Partial<T>` 的实现。
```ts
// 现在, 看下面这个源码实现, 就非常简单了吧
// 它就是为每一个属性都添加了一个 ?, 此时类型的每个属性就都变成可选的了
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

🌰 `Required<T>` 的实现
```ts
// 同理, 将每一个属性的 ? 去掉, 不就是必选了嘛
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

### [Index Signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures) (旧版本中称为 [*索引类型 Index types*](https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types) )

有时候, 我们无法提前知道对象的属性是什么, 但是我们知道属性值的类型时,
我们就可以使用借助 **index signature** 来描述这个对象。

🌰:
```ts
type Test = {
    // 符号 key 只是用于说明, 你可以替换为其他任意你喜欢的字符串
    [key: number]: string
}
let test_var1 : Test = { 0: '' }
let test_var2 : Test = { 0: '', 1: '' }
```
指定了 `Test` 类型的属性键是 `number` 类型,属性值是 `string` 类型.

注意⚠️, 对象的键类型只允许是 `number`, `string`, `symbol` 类型
```ts
type Test = {
    [_: object]: string // ❌ 键类型不允许是 对象
}
```

> `ts` 本质还是 `js`, 在 `js` 中的对象属性键, `number` 类型和 `string` 类型是一样的.

个人不建议同时使用 string 和 number 索引类型

```ts
class Animal { age: number }
class Dog extends Animal { weight: string }
interface test_error {
    [x: number]: Animal // ❌ “number”索引类型“Animal”不能分配给“string”索引类型“Dog”。
    [x: string]: Dog
}
type test_success = {
    [x: string]: Animal
    [x: number]: Dog
}
// 虽然 test_success 编译成功, 但实际上没什么卵用
let test_var: test_success = {
    1: {age: 1, weight: ''}, // ❌, 提示我 1️⃣ Animal 类型中没有 weight 属性; 2️⃣ 属性键 1 与索引签名不符合
}
```

#### 索引类型 - [中文文档](https://typescript.bootcss.com/advanced-types.html#:~:text=index%20types)中案例的个人理解

使用索引类型，编译器就能够检查使用了动态属性名的代码。
索引类型更像是一种 “用法”，它不像 交叉类型、联合类型、泛型，有非常具体的语法：`&`、`|`、`<T>`。

1. 先看看下面这代代码存在的问题：
```ts
interface Person {
    name: string,
    age: number,
}
function pluck(obj:Person, keys: string[]) {
    return keys.map(k => obj[k])
}
pluck({name:'张三', age:20}, ['name'])
pluck({name:'张三', age:20}, ['name2'])
```
我们期待 `keys` 数组中的元素一定是 `Person` 类型中存在的属性键，
如果传入的 `keys` 不符合要求，我们希望编译器能够检查出来，比如 `['name2']` 就是错误的参数，
但是上面的写法，编译器并不会检查出错误，因为我们的 `keys` 简单粗暴的写成 `string[]`

2. 现在我们对 `keys` 进行进一步的类型限制:
```ts
interface Person {
    name: string,
    age: number,
}
function pluck<K extends keyof Person>(obj:Person, keys: K[]):Person[K][] {
    return keys.map(k => obj[k])
}
pluck({name:'张三', age:20}, ['name']) // Success
pluck({name:'张三', age:20}, ['name2']) // Error: 现在编译器就成功的检查出错误了
```

3. 进一步扩展
现在，让我们把需求稍微改一下，前面我们限制 `obj` 是 `Person` 类型，
现在我们要把它改的更加通用一点。
我们要求 `obj` 是任意的对象类型，同时对 `keys` 的要求不变，
要求 `keys` 数组的元素一定是 `obj` 对象中存在的属性键。
那么我们可以这样写：
```ts
function pluck<T, K extends keyof T>(per: T, keys: K[]): T[K][] {
    return keys.map(k => per[k])
}
pluck({ name: '张三' }, ['name']) // Success
pluck({ age: 20 }, ['age']) // Success
```
这，就叫做 **索引类型**



## 🍕 TS 实战

所谓实战, 就是在项目中实际使用 TS。
其实这部分才是最复杂的, 这就像是一个初学编程的人刚上来就使用 vscode 敲 C 语言代码一样。
你可能 C 语言的各种语法都会了, 但你并不会使用 vscode 运行 C 语言,
就算运行成功了, 你可能也还不会调试
就算你调试成功了, 你也看不懂调试版的相关信息
此外, 还有代码提示呀, 莫名其妙的报错和警告呀(不影响真正的编译)。
之所以说这部分是最复杂, 是因为实战是一个积累的过程。

因为这部分过于复杂, 所以我也只能给出一些基本概念, 这样当出现问题时, 至少有个方向, 有个思路。

### TS - 声明文件

- `tsconfig.json`: TS 的配置文件。 这里面有很多配置, 比如配置 ES 的版本, 配置是否检查空类型之类的
- `*.d.ts`: 对于我们自己创建的类型, 我们可以将它们统一放在声明文件中
- `@types/`: 对于第三方库, 他们的 TS 类型包是以 `@types/` 为前缀。 比如 `@types/express`
- `declare`: TS 提供的关键字, 用于声明相关类型, 避免一些错误的类型检查

### TS - 泛型约束后端接口类型

这是一个简单的例子, 当我们编写前端代码时, 可以将后端给的接口定义为 interface, 这样我们写代码时不容易出错

```ts
import axios from 'axios'

// 通过定义 API 接口, 来约束后端接口, 防止写错 url 或者传输了错误的错误类型
interface API {
  '/book/detail': {
    id: number,
  },
  '/book/comment': {
    id: number,
    comment: string,
  },
}

// 借助泛型, 将接口添加在 request 函数中, 后面通过 request 函数调用, 编译器可以为我们提供类型检查
function request<T extends keyof API> (url: T, obj: API[T]) {
  return axios.post(url, obj)
}

// ✔️
request('/book/comment', {
  id: 1,
  comment: '懂得都懂, 不懂的我说了你也不懂'
})

// ❌, url 错误, 我们可以很快的知道
request('/book/test', {
  id: 1,
})

// ❌, 传输的数据类型错误
request('/book/detail', {
  id: 1,
  comment: '懂得都懂, 不懂的我说了你也不懂'
})
```

简单提一嘴, 当我们使用 nodejs 进行后端开发时, 我们也可以通过 TS 进行开发,
但一定要注意, TS 只是在我们编写代码时提供类型检查, 后端实战中, 我们还需要编写具体的类型检查函数进行处理
不要以为后端用了 TS 开发后, 就可以限制前端传送过来的包的数据类型了!
