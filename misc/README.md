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
