# 配置文件 `tsconfig.json`

我觉得学习 TypeScript，更应该注重的是 `tsconfig.json` 配置文件。因为 TypeScript 的语法仅仅只是语法罢了，是属于“死记硬背”的东西，但配置文件则不同。配置文件相对而言更加“深入”，因为你要了解到各个配置项的作用，而这些是需要你有实际的项目经验的，也是你需要花费更多时间的。

学习 tsconfig.json，可以参考[官方文档](https://www.typescriptlang.org/tsconfig)，我这里的笔记，也会结合官方文档，然后再加上自己的理解，来更好的认识每个配置项的作用和意义。

## compilerOptions

### [isolatedModules](https://www.typescriptlang.org/tsconfig/#isolatedModules)

默认是关闭的，当开启后，某些语法将会报错。下面是一下案例

- 案例一：不允许导出一个类型

  ```ts
  // someModule.ts
  export type someType = string
  export function someFunction (){}
  ```

  ```ts
  // main.ts
  import { someType, someFunction } from "./someModule";
  someFunction();
  // 下一行的 someType 将会报错，提示 Re-exporting a type when 'isolatedModules' is enabled requires using 'export type'.ts(1205)
  export { someType, someFunction };
  ```

  原因是开启 `isolatedModules` 后，意味着我们认为编译工具（比如 babel ）无法区分某个变量是不是类型，所以我们需要通过特定的语法来告知它哪些变量是类型变量。

  此时，正确的使用方式应该是这样的：

  ```ts
  import { someType, someFunction } from "./someModule";
  someFunction();
  export { someFunction };
  export type { someType };
  ```

- 案例二：只允许在模块文件中使用 `namespace`

  换句话说，在非模块文件，也就是全局脚本文件中，不允许使用 `namespace`。所以，想要在一个 ts 文件中使用命名空间，可以给其一个空导出 `export {}`

  下面是一个案例代码：

  ```ts
  namespace Instantiated {
      export const x = 1;
  }
  // 如果没有下行代码，该文件是非模块文件。但有了下行代码后，该文件就是脚本文件了
  export {}
  ```

  注意，对于声明文件（`.d.ts`），不受此限制。也就是可以直接使用 `namespace`，无需空导出。

- 案例三：不允许声明 `const enum` 枚举对象

  当开启 `isolateModules` 后，下面代码将不被允许：

  ```ts
  declare const enum Numbers {
      Zero = 0,
      One = 1,
  }
  console.log(Numbers.Zero + Numbers.One);
  ```

  原因在于，其他编译器仅仅只是将 TypeScript 代码转换为 JavaScript 代码，也就是删除那些类型修饰代码，比如上面代码中，`declare` 所声明的 `Numbers` 对象并不属于 JavaScript 代码，故最终生成的代码中并没有 `Numbers` 对象，而第三方工具又并不知道 `Numbers.Zero` 可以被替换成 `0` 。导致在实际运行过程中程序会报错。

  可以自己手动测试一下，使用 babel （版本为 `7.24.*`）编译上面代码，最终的输出内容是 `console.log(Numbers.Zero + Numbers.One)`，而如果使用 `tsc`，则可以正确的输出 `console.log(0 /* Numbers.Zero */ + 1 /* Numbers.One */);`
