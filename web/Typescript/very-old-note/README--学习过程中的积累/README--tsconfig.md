## 🍕 报错

将一个 `private.json` 放在 `src` 目录外面时, 引用该文件 ts 会提示 `'rootDir' is expected to contain all source files`, 即使我已经将该文件添加到 `include` 参数中。
这个时候可以试着把 `rootDir` 注释掉, 然后 vscode `reload Windows` 一下

[参考](https://stackoom.com/en/question/3swCg)
[没看](https://stackoverflow.com/questions/51850063/rootdir-is-expected-to-contain-all-source-files)

## 🍕 Compiler Options

`tsconfig.json` 是 ts 编译的配置文件。可以通过 `tsc --init` 命令初始化生成 `tsconfig.json` 配置模板。
执行 `tsc` 命令时, 它会优先使用当前目录下的 `tsconfig.json` 文件。

指定了 `rootDir` 后 `include` 中就不需要包含对应文件夹了

主要注意的是, 不属于同一项目的 ts 代码, 要将他们写入到 `exclude` 中,
虽然可以通过 `rootDir` 指定了源代码位置, 但 ts 默认会识别 **/* 中所有的 ts 文件

### `paths`

配置相对于 `baseUrl` 的路径映射, 比如

```json
{
  "compilerOptions": {
    "baseUrl": ".", // this must be specified if "paths" is specified
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // this mapping is relative to "baseUrl"
    }
  }
}
```

**注意**: 实际编辑时, 并不会转换路径.

### 一些较为简单的配置

- `removeComments` 编译时删除注释信息