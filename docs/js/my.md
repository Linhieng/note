
## 对象的遍历有哪些方法？各自有什么区别

对象描述符中的 writable 和 configurable 对是否可遍历没有影响

| 方式                              | 继承属性 | 不可枚举属性 | symbol 属性 |
| --------------------------------- | -------- | ------------ | ----------- |
| for...in                          | ✅       | ✅           | ❌          |
| Object.keys                       | ❌       | ❌           | ❌          |
| Object.getOwnPropertyNames        | ❌       | ✅           | ❌          |
| Object.getOwnPropertySymbols      | ❌       | ❌           | ✅          |
| Reflect.ownKeys                   | ❌       | ✅           | ✅          |
| *Object.getOwnPropertyDescriptors | ❌       | ✅           | ✅          |

上述遍历，都遵守同样的属性遍历的次序规则：
1. 先数值，按升序
2. 再字符，按加入时间
3. 最后 Symbol，按加入时间

```js
const parent = {
    p1: 1
}
const obj = Object.create(parent)
Object.defineProperties(obj, {
    common: {
        value: '字面量创建的属性',
        writable: true ,
        enumerable: true ,
        configurable: true
    },
    noEnum: {
        value: '不可枚举',
        writable: true,
        enumerable: false,
        configurable: true
    },
    noConfigurable: {
        value: '不可配置',
        writable: true,
        enumerable: true,
        configurable: false
    },
    noWritable: {
        value: '不可写',
        writable: false,
        enumerable: true,
        configurable: true
    },
    [Symbol('一个 Symbol 属性')]: {
        value: '一个 symbol 属性',
        writable: true,
        enumerable: true,
        configurable: true
    }
})

for (const key in obj) {
    console.log('key: ', key);
}
console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Reflect.ownKeys(obj));
console.log(Object.getOwnPropertyDescriptors(obj));
```

## 判断是否有特定属性

| 方式                            | 继承属性 | 不可枚举属性 | symbol 属性 |
| ------------------------------- | -------- | ------------ | ----------- |
| Object.hasOwn                   | ❌       | ✅           | ❌          |
| *Object.getOwnPropertyDescriptor | ❌       | ✅           | ✅ |

```js
const parent = {
    p1: 1
}
const obj = Object.create(parent)
const symbolKey = Symbol('一个 Symbol 属性')
Object.defineProperties(obj, {
    common: {
        value: '字面量创建的属性',
        writable: true ,
        enumerable: true ,
        configurable: true
    },
    noEnum: {
        value: '不可枚举',
        writable: true,
        enumerable: false,
        configurable: true
    },
    noConfigurable: {
        value: '不可配置',
        writable: true,
        enumerable: true,
        configurable: false
    },
    noWritable: {
        value: '不可写',
        writable: false,
        enumerable: true,
        configurable: true
    },
    symbolKey: {
        value: '一个 symbol 属性',
        writable: true,
        enumerable: true,
        configurable: true
    }
})


console.log(Object.hasOwn(obj, 'p1')); // false
console.log(Object.hasOwn(obj, 'common'));
console.log(Object.hasOwn(obj, 'noEnum'));
console.log(Object.hasOwn(obj, 'noConfigurable'));
console.log(Object.hasOwn(obj, 'noWritable'));
console.log(Object.hasOwn(obj, symbolKey)); // false

console.log(Object.getOwnPropertyDescriptors(obj));


console.log(Object.getOwnPropertyDescriptor (obj, 'p1'));
console.log(Object.getOwnPropertyDescriptor (obj, 'common'));
console.log(Object.getOwnPropertyDescriptor (obj, 'noEnum'));
console.log(Object.getOwnPropertyDescriptor (obj, 'noConfigurable'));
console.log(Object.getOwnPropertyDescriptor (obj, 'noWritable'));
console.log(Object.getOwnPropertyDescriptor (obj, symbolKey));
```

## ES6 中数组新增的内容

- 扩展运算符 `...` (Spread syntax)
- Array.from(), Array.of()
- copyWithin()
- find()、findIndex()
- fill()
- entries()，keys()，values()
- includes()
- flat()，flatMap()

## for..of 简述

