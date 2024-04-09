# 迁移中

## 基础

```sh
npm help <term>
# 获取指定命令的帮助信息

-g | --global
# 全局
-S | --save
# （默认）添加到 dependencies
-D | --save-dev
# 添加到 devDependencies

$ npm ci
# 严格按照 package-lock.json 中指定的版本安装依赖

$ npm init [-y]
# 初始化

$ npm (ls | list) [--global] [--depth <depth>]
# 查看安装的包。默认深度为 0。如果输出项中有 extraneous 标识，则标识该包不在 package.json 中。
$ npm prune
# 从 node_modules 中移除 extraneous 标识的包。

$ npm login
# 登录 npm 账号

$ npm publish --access public
# 发布公共包

$ npm unpublish <package-name>@<version>
# 取消某个包的发布，比如 npm unpublish @linhieng/camelcase@0.0.3
```

## npx

npx 可以用来运行本地命令。所谓本地命令，指的是 `.\node_modules\.bin\` 目录中的命令。在此之前，如果想要直接运行本地命令，需要在 package.json 中定义命令，然后通过 `npm run <command>` 的方式调用。

```sh
npx --no
# 包不存在时不要自动安装（--no-install 已废弃）

npx --ignore-existing
# 不要使用本地缓存的模块，而是要强制下载
# 可以通过 npm config get cache 查看环境路径
```

## 配置

```sh
npm (c | config) set            <key>=<value> [<key>=<value> ...]   # 添加/修改配置
npm (c | config) get            [<key> [<key> ...]]                 # 查看配置
npm (c | config) delete         <key>   [<key> ...]                 # 删除配置
npm (c | config) (list | ls)    [--json] [-l | -long]               # 查看配置列表
npm (c | config) edit                                               # 直接编辑配置文件
npm (c | config) fix                                                # 尝试修复无效的配置项

$ npm config list
# 输出自定义的配置项信息

$ npm config list -long
# 查看所有有效值（默认配置、自定义的配置）。

# 初始化项目时的 key 有：
init-author-name
init-author-email
init-author-url
init-license
init-version

init-module
# 一个路径值，默认是 `~/.npm-init.js`


# 配置 registry
npm c set registry https://registry.npmmirror.com
# 这是新的淘宝镜像
# 默认 https://registry.npmjs.org
# 腾讯 https://mirrors.cloud.tencent.com/npm/
# 华为 https://mirrors.huaweicloud.com/repository/npm/

npm config set proxy http://127.0.0.1:7890
# 配置代理

npm c get prefix
# 全局安装时的安装路径（node_global）

npm c get cache
# 全局缓存的路径（node_cache）
```

## 全局模块

```sh
npm root
# Print the effective node_modules folder to standard out.

npm root -g
# 获取全局 node_modules 目录
```

[node 加载模块逻辑](https://nodejs.org/api/modules.html#loading-from-node_modules-folders)

快速配置全局模块：
```powershell
New-Item -ItemType SymbolicLink -Target (npm root -g) -Path "$HOME\.node_modules" -Force
# 1. 在用户目录下创建 node_modules 符号链接

[Environment]::SetEnvironmentVariable("NODE_PATH", $(npm root -g), "Machine")
# 2. 添加 NODE_PATH 环境变量
# 需要管理员权限
```

## 安装本地模块

```sh
npm link
# 将当前目录下的模块作为作为全局模块。案例：
# https://github.com/nodejs/examples/blob/main/cli/commander/fake-names-generator/README.md

npm link <package>
# 安装本地某个模块，需要该模块已经 link 到全局模块中才可以安装。

npm unlink <package> -g
# 卸载某个模块


npm install -g
# 直接当前工作区正在开发的 npm 包安装到本地全局
```

## package.json 中的 script

`scripts` 字段中的 `key` 是[生命周期事件](https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-operation-order)，`value` 是在该声明周期运行的命令。所以某些 key，比如 `install`, `prepare` 都是特殊的生命周期节点

在 package.json 中的 script 上设置环境变量时的语法取决于运行该脚本的终端。比如 bash 中的可以直接使用 `NODE_ENV=production` 设置环境变量。实际上，更推荐在 .env 文件中设置环境变量。

当运行 script 中的脚本，需要传递一个选项给脚本中的命令时，需要添加 `--`。比如 `npm run build -- --watch`，其中的 `--watch` 是传递给`build` 脚本中的命令，而不是传递给 npm 的选项。总的来说，`--` 用于标识后面的内容是参数，而不是选项。
