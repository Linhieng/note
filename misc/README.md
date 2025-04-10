# 杂乱

就当做是一个缓存区吧，从现在开始，开发中遇到的一些问题就放在这里。

## 问题：初始化 nuxt 项目的网络问题

运行官方文档的初始化命令，结果遇到网络报错，具体如下：

```powershell
$ pnpm dlx nuxi@latest init nuxt01

[14:50:22]  ERROR  Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json: TypeError: fetch failed
```

我马上想到的解决方案就是配置代理，但是没有效果。不过我是开启全局代理，还是配置环境变量代理，亦或者
配置 pnpm 的代理，都没有效果。

下面是测试的过程：

```powershell
# 配置环境变量代理
$env:all_proxy="http://127.0.0.1:7890"

# 然后通过 curl 命令测试到终端确实走代理了
# 下面是一个示例

$ curl https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json
curl: (6) Could not resolve host: raw.githubusercontent.com

$ $env:all_proxy="http://127.0.0.1:7890"

$ curl https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json
{
  "name": "v3",
  "defaultDir": "nuxt-app",
  "url": "https://nuxt.com",
  "tar": "https://codeload.github.com/nuxt/starter/tar.gz/refs/heads/v3"
}

# 可以看到，配置代理后，确实可以访问了，但即使如此，使用 pnpm 初始化 nuxt 项目时依旧不会走代理。
```