for...of 语句执行一个循环，该循环处理来自**可迭代对象的值序列**。可迭代对象包括内置对象的实例，例如 **Array**、**String**、TypedArray、Map、Set、NodeList（以及其他 DOM 集合），还包括 arguments 对象、由生成器函数生成的生成器，以及用户定义的可迭代对象。

## this 简述

- 箭头函数不提供自身的 this 绑定，this 的值将保持为闭合词法上下文的值。所谓闭合词法上下文，指的就是代码的位置，这是静态的。

- 函数的调用方式决定了 this 的值（运行时绑定）。不能在执行期间被赋值，并且在每次函数被调用时 this 的值也可能会不同。

- this 不能在执行期间被赋值，意思就是不能将 this 作为左值。`this = xx` 这种语法会报错


## 说说 JavaScript 中判断数据类型的几种方法

### typeof

```js
// typeof 只会输出下面几个值
console.log(typeof 6);               // 'number'
console.log(typeof true);            // 'boolean'
console.log(typeof '');              // 'string'
console.log(typeof Symbol())         // 'symbol'
console.log(typeof BigInt(0))        // 'bigint'
console.log(typeof {});              // 'object'
console.log(typeof undefined);       // 'undefined'
console.log(typeof function(){});    // 'function'


// null 的数据类型被 typeof 解释为 object
console.log(typeof null);            // 'object'

// []数组的数据类型在 typeof 中被解释为 object
console.log(typeof []);              // 'object'
```

### instanceof

instanceof 可以准确的判断引用数据类型，它的原理是检测构造函数的 `prototype` 属性是否在某个实例对象的原型链上

**语法：**

```js
Object        instanceof constructor // true
0             instanceof Number      // false 字面量创建的是原始类型，不是包装类型
true          instanceof Boolean     // false 字面量创建的是原始类型，不是包装类型
''            instanceof String      // false 字面量创建的是原始类型，不是包装类型
[]            instanceof Array       // true
function(){}  instanceof Function    // true
{}            instanceof Object      // true


new String('') instanceof String // true  有 new 时创建的是包装类型
String('')     instanceof String // false 没有 new 时等同字面量创建
new Number()   instanceof Number // true  有 new 时创建的是包装类型
Number()       instanceof Number // false 没有 new 时等同字面量创建
```

### constructor (构造函数)

当一个函数被定义时，JS引擎会为函数添加 `prototype` 属性，然后在 `prototype` 属性上添加一个 `constructor` 属性，并让其指向该函数。

```js{1}
>> (function Fn(){}).prototype
<< {}
<<    constructor: ƒ Fn()
<<    [[Prototype]]: Object
```

当执行 `let f = new F()`时，F被当成了构造函数，f是F的实例对象，此时F原型上的constructor属性传递到了f上，所以 `f.constructor === F`

```js
function F(){}
let f = new F()

f.constructor === F // true
```

```js
// 以下结果均为 true，除了 Date()

''        .constructor === String
(0)       .constructor === Number
true      .constructor === Boolean
Symbol()  .constructor === Symbol
BigInt(0) .constructor === BigInt


new String()    .constructor === String
new Number()    .constructor === Number
new Boolean()   .constructor === Boolean
new Object()    .constructor === Object
new Function()  .constructor === Function
new Array()     .constructor === Array
new Date()      .constructor === Date

String()   .constructor === String
Number()   .constructor === Number
Boolean()  .constructor === Boolean
Object()   .constructor === Object
Function() .constructor === Function
Array()    .constructor === Array
Date()     .constructor === Date    // 只有这个是 false
```

> [!WARNING]
> 注意：
> - Symbol 和 BigInt 不能 new
> - 不存在 `Undefined` 和 `Null` 对象


函数的 `construct` 是不稳定的，因为开发者可以重写 `prototype`，原有的 `construction` 引用会丢失，`constructor会默认为Object

```js
function F(){}
F.prototype = {}

let f = new F()
f.constructor === F // false

