# 提交与分支

## add

Add file contents to the index.

```sh
$ git add (-A | --all)
# 更新工作目录（working tree）中所有文件所对应的索引（index）。
# 效果上就是所有变更（changes, 包括 modified, deleted）和新文件（untracked）都被添加到暂存区（temporary staging area）。
```

## stage

Add file contents to the staging area

This is a synonym for git-add

## mv

Move or rename a file, a directory, or a symlink.

相比普通的 mv 命令，该命令帮我们省略了 add 命令。

## rm

Remove files from the working tree and from the index

```sh
$ git rm --cached <file>..
# 取消对 <file> 的追踪，但不从工作目录中实际删除该文件。

$ git rm -rf *
# （从 index 和working tree 中）删除当前分支中的所有文件
```

## restore

Restore working tree files. Restore specified paths in the working tree with some contents from a restore source.

```sh
git restore <file>...
# 丢弃文件的变更内容。等同于 vscode 中 Source Control 中的 Changes 中的返回符号（Discard Changes）

git restore --staged <file>...
# 将该文件从已归档中移出。等同于 vscode 中 Source Control 中的 Staged Changes 中的减号符号（Unstaged Changes）
```

## commit

Record changes to the repository.

Create a new commit containing the current contents of the index and the given log message describing the changes. The new commit is a direct child of HEAD, usually the tip of the current branch, and the branch is updated to point to it (unless no branch is associated with the working tree, in which case HEAD is "detached")

```sh
$ git commit (-a | --all)
# --all 容易误导人，让人以为它的效果和 git add --all 一样。
# 但实际上 --all 仅仅是将所有变更(modified, deleted)添加暂存区，新创建的文件（untracked）保持不变。

$ git commit -m <msg>
# Use the given <msg> as the commit message.

$ git commit --amend
# Replace the tip of the current branch by creating a new commit.
# 修改最近一次提交的注释内容。

$ git commit --allow-empty
# 创建一个空提交

$ git commit -a --amend --no-edit
# 将当前变更内容直接和前一个提交合并，不需要修改提交注释
```

## branch

List, create, or delete branches

```sh
$ git branch
# 列出所有本地分支。

$ git branch -r
# 列出所有远程分支

$ git branch -a
# 列出所有分支（本地和远程）

$ git branch -vv
# 显示分支的 哈希值（SHA1）、提交的注释信息（commit subject line）和对应的上游分支（upstream branch）

$ git branch <new-branch> [<commit> | HEAD]
# 从 <commit> 上创建一个新分支。

$ git branch (-m | --move) <old-branch> <new-branch>
# 修改分支名。

$ git branch (-d | --delete) <branch-name>
# 删除本地分支。
# 想要删除云端分支，可以使用 git push origin -d <branch-name>
#                     或 git push origin :<branch-name>


$ git branch (-f | --force) <branch> [<commit> | HEAD]
# 强制将 <branch> 移动到 <commit>。
# 注意，<branch> 不能是当前所在分支。

$ git branch <new-branch> (-t | --track | --track=direct) <upstream>
# 新建一个分支，并让其追踪 <upstream>
# 注意：git branch -t <new-branch> 的效果是新建一个分支，并将该分支追踪当前位置！

$ git branch (-u | --set-upstream-to) <upstream> [<branch> | HEAD]
# set the <branch> to track <upstream>。

$ git branch --unset-upstream <branchname>
# Remove the upstream information for <branchname>.
# If no branch is specified it defaults to the current branch.
```

## tag

标签就像是一个锚点，可以把它当成某个提交哈希值的别名。标签不像分支，它无法改变位置，所以标签通常用于记录某个重要的节点，比如某个大版本的发布或者某次重要的合并操作或者修正某个重要的 bug 等。

```sh
$ git tag
# 列出所有标签。

$ git tag <tag-name> [<commit> | HEAD]
# 给某次提交 <commit> 添加一个标签。

$ git push --tags
# 将本地所有标签推送到云端

$ git tag (-d | --delete) <tag-name>
# 删除本地标签。

$ git push origin :refs/tags/<tag-name>
# 删除云端上的标签

$ git describe [<ref> | HEAD]
# 查找距离 <ref> 最近的祖先标签。如果 <ref> 本身就是标签，则只输出对应标签名。否则输出 <tag>_<numCommits>_g<hash>
# <tag> 为标签名。
# <numCommits> 表示 <tag> 与 <ref> 之间相差多少个提交记录
# <hash> 指的是该标签所对应提交记录的前几位哈希值

```

## checkout

Switch branches or restore working tree files

Updates files in the working tree to match the version in the index or the specified tree. If no pathspec was given, git checkout will also update HEAD to set the specified branch as the current branch.

checkout(check out) 意为检出。简单理解就是将当前位置（HEAD）移动到对应位置上。

checkout 的功能相当强大，从而也显得臃肿和复杂，所以出现了一些新的命令来分担它的相关功能，比如 switch 命令，下面是一些可用 switch 命令替换的功能：

