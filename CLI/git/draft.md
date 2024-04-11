# Draft

只忽略不以 `bom-` 开头的 csv 文件正确格式：
```ignore
*.csv
!bom-*.csv
```

```sh
$ git rev-parse --abbrev-ref HEAD
# 显示当前 HEAD 所在分支名。
# 如果当前处于 detached HEAD 状态，则只会显示 HEAD
# 如果刚 git init，则显示 HEAD 并报错
# 如果不在 git 仓库中，无输出并报错
$ git rev-parse --short HEAD
# 不在分支上时，显示短 hash

$ git symbolic-ref --short HEAD
# 显示当前 HEAD 所在分支名。
# 如果刚 git init，则显示默认分支名
# 如果当前处于 detached HEAD 状态，则无输出并报错
# 如果不在 git 仓库中，无输出并报错

$ git describe --tags --exact-match HEAD
# 显示当前 HEAD 的标签名，如果没有则报错

$ git branch --show-current
# 显示当前 HEAD 所在分支
# 如果刚 git init，则显示默认分支名
# 如果当前处于 detached HEAD 状态，则无输出
# 如果不在 git 仓库中，无输出并报错

$ git rev-parse --is-inside-work-tree
# 判断当前目录是否在 git 仓库中
```

## refs

`/refs/tags`
`/refs/heads`
`/refs/remotes`


未验证：
- `refs/stash`：这个文件记录了 git stash 命令创建的临时提交的引用。
- `refs/notes/`：这个目录用于存储 Git Notes，它是一种可以附加在 Git 对象（如提交对象）上的附加信息。
- `refs/replace/`：这个目录包含了替换对象的引用，它允许用户指定替换规则，将一个对象替换为另一个对象。

## git 是通过识别 .git/rebase-merge 文件夹，来判断当前是出于什么状态的

比如当你进行 rebase 操作时，如果发现控制台输出下面信息时

```
warning: could not read '.git/rebase-merge/head-name': No such file or directory
```

你就应该知道问题出在 .git/rebase-merge 文件夹，虽然你可以简单地通过删除这个文件夹，来强制退出 rebase 状态，但你应该进一步探讨为什么会出现这种情况！

## 使用 code -w 作为 git 默认编辑器时，出现数据库检测错误

```
[31512:0411/184727.811:ERROR:service_worker_storage.cc(2016)] Failed to delete the database: Database IO error
```
该错误信息并不影响功能就是了。而且该报错信息可能无法复现，因为我在别人电脑上进行同样操作时，发现他们并不会出现这个报错消息。

具体什么原因，我只找到了这个 [issue](https://github.com/electron/electron/issues/35036)