console.log(f.constructor) //function Object(){..}
```

为什么会变成Object？

因为 `prototype` 被重新赋值的是一个 `{}`， `{}` 是 `new Object()` 的字面量，因此 `new Object()` 会将 Object 原型上的 `constructor` 传递给 `{}`，也就是 Object 本身。

因此，为了规范开发，在重写对象原型时一般都需要重新给 `constructor` 赋值，以保证对象实例的类型不被篡改。

### Object.prototype.toString.call()

toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object XxxxType] ，其中 XxxxType 就是对象的类型。

对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

```js
// edge
Object.prototype.toString.call('')               // [object String]
Object.prototype.toString.call(1)                // [object Number]
Object.prototype.toString.call(true)             // [object Boolean]
Object.prototype.toString.call(Symbol())         // [object Symbol]
Object.prototype.toString.call(BigInt(0))        // [object BigInt]
Object.prototype.toString.call(undefined)        // [object Undefined]
Object.prototype.toString.call(null)             // [object Null]
Object.prototype.toString.call(new Function())   // [object Function]
Object.prototype.toString.call(new Date())       // [object Date]
Object.prototype.toString.call([])               // [object Array]
Object.prototype.toString.call(new RegExp())     // [object RegExp]
Object.prototype.toString.call(new Error())      // [object Error]
Object.prototype.toString.call(document)         // [object HTMLDocument]
Object.prototype.toString.call(window)           // [object Window]
Object.prototype.toString.call(this)             // [object Window]


// nodejs 20.11.1
Object.prototype.toString.call('')              // [object String]
Object.prototype.toString.call(1)               // [object Number]
Object.prototype.toString.call(true)            // [object Boolean]
Object.prototype.toString.call(undefined)       // [object Undefined]
Object.prototype.toString.call(null)            // [object Null]
Object.prototype.toString.call(Symbol())        // [object Symbol]
Object.prototype.toString.call(BigInt(0))       // [object BigInt]
Object.prototype.toString.call(new Function())  // [object Function]
Object.prototype.toString.call(new Date())      // [object Date]
Object.prototype.toString.call([])              // [object Array]
Object.prototype.toString.call(new RegExp())    // [object RegExp]
Object.prototype.toString.call(new Error())     // [object Error]
Object.prototype.toString.call(this)            // [object Object]
Object.prototype.toString.call(global)          // [object global]
```

## js 数据类型转换

在JavaScript中类型转换有三种情况：

- 转换为数字（调用 Number(), parseInt(), parseFloat()方法）
- 转换为字符串（调用 .toString() 或 String()方法）
- 转换为布尔值（调用 Boolean()方法）

**null、undefined没有.toString方法**

### 转换为数字

- Number()：可以把任意值转换成数字，如果要转换的字符串中有不是数字的值，则会返回`NaN`

```js
Number('1')        // 1
Number('  1')      // 1
Number('\t1')      // 1
Number(true)       // 1
Number(BigInt(0))  // 0
Number('123s')     // NaN
Number({})         // NaN
Number(Symbol())   // ❌ 报错！
```

- parseInt(string,radix)：解析一个字符串并返回指定基数的十进制整数，radix是2-36之间的整数，表示被解析字符串的基数（几进制）。

```js
parseInt('002')   // 2 默认是 10 进制
parseInt('\t2')   // 2 默认是 10 进制
parseInt('2',2)   // NaN
parseInt('11',2)  // 3
parseInt('f',16)  // 15
parseInt('a123')  // NaN  如果第一个字符不是数字或者符号就返回 NaN
parseInt('123px') // 123
```

- parseFloat(string)：解析一个参数并返回一个浮点数

```js
parseFloat('123px')      // 123
parseFloat('123px.01')   // 123
parseFloat('123.01px')   // 123.01
parseFloat('123.01.1px') // 123.01
parseFloat('123.px.1px') // 123
parseFloat('px1')        // NaN
```

- 隐式转换。一元运算符 `+` 用于转换字符串为数字。二元运算符 `+` 可用于拼接字符串（优先级高）和对数字进行相加。二元运算符 `-` 只能用于数字相加，所以会隐式转换为数字

```js
'123' - 1  // 122
'123' + 1  // 1231
1 + '123'  // 1123
+'123' + 1 // 124
1 + -'123' // -122
```

### 转换为字符串

- .toString() **⚠️注意：null,undefined 不能调用**

```js
(123).toString()    // '123'
(123).toString(2)   // '1111011'
(123).toString(16)  // '7b'
[].toString()       // '' 空字符串
{}.toString()       // '[object Object]'
true.toString()     // 'true'