```sh
$ git checkout <branch>
# 切换分支

$ git checkout -b <new-branch> [<start-point> | HEAD]
# 新建分支并切换到该分支。可指定分支的起始位置

$ git checkout -b <new-branch> -t <upstream>
# 在 <upstream> 处新建分支并切换到该分支，同时将新分支追踪 <upstream>。

$ git checkout --orphan <new-branch>
# 新建一个空分支，并切换到该分支。
# 空分支：没有任何历史提交记录，和其他分支也没有任何联系
```

checkout 还可以切换到指定的某次提交。但这样描述可能让人觉得和“checkout”的含义没太大关系，所以我们换种描述：checkout 可以从历史提交记录中检出某次提交。不仅如此，checkout 还可以只检出某次提交中的某个文件，效果上就像是将某个文件恢复到之前的某个版本一样！

```sh
$ git checkout <commit>
# 检出某次提交

$ git checkout <tree-ish> <pathspec>
# 检出 <tree-ish> (通常是一个提交) 时 <pathspec> 的内容。
# 上面的命令解释起来太过麻烦，写成这样 git checkout <commit> <file> 来解释比较方便
# 将 <file> 的内容恢复到 <commit> 版本时的状态。

$ git checkout (-p | --patch) <tree-ish> -- <pathspec>
# 类似于上一个命令，但 -p 参数能够让我们做一些其他操作，而不是直接恢复成某个版本的状态
```

## switch

Switch to a specified branch. The working tree and the index are updated to match the branch. All new commits will be added to the tip of this branch.

```sh
$ git switch <branch>
# 切换分支

$ git switch -c <new-branch> [<start-point> | HEAD]
# 新建分支并切换到该分支。可指定分支的起始位置

$ git switch -c <new-branch> -t <upstream>
# 在 <upstream> 处新建分支并切换到该分支，同时将新分支追踪 <upstream>。

$ git switch --orphan <new-branch>
# 新建一个空分支，并切换到该分支
```

## 合并策略

默认情况下，git 会自动选择合适的策略，但我们也可以手动指定策略：

```sh
git (merge | rebase | cherry-pick) --strategy=<strategy>
# 可选策略有 octopus ours recursive resolve subtree.
```

- `ours` 策略
    - 舍弃另一条分支所作出的变更，只保留当前分支。
- `recursive` 策略
    - 最常见、最常用策略，同时也是合并有交叉分支时 git 的默认策略
    - 算法描述：递归寻找路径最短的唯一共同祖先节点，然后以其为 base 节点进行递归三向合并。
- FAST-FORWARD MERGE
    - 快速合并策略。在该策略下，将两个处于同一条历史提交树的提交合并时，git 不会创建新的提交记录，而是直接移动到最新的提交上。比如有这么一个历史提交树 c1 <—— c2 <—— c3 ，在 c1 上执行 `git merge c3` 或 `git rebase c3` 时，git 会直接将 c1 移动到 c3 上。
    - `git merge` 时添加 `--no-ff` 参数可以阻止此行为，即强制新建一个提交用于合并。

## merge

Join two or more development histories together

```sh
$ git merge <commit>
# 将 <commit> 合并到当前位置（HEAD），并新建一个提交

$ git merge <commit> --no-commit
# 合并后不自动 commit

$ git merge <commit> --allow-unrelated-histories
# 允许合并两个不相关（没有共同祖先）的分支

$ git merge -s ours <commit>
# 与 <commit> 合并，但不接受 <commit> 中的任何内容

$ git merge <branch> --no-ff
# 不采取快速合并（Fast-Forward）策略
```

## rebase

该命令本质上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。效果是能够让历史提交树变得更加简洁清晰。

`rebase` 和 `merge` 的区别就在于：

- `merge` 会保留所有提交纪录，但历史纪录会分叉；
- `rebase` 能够让历史提交树不分叉，但会丢失提交纪录（垃圾回收机制）。

```sh
$ git rebase <newBaseCommit> [<commit> | HEAD]
# 取出 <commit> 上的一系列提交记录，然后“复制”他们，并按顺序依次添加到 <newBaseCommit> 之后。
# 这个一系列提交记录，指的是 <commit> 与 <newBaseCommit> 的最近公共父节点之间的一系列提交记录。
```

