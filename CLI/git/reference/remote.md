# git 与云端的交互

通常情况下，本地分支和远程分支的名称是相同的，故为了更好地区分，通常在远程分支前面添加一个远程仓库别名，比如 `origin/<branch-name>`。

git 与云端的交互可以概括为两点：

- 向远程仓库推送数据
- 从远程仓库拉取数据

要与远程仓库进行交互，一个必要的前提就是要让本地分支追踪（track）远程分支。由于这个过程很常见，所以当我们克隆云端仓库到本地时，git 会自动帮我们完成该工作。否则，需要我们显式指定追踪关系——借助 `--track` 和 `--set-upstream-to` 参数。

远程交互式，下面几个变量经常使用，所以统一在这里进行解释：

- `<repository>`
    - 表示远程仓库，可以是一个 URL 或远程仓库别名（如 origin）
- `<refspec>`
    - 指代远程仓库的引用和本地的引用，格式为 `+<src>:<dest>`
    - 默认是 `remote.<repository>.fetch` 配置项。
- `<name>`
    - 远程仓库别名，通常是 origin

## clone

Clone a repository into a new directory

Clones a repository into a newly created directory, creates remote-tracking branches for each branch in the cloned repository (visible using git branch --remotes), and creates and checks out an initial branch that is forked from the cloned repository’s currently active branch.

```sh
$ git clone <repository_git-url> [<directory-name>]
# Clone a repository into a new directory
# 当克隆一个本次仓库时，第二个参数不能省略。使用案例：
#       git clone D:\tmp\t1 D:\tmp\t2
#       git clone D:\tmp\t\.git t2


$ git clone -b <name> <url>
# 只克隆指定分支。注意分支名要区分大小写
# 不单单是分支，<name> 的值还可以是一个 hash、一个标签名！

$ git clone -c http.proxy="127.0.0.1:7890" <url>
# 克隆时显式指定代理

$ git clone --depth <depth> <url>
# 有时候项目太大，可以进行浅克隆，比如：
# git clone --depth=1 https://github.com/microsoft/TypeScript.git

$ git clone --shallow-since="1 week" <url>
# 克隆最近一周的
# 如果提示 fatal: error processing shallow info: 4，则可能是因为对应日期之后，没有提交内容。

$ git clone --shallow-since="2023-09-06" <url>
# 克隆 2023-09-06 日之后的


$ git clone --recursive <git-repo>
# 克隆时，同时克隆子模块中的内容
```

## fetch

Download objects and refs(branches/tags) from another repository.

fetch 的核心工作：

- 从远程仓库下载本地仓库中缺失的提交记录
- 更新远程分支指针(如 origin/main)

注意，fetch 并不会改变本地仓库的状态、不会更新本地分支，不会修改文件内容。可以将 fetch 理解为单纯的下载操作。想要将下载下来的数据同步到本地仓库中，需要进行合并操作——比如 `cherry-pick`, `rebase`, `merge` 等命令。

```sh
$ git fetch <repository>
# 拉取远程仓库的所有引用
$ get fetch <repository> <refspec>
# 拉取远程仓库的 <refspec> 引用

$ git fetch origin
# The above command copies all branches from the remote refs/heads/ namespace
# and stores them to the local refs/remotes/origin/ namespace,
# unless the remote.<repository>.fetch option is used to specify a non-default refspec.

$ git fetch origin br
# 从云端仓库（origin）中拉取 br 分支。此时远程分支 origin/br 将会被更新（或创建）
# 如果本地没有 br 分支，那么当切换到 br 分支时，将会自动创建该分支，并且建立追踪关系
$ git fetch origin br:br
# 该命令和前面的命令很像，但有些许区别。
# 该命令的作用是将远程仓库中的 br 分支拉取到本地 br 分支，但并不会自动设置追踪上游关系
# 如果本地不存在 br 分支，则会自动创建 br 分支，但该分支并不会自动追踪远程分支
# 所以当切换到 br 分支时，你的无参数 fetch, pull, push 命令会提示你请先设置上游分支！

$ git fetch --prune <name>
# git 的默认习性是只有当你显式地指明要删除某些数据，这些数据才会被删除。
# 所以当远程仓库中的分支或标签被删除时，fetch 操作并不会自动删除本地所对应的分支或标签
# 慢慢地，本地会累积了很多无用的远程引用，此时就可以通过 prune 命令来剔除无用的远程引用。
```

## pull

Fetch from and integrate with another repository or a local branch

Incorporates changes from a remote repository into the current branch.

pull 虽方便，但当你想将本地的多个副分支合并到云端主分支，并且偏爱 rebase 时，推荐使用 fetch，因为 rebase 支持指定“基”。

```sh
$ git pull <repository> <refspec>
# 从远程仓库拉取并合并

$ git pull origin br
# 将 origin/br 分支合并到当前位置（HEAD）。相当于以下两条命令：
#    git fetch origin
#    git merge origin/br

$ git pull
# 若当前分支有追踪某个上游分支(<name>/<upstream>)，则相当于下面两个命令
#   git fetch <name> <upstream>
#   git merge <name>/<upstream>
$ git pull --rebase
# 同上，但使用 rebase 而不是 merge
```

## push

Update remote refs along with associated objects

```sh
$ git push <repository> <refspec>
# Updates remote refs using local refs, while sending objects necessary to complete the given refs.

git push --all origin
# 推送所有分支

$ git push --force-with-lease
# 强制推送，但比 --force 更安全：如果推送时，有其他人推送了新的提交，则此次推送会被拒绝

$ git push
# Works like git push <remote>, where <remote> is the current branch’s remote (or
# origin, if no remote is configured for the current branch).

$ git push origin
# 若当前分支名和当前分支追踪的上游分支名相同，则该命令可作为 git push origin <upstream> 的简写

$ git push origin <src>:<dst>
# 将本地 src 分支推送到云端 dst 分支

$ git push origin -d <branch>
$ git push origin :<branch>
# 删除远程仓库中的 <branch> 分支

$ git push -u origin <branch>
# 将本地分支 <branch> 推送到云端，同时建立追踪关系。

$ git push --tags
# 上传本地所有标签。

$ git push origin :<tag>
$ git push origin :refs/tags/<tag>
# 删除远程仓库中的 <tag> 标签
```

## remote

Manage set of tracked repositories

Manage the set of repositories ("remotes") whose branches you track.

```sh
$ git remote
# shows a list of existing remotes.
# 通常只显示远程仓库的别名 origin

$ git remote -v
# show remote url after name

$ git remote add <name> <URL>
# Add a remote named <name> for the repository at <URL>

$ git remote rename <old> <new>
# Rename the remote named <old> to <new>.

$ git remote rm <name>
# Remove the remote named <name>. All remote-tracking branches and configuration settings for the remote are removed.

$ git remote prune <name>
# 剔除 <name> 中的无用分支或标签

git remote set-head origin -a
# 这个命令会自动设置远程仓库 origin 的默认分支。-a（或 --auto）选项告诉 Git 自动检测远程仓库的默认分支。
# 当我在 Github 上重命名默认分支名时，Github 就会给出下面步骤：
#       git branch -m main old-main
#       git fetch origin
#       git branch -u origin/old-main old-main
#       git remote set-head origin -a
```