// 不要忘了前面的 toString
Object.prototype.toString.call((123))   // [object Number]
Object.prototype.toString.call([])      // [object Array]
Object.prototype.toString.call({})      // [object Object]
Object.prototype.toString.call(true)    // [object Boolean]
```

- String() 都能转

```js
String((123))             // '123'
String(true)              // 'true'
String(Symbol())          // 'Symbol()'
String(BigInt(0))         // '0'
String(undefined)         // 'undefined'
String(null)              // 'null'
String([])                // '' 空字符串
String({})                // '[object Object]'
String(new Date())        // Thu Mar 21 2024 09:03:07 GMT+0800 (中国标准时间)
String(()=>{})            // '()=>{}'
String(function f(x){})   // 'function f(x){}'
String([1, true, [], {}]) // '1,true,,[object Object]'
```

- 隐式转换：当+两边有一个是字符串，另一个是其它类型时，会先把其它类型转换为字符串再进行字符串拼接，返回字符串

```js
typeof 1 + ''   // string 变成 '1'
typeof (1 + '') // number
```

### 转换为布尔值

会被识别为 false 的是：
  - `false`
  - `0`
  - `''`空字符串
  - `NaN`
  - `null`
  - `undefined`
注意，空数组 [] 和空对象 {} 被认为是真值。

- Boolean()

```js
Boolean('')          // false
Boolean(0)           // false
Boolean(null)        // false
Boolean(undefined)   // false
Boolean(NaN)         // false
Boolean(1)           // true
Boolean({})          // true
Boolean([])          // true
```

- 条件语句

```js
let a
if(a) {
  //...   //这里a为undefined，会转为false，所以该条件语句内部不会执行
}
```

- 隐式转换 !!

```js
let str = '111'
console.log(!!str) // true
```

- 空值合并运算符 ??

只有 `null` 和 `undefined` 被识别为假值

```js
''        ?? console.log(`''`);
0         ?? console.log('0');
null      ?? console.log('null');
undefined ?? console.log('undefined');
NaN       ?? console.log('NaN');
// 上面只输出 null 和 undefined
```

## 对象和数组的 valueOf 和 toString 返回结果是什么

- valueOf：返回指定对象的原始值

| **对象** | **返回值**                                               |
| -------- | -------------------------------------------------------- |
| Array    | 返回数组对象本身。                                       |
| Boolean  | 布尔值。                                                 |
| Date     | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。 |
| Function | 函数本身。                                               |
| Number   | 数字值。                                                 |
| Object   | 对象本身。这是默认情况。                                 |
| String   | 字符串值。                                               |
|          | Math 和 Error 对象没有 valueOf 方法。                    |

```js
new Array()     .valueOf() // []
new Boolean()   .valueOf() // false
new Date()      .valueOf() // 1710984178427
new Function()  .valueOf() // [Function: anonymous]
(() => {})      .valueOf() // [Function (anonymous)]
new Number()    .valueOf() // 0
new Object()    .valueOf() // {}
new String()    .valueOf() // '' 空字符串

Object.prototype.valueOf.call(new Array())    // []
Object.prototype.valueOf.call(new Boolean())  // [Boolean: false]
Object.prototype.valueOf.call(new Date())     // 2024-03-21T01:22:09.433Z
Object.prototype.valueOf.call(new Function()) // [Function: anonymous]
Object.prototype.valueOf.call(new Number())   // [Number: 0]
Object.prototype.valueOf.call(new Object())   // {}
Object.prototype.valueOf.call(new String())   // [String: '']

// 在浏览器中
(() => {})      .valueOf() // () => {}
new Function()  .valueOf() // ƒ anonymous( ) { }
```

- toString：返回一个表示对象的字符串。默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖，`toString()` 返回 "[object *type*]"，其中 `type` 是对象的类型。

```js
({}).valueOf()   // {}
({}).toString()  // '[object Object]'

