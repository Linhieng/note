# 草稿

## 零碎

多文件 workspace + profile 自定义 setting 时，会出现以下 settings json 文件：

- User: 属于当前 profile 的配置。通过界面操作时，vscode 会更新这里面的配置
- Folder: workspace 中每个文件夹所属
- Application: the default profile settings json. 只有一部分配置能生效，如 `http.proxy`,
- Workspace: 这就是是我想要，自己编辑的 setting 不会被 vscode 自动修改。
- Default: omit.

## 案例解决方案

### 有关 markdown 智能粘贴的那些事

更多信息请查看 [vscode#188736](https://github.com/microsoft/vscode/issues/188736)。这里就直接说我对智能粘贴的处理方案：

首先，配置 `settings.json` 文件：

```json
"markdown.editor.pasteUrlAsFormattedLink.enabled": "always",
// 无论何时，当在 markdown 文档中粘贴一个链接时，都会将其处理为链接格式 —— [text](https://github.com/microsoft/vscode/issues/188736)
```

但有时候我们只想粘贴为纯文本格式，故我们可以为纯文本粘贴提供一个新的快捷键：编辑 `keybindings.json` 文件

```json
    {
        "key": "ctrl+l ctrl+v",
        "command": "editor.action.pasteAs",
        "when": "editorLangId == 'markdown'",
        "args": {
            // 粘贴为纯文本
            "id": "text"
        }
    },
```

现在，当键入 `ctrl+v` 时始终粘贴为链接格式，需要粘贴为纯文本格式时，只需键入 `ctrl+l ctrl+v`。

### 配置 C 语言运行环境

跟着 [官网教程](https://code.visualstudio.com/docs/cpp/config-mingw) 走就行。

1. 安装 vscode, C/C++ 扩展工具
2. 安装 [MSYS2](https://www.msys2.org/), 直接默认下一步。
3. 在 MSYS2 搭建的终端窗口中运行 `pacman -S --needed base-devel mingw-w64-x86_64-toolchain` 命令，该命令将安装我们所需要的所有工具链。安装途中会两次停顿，直接按下会车键即可。
4. 将 `C:\msys64\mingw64\bin` 添加到系统环境变量中
5. 打开 Window 终端，运行 `gcc --version`, `g++ --version`, `gdb --version` 命令确保成功。
6. 在 vscode 中编写 C/C++ 代码运行看看是否成功。
