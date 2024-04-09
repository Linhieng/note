# git 笔记

## git 常用命令

```sh
$ git (help | -h)
# 给出 git 常用命令，并且会给出学习 git 上的相关帮助

$ git -h <command>
# 调出对应命令的手册页面。
# 比如 git -h git, git -h status, git -h revert
```

命令目录：

- git 的初始化与配置
    - [init](#init)
    - [config](#config)
- git 的基本操作。
    - 暂存与提交
        - [add](./reference/basic.md#add)
        - [stage](./reference/basic.md#stage)
        - [mv](./reference/basic.md#mv)
        - [rm](./reference/basic.md#rm)
        - [restore](./reference/basic.md#restore)
        - [commit](./reference/basic.md#commit)
    - 分支
        - [branch](./reference/basic.md#branch)
        - [tag](./reference/basic.md#tag)
        - [checkout](./reference/basic.md#checkout)
        - [switch](./reference/basic.md#switch)
    - [合并](./reference//basic.md#合并策略)
        - [merge](./reference/basic.md#merge)
        - [rebase](./reference/basic.md#rebase)
        - [cherry-pick](./reference/basic.md#cherry-pick)
    - 撤销
        - [reset](./reference/basic.md#reset)
        - [revert](./reference/basic.md#revert)
- git 管理云端仓库
    - [clone](./reference/remote.md#clone)
    - [fetch](./reference/remote.md#fetch)
    - [pull](./reference/remote.md#pull)
    - [push](./reference/remote.md#push)
    - [remote](./reference/remote.md#remote)
- git 检查历史和状态
    - [bisect](./reference/examine.md#bisect)
    - [diff](./reference/examine.md#diff)
    - [grep](./reference/examine.md#grep)
    - [log](./reference/examine.md#log)
    - [show](./reference/examine.md#show)
    - [status](./reference/examine.md#status)
- 其他零碎内容
    - [show-ref](./reference/other.md#show-ref)
    - [shortlog](./reference/other.md#shortlog)
    - [blame](./reference/other.md#blame)
    - [reflog](./reference/other.md#reflog)
    - [whatchanged](./reference/other.md#whatchanged)
    - [stash](./reference/other.md#stash)
    - [ls-remote](./reference/other.md#ls-remote)
    - [submodule](./reference/other.md)

## git初始化与配置

### init

```sh
$ git init
# 将当前目录初始化为一个 Git 仓库。

$ git init <directory>
# 创建一个新的文件夹，并将其初始化为一个 Git 仓库。

$ git init --bare [<directory> | .]
# 初始化为 bare repo(裸仓库)。
# bare repo 通常用于云端仓库，它不包含 work tree 和 index。
```

### config

Get and set repository or global options. You can query/set/replace/unset options with this command. The name is actually the section and the key separated by a dot, and the value will be escaped.

语法如下：

```sh
git config <options?> <name?> <value?>
```

配置文件有四类，优先级按以下顺序依次递增：

- `--system`
    - 全系统的配置文件。目录为 $(prefix)/etc/gitconfig
- `--global`
    - 用户特定的配置文件/全局配置文件。目录通常是 ~/.gitconfig
- `--local`
    - 仓库特定的配置文件。目录为 .git/config
- `--worktree`
    - 可选。需开启 extensions.worktreeConfig 配置才生效。目录为 .git/config.worktree

常用属性：

- `--show-origin`
  - 输出配置项来源
- `--unset`
  - 删除某项配置

```sh
$ git config -l
# 按配置文件优先级从低到高，列出所有配置项。如果指向查看指定某个配置文件，请添加对应参数。

$ git config -l --show-origin
# 显示每个配置项的“来源类型 + 实际来源”。
# 实际来源通常指的是对应的配置文件路径

$ git config <name>
# 按配置文件优先级，查找某一配置项的值

$ git config <name> <value>
# 按配置文件优先级，修改/新增某个配置项的值

$ git config --unset <name>
# 按配置文件优先级，删除某个配置项的值

$ git config --edit
# 按配置文件优先级，直接编辑最近的配置文件，通常是 .git/config 文件。

$ git config --global http.proxy http://127.0.0.1:7890
# 只在全局配置文件上新增/修改 http.proxy 配置项

$ git config --global --unset http.proxy
# 只在全局配置文件上删除 http.proxy 配置项

$ git config --global core.editor 'code'
# 使用 vscode 编辑配置文件，而不是 vim。（记得先将 vscode 添加至 path）

git config --global core.excludesFile "$Env:USERPROFILE\.gitignore_global"
# 添加全局 git 忽略文件。文件需自己创建。通常指定： node_modules 和 desktop.ini

git config --global http.version HTTP/1.1
# 解决下面报错（在 WSL 中）
# error: RPC failed; curl 16 Error in the HTTP2 framing layer
# fatal: expected flush after ref listing

git config core.autocrlf
# true： 在提交时将换行符转换为 LF，在检出时将 LF 转换为 CRLF。相当于为所有文件自动设置 core.eol = text
# input：不进行任何转换。

git config --global init.defaultBranch main
# 更改默认分支名称为 main
```

## 概念

### revisions

git 命令中最常用的参数（没有之一）就是和 revisions 有关。详见 [`git -h revisions`](https://git-scm.com/docs/gitrevisions)

#### 有关提交 commit 那些事

当我使用中文“提交”的时候，含义是一个名词，表示某次提交；当我使用英文 commit 的时候，表示的是动词，表示的是 git commit 这个动作。一段哈希值、一个分支名、一个标签名、特殊标识符号 HEAD（表示当前位置）等都可用于表示某个特定的提交。通常都会使用 C1 <—— C2 <—— C3 等等来表示某段提交，注意箭头指向的是父节点（旧 <—— 新）。

在操作分支之前，了解一些 HEAD 的概念是非常有帮助的。HEAD 是一个特殊的表示，表示当前位置。他可以指向某段哈希值/标签，或者引用某个分支。可以通过 `cat .git/HEAD` 查看具体的 HEAD 值，或者通过 `git symbolic-ref HEAD` 查看对应的引用（如果有的话）

`reset`, `revert` 需要接收某个提交作为参数，表示回到该提交，其含义是回到该提交所作出的变更并未 commit 的时候。比如 `git revert C2` 表示回到 C2，此时 C1 已经 commit，但 C2 所作出的变更还在等待 commit，此时如果有冲突需要先处理冲突才可以 commit。而 `checkout` 命令也需要接收一个提交作为参数，但它的含义是回到该提交已 commit 的时候，比如 `git checkout C2`，此时 C2 已经 commit，没有任何需要 commit 的变更内容。

#### 引用（refs）

git 中每次提交的本质是哈希值，但哈希值不方便，于是有了引用。分支、标签、HEAD 其实都是属于一种引用。很多命令都需要我们提供一个 `<commit>` 参数，这个参数表示的其实就是哈希值或引用，通过 `git show-ref` 可查看所有引用。

此外还有相对引用，主要有下面两种：

- `~<num>` 符号表示向上移动 `<num>` 个提交记录。
    - 如果不指定 `<num>`，则向上移动一个提交记录
- `^` 符号表示向上移动一个提交记录。
    - 该符号后面也可以跟随数字，当只有当一个提交的有多个提交记录时才有意义。
    - 比如合并后的提交记录就有两个父提交。此时 `^` 指的是直接父提交，`^2` 指的就是被合并的父提交
- `^` 和 `~` 均可以使用多次，且可以连用，

#### HEAD 的作用

根据前面的只是，我们知道同一个提交，可能有不同的表达方式：哈希值、分支、标签、引用、HEAD等。而我们所能操作的，其实只是 HEAD。

HEAD 的含义永远都是当前位置，当我们对分支进行任意操作时，本质上都是通过 HEAD 来执行的：

- 当我们 checkout/switch 某个分支上时，其实是将 HEAD 该分支绑定。此时，当我们移动 HEAD 时，其对应的分支也会移动。
- 但当我们 checkout 标签（或哈希值或远程分支）时，HEAD 并不会与其绑定，而是进入分离 HEAD 状态（detached HEAD mode），所以此时我们移动 HEAD 时，标签是不会跟着移动的。

### 冲突

执行 `merge`, `revert`, `cherry-pick`, `rebase` 等命令时都可能会出现需要手动处理冲突的情况。为方便下面的描述，将执行命令时所在位置称为 head 提交，将出现冲突时所在提交位置称为 target 提交（被合并的提交）。在 vscode 中解决冲突时，Accept Current Change 表示只保留 head 提交中的内容，Accept Incoming Change 表示只保留 target 提交的内容）。

执行 `git status` 可以查看有冲突的文件（在 Unmerged paths 下）。

- 在解决完冲突文件后，通过 `git add <pathspec>`，标记冲突已被解决，并将所做的更改添加到暂存区。
- 如果解决冲突后，只想将其标记冲突已解决，但并不想将更改添加到暂存区，则使用 `git restore --staged <file>` 命令。
- 如果想直接删除冲突文件，可以执行 `git rm <pathspec>` 命令，它能删除文件，同时标记冲突已被解决，并将所做的更改添加到暂存区。

## 参考

- [官方文档 git 术语表，用于理解各种概念！](https://git-scm.com/docs/gitglossary/en)