[].valueOf()    // []
[].toString()   // ''
```

直接将一个对象作为 key 时，实际上就是将该对象的 toString() 返回的字符串作为 key。记住！对象的 key 只能是 Symbol 或者 String 类型

```js
const obj = {}
const obj1 = {a:1}
const obj2 = {b:2}
obj[obj1] = '1'
obj[obj2] = '2'
console.log(obj[obj1]) // 2
console.log(Reflect.ownKeys(obj)) // [ '[object Object]' ]


const obj = {}
const obj1 = {a:1}
const obj2 = {b:2}
obj1.toString = () => 'obj1'
obj2.toString = () => 'obj2'
obj[obj1] = '1'
obj[obj2] = '2'
console.log(obj[obj1]) // 1
console.log(Reflect.ownKeys(obj)) // [ 'obj1', 'obj2' ]
```

## 事件。事件模型 / 事件处理程序

### target 和 currentTarget 的区别

一个事件传播会经过多个元素，但其中只有一个元素是目标元素，这个元素就成为 target。事件传播过程中每经过元素，这个元素就成为 currentTarget。

比如点击一个特定的按钮 button，那么就会触发一个点击事件，这个事件在传播过程中，可能经过 body、div 和 button，但其中的 target 值始终是 button。

### 事件模型 / 事件处理程序

**HTML 事件处理程序** 直接在标签中绑定事件

```html
<button onclick="window.alert('hello')">点击</button>
```

**DOM0级模型：** ，这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义监听函数，也可以通过 js属性来指定监听函数。这种方式是所有浏览器都兼容的。

只能绑定一个回调，并且会覆盖 HTML 事件处理程序

```html
<!-- 点击时，只输出 world，没有 hello -->
<button onclick="console.log('hello')">点击</button>
<script>
    document.querySelector('button').onclick = () => {
        console.log('world')
    }
</script>
```

**DOM2 级事件模型：** DOM2 Events 为事件处理程序提供了两个方法：addEventListener() 和 removeEventListener()。此外还可以借助 dispatchEvent 触发事件

```html
<button >点击</button>
<button id="cancel">cancel</button>
<script>
    const handle = () => {console.log('hello')}
    const btn = document.querySelector('button')
    btn.addEventListener('click', handle)
    document.querySelector('button#cancel').onclick = () => {
      // 移除时，要提供相同的参数
      btn.removeEventListener('click', handle)
    }
    setInterval(() => {
        // js脚本自动触发事件。此时 isTrusted 为 false
        btn.dispatchEvent(new Event('click'))
    }, 1000)
