# rollup + babel 处理 ts

除了借助 babel 处理 ts 外，还可以利用 rollup 官方提供的 [`@rollup/plugin-typescript`](https://github.com/rollup/plugins/tree/master/packages/typescript) 插件，它是利用 `tsc` 进行处理的。

## 安装依赖

```sh
npm init -y

npm i -D rollup
# 核心，用于打包
npm i -D @rollup/plugin-babel
# 核心，让 rollup 无缝衔接 babel
npm i -D @babel/preset-typescript
# 核心，让 babel 能够编译 ts 文件（不会进行类型检查）

npm i -D @rollup/plugin-node-resolve
# 可选，用于解析代码中的外部依赖，添加该插件后默认会将所有依赖打包进 build.js 中
npm i -D @rollup/plugin-commonjs
# 可选，外部依赖的导出大部分是 commonjs 格式，需要先进过该插件的处理
npm i -D @rollup/plugin-node-resolve
# rollup 默认不会自动判断扩展名，所以需要通过该插件来自动解析扩展名
npm i -D @rollup/plugin-terser
# 可选，最小化打包后的代码。
npm i -D @babel/preset-env
# 可选，将代码转译为 ES6，比如箭头函数变成普通函数

npm i log-snapshot the-answer
# 可选，用于测试外部模块的打包
```

## 配置 rollup 和 babel

在根目录下创建 `rollup.config.js`，然后添加以下内容

```js
import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

// 使用 defineConfig 是为了获得类型提示，直接导出一个对象也是可以的
export default defineConfig({
    input: 'src/index.ts',
    // resolve() 默认会将所有外部依赖打包，不想打包的外部依赖需要添加到这里
    external: ['the-answer'],
    plugins: [
        // 导入模块时，经常会省略扩展名，该插件就是用来自动判断扩展名的
        nodeResolve({ extensions: ['.ts'] }),
        // ⚠️ extensions 默认不包含 ts，所以需要提供 .ts
        babel({ babelHelpers: 'bundled', extensions: ['.ts'] }),
        commonjs(),
        resolve(),
    ],
    output: [
        {
            file: 'dist/build.js',
            format: 'cjs',
        },
        {
            file: 'dist/build.min.js',
            format: 'cjs',
            plugins: [terser()], // 打包后再处理的插件要放在这里
        },
    ],
})
```

（可以在 src 下，也可以在根目录下）创建 `.babelrc.json` 然后添加以下内容。

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

## 编写 ts 源代码

创建 `src/index.ts` 文件，写入以下内容

```ts
import { snapshot } from 'log-snapshot'
import answer from 'the-answer'
import add from './add'

export function test(obj: object): () => number {
    return () => {
        snapshot(obj)
        console.log(add('1', '2'))
        return answer
    }
}
```

创建 `src/add.ts` 文件，写入以下内容

```ts
export default function add(a: string, b: string): number {
    return Number(a) + Number(b)
}
```

## 测试打包效果

直接运行 `npm rollup -c`，或者在 package.json 中添加以下命令，然后运行 `npm run build`

```json
"scripts": {
    "build": "rollup --config"
},
```

运行后会发现 build.js 中，箭头函数变成了普通函数，`log-snapshot` 这个外部模块被打包进去了，而 `the-answer` 依旧是外部模块，并未打包。

## 我遇到的坑

1. babel 不生效。解决方法是为 babel 提供 `ts` 扩展名
2. rollup 无法解析 `./add` 位置。解决方法是使用 `@rollup/plugin-node-resolve` 模块。