先来分析一下 `pnpm dlx nuxi@latest init nuxt01` 这个命令。
首先，`pnpm dlx` 中的 [dlx 指的是 Download and Execute](https://gist.github.com/devinschumacher/30cda55546a9311df789184a727c3f8d)。意思就是临时下载 `nuxi@latest`，
然后运行 `nuxi init nuxt01` 命令。

将上面命令拆分一下，我发现，下载 `nuxi@latest` 是没问题的。问题就出在 `nuxi init` 命令上。我测试发现这个命令似乎怎么也不走代理（即使我开了全局代理），然后[在文档中](https://nuxt.com/docs/api/commands/init)也没找到专门为该命令配置代理的地方。

接着，阅读一下 nuxi init 的源码，发现[源码](https://github.com/nuxt/cli/blob/main/src/commands/init.ts#L78)是借助了 `giget` 进行下载。

于是继续查看 `giget` 源码，发现了我们的报错信息的出处就在[源码这里](https://github.com/unjs/giget/blob/main/src/giget.ts#L73)。

总的来说，还是网络代理问题，我该如何让它的网络请求确确实实的走我的代理呢？

这种情况真的遇到挺多的了，就是这种不走代理的情况，目前还真没啥解决方案。

不过就这里的 Github 网络问题，可以修改 hosts 文件，手动为 `raw.githubusercontent.com`
指定一个 IP 地址。

## 新知识：View_Transitions_API

[新 API 元素过渡动画](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

## 复习：运行 TypeScript 的几种方式

1. 第一种方式：借助 `TypeScript` 包提供的 `tsc` 命令，将 ts 文件编译成 js 文件，然后再通过 node 运行 js 文件。

2. 第二种方式：借助 `ts-node` 包，直接运行 ts 文件。

3. 第三种方式：借助 `deno`，直接运行 ts 文件

4.


## 网络：nvm 代理失败

又是网络问题。

```powershell
# nvm 设置代理
$ nvm proxy http:127.0.0.1:7890

# 但安装时还是会报错！而且在 clash 中并没有检测到请求，说明请求根本就没有发出去
# 还是不走代理！
$ nvm install latest
# 报错信息如下：
# Could not retrieve https://nodejs.org/dist/latest/SHASUMS256.txt.
# Get "https://nodejs.org/dist/latest/SHASUMS256.txt": proxyconnect tcp: dial tcp :80: connectex: No connection could be made because the target machine actively refused it.


# 关闭代理，结果也是一样的报错信息，只不过是需要等待十几秒后才报错。
# 报错信息如下：
# Could not retrieve https://nodejs.org/dist/latest/SHASUMS256.txt.
# Get "https://nodejs.org/dist/latest/SHASUMS256.txt": dial tcp 104.20.23.46:443: i/o timeout

尝试使用镜像，而不是代理，结果居然报了 403 错误……
$ nvm node_mirror https://mirrors.ustc.edu.cn/node/
$ nvm install latest
Error retrieving "https://mirrors.ustc.edu.cn/node/latest/SHASUMS256.txt": HTTP Status 403

既然他是想要得到 SHASUMS256.txt 文件的内容，那我自己搭建一个网址给他得了。

$ nvm node_mirror http://localhost:3000/
$ nvm install latest
# 测试结果是成功了！但只是这一步成功了，我们又得到了新的报错，信息如下：
# 22.7.0
# Error retrieving "http://localhost:3000/index.json": HTTP Status 404
# 既然如此，那就用最笨的方法，一个一个套。

$ nvm install latest
# 输出结果如下
# 22.7.0
# Downloading node.js version 22.7.0 (64-bit)...
# Download failed. Rolling Back.
# C:\Users\k\AppData\Roaming\nvm\v22.7.0\node.zip
# Rollback failed. remove C:\Users\k\AppData\Roaming\nvm\v22.7.0\node.zip: The process cannot access the file because it is being used by another process.
# Could not download node.js v22.7.0 64-bit executable.
# 可以看到，他开始下载了，但这个下载是失败的！

# 于是我开始尝试直接去官方下载安装包，然后再安装。
# 在看到官方时，我突然意识到一个问题，nvm 本身是不支持 window 的！
# 也许上面的问题，但我换成 ubuntu 系统后都会解决……
# 但事情已经进行到这个地步了，肯定不会退，所以尝试继续走下去。

# 首先就是先下载 window 版本的 node，同时查看他的安装地址是如何的。
# 可以看到，他的地址是 https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi
# 进入 https://nodejs.org/dist/v20.17.0/
# 可以看到各类安装包都在这里。
# 此时，我大概知道 index.json 文明的作用了，他的作用就是查找对应的版本，并选择对应的文件。
# 根据这两个信息，就可以得到安装包的路径了
# 由于我在前面的报错信息中看到了 node.zip 所以我猜测 nvm 下载的是 zip 版本的包。
# 那么我们就拿这个包来测试一下。

# 测试失败了，还是下载失败。
# 不过最后发现，在 nvm for window 的文档中，已经给出了淘宝的 node 镜像源……
# https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#usage

nvm node_mirror https://npmmirror.com/mirrors/node/
# 亏我使用 bing 或谷歌搜索，都搜索不到……
```

## win：重装系统时提示“Windows无法安装到这个磁盘”

解决方案参考自[这个链接](https://www.abackup.com/easybackup-tutorials/windows-cannot-be-installed-on-drive-0-partition-1-666.html)

打开命令行，运行下面命令即可：

```sh
$ diskpart
# 进入磁盘管理

$ list disk
# 列出所选磁盘，此时关注磁盘的序号（从 0 开始）

$ select disk <num>
# 根据磁盘序号选中对应的磁盘

$ clean
# 清除

$ convert gpt
# 将磁盘转换为 GPT 格式。
```

## window 中的火狐浏览器在状态栏中的图标变为白纸

网上找了一些方案，学习了几个新的知识点。
- [图标在任务栏变白板解决方法 - 知乎](https://zhuanlan.zhihu.com/p/437570141)

1. 状态栏的软件所在目录为

    ```
    %APPDATA%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar
    ```

2. 无需关机，直接重启文件夹的方式
  - 使用 cmd
    ```cmd
    taskkill /im explorer.exe /f
    # 停止 explorer

    cd /d %userprofile%\appdata\local
    del iconcache.db
    # 卸载图标缓存

    start explorer.exe
    # 启动 explorer
    ```
  - 使用 powershell
    ```powershell
    taskkill /im explorer.exe /f
    # 停止 explorer

    cd $env:USERPROFILE\AppData\Local
    rm iconcache.db
    # 卸载图标缓存

    start explorer.exe
    # 启动 explorer
    ```

我注意到，上面命令中，一些命令在 cmd 和 powershell 中是通用的，但有些命令则不是。
比如 `TaskKill` 命令，虽然他在 cmd 和 powershell 中都可以使用，但是在 powershell 中输入 `help TaskKill`
是找不到相关信息的。而其他命令 `cd`, `del`, `start` 都可以通过 `help <command>` 找到它们在 powershell 中的说明。
这些命令其实只是 powershell 提供的命令简写。

不过，虽然 `help TaskKill` 没有得到帮助信息，但我们依旧可以使用 `TaskKill /?` 获取帮助信息。

powershell 中清除进程有个类似的命令，叫做 `Stop-Process`，但我感觉它更像是重启：

```powershell
stop-Process -Name explorer
# 运行后，相当于重启 explorer
```

## windows 晚上定时静音

window 中的免打扰，并没法自动静音，想要实现静音效果，还是得借助任务计划程序。

而这需要借助一个工具 [NirSoft](https://www.nirsoft.net/)，这里面包含了很多有用的 window 工具，
比如 [SoundVolumeView](https://www.nirsoft.net/utils/sound_volume_view.html) 就是用来控制
音量的。

首先，先下载 [SoundVolumeView](https://www.nirsoft.net/utils/soundvolumeview-x64.zip)，然后解压
到特定文件夹。如果想要切换语言，则安装[中文包](https://www.nirsoft.net/utils/trans/soundvolumeview_schinese1.zip)，
将里面的 ini 文件夹放到 SoundVolumeView.exe 程序的同级目录下即可。

安装完成后，直接执行 SoundVolumeView.exe 即可实现静音功能，下面是案例：
```sh
.\SoundVolumeView.exe /Switch "{0.0.0.00000000}.{e34a97c5-617d-4d54-98c5-6b6d97b880c6}"
# 切换“扬声器”是否静音

.\SoundVolumeView.exe /Mute "{0.0.0.00000000}.{e34a97c5-617d-4d54-98c5-6b6d97b880c6}"
# 静音

.\SoundVolumeView.exe /Unmute "{0.0.0.00000000}.{e34a97c5-617d-4d54-98c5-6b6d97b880c6}"
# 解除静音
```

注意上面我是借助 ID 来指定“扬声器”这个设备的，实际操作时，可以打开软件，选定特定的扬声器，右键复制 Item ID
即可。

有了这个工具后，直接新建一个计划，让其在特定时间点运行该命令，即可实现定时静音。

## window 修改密码，管理账户的 net user 命令

这个命令居然是在刷短视频时遇到的，标题是忘记电脑密码如何修改，内容大致是：
开机后按 F8 进入帮助界面，然后选择命令行，执行 `net user Administrator 8888` 命令
可以修改密码。具体的话我没测试过，原理似乎是因为系统默认的 Administrator 用户密码为空，
所以可以直接修改密码。

为此，我简单搜索了一下该命令，记录如下：

```powershell
net user
# 查看所有用户

net user <username>
# 查看用户信息

net user <username> *
# 修改密码

net help user
# 获取帮助信息
```

## 复习 vscode 配置默认终端

- 设置 git 路径: `git.path`
- 设置默认的终端，详见 [vscode profile 文档](https://code.visualstudio.com/docs/terminal/profiles)
    ```json
    "terminal.integrated.profiles.windows": {
      "Git Bash": {
        "path": "D:\\soft\\Git\\bin\\bash.exe"
      }
    },
    "terminal.integrated.defaultProfile.windows": "Git Bash"
  ```

## window 命令 cd

cd 命令在 cmd 和 powershell 是不一样的。
- 在 cmd 中，切换盘符时，需要添加 `/D` 参数，具体可以输入命令 `help cd`
- 在 pwsh7 中，则不需要参数，直接运行 `cd d:\` 就可以切换盘符了。

## pnpm 无法安装 webpack

怀疑是缓存问题，而且是重装系统前的缓存问题。
因为缓存文件是在 D:\.pnpm-store\v3 中。重装后该文件夹并没有清理。

通过命令 `pnpm store path` 可以获取缓存路径。

下面是报错的完整输出：

```sh
$ pnpm i -D webpack
 WARN  GET https://registry.npmmirror.com/@types/estree/-/estree-1.0.6.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/wasm-parser/-/wasm-parser-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@types/json-schema/-/json-schema-7.0.15.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/terser-webpack-plugin/-/terser-webpack-plugin-5.3.10.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds.2 retries left.
 WARN  GET https://registry.npmmirror.com/acorn/-/acorn-8.14.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz error (ERR_PNPM_EPERM). Will retryin 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/browserslist/-/browserslist-4.24.2.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/events/-/events-3.3.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/tapable/-/tapable-2.2.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/webpack/-/webpack-5.95.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/enhanced-resolve/-/enhanced-resolve-5.17.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retriesleft.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/ast/-/ast-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/acorn-import-attributes/-/acorn-import-attributes-1.9.5.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/watchpack/-/watchpack-2.4.2.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/schema-utils/-/schema-utils-3.3.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/graceful-fs/-/graceful-fs-4.2.11.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@types/estree/-/estree-1.0.6.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/acorn/-/acorn-8.14.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/browserslist/-/browserslist-4.24.2.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/events/-/events-3.3.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/wasm-parser/-/wasm-parser-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/webpack/-/webpack-5.95.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/ast/-/ast-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/acorn-import-attributes/-/acorn-import-attributes-1.9.5.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@types/json-schema/-/json-schema-7.0.15.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left. WARN  GET https://registry.npmmirror.com/terser-webpack-plugin/-/terser-webpack-plugin-5.3.10.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1retries left.
 WARN  GET https://registry.npmmirror.com/tapable/-/tapable-2.2.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/schema-utils/-/schema-utils-3.3.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/enhanced-resolve/-/enhanced-resolve-5.17.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/watchpack/-/watchpack-2.4.2.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz error (ERR_PNPM_EPERM). Will retryin 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/graceful-fs/-/graceful-fs-4.2.11.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/node-releases/-/node-releases-2.0.18.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/serialize-javascript/-/serialize-javascript-6.0.2.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@xtuc/long/-/long-4.2.2.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@jridgewell/trace-mapping/-/trace-mapping-0.3.25.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@xtuc/ieee754/-/ieee754-1.2.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/electron-to-chromium/-/electron-to-chromium-1.5.49.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2retries left.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/ast/-/ast-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/wasm-parser/-/wasm-parser-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/escalade/-/escalade-3.2.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/picocolors/-/picocolors-1.1.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/terser/-/terser-5.36.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/update-browserslist-db/-/update-browserslist-db-1.1.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/caniuse-lite/-/caniuse-lite-1.0.30001675.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@types/node/-/node-22.8.4.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/merge-stream/-/merge-stream-2.0.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/serialize-javascript/-/serialize-javascript-6.0.2.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@xtuc/long/-/long-4.2.2.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@xtuc/ieee754/-/ieee754-1.2.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/ast/-/ast-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/electron-to-chromium/-/electron-to-chromium-1.5.49.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/escalade/-/escalade-3.2.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@webassemblyjs/wasm-parser/-/wasm-parser-1.12.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/picocolors/-/picocolors-1.1.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/node-releases/-/node-releases-2.0.18.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/terser/-/terser-5.36.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/update-browserslist-db/-/update-browserslist-db-1.1.1.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/caniuse-lite/-/caniuse-lite-1.0.30001675.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@types/node/-/node-22.8.4.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/merge-stream/-/merge-stream-2.0.0.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/@jridgewell/trace-mapping/-/trace-mapping-0.3.25.tgz error (ERR_PNPM_EPERM). Will retry in 1 minute. 1 retries left.
 WARN  GET https://registry.npmmirror.com/randombytes/-/randombytes-2.1.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/supports-color/-/supports-color-8.1.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left. WARN  GET https://registry.npmmirror.com/@jridgewell/source-map/-/source-map-0.3.6.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/commander/-/commander-2.20.3.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/source-map-support/-/source-map-support-0.5.21.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/acorn/-/acorn-8.14.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/punycode/-/punycode-2.3.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/undici-types/-/undici-types-6.19.8.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/safe-buffer/-/safe-buffer-5.2.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/has-flag/-/has-flag-4.0.0.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/@jridgewell/gen-mapping/-/gen-mapping-0.3.5.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/buffer-from/-/buffer-from-1.1.2.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
Packages: +76
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 ERR_PNPM_EPERM  Failed to add tarball from "https://registry.npmmirror.com/webpack/-/webpack-5.95.0.tgz" to store: EPERM: operation not permitted, stat 'D:\.pnpm-store\v3\files\e2\bad52e4e244a06f50bd64fcefa7c942febfac5a814c71095106fd3be64634b8381895d4cce884fbe3b2c20043ce210e6322b135b1b9fb2965bd4ae7a57ba8c'

This error happened while installing a direct dependency of D:\github-code\browser-extension\react
 WARN  GET https://registry.npmmirror.com/source-map/-/source-map-0.6.1.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmmirror.com/webpack-sources/-/webpack-sources-3.2.3.tgz error (ERR_PNPM_EPERM). Will retry in 10 seconds. 2 retries left.
Progress: resolved 77, reused 32, downloaded 0, added 29
```

解决方案：完整地删除 `D:\.pnpm-store`。

所以，尝试直接修改默认的存储路径，将其改在C盘，这样以后重装系统时更方便。

在官方文档中了解了一下，发现官方并不推荐指定存储路径，[原文](https://pnpm.io/faq#store-path-is-specified)如下：

```md
## Store path is specified
If the store path is specified via the store config, then copying occurs between the store and any projects that are on a different disk.

If you run pnpm install on disk A, then the pnpm store must be on disk A. If the pnpm store is located on disk B, then all required packages will be directly copied to the project location instead of being linked. This severely inhibits the storage and performance benefits of pnpm.

## Store path is NOT specified
If the store path is not set, then multiple stores are created (one per drive or filesystem).

If installation is run on disk A, the store will be created on A .pnpm-store under the filesystem root. If later the installation is run on disk B, an independent store will be created on B at .pnpm-store. The projects would still maintain the benefits of pnpm, but each drive may have redundant packages.
```

可以看到，一旦指定路径，那么每一次行为都将从指定路径进行复制。而我的原本是想法是缓存包全部放在 C 盘，代码文件则全部放在 D 盘，结果就是完整地踩中了雷区。

如果不指定 store 路径，那么 pnpm 处于性能考虑，将会在每个磁盘都创建一个 `.pnpm-store` 文件夹，这样一来，每个磁盘都将会有冗余，但性能会更好的。为此，我专门到 F 盘（一个空盘）测试了一下，发现果然如此。当我用 pnpm 安装一个包时，pnpm 提示的是 download，并且磁盘中也多了一个 `.pnpm-store` 文件夹。

所以，还是不要指定路径了，虽然磁盘之间的传输很快，但我们的包文件都是碎文件，文件数量庞大，单纯的速度快并没有什么用。这有点类似于 CPU 和 GPU 的感觉。

## 使用 PaddleOCR 将 PDF 转 word

1. 配置环境，参考[运行环境 - PaddleOCR 文档](https://paddlepaddle.github.io/PaddleOCR/latest/ppocr/environment.html#11-windows)
2. 打开 `Anaconda Prompt`，运行 `conda activate paddle_env` 使用刚刚创建的环境
3. 配置 pip 源，有两种方式
  - 临时指定 `pip install <package> -i https://pypi.tuna.tsinghua.edu.cn/simple`
  - 永久指定 `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple` 该方式其实就是往 pip 的配置文件中写入一行配置
4. 安装 PaddlePaddle `pip install paddlepaddle`
5. 安装 paddleocr `pip install paddleocr`
6. 运行 `paddleocr --image_dir ./xxx.pdf --use_angle_cls true --use_gpu false --page_num 2`

期间出现报错信息：
```
ImportError: Failed importing fitz. This likely means that some paddle modules require additional dependencies that have to be manually installed (usually with `pip install fitz`).
```

尝试安装 `pip install fitz` 无效，但在 [Unable to use fitz with python 3.8 · Issue #523 · pymupdf/PyMuPDF](https://github.com/pymupdf/PyMuPDF/issues/523) 找到解决方案。
最终安装 `pip install pymupdf` 就可以了。

结果发现，这只是一个底层工具，还无法之间导出 word。

再次找到 [PaddleOCR/ppstructure/pdf2word at main · PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR/tree/main/ppstructure/pdf2word)

将该项目拷贝到本地运行。
```sh
git clone https://github.com/PaddlePaddle/PaddleOCR.git
```
然后打开 `Anaconda Prompt`，运行
```sh
conda activate paddle_env
cd D:\github-clone\PaddleOCR-main\ppstructure\pdf2word
pip install pdf2docx
pip install qtpy
python pdf2word.py
```

提示报错：
```
qtpy.QtBindingsNotFoundError: No Qt bindings could be found
```
参考 [qtpy.PythonQtError: No Qt bindings could be found · Issue #3545 · spyder-ide/spyder](https://github.com/spyder-ide/spyder/issues/3545) 的解决方案，重新安装 `pip install pyqt5`

继续运行 `python pdf2word.py`，成功出现界面，打开 PDF 文件试了一下，效果并不好，几乎全是图片，没有文字。
而我的本意是将视频中的文字截图输出为图片，然后再通过 OCR 转化为文字。结果他还是给我文字。不过试了一下其他 PDF 文件，还是有点效果的。

或许我的需求应该是批量图片转文字，但这个好像没有现成的 demo。

## node 导入 json，使用 with 而不是 assert

参考自
- [the new keyword is with instead of assert](https://stackoverflow.com/a/70106896)
- [tc39/proposal-json-modules: Proposal to import JSON files as modules](https://github.com/tc39/proposal-json-modules?tab=readme-ov-file#synopsis)

## word 使用 VBA 批量处理图片居中，还有首行无缩进格式。

直接贴上代码，然后一行一行解释。

```vba
; 定义一个子程序，理解为函数即可
Sub ResizeImages()
    ; 声明一个变量 i，数据类型是 Long
    Dim i As Long

    ; With 语句用于引用 ActiveDocument 对象，这样在接下来的代码块中就不需要重复引用这个对象。
    ; 所谓引用，也就是不需要一直写 ActiveDocument. 这个前缀
    ; ActiveDocument 是当前活动（即打开且正在操作的）Word文档。
    With ActiveDocument
        ; 不用说了吧，一看就知道是 for 循环
        ; 重点是 .InlineShapes.Count
        ; 首先，我们这里是在 with 里面，所以省略了 ActiveDocument. 这个前缀
        ; 直接写成 .InlineShapes 就可以了。.InlineShapes 指的是内联形状，也就是图片
        ; .Count 指的就是总数
        For i = 1 To .InlineShapes.Count
            ; 同理，使用 with 引用 .InlineShapes(i) 后面就不需要重复写了
            With .InlineShapes(i)
                ; 在 with 里面，相当于是对每一张图片执行一个操作

                ; 下面三行也可以直接赋值为 0
                .Range.ParagraphFormat.FirstLineIndent = CentimetersToPoints(0)
                .Range.ParagraphFormat.LeftIndent = CentimetersToPoints(0)
                .Range.ParagraphFormat.RightIndent = CentimetersToPoints(0)

                .Range.ParagraphFormat.OutlineLevel = wdOutlineLevelBodyText
                .Range.ParagraphFormat.Alignment = wdAlignParagraphCenter

            End With
        ; 让我们的 i++
        Next i
    End With

    ; 一个弹出框。
    MsgBox "所有图片已居中。", vbInformation
End Sub

```

解释一下上面设置格式的几行代码，基本就懂了。

- `.Range` 指当前内联形状（我们这里是图片）所包含的文本区域
- `.ParagraphFormat` 指的是设置段落格式
- `.FirstLineIndent` 设置首行缩进
  - `CentimetersToPoints(0)` 表示将 0 厘米转换为点。同理还有 `InchesToPoints()` 方法
    - point（点）是 Word 中的一个常见长度单位，比如字体大小是 12、16，这些数值的单位默认就是 point
- `LeftIndent` 设置段落左缩进
- `RightIndent` 设置段落右缩进
- `OutlineLevel` 设置大纲级别
  - `wdOutlineLevel1` 表示 1 级。
  - `wdOutlineLevelBodyText` 表示正文
- `Alignment` 设置对齐方式
  - `wdAlignParagraphCenter` 表示居中

更多具体的格式和相关说明都可以在文档中找到，比如
- [ParagraphFormat.FirstLineIndent property (Word) | Microsoft Learn](https://learn.microsoft.com/en-us/office/vba/api/word.paragraphformat.firstlineindent)
- [ParagraphFormat.OutlineLevel property (Word) | Microsoft Learn](https://learn.microsoft.com/en-us/office/vba/api/word.paragraphformat.outlinelevel)
- [ParagraphFormat.LineSpacingRule property (Word) | Microsoft Learn](https://learn.microsoft.com/en-us/office/vba/api/word.paragraphformat.linespacingrule)
- [Range object (Word) | Microsoft Learn](https://learn.microsoft.com/en-us/office/vba/api/word.range)

顺便说一下，文档中的第一段说明最后的  'Read/write WdOutlineLevel' / 'Read/write Single' / 'Read/write WdLineSpacing' 指的是该属性的值的类型。比如
- WdOutlineLevel 大纲级别
- Single 单一的浮点数值
- WdLineSpacing 行距值

想要设置格式，可以通过录制宏，然后查看宏代码的方式自己找到对应的属性，接着再查查文档之类的就可以。
比如我想要设置行距，通过录制宏，阅读代码，自己调试后，就可以知道行距受 `LineSpacingRule` 和 `LineSpacing` 控制，这两个值刚好对应可视化操作中的两个空。

然后找到 ``LineSpacingRule`` 对应的[文档](https://learn.microsoft.com/en-us/office/vba/api/word.paragraphformat.linespacingrule)，得知它的值类型为 `WdLineSpacing`，再查看 `WdLineSpacing` 类型，得知这是一个枚举类型：

- `LineSpacingRule` 可选值有
  - `wdLineSpaceSingle` 单倍行距
  - `wdLineSpace1pt5` 1.5 倍行距
  - `wdLineSpaceDouble` 2 倍行距
  - `wdLineSpaceAtLeast` 最小值
  - `wdLineSpaceExactly` 固定值
  - `wdLineSpaceMultiple` 多倍行距

当行距设置为最小值/固定值/多倍行距时，我们就需要再设置 `LineSpacing` 数值了。

## 复习: ESM 获取 __dirname

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

```

## Electron 通信以及打包

前面一些简单的一步带过，详见[官网](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
# 注意 package.json 中的 author 和 description 必填，不然打包失败
# 添加 "scripts": { "start": "electron ." }，然后运行
# 创建 main.js 文件
npm start
# 成功运行
```

简单理解一下 Electron 的框架逻辑。核心就是三层：
- 主进程，也就是 package.json 中指定的 main 文件。主进程的环境是 node 环境
- 预加载，通常命名为 preload.js。预加载，是用于沟通主进程和渲染进程的，具备一部分 node 和浏览器的功能
- 渲染进程，也就是我们的前端文件了。可以使用基础三件套，也可以使用 vue/react 框架。

### 入门 demo

下面的入门 demo，简单练习了一下主进程、预加载脚本和渲染进程之间的数据传递。
简单来说，主要学习的就是主进程和预加载脚本中的新 API，至于渲染进程，基本和前端一样。

后续如果有多个窗口想要通信，他们之间也可以借助主进程来进行通信的。

#### `package.json`
```json
{
  "name": "electron",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "Linhieng",
  "license": "ISC",
  "description": "This is a application",
  "devDependencies": {
    "electron": "^33.2.0"
  }
}
```

#### `main.js`
```js
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')

const createWindow = () => {
    // 创建一个窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // 指定我们的预加载文件
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // 监听预加载脚本中的信道（类似于事件）
    ipcMain.on('writeFile', (_, text) => fs.writeFileSync('test.txt', text, 'utf8'))
    // handle，用于向预加载脚本传递数据。
    ipcMain.handle('readFile', (_, filename) => fs.readFileSync(filename, 'utf8'))

    // 往这个窗口中加载我们的前端页面。也可以调用 .loadUrl 直接加载一个网页
    win.loadFile('pages/index.html')
}




// 下面是固定写法，不用在意

app.on('ready', () => {
    createWindow()
    // 这里是用来适应 Mac 的，因为 Mac 创建所有窗口后程序并不会退出，而是会留一个图标。
    // 点点击图标时就是所谓的 activate，此时会判断一下是否有窗口，没有则新建
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// 当所有窗口都关闭了，而且不是 Mac 时，就结束该程序。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
```

#### `preload.js`

```js
const {contextBridge, ipcRenderer} = require('electron')

// 既能访问一部分浏览器
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (element, text) => {
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        // 也能访问一部分 node
        const version = process.versions[dependency]
        replaceText(document.getElementById(`${dependency}-version`), version)
    }
})

// 向渲染器传递消息，第二个参数将会添加在 window 对象上
contextBridge.exposeInMainWorld('a_api', {
    writeFile: (text) => {
        // 向主进程传递数据，类似于事件模型一样进行通信
        ipcRenderer.send('writeFile', text)
    },
    readFile: async () => {
        // 接收主进程中的数据，这里也可以在后面传参给主进程
        // 注意这里的文件只写了文件名，默认会在项目根目录下生成。
        const text = await ipcRenderer.invoke('readFile', 'test.txt')
        return text
    }
})
```

#### `pages/index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <title>ELectron 应用入门 demo</title>
    <meta charset='UTF-8'>
    <!-- 配置 CSP，详见 https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'" />

    <script src="./render.js" defer></script>
</head>

<body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
    <br>

    <div>
        <input id="text1" type="text">
        <button id="write-btn">写入文件内容</button>
    </div>
    <hr>
    <div>
        <input id="text2" type="text" disabled>
        <button id="read-btn">读取文件内容</button>
    </div>
</body>

</html>
```


#### `pages/render.js`

```js
const myApi = a_api

const text1 = document.getElementById('text1')
const btn1 = document.getElementById('write-btn')
btn1.onclick = () => {
    myApi.writeFile(text1.value)
}

const text2 = document.getElementById('text2')
const btn2 = document.getElementById('read-btn')
btn2.onclick = async () => {
    text2.value = await myApi.readFile()
}
```

### 打包

记得之前自己跟着官方文档走时，最后就卡死在打包这一步。这一次跟着视频走，虽然也有很多问题，但至少是完成打包了！

这次采用的打包方式是 [`electron-builder`](https://github.com/electron-userland/electron-builder)

步骤如下：

1. 先安装 `npm i -D electron-builder`

2. 修改 package.json，添加 build 脚本和 build 子项

    ```json
    {
      "scripts": {
        "build": "electron-builder"
      },
      "build": {
        "appId": "com.linhieng.demo",
        "win": {
          "icon": "./logo.ico",
          "target": [
            {
              "target": "nsis",
              "arch": [
                "x64"
              ]
            }
          ]
        },
        "nsis": {
          "oneClick": false,
          "perMachine": true,
          "allowToChangeInstallationDirectory": true
        }
      },
    }
    ```

3. 运行 `npm run build`

正常来说这就成功了，但我还是遇到了两个问题。

#### 代理问题

第一个问题是网络问题，虽然我开了全局代理，但还是一直卡住。最终采用的是在终端上配置代理的方式解决。

```sh
# 使用的是 powershell7
$env:HTTP_PROXY = "http://127.0.0.1:7890"
npm run build
```

配置代理后，就可以看到有 downloading 了。

#### 权限问题

网络没问题后，安装时还是报错，命令行输出类似下面这样

```sh
$ npm run build

> electron@1.0.0 build
> electron-builder

  • electron-builder  version=25.1.8 os=10.0.19045
  • loaded configuration  file=package.json ("build" field)
  • writing effective config  file=dist\builder-effective-config.yaml
  • executing @electron/rebuild  electronVersion=33.2.0 arch=x64 buildFromSource=false appDir=./
  • installing native dependencies  arch=x64
  • completed installing native dependencies
  • packaging       platform=win32 arch=x64 electron=33.2.0 appOutDir=dist\win-unpacked
  • updating asar integrity executable resource  executablePath=dist\win-unpacked\electron.exe
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z size=5.6 MB parts=1
  • downloaded      url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z duration=1.921s
  ⨯ cannot execute  cause=exit status 2
                    out=
    7-Zip (a) 21.07 (x64) : Copyright (c) 1999-2021 Igor Pavlov : 2021-12-26

    Scanning the drive for archives:
    1 file, 5635384 bytes (5504 KiB)

    Extracting archive: C:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign\754197667.7z
    --
    Path = C:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign\754197667.7z
    Type = 7z
    Physical Size = 5635384
    Headers Size = 1492
    Method = LZMA2:24m LZMA:20 BCJ2
    Solid = +
    Blocks = 2


    Sub items Errors: 2

    Archives with Errors: 1

    Sub items Errors: 2

                    errorOut=ERROR: Cannot create symbolic link : �ͻ���û����������Ȩ�� : C:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign\754197667\darwin\10.12\lib\libcrypto.dylib
    ERROR: Cannot create symbolic link : �ͻ���û����������Ȩ�� : C:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign\754197667\darwin\10.12\lib\libssl.dylib

                    command='D:\draft\electron\node_modules\7zip-bin\win\x64\7za.exe' x -snld -bd 'C:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign\754197667.7z' '-oC:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign\754197667'
                    workingDir=C:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign
  • Above command failed, retrying 3 more times
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z size=5.6 MB parts=1
  • downloaded      url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z duration=1.73s
  ⨯ cannot execute  cause=exit status 2
                    out=
    7-Zip (a) 21.07 (x64) : Copyright (c) 1999-2021 Igor Pavlov : 2021-12-26

    Scanning the drive for archives:
    1 file, 5635384 bytes (5504 KiB)

    Extracting archive: C:\Users\k\AppData\Local\electron-builder\Cache\winCodeSign\293568827.7z
    --
```

最终发现是权限问题，需要在管理员模式下运行才可以。

本来我以为打包都需要管理员权限，但当我看到生成的安装包也需要管理员权限时，我就意识到有问题了。
因为我这个应用并不需要管理员权限！

#### signing 警告

只要不是错误，都不用管。这一项只是用于提示罢了，具体可以看 [#8559](https://github.com/electron-userland/electron-builder/issues/8559)

#### 管理员权限问题

神奇了，当我用管理员运行，打包成功后，我在普通终端也可以成功打包了（删除掉重新打包也可以，所以应该不是缓存之类的）

但问题在于，生成的程序还是有管理员的图标，安装的路径也在默认在 `C:\Program Files` 里面。

查了文档，发现是 `build.win.requestedExecutionLevel` 控制的权限，但我并没有配置该项，默认应该是 `asInvoker` 呀。

将它显式改为 `asInvoker` 后，还是没效果。

再试一下把 `build.nsis` 删掉，结果就可以了！

再将其改回去，居然没法复现前面出现的问题了！

不过倒是知道了当
- `build.nsis.oneClick` 为 false
- `build.nsis.perMachine` 为 true
时，打包的程序默认需要管理员权限运行。

但是“终端需要以管理员权限运行”这个问题复现不出来了。可能之前是缓存啥的锅吧。不过也算是学习了一些其他属性。比如：

- `build.win.requestedExecutionLevel` 设置为 `highestAvailable` 时可以让应用程序安装在 `C:\Program Files` 里面。该配置项可以配置哪些值具体可以查看[微软文档](https://learn.microsoft.com/zh-cn/previous-versions/visualstudio/visual-studio-2015/deployment/trustinfo-element-clickonce-application?view=vs-2015&redirectedfrom=MSDN#requestedexecutionlevel)
- `build.nsis.selectPerMachineByDefault` 设置为 true，可以不让用户选择“为此用户”还是“为所有用户”安装
## `import()` 方法中的路径和直接使用 `import` 的路径用法一致

本想着通过编程遍历所有 json 文件的绝对路径，然后通过 `import(url, {with: {type:'json'}})` 导入，结果没想到使用绝对路径导入时会报错。
```js
node:internal/modules/esm/load:209
    throw new ERR_UNSUPPORTED_ESM_URL_SCHEME(parsed, schemes);

Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
```

## 复习：ESM 中获取 `__dirname`

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname)
```

## 在 word 中使用 vba 为指定命令分配快捷键

需求是这样的，最近的 word 按下快捷键 ctrl+f 后，一直打开的是导航栏中的搜索框，而不是弹出框中的搜索框。
百度一番后发现为 `EditFind` 命令分配 ctrl+f 快捷键就可以解决问题。但通过界面操作的过程太过麻烦，而我最近又学了点 vba，
于是决定采用 vba 的方式来解决。

下面的 vba 代码同样是借助录制宏的方式获取，具体的命令解释是让 AI 帮忙解释，并让其给出对应的参考链接。

```vba
Sub 指定快捷键()
    ; 这行代码设置了宏的定制上下文为“Normal.dotm”模板，这是Word默认的模板，包含了所有的样式和宏。
    ; 这意味着后面所指定的快捷键将对所有基于该模板的文档生效，比如新建的文档。
    CustomizationContext = NormalTemplate

    ; BuildKeyCode函数来构建一个键码，代表快捷键组合，这里我们分配的是 ctrl+f 按键
    ; Command:="EditFind" 指定了当按下快捷键时应该执行的Word命令
    KeyBindings.Add KeyCode:=BuildKeyCode(wdKeyControl, wdKeyF), KeyCategory:= _
        wdKeyCategoryCommand, Command:="EditFind"
End Sub
```

参考：
- [新版Word如何将导航栏改为查找命令-百度经验](https://jingyan.baidu.com/article/6181c3e05228d7552ef15399.html)
- [BuildKeyCode Method - Microsoft Word Visual Basic Documentation](https://documentation.help/VBAWD10/womthBuildKeyCode.htm)
- [Application.BuildKeyCode 方法 (Word) | Microsoft Learn](https://learn.microsoft.com/zh-cn/office/vba/api/word.application.buildkeycode)
- [Application.BuildKeyCode method (Word) | Microsoft Learn](https://learn.microsoft.com/en-us/office/vba/api/word.application.buildkeycode)

## PE 无法安装 win11

不知什么原因，下载 win11 的 iso 后，在 PE 中安装运行时会出现空白，安装不了。

最终只能采用 U 盘的方式安装。

## 安装 win 11 时提示必须连接网络

解决方案是：
1. 按下 `shift+f10` 调出终端
2. 运行 `oobe\bypassnro` 命令（其实就是 `C:\Windows\System32\oobe\BypassNRO.cmd`）
3. 重启后重新执行操作，就出现“我没有网络”这一选项了

- [安装系统时没有网络无法完成设置进入系统 - Microsoft Community](https://answers.microsoft.com/zh-hans/windows/forum/all/%E5%AE%89%E8%A3%85%E7%B3%BB%E7%BB%9F%E6%97%B6/972194a6-4a7d-44e5-bbc3-a870a1fc09ea)

## 激活 Windows

激活 window 直接有开源项目了。

以管理员权限运行 powershell7
```sh
$env:http_proxy="http://127.0.0.1:7890"
# 配置代理，不然访问不了
irm https://get.activated.win | iex
# 进入激活菜单，然后根据提示激活就可以了（通常选择第一个选项 HWID 即可）
```

参考
- [massgravel/Microsoft-Activation-Scripts: Open-source Windows and Office activator featuring HWID, Ohook, KMS38, and Online KMS activation methods, along with advanced troubleshooting.](https://github.com/massgravel/Microsoft-Activation-Scripts)
- [Win10/Win11系统永久激活教程（免费、无需密钥、支持离线激活）](https://www.hangge.com/blog/cache/detail_3543.html)

## pdf2png 时报错 ImageData is not defined

解决方式：在 node 环境中使用 pdf.js，要导入 legacy 版本！

我这个问题的复现方式，就是导入时没有导入 legacy，可以参考[这里的代码](https://github.com/mozilla/pdf.js/blob/master/examples/node/pdf2png/pdf2png.mjs)

## pdf2png 无法显示签名盖章、丢失颜色等信息

[解决pdf.js预览pdf不显示签名问题(两条路)_pdf.js 不展示签章,注释掉pdf.worker.js代码依旧无效-CSDN博客](https://blog.csdn.net/s_y_w123/article/details/108869862)

## pdf.js 依赖本地打包后的库

```json
"dependencies": {
  "pdfjs-dist": "file:build/dist"
}
```
表示项目依赖于一个名为pdfjs-dist的包，而这个依赖不是从npm注册表中获取的，而是指向一个本地路径。

这样的配置通常用于以下几种情况：
- 当你在开发一个包或库，并且想要在本地测试它，而不是发布到npm后再通过npm安装。
- 当你需要一个特定的版本或者修改过的库，而这些改变尚未发布到npm。
- 当你想要避免将某些大型的或者私有的代码上传到npm，而是直接在项目中引用。

使用这种方式的依赖，在执行 `npm install` 时，npm 会创建一个符号链接从 `node_modules/pdfjs-dist` 指向 `build/dist` 目录，而不是从 npm 仓库下载这个包。

## conda 命令找不到

想要使用 conda 命令，和普通的命令不一样，简单地添加环境变量是没有效果的。
需要在 conda 中运行 `conda init powershell`。
但这样后，打开 pwsh 时会很慢。

```sh
conda info --envs
# 查看当前环境变量配置

conda init -d
# 查看运行 conda init 命令后会影响的配置。
# 结果显示下面这一条
# modified      HKEY_CURRENT_USER\Software\Microsoft\Command Processor\AutoRun
# 查询发现这个键值对配置的是“每次打开命令提示符时运行的脚本”
# 不过我当时运行的是 conda init powershell 所以应该输入
conda init powershell -d
# 结果发现修改的是
# modified      C:\Users\k\Documents\WindowsPowerShell\profile.ps1
# modified      C:\Users\k\Documents\PowerShell\profile.ps1
```

查看内容后发现，conda 自动添加了下面代码

```sh
#region conda initialize
# !! Contents within this block are managed by 'conda init' !!
If (Test-Path "C:\Users\k\anaconda3\Scripts\conda.exe") {
    (& "C:\Users\k\anaconda3\Scripts\conda.exe" "shell.powershell" "hook") | Out-String | ?{$_} | Invoke-Expression
}
#endregion
```

到现在，我就找到了我所需要的所有信息了。

- 单纯的添加环境变量并没法集成 conda 命令到 powershell 环境
- 使用 `conda init powershell` 可以集成 conda 到 pwsh 后
- 集成后打开 pwsh 会很慢，可以使用 `conda init --reverse` 撤销集成

- [python - The term 'conda' is not recognized as the name of a cmdlet - Stack Overflow](https://stackoverflow.com/questions/56314710/the-term-conda-is-not-recognized-as-the-name-of-a-cmdlet)

## 使用 python 爬取动态页面

借助 Selenium 模块，可以模拟浏览器操作，实现动态页面的爬取。

直接上代码：
```python
from selenium import webdriver
from selenium.webdriver.common.by import By

# 初始化浏览器
driver = webdriver.Chrome()
# 打开网页
driver.get("https://book.sina.com.cn/excerpt/")
# 等待页面加载
driver.implicitly_wait(3)
print() # 打印空行分割一下

# 获取网页源代码或某个元素的内容
title = driver.title
print(title + '\n')

# 通过 css 选择器进行查找
lists  = driver.find_elements(By.CSS_SELECTOR, '#J_BookRankList > li')

for item in lists:
    a = item.find_element(By.CSS_SELECTOR, '.rank-name')
    print(a.text)

# 关闭浏览器
driver.quit()
```

有了案例后基本就能干活了，再给几个参考链接：
- [定位策略 | Selenium](https://www.selenium.dev/zh-cn/documentation/webdriver/elements/locators/)
- [查询网络元素 | Selenium](https://www.selenium.dev/zh-cn/documentation/webdriver/elements/finders/)
- [selenium.webdriver.remote.webelement — Selenium 4.25.0 documentation](https://www.selenium.dev/selenium/docs/api/py/webdriver_remote/selenium.webdriver.remote.webelement.html#selenium.webdriver.remote.webelement.WebElement)

## python 实现 win 弹框通知

```python
from plyer import notification
notification.notify(
    title="标题",
    message="内容，有长度限制",
    timeout=15
)
```

plyer 不局限于 win，而 win10toast 专门适用于 win，win10toast-click 用于获取点击事件。

```python
# modules
import webbrowser
from win10toast_click import ToastNotifier

ToastNotifier().show_toast(
    "Example two",
    "Click to open URL! >>", # message
    callback_on_click=lambda: webbrowser.open_new('http://example.com/')
)
```

- [vardecab/win10toast-click: An easy-to-use Python library for displaying Windows 10 Toast Notifications. Improved version of win10toast and win10toast-persist to include `callback_on_click` to run a function on notification click, for example to open a URL.](https://github.com/vardecab/win10toast-click)
- [jithurjacob/Windows-10-Toast-Notifications: Python library to display Windows 10 Toast Notifications](https://github.com/jithurjacob/Windows-10-Toast-Notifications)
- [kivy/plyer: Plyer is a platform-independent Python wrapper for platform-dependent APIs](https://github.com/kivy/plyer)
- [Plyer 2.2.0.dev0 documentation](https://plyer.readthedocs.io/en/latest/index.html)

## python 实现 pdf2png

使用 python 实现太简单了，需要安装两个模块：
- `pip install pdf2image`
- [poppler-windows](https://github.com/oschwartz10612/poppler-windows/releases)

然后解压 poppler-windows 到一个指定位置，最后运行下面代码即可。

```py
from pdf2image import convert_from_path

images = convert_from_path('a.pdf', poppler_path = r'C:\soft\zip\poppler-24.08.0\Library\bin')

for i in range(len(images)):
    images[i].save('page'+ str(i) +'.jpg', 'JPEG')

```

[Convert PDF to Image using Python - GeeksforGeeks](https://www.geeksforgeeks.org/convert-pdf-to-image-using-python/)

## pyinstaller 打包 python 文件为 exe 文件

很简单，直接运行

```sh
pyinstaller --onefile -w d.py
```

其中 `-w` 参数是让其运行时不显示终端控制台。

[【Python教程】保姆版教使用Pyinstaller 打包python成exe文件-CSDN博客](https://blog.csdn.net/flyskymood/article/details/123668136)

## pyinstaller 打开报错

报错信息如下：
```
The 'pathlib' package is an obsolete backport of a standard library package and is incompatible with PyInstaller. Please remove this package (located in C:\Users\k\anaconda3\envs\my_test\lib\site-packages) using
    conda remove
then try again.
```

解决方案是运行 `pip uninstall pathlib`。网络上很多帖子都采用 `conda remove pathlib`，但这个对我来说没效果

[使用pyinstaller踩的坑 - 㝽守靳 - 博客园](https://www.cnblogs.com/ssj-Secret-base/p/17880690.html)

## python 使用注释器简化代码

```py
class Test:
    class EmptyInputError(Exception):
        def __init__(self, message="输入为空，请重新输入。"):
            self.message = message
            super().__init__(self.message)

    def fn(self):
        return input("请输入一个值: ")

    def get_input(self):
        a = self.fn()
        if a == '':
            raise self.EmptyInputError()
        return a

    # 定义异常处理装饰器
    def handle_exceptions(func):
        def wrapper(self, *args, **kwargs):
            try:
                return func(self, *args, **kwargs)
            except Test.EmptyInputError as e:
                print(f"发生错误: {e.message}")
        return wrapper

    # 有了这个注解后，我就不需要专门处理报错了，统一在一个函数中处理即可
    @handle_exceptions
    def add(self):
        x = self.get_input()
        print(x)



if __name__ == "__main__":
    test = Test()
    test.add()
```


最简单的异常类

```py
class MyCustomError(Exception):
    pass

def some_function():
    raise MyCustomError("这是一个自定义异常信息")

try:
    some_function()
except MyCustomError as e:
    print(f"捕获到自定义异常: {e}")
```

## python 解包

```py
a = (12,4)
print([1, 2, *a, 4])
```

## pyinstaller 打包减小体积

总的来说，就是新建一个虚拟环境，然后在这个环境里面打包。

[【已解决】pyinstaller打包瘦身，变小 exe 的通用和终极解决方案！_pyinstaller打包文件太大怎么办-CSDN博客](https://blog.csdn.net/JiuShu110/article/details/132625538)

## node 包安装失败

```sh
node:internal/process/promises:394
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: getaddrinfo ENOENT raw.githubusercontent.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:120:26) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'getaddrinfo',
  hostname: 'raw.githubusercontent.com'
}
```

老问题，dns 解析错误，配置 npm 的镜像和代理都不好使，最终还是采取老方法。
到 `https://githubhosts.xuanyuan.me/` 复制内容到 hosts 文件，然后重新运行。


## python 开发应用程序时，某段代码执行时间过长导致“程序不响应”

使用线程解决

```py
import threading

def task():
    # 直接把那段代码缩进，放到 task 函数中。
threading.Thread(target=task).start()
```

## pyinstaller 打包时报错 ValueError: Invalid async_mode specified

解决方案，打包命令换成：

```sh
pyinstaller --onefile --hidden-import="gevent" --hidden-import="geventwebsocket" --hidden-import="gevent.ssl" --hidden-import="gevent.builtins" --hidden-import="engineio.async_drivers.threading" --add-data "web;web" --add-data "server;server"  main.py
```

其中的 --hidden-import 用于解决 ValueError: Invalid async_mode specified 的依赖问题，根本原因是 gevent 和 engineio.async_drivers.threading 等关键模块是 Flask-SocketIO ​运行时动态加载的，PyInstaller 默认不会打包它们。

--add-data 用于解决网页找不到问题。