</script>
```

### 事件委托

事件委托指的是把一个元素的事件委托到另外一个元素上。一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。

> 使用事件委托时，要注意性能。因为注册事件时，对于区域默认会被标记为非滚动区域。
> 为避免使用事件委托带来的副作用，可以在注册事件时传入 `passive: true`。这个选项会提醒浏览器，你仍然希望主线程处理事件，但与此同时合成器线程也可以继续合成新的帧。详见 [inside-browser-part3](https://developers.google.com/web/updates/2018/09/inside-browser-part3)

### 事件传播（三个阶段）

1. 捕获阶段–事件从 window 开始，然后向下到每个元素，直到到达目标元素事件或event.target。
2. 目标阶段–事件已达到目标元素。
3. 冒泡阶段–事件从目标元素冒泡，然后上升到每个元素，直到到达 window。

如果要阻止事件的冒泡，可以借助 stopPropagation 和 stopImmediatePropagation。

### 事件捕获

当事件发生在 DOM 元素上时，该事件并不完全发生在那个元素上。在捕获阶段，事件从window开始，一直到触发事件的元素。`window----> document----> html----> body ---->目标元素`

### 事件冒泡

事件冒泡刚好与事件捕获相反，`当前元素---->body ----> html---->document ---->window`。当事件发生在DOM元素上时，该事件并不完全发生在那个元素上。在冒泡阶段，事件冒泡，或者事件发生在它的父代，祖父母，祖父母的父代，直到到达window为止。

### 如何阻止事件冒泡

w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = true。

return false也可以阻止冒泡。

> 注意！
> 点击 div 中的 button 时，父元素 div 无法阻止事件传播给 button！只有子元素 button 可以阻止事件冒泡给 div，或者阻止事件被 div 捕获。


## 说说 JavaScript 运行机制

### 宏任务和微任务有哪些

宏任务
- setTimeout
- setInterval
- setImmediate (Node 独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

微任务
- Promises 返回的 then
- process.nextTick (Node 独有)
- Object.observe
- MutationObserver
- queueMicrotask

### 宏任务和微任务的区别

只需要记住：执行一个宏任务前，要求微任务队列为空。

### 事件循环

循环，指的就是不断地查看 js 执行栈是否为空。

js 执行栈为空，意味着旧循环的结束，新一轮循环的开始。

一轮事件循环是这样的：

1. js 执行栈为空
2. 会先将微任务队列中的所有微任务填入 js 执行栈中。（在这个过程中如果有新的微任务，那么也会不断的放入 js 执行栈中执行。）
3. 微任务队列为空
4. 只将宏任务中的**一个**任务放入 js 执行栈。
5. js 执行栈执行完宏任务后，再次为空
6. 重复步骤一。


## JS 中数组常用方法

直接操作原数组数据的方法

| method                      | desc                                 |
| --------------------------- | ------------------------------------ |
| `push`                      | 往尾部**插入**若干元素，返回数组长度     |
| `pop`                       | 从尾部弹出一个元素并返回             |
| `unshift`                   | 往头部**插入**若干元素，返回最组长度     |
| `shift`                     | 从头部弹出一个元素并返回             |
| `slice(start, deleteCount)` | 从 start 开始删除 deleteCount 个元素 |

改变顺序:

- `reverse()` 反转元素
- `sort()` 排序，不提供毕竟规则时，会将元素转换字符串进行排序，即使是数字


接收一个函数作为参数的方法：

| method  | desc                                   |
| ------- | -------------------------------------- |
| forEach | 单纯用于遍历                           |
|         |                                        |
| every   | 全部为 true 则返回 true                   |
| some    | 有一个为 true 就返回 true                  |
|         |                                        |
| filter  | 返回由满足条件的元素组成的新数组       |
| map     | 回调函数中返回的元素将组成一个新数组   |
|         |                                        |
| reduce  | 回调函数中能获取前一个回调函数的返回值 |


## stopPropagation 和 stopImmediatePropagation 的区别

stopPropagation 不能阻止默认动作的方法，也不能阻止附加到相同元素的相同事件类型的其他事件处理器。如果要阻止这些相同事件类型处理器的运行，请使用 stopImmediatePropagation() 方法。

### 案例一：点击按钮时，输出 click1, click2, parent

```html
  <div >
      <button>按钮</button>
  </div>
  <style> div { padding: 20; outline: 1px solid black; } </style>
  <script>
      document.querySelector('div').onclick = e => {
          console.log('parent');
      }
      document.querySelector('button').addEventListener('click', (e) => {
          // e.stopPropagation()
          // e.stopImmediatePropagation()
          console.log('click1');
      }/* , true */)
      document.querySelector('button').addEventListener('click', () => {
          console.log('click2');
      }/* , true */)
  </script>
```

### 案例二：使用 e.stopPropagation() 阻止事件冒泡，但不阻止相同元素的相同事件类型的事件处理程序。点击按钮时，只输出 click1, click2。

> 相同事件类型，指的是 type 和 capture 都相同！

```html
<div >
    <button>你好</button>
</div>
<style> div { padding: 20; outline: 1px solid black; } </style>
<script>
    document.querySelector('div').onclick = e => {
        console.log('hello');
    }
    document.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation()
        // e.stopImmediatePropagation()
        console.log('click1');
    }/* , true */)
    document.querySelector('button').addEventListener('click', () => {
        console.log('click2');
    }/* , true */)
  </script>
```

### 案例三：使用 e.stopImmediatePropagation() 阻止事件冒泡，同时阻止相同元素的相同事件类型的事件处理程序。点击按钮时，只输出 click1。

```html
<div >
    <button>你好</button>
