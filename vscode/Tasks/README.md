# [vscode 中的 tasks](https://code.visualstudio.com/docs/editor/tasks)

## [支持的变量名](https://code.visualstudio.com/docs/editor/variables-reference)

同 debug 中的一样。

## 自定义 task, 以运行 jest 测试当前文件为例

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "jest single file",
            "type": "shell",
            "windows": {
                "command": "npx jest ${fileBasename}"
            },
            "group": "test",
            "presentation": {
            "reveal": "always",
            "panel": "dedicated"
            },
        }
      ]
}
```

说明：

- `label`: 该 task 的唯一标识
- `type`: 默认有 `shell` 和 `process` 两种，后者是创建一个子进程
- `command`: 要运行的具体命令。
- `args`: 提供的参数。
- `group`: 组别，默认有 test, build 两组。
- `presentation`: 有关输出的一些配置
    - `panel`: 设置为 `new` 时将打开一个新的终端运行
    - `reveal`: 设置为 `silent` 将会在看不见的终端上运行，如果没有该终端，则新建一个终端。
- `options`: 提供了下面三个配置项
    - `cwd`：工作目录
    - `env`：环境变量
    - `shell`：可以用来指定 shell。
- `runOptions`: 指示 tasks 的如何运行以及何时运行。
- 更多配置可参考 [tasks.json schema](https://code.visualstudio.com/docs/editor/tasks-appendix)

> 注意⚠️：
>
> 如果只使用 `command` 执行命令，那么很简单，该命令就是终端上运行的命令。但如果同时使用  `command` 和 `args`，那么就要确保 `command` 中不要添加参数，参数应该统一添加在 `args` 中。下面举一个错误的使用示例：
>
> ```json
> "command": "npx jest"
> "args": [
>     "${fileBasename}"
> ]
> ```
>
> 错误原因在于 `command` 中提供了参数，此时 `npx jest` 会被认为是单独的一个执行程序，并且由于有空格，所以会用引号将其包括起来，所以最后执行的命令是 `'npx jest' ${fileBasename}` 此时系统就会提供找不到对应命令。
>
> 所以正确的使用应该是下面这样的：
>
> ```json
> "command": "npx"
> "args": [
>     "jest",
>     "${fileBasename}"
> ]
> ```

在 keyboardings.json 中添加快捷键以下快捷键：

```json
{
    // ......
    {
        // 该快捷键用来运行 jest 测试
        // 添加 when 是为了和首字母大写快捷键区分开，同时确保只在 *.test.js 文件中执行，后续可能还会添加 .(js|ts|jsx) 之类的。
        "key": "ctrl+l ctrl+t",
        "command": "workbench.action.tasks.runTask",
        "when": "!editorHasSelection && resourceFilename =~ /.*test\\.(js)/",
        "args": "jest single file"
    },
}
```

## 重定向 C 语言文件输入（旧笔记）

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "type": "shell",
            "command": "C:\\msys64\\mingw64\\bin\\gcc.exe",
            "args": [
                "-fdiagnostics-color=always", // 在终端上显示彩色的诊断信息
                // "-g", 要调试时开启此参数, 开启后生成的文件会更大
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}" // 如果不想在看见 exe 文件, 可以输出到其他为止, 然后注意下面的 run 也要修改执行的路径

            ],
            "options": {
                "cwd": "${workspaceFolder}"
            }
        },
        {
            "label": "run",
            "type": "shell",
            // 重定向标准输入
            "command": "type input.txt | ${fileDirname}/${fileBasenameNoExtension}.exe",
            "options": {
                "cwd": "${fileDirname}"
            }
        },
        {
            "label": "build-and-run",
            "dependsOn": [ "build", "run" ] // 依次执行 build 和 run 任务
        }
    ]
}
```

可以添加快捷键，目前 vscode 不支持 `.vscode/keybindings.jsonc`, 未来也大概率不会支持，详细请见 [issue 4504](https://github.com/Microsoft/vscode/issues/4504)。

```jsonc
[
    {
        "key": "ctrl+shift+alt+a",
        "command": "workbench.action.tasks.runTask",
        "args": "build-and-run" // 对应 task 中的 label
    }
]
```
