# 草稿

```json
// See https://go.microsoft.com/fwlink/?LinkId=733558
// for the documentation about the tasks.json format
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "npm",
			"script": "watch",
			"problemMatcher": "$tsc-watch",
			"isBackground": true,
			"presentation": {
				"reveal": "never"
			},
			"group": {
				"kind": "build",
				"isDefault": true
			}
		},
		{
			"label": "Create package.json",
			"type": "process",
			"command": "pwsh",
			"args": [
				"-Command",
				"New-Item -ItemType Directory -Force -Path 'out' && Write-Output '{\"type\":\"commonjs\"}' | Out-File -FilePath 'out/package.json' -Encoding UTF8",
			],
			// "options": {
			//  "shell": {
			//      "executable": "pwsh",
			//      "args": [
			//          "-Command"
			//      ]
			//  }
			// },
			// "type": "shell",
			// "command": "Write-Output '{\"\"type\":\"commonjs\"}' | Out-File -FilePath 'out/package.json' -Encoding UTF8",
			// "options": {
			//  "shell": {
			//      "executable": "pwsh",
			//      "args": [
			//          "-Command"
			//      ]
			//  }
			// },
			"group": {
				"kind": "build",
				// "isDefault": true
			}
		}
	]
}

```

```json
// .vscode/tasks.json
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "npm",
			"script": "watch",
			"problemMatcher": "$tsc-watch",
			"isBackground": true,
			"presentation": {
				"reveal": "never"
			},
			"group": {
				"kind": "build",
				// "isDefault": true
			}
		},
		{
			"label": "debug misc",
			"type": "process",
			// 使用 pwsh.exe 运行命令
			"command": "pwsh",
			"args": [
				"-Command",
				// "New-Item -ItemType Directory -Force -Path 'out' && Write-Output '{\"type\":\"commonjs\"}' | Out-File -FilePath 'out/package.json' -Encoding UTF8",
				// 由于该 task 依赖与 npm: watch 命令，所以可以确保 out 路径的存在。但考虑某某些极端情况下 npm: watch 不会生成新的 js 文件，所以还是保留上面命令
				"New-Item -ItemType Directory -Force -Path 'out' && Write-Output '{\"type\":\"commonjs\"}' | Out-File -FilePath 'out/package.json' -Encoding UTF8",
			],
			"dependsOn": ["npm: watch"],
			"group": {
				"kind": "build",
				"isDefault": true
			}
		},
	]
}

```