</div>
<style> div { padding: 20; outline: 1px solid black; } </style>
<script>
    document.querySelector('div').onclick = e => {
        console.log('hello');
    }
    document.querySelector('button').addEventListener('click', (e) => {
        // e.stopPropagation()
        e.stopImmediatePropagation()
        console.log('click1');
    }/* , true */)
    document.querySelector('button').addEventListener('click', () => {
        console.log('click2');
    }/* , true */)
    // 如果把这里的 capture 设置为 true，则两个事件处理程序的事件类型不同
    // 此时 stopImmediatePropagation 无法阻止这里的 click2 的输出
</script>
```

## 普通函数的 this 指向

普通函数中的 this 指向调用函数时的对象，和函数所在位置无关。

```js
function test() {
    var a = 1
    // this 和函数内的 a 无关
    console.log(this.a)
}
// this 指向只和调用函数时的对象
// 在这里，对象就是全局对象
test() //undefined
```
```js
var a = 2; // window 对象下的变量

function test(){
    var a = 1;
    console.log(this.a);
}

test(); // 打印结果为 2
```

通过对象属性调用函数时的 this
```js
var name = 'China';
var obj = {
    name : 'America',
    show : function() {
        console.log(this.name)
    }
}
// 调用时，show 函数的对象是 obj
obj.show(); // America

// 定义变量 show，此时的对象是全局
const show = obj.show()
// 所以这里的输出是全局中的 name
show(); // China
// 注意，如果是在 nodejs 环境中，则是 undefined，
// 因为 nodejs 中 var 声明的变量不会添加到全局 this 中
```
```js
var name = 'China'
var obj = {
    name: 'America',
    show: function () {
        return function () {
            console.log(this.name)
        }
    }
}

var a = obj.show()
a() // China
```



## call与apply、bind的区别？

- `call(thisArg, arg1, arg2)` 直接调用
- `apply(thisArg, argsArray)` 直接调用
- `bind(thisArg, arg1, arg2)` 返回一个函数

这三个函数都用于改变普通函数中 this 的指向。

## 箭头函数的 this 指向

> - 箭头函数体内的 this 对象，就是**定义该函数时所在的作用域指向的对象**，而不是使用时所在的作用域指向的对象。
> - 箭头函数体内的 this 无法通过 call, apply 或 bind 进行修改

重点在于定义函数时，所在域指向的对象是谁，比如下面例子：

```js
this.name = 'global name'
var name = 'top name'
const obj = {
    name: 'origin',
    f1() {
        console.log(this.name);
    },
    f2: () => {
        console.log(this.name);
    }
}
obj.f1()  // origin
obj.f1.call ({name: 'call'})   // call
obj.f1.apply({name: 'apply'})  // apply
obj.f1.bind ({name: 'bind'})() // bind
obj.f2() // global name
obj.f2.call ({name: 'call'})   // global name
obj.f2.apply({name: 'apply'})  // global name
obj.f2.bind ({name: 'bind'})() // global name

// 如果是在浏览器环境下，则输出的是 top name 而不是 global name
// 因为浏览器中顶级 var 声明会添加到全局对象（也就是 this）上
```

可以看到，f2 中的 this.name 并不是 obj 中的 name。因为定义 f1 函数时的作用域其实是外部的 js 作用域，所以 this 的值是全局对象。


## 常规题：this 作用域

```js
var obj = {
    a: function () {
        console.log(this)
        console.log(this.b)
        console.log(this.c)
        console.log(this.a)
    },
    b: 2,
    c: 3
}
var b = obj.a
b()
// 输出
//       Object [global]
//       undefined   // 在浏览器中输出为 ƒ () { obj.a 函数 }，也就是 var b 的值
//       undefined
//       undefined
//     解释：b() 调用，此时 b 函数所处的执行环境是全局环境，this 指向 global
//     在浏览器中
//         global 实现为 window，通过 var 声明的变量会自动添加到 global 上面
//         所以浏览器中输出 this.b 会打印 var b 的值
//     但在 node 中
//          通过 var 声明的变量不会自动添加到 global 上面
//          所以 this.b 的值是 undefined


