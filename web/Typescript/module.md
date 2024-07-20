# 模块

## [模块编译选项](https://www.typescriptlang.org/docs/handbook/modules/reference.html#the-module-compiler-option)

### [`Node16`, `NodeNext`](https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext)

#### [检测模块类型的方法](https://www.typescriptlang.org/docs/handbook/modules/reference.html#module-format-detection)

- 后缀名为 `.mts` / `.mjs` / `.d.mts` 的文件，始终为 ES 模块
- 后缀名为 `.cts` / `.cjs` / `.d.cts` 的文件，始终为 CommonJS 模块
- 后缀名为 `.ts` / `.tsx` / `.js` / `.jsx` / `.d.ts` 的文件，它们的模块类型，取决于 `package.json` 中的 `type` 字段。当 `"type": "module"` 时，它们为 ES 模块，否则为 CommonJS 模块。

上面是检测文件的模块类型的方法，但 TypeScript 并不是完全按照上面检测方法，来决定输出的 JavaScript 文件模块类型的。只有当配置项 `module` 的值为 `NodeNext` / `Node16` 时，TypeScript 才会采用上述的方法来决定 JavaScript 文件的输出格式。

换句话说，当你 **没有** 设置 module 的值为 `NodeNext` / `Node16` 时，整个项目最终产出的文件格式始终只会是一种类型！所以，当你的项目可能运行在 node.js v12 版本或更低的版本时，你只能设置 `module` 的值为 `NodeNext` / `Node16`。

#### [某些选项所隐含的意义](https://www.typescriptlang.org/docs/handbook/modules/reference.html#implied-and-enforced-options)

- 当 `module` 的值为 `NodeNext` / `Node16` 时，选项 `moduleResolution` 必须是 `NodeNext` / `Node16` / 留空
- 当 `module` 的值为 `NodeNext` 时，意味着 `target` 的值为 `ESNext`
- 当 `module` 的值为 `Node16` 时，意味着 `target` 的值为 `ES2022`
- 当 `module` 的值为 `NodeNext` / `Node16` 时，意味着 `esModuleInterop` 为 `true`

### [`ES2015` , `ES2020` , `ES2022` , `ESNext`](https://www.typescriptlang.org/docs/handbook/modules/reference.html#es2015-es2020-es2022-esnext)

小结
- 对于 bundlers, Bun, 和 tsx，可以设置 `ESNext`，并设置 `moduleResolution` 的值为 `bundlers`。
- 不要将这几个配置项用于 NodeJS 项目。而是使用 `Node16` / `NodeNext` 配置项，并在 package.json 文件中设置 `"type": "module"`，这样就会优先产出 ES 模块格式的文件。
