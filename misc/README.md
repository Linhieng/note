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

## 回忆 vscode 配置

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
