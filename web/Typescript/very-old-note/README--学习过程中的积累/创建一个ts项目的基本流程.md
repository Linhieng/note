前端创建 ts 项目, 主要使用 vite

后端使用 ts 项目, 主要步骤如下:

```bash
tsc --init
# 初始化 tsconfig.json 文件

npm init @eslint/config
# 初始化 ESLint, 主要是安装 eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin

npm i -D @types/node
# 安装对应的模块类型声明, 比如 @types/node
```

将自己的规则导入 `.eslintrc.js` 文件;
配置 `tsconfig.json` 核心是 `"rootDir": "./src"` 和 `"outDir": "./dist"`;
然后运行 `tsc --watch`;
如果想要配置路径别名, 就还需要使用 `babel`