obj.a()
// 输出
//      { a: [Function: a], b: 2, c: 3 }
//      2
//      3
//      [Function: a]
//  obj.a() 调用，此时a是作为对象方法进行调用，this指向调用对象obj
```

## `for...of`, `for..in`, `forEach`, `map`

### for...of

用于遍历可迭代对象。常规的对象无法直接遍历！

可以说可迭代对象，除了普通对象之外，几乎全是可迭代对象了！
- String
- Array
- TypedArray
- Map
- Set
- NodeList（以及其他 DOM 集合）
- arguments 对象
- 由生成器函数生成的生成器
- 用户定义的可迭代对象

```js
for (const iterator of [1, '2', true, Symbol()]) {
    console.log(iterator)
    // 1
    // 2
    // true
    // Symbol()
}


const obj = {a:1, b:2, c:3, }
for (const iterator of obj) { } // ❌ TypeError: obj is not iterable


// 但可以通过 Object.keys 遍历
//          Object.values
//          Object.entries
const obj = {
    a:1,
    b: Symbol()
}

for (const iterator of Object.keys(obj)) {
    console.log(iterator);
    // a
    // b
}
for (const iterator of Object.values(obj)) {
    console.log(iterator);
    // 1
    // Symbol()
}
for (const iterator of Object.entries(obj)) {
    console.log(iterator);
    // [ 'a', 1 ]
    // [ 'b', Symbol() ]
}

```

#### for...in

迭代一个对象的所有可枚举字符串属性（除 Symbol 以外），包括继承的可枚举属性。

有关可枚举属性，请参见 [Enumerability_and_ownership_of_properties]

```js
const key = Symbol()
const obj = {
    a: 1,
    b: Symbol(),
    key: '123',
    [Symbol('symbol_key')]: '321'
}

for (const key in obj) {
    console.log(key)
    // a
    // b
    // key
    // 没有 Symbol
}
```

> for..in 和 for..of 记不清？记住外星人，飞碟就可以了。因为飞碟是会飞的东西 Fly**in**g **Object**

#### forEach

> forEach: 只能遍历数组，不能中断，没有返回值(或认为返回值是undefined)。

如果非要中断，那么可以通过抛出异常来解决（这个问题只会出现在面试题，不应该出现项目中）。
其他同类型的函数（map, filter, reduce）也是同理

```js
try {
    [1, 2, 3, 4].forEach(element => {
        console.log(element)
        // 只输出 1
        throw new Error('强制中断')
    })
} catch (error) {
    console.log(error.message)
    // 强制中断
}
```

## 延迟 js 执行和加载的方式

JavaScript会阻塞DOM的解析，因此也就会阻塞DOM的加载。所以有时候我们希望延迟JS的加载来提高页面的加载速度。

- 延迟 js 执行的方法有：
  - 把 script 标签放在页面的最底部延迟执行
  - 使用 defer 属性，延迟执行。该属性对内联脚本无效
  - 使用 async 属性，延迟执行。该属性对内联脚本无效
  - 使用 type="module" 属性，延迟执行。该属性对内联脚本有效。

- 延迟 js 加载的方法有：
  - 动态创建 script 标签，监听dom加载完毕再引入js文件

要点：

- 不管是 defer 还是 async，服务器都是会立即下载的（在浏览器中，下载是在另外一个进程中运行）
- defer 会阻塞 DOMContentLoaded 事件，但 async 不会。
- defer 和 async 执行完成之前都会让页面上方一直在转圈。
- defer 含义：告诉浏览器，本脚本不会修改 DOM，所以请延迟到整个页面都解析完成后再执行。
  - HTML 5 规范 要求 defer 的多个脚本应该按序执行，但实际上并不总是如此。
- async 表示异步，并且无序，它保证在 load 事件前执行，但可能在 DOMContentLoaded 之后执行
- 经过测试，module 也会阻止 DOMContentLoaded 事件

## 通过一些代码输出快速复习相关知识点

使用 == 进行对象与基本类型比较时，会先转化为基本类型再比较
```js
console.log([1,2,3] == [1,2,3])   // false
console.log([1,2,3] == "1,2,3")   // true
console.log([1,2,3] == "1, 2, 3") // false
```

```js
null == undefined  // true ✅
null === undefined // false ❌
NaN  === NaN // false ❌
```
