# 我的 vscode

TODO:

- [ ] 该仓库中的几乎所有内容已经无用了（太过熟悉了，就会感觉这些旧笔记写的不好），需要清理掉。
- [ ] 完善 tasks 内容，总结 [该文章](https://juejin.cn/post/7035448197883363359) 中的有用知识点

## 使用原则

~~无规矩不成方圆~~，呃，好像不太合适。应该这么说，有关 vscode 的配置方面，我经常一弄就是弄好几个小时，甚至好几天。因为 vscode 可配置性很高，所以导致我一直在不断地寻找最适合的使用方案，以获得最佳的使用体验。这不，最近又有了新的灵感，而且又又又感觉这一次一定是最优秀的方案了。所以就有了这次的“使用原则”。（在此之前，使用原则我是写在 OneNote 里面的，所以也算是我第一次公开我的使用原则）

我最常在 vscode 中捣鼓的，基本就是三个：

- settings
- extension
- keyboard

其中的快捷键现在捣鼓的比较少了，因为我已经开发了自己的快捷键扩展。这个时候就不得不谈谈我的所谓“拖延症”了。当我第一次知道可以在项目级别中自定义 settings 时（大概是初学没多久吧），我就 google 过如何在项目级别中自定义 keybinddings.json，然后发现官方没有提供这个功能，也不打算提供这个功能（原因见 [issue#10708]），自那时起，我就一直准备创建一个自己的快捷键扩展了。然后，这个计划鸽了近三年（我接触前端到现在还不到四年……）

所以，现在主要捣鼓的其实就是 settings 和 keyboard。而 vscode 提供了下面几种方式能让我捣鼓：

- default profile (application json)
- profile
- workspace

经过我一段时间的使用，我现在规定使用原则如下：

### default profile

default profile 中的 settings 属于全局、应用级别的，这里面的东西一定要少而精！为此，原则上这里面中只允许配置应用级别的配置项，比如 `http.proxy` 和 `remote.SSH.remotePlatform`。

但考虑到某些配置项很适合放在全局配置中。所以，对于这类配置项我会专门在这里指定，同时给出理由：

  - `"workbench.iconTheme": "material-icon-theme"` 这个就不需要什么理由了吧。不过还是说一下，我使用这个的主要原因是因为 vscode 没有默认的文件夹图标！
  - `cSpell.flagWords` 该配置项之所以如何重要，是因为 spell 插件中，某些错误的单词并不会得到提示，或者说某些我容易敲错的单词，spell 会将其识别为正确拼写的单词了。
  - `"files.dialog.defaultPath": "D:\\"` 这是非常特殊的一项，你只能放在 application settings 才有效，但一旦你的 profile 中开启自定义了 settings，这一项又会失效。此外，之所以可以配置这一项，是因为我电脑中的文件夹都每个位置存放什么内容都规定好了，比如 D 盘里面只放代码！所以添加这一项对我来说非常有用。

现在，由于 application settings 中添加了全局配置项，所以就要求其他的 profile 不允许自定义 settings 了。

然后，default profile 中的扩展也必须少而精！因为在这里面的扩展要求他们全部都是应用到所有 profile 的。目前支持的扩展只有：

- linhieng.linhieng-keymap 自己使用的快捷键
- streetsidesoftware.code-spell-checker 英文检查
- pkief.material-icon-theme 图标主题

> 注意！
> default profile 只是用于提供全局 settings 和扩展。实际使用时，并不会选中 default profile！

### workspace

workspace 空间的一个最大好处就是它的 settings 不会被 vscode 自动修改！还记得我初用 vscode 时，给 application settings 中的每一条配置项都添加了注释，后面整理时才发现很多注释都错乱了！原因就是，当你通过 UI 修改 settings 时，vscode 会自动修改 settings 中的内容，这就导致配置项被删了，但注释还在！久而久之，文件就变得很混乱。这也是我为什么选择将快捷键迁移到扩展中的原因，有 git 这个版本工具进行内容的管理，我会觉得非常舒适安全！

虽然 workspace 可以自定义 settings，但这并不意味着可以滥用 workspace！所以对于 workspace 的使用我是一直在斟酌的，因为我有太多的经验了，当初第一次尝到 profile 的好处时，马上就迫不及待的建立了非常多的 profile，但后面几乎是一个文件一个 profile，使用起来非常难受，最终还是得全部重新整理，化繁为简。

所以，workspace 不能滥用，目前只定义了三类 workspace：

- note workspace: 只处理笔记，其中不允许有任何可运行代码！比如 lim-note-cli, lim-note-vscode, lim-note-web。lim-note-DSA 虽然也是 note，但由于还未整理好， 而且里面存在大量的可运行代码（python jupyter notebook）所以暂时不能纳入其中。
- vs extension workspace: 包含了正在开发的 vscode 扩展项目
- my default workspace: 用于替代 default profile 中的 settings，他同时对于一个 “默认 profile”，也是用于替代 default profile。毕竟 vscode 的使用场景很多，并不是所有内容都可以很简单的进行分类的。分类真的是一门学问！

[issue#10708]: https://github.com/microsoft/vscode/issues/10708#issuecomment-241330047
