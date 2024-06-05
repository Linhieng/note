# 检查历史和状态

## bisect

Use binary search to find the commit that introduced a bug

## diff

Show changes between the working tree and the index or a tree,
     changes between the index and a tree,
     changes between two trees,
     changes resulting from a merge,
     changes between two blob objects, or
     changes between two files on disk.

```sh
$ git diff --shortstat "@{0 day ago}"
# 简单统计今天的文件变更记录
```

## grep

Print lines matching a pattern

## log

Show commit logs

```sh
$ git log
# 查看历史提交纪录。

$ git log --abbrev-commit --pretty=oneline
# --abbrev-commit 显示短的哈希值
# --pretty=oneline 代表将内容单行显示，超出部分隐藏。也可写成 --oneline

$ git log --graph
# 可以看到提交历史的字符图形表示。

$ git log --stat
# 显示每次提交的文件变化情况

$ git log -5 --oneline
# 显示最近5次提交

$ git log --follow --oneline <file>
# 显示 <file> 的变更记录

$ git log -p <file>
# 显示 <file> 每次变更的内容
```

## show

Show various types of objects(blobs, trees, tags and commits).

```sh
$ git show --name-only <commit>
# 显示某次提交时发生变更的文件

$ git show <commit>:<file>
# 显示某次提交后，文件 <file> 的内容
```

## status

Show the working tree status

Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the working tree and the index file, and paths in the working tree that are not tracked by Git (and are not ignored by gitignore).

```sh
$ git status
# 注意，若当前分支有上游分支，其所指的上游分支本质上只是本地中的远程分支
# 故想要查看当前分支与云端上的分支之间的关系，需要先更新（fetch）远程分支

$ git status (-s | --short)
# 以简短的形式给出输出。当没有输出时表示没有变更的内容。比如：
#   [??] 表示未被追踪
#   [!!] 表示被忽略，需要提供 --ignored 才会显示被忽略的文件
#   [A ] 表示该文件是新建的，并且已被追踪（added to index）
#   [ M] 表示该文件已被修改，但还未添加进暂存区（no updated in index）
#   [M ] 表示该文件已被修改，并且已添加进暂存区（updated in index）
#   [ D] 表示该文件已被删除，但还未添加进暂存区（no updated in index）
```