如果初次接触 rebase，可以进入[该网站](https://learngitbranching.js.org/?NODEMO)，然后运行以下命令加强对 rebase 的认识

```sh
git switch -c bugfix
git commit
git commit
git switch main
git commit
git commit
git rebase main bugfix # 该命令可拆分为 git switch bugfix 和 git rebase main 两条命令
```

### 交互式 rebase

进入交互出 rebase 模式时，会打开一个 todo 文件，我们可以在文件中书写等待处理的命令。

```sh
$ git rebase (-i | --interactive) <commit>
# 交互式处理 HEAD 到 <commit>（不包含该提交）之间的一系列提交，然后将其放在 <commit> 之后。

$ git rebase --edit-todo
# 打开 todo 文件，编辑剩余的待处理命令
```

初次进入交互式处理时，todo 文件中会按顺序列出 [HEAD, <提交>) 之间的一系列提交，并且每行都属于一条命令，默认是 `pick <command>`。交互式 rebase 本质上就是从上自选按序运行这一系列命令，结果会得到一系列提交的拷贝，这些拷贝将会放在 `<commit>` 之后。所以，我们可以修改这些命令，来实现“交互式 rebase”了。比如更改命令顺序，就相当于更改提交记录的顺序（tips: 在 vim 中按下快捷键 `dd` 可剪切整行，然后按下 `p` 可将整行粘贴到当前行的下面），这类似于 `cherry-pick` 命令，但更加便捷。

一些命令的含义如下：

- `pick <commit>`: use commit。
    - 解释：pick 表示仅仅只是选择该提交，而不会做其他操作（git 也不允许我们做其他操作，除非需要解决冲突）
- `reword <commit>`: use commit, but edit the commit message
    - 解释：reword 同样也是选择该提交，但会停下来修改本次 commit 的注释内容。
- `edit <commit>`: use commit, but stop for amending.
    - amending 表示做一些补充工作，在此期间可以选择创建新的提交来记录，也可以创建，而是直接 continue。
    - 当补充工作完成时，执行 `git rebase --continue` 继续执行下一条命令
    - 如果需要修改后续的命令，执行 `git rebase --edit-todo` 可再次编辑 todo 文件
- `squash <commit>`: use commit, but meld into previous commit
    - 将该提交直接合并在前一个提交中。但会要求我们重新编写 commit 内容
- `fixup [-c | -C] <commit>`
    - 该命令是 `squash` 的快捷版本，默认（`-c`）只采用前一个记录的 commit 内容。如果指定 `-C` 参数，则只采取当前记录的 commit 内容。
- `drop <commit>`: remove commit
    - 相当于 pick 的反义词，表示不选择该提交。
    - 直接将某行删除也是一样的效果。
- `break`: stop here (continue rebase later with `git rebase --continue`)
    - 自我感觉效果上似乎和 `edit` 命令一样。（但 vscode 似乎没有不认为 break 过程是同样处于 rebasing 状态）

```sh

$ git rebase --continue
# 继续 rebasing 过程，也就是继续执行 todo 文件中的命令。

$ git rebase --skip
# 如果没有冲突，效果上类似于 --continue。
# 如果出现冲突，则该命令会直接丢弃待合并的提交，继续下一条命令。效果上等于 drop

$ git rebase --abort
# 取消本次 rebase 操作
```

## cherry-pick

Apply the changes introduced by some existing commits

Given one or more existing commits, apply the change each one introduces, recording a new commit for each.

cherry-pick 只挑选指定提交所带来的变更，然后将其添加在当前位置（HEAD）之后。

注意是**指定提交所带来的变更**，并不包含指定提交前的变更总和！

```sh
$ git cherry-pick -n <commit>
# 应用 <commit> 带来的变更内容，但不创建新的提交

$ git cherry-pick ..main
# 将不属于 HEAD，但属于 main 的祖先的一系列提交添加到 HEAD 之后

$ git cherry-pick --skip
# 跳过本次提交、不选择本次提交

$ git cherry-pick --continue
# （解决冲突后）继续 cherry-pick 过程

$ git cherry-pick --abort
# 取消本次 cherry-pick 操作
```

## reset

Reset current HEAD to the specified state

reset 可直接回退到某次提交。支持保留/删除被撤销的提交所作出的变更内容。该命令非常好理解，使用时只需注意一点，该命令不同于 revert 和 cherry-pick 等命令，该命令不支持撤回（没有 `--abort` 参数可供选择）。

```sh
$ git reset (--soft) HEAD^
# 回退到上一次提交，即撤销本次的提交，同时保留本次提交的变更内容。（默认）

$ git reset --hard HEAD^
# 回退到上一次提交，即撤销本次的提交，同时删除本次提交的变更内容⚠️

$ git reset (HEAD)
# Unstage All Changes。
# 回退到 HEAD 时的状态，其索引（index）也会回退，也就是清空暂存区(git restore --staged *)，
```

## revert

该命令用于撤销某次提交所作出的变更。相当于 cherry-pick 的逆操作——选出要撤销的提交，然后将其移除。

revert 过程中出现冲突，则表示撤销变更的内容后，与当前的内容有冲突。

```sh
$ git revert -n main~2 main~3 main~4
$ git revert -n main~5..main~2
# 依次撤销 main~2 main~3 main~4 共三个提交所做出的变更
# 注意顺序问题
#
# 每成功撤销一个提交，都会创建一个新的提交来记录本次 revert 操作
# 通过 -n/--no-commit 可阻止此行为。

$ git revert -n main~5^..main~2
$ git revert -n main~2 main~3 main~4
# 由于 .. 运算符是一开一闭结构，我们可以直接在左部添加一个 ^ 来实现左右闭合

$ git revert --abort
# 取消本次 revert 操作

git revert --no-commit HEAD
# revert，但不提交
```
