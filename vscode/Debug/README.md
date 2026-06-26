# [vscode 调试](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)

调试文件所在位置：`.vscode/launch.json`

## [支持的变量名](https://code.visualstudio.com/docs/editor/variables-reference)

variables                    | 说明                             | 示例值
-----------------------------|----------------------------------|-------------------------------------------------------------------
`${workspaceFolder}`         | 当前工作目录的绝对路径           | `C:\Users\Public\TEMP\all-code-tmp`
`${workspaceFolderBasename}` | 当前工作目录的文件夹名称         | `all-code-tmp`
`${file}`                    | 当前文件的绝对路径               | `C:\Users\Public\TEMP\all-code-tmp\js\b\test.js`
`${fileWorkspaceFolder}`     | 当前文件所在的工作目录的绝对路径 | `C:\Users\Public\TEMP\all-code-tmp`
`${fileBasename}`            | 当前文件名                       | `test.js`
`${fileBasenameNoExtension}` | 当前文件名，没有扩展名            | `test`
`${fileExtname}`             | 当前文件扩展名                   | `.js`
`${fileDirname}`             | 当前文件所在目录的绝对路径       | `C:\Users\Public\TEMP\all-code-tmp\js\b`
`${fileDirnameBasename}`     | 当前文件所在目录的文件夹名       | `b`
`${relativeFile}`            | 当前文件相对工作目录的相对路径   | `js\b\test.js`
`${relativeFileDirname}`     | 当前文件所在目录的相对路径       | `js\b`
`${userHome}`                | 当前用户的目录                   | `C:\Users\Linhi`
`${execPath}`                | vscode 运行程序路径              | `C:\Users\Linhi\AppData\Local\Programs\Microsoft VS Code\Code.exe`
`${pathSeparator}`           | 路径分隔符                       | `\`
`${lineNumber}`              | 鼠标选中内容所在行数             | `3`
`${selectedText}`            | 鼠标选中的内容                   | `log('hello, world!')`
`${cwd}`                     |                                  | `C:\Users\Public\TEMP\all-code-tmp`
`${defaultBuildTask}`        |                                  |

## jest 调试

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",    // launch 直接运行文件并调试；还有一个值是 attach，表示调试一个正在运行的程序（比如网页）。
            "name": "Jest Debug 调试",
            "program": "${workspaceFolder}\\node_modules\\jest\\bin\\jest", // 不能是 ${workspaceFolder}\\node_modules\\.bin\\jest
            "args": ["read-all-file-full-name.test"], // 提供给 jest 的参数
        }
    ]
}
```

## nodemon 调试

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "nodemon",
            // npm i -g nodemon
            "runtimeExecutable": "nodemon",
            "program": "${workspaceFolder}/src/",
            "restart": true,
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "env": {
                "debug": "app:*",
            }
        }
    ]
}

```
