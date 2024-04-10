# 其他零碎内容

## show-ref

List references in a local repository

## shortlog

```sh
$ git shortlog -sn
# 显示所有提交过的用户，按提交次数排序
```

## blame

```sh
$ git blame <file>
# 显示 <file> 的编辑记录
```

## reflog

```sh
$ git reflog
# 管理 Reference logs。
# 在没有可视化的情况下，可以通过该命令来查看某次提交与 HEAD 的距离
```

## whatchanged

```sh
$ git whatchanged  --oneline <file>
# 查看 <file> 的变更记录
```

## stash

Stash the changes in a dirty working directory away

```sh
$ git stash
# 将当前工作目录中的更改（不包括未必追踪的文件）藏匿起来（移入 dirty working directory）
$ git stash save "message"
# 将当前工作目录中的更改藏匿起来，并附加一条消息。
$ git stash apply
# 将最新的藏匿恢复到当前工作目录中，但不会从藏匿堆栈中删除它。
$ git stash pop
# 将最新的藏匿恢复到当前工作目录中，并从藏匿堆栈中删除它。
# 如果 pop 时出现冲突，则不会自动删除，后续需要你手动通过 git stash drop 删除
$ git stash list
# 显示当前所有藏匿的更改列表。
$ git stash drop stash@{n}
# 删除指定的藏匿，其中n是藏匿的索引号，从0开始计数。
# 也可以写成 git stash drop ${0}
```

## ls-remote

```sh
$ git ls-remote
# List references in a remote repository

$ git ls-remote -q
# Do not print remote URL to stderr.


```

## submodule

```sh

$ git submodule add <git-repo> <folder-name>
# 添加一个子模块
# 添加时，默认会克隆对应子模块，不过当别人从云端克隆该仓库时，是不会自动下载子模块中的内容的。
# 如果想要自动下载子模块内容，可以运行 git clone --recursive <git-repo>
# 或者可以在克隆后的仓库中通过下面两个命令实现同样的效果：
#           git submodule init      先初始化
#           git submodule update    然后更新子模块内容
# 当子模块云端仓库更新时，只需要进入子模块目录，然后 git pull 就可以获取最新的子模块内容了


$ git submodule init
$ git submodule update
```
