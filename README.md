# 我的所有可公开笔记

- [x] 将其他所有可公开笔记仓库全部迁移到该仓库中。

使用准则：
- 我为 main 分支开启了保护功能，只能通过 PR 的方式添加内容到 main 分支
- 一个“仓库”对应一个分支，并且分支名必须是 note-* 前缀，这样才能匹配到分支保护策略
- 本地开发时，分别为不同分支创建不同的文件夹！这样就可以无缝衔接过去的习惯，而且也方便自动推送脚本的运行。
- 新建分支时，需要从 anchor-new-branch 标签处新建，这样新的分支都才可以只包含自己的新文件夹！
- 合并 note-* 分支的 PR 时，一律采用 merge 的方式合并！如果需要 squash，请本地的 note-* 分支上处理，一旦提交到云端，则无法进行 squash，如果非要压缩，则需要修改分支保护策略。

> [!TIP]
> - 克隆指定分支/标签： `git clone -b <name> <url> <folder-name>`
>
> - 新建分支流程：
>    ```sh
>    $ git clone -b anchor-new-branch https://github.com/Linhieng/note.git note-xxx
>    # 先克隆锚点
>
>    $ cd note-xxx
>    # 进入克隆后的文件夹中
>
>    $ git switch -c note-xxx
>    # 新建分支
>
>    $ mkdir xxx
>    # 新建一个文件夹，此时不需要 note- 前缀！
>
>    # 现在，我们的本地仓库文件夹、仓库中的新分支对应文件夹，
>    # 新的分支名就都有了。
>    # 并且其中的分支名和本地仓库文件夹名称是一致的，
>    # 但仓库中的文件夹名称则没有 note- 前缀！
>    ```