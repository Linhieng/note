# 迁移中

只记录 powershell7 内容

注意事项：

- 调用函数时，没有括号！
- 脚本使用 utf8 BOM 编码

powershell 7 相比 powershell 5 好处：

- 支持预览历史记录
- 更丰富的语法支持，比如 `&&`
- 更丰富的特性，快捷键，命令等等，太多了
- 输出文件默认编码为 UTF8，而不是 UTF16-LF
- ……

使用案例：

- 每天定时将本地仓库进行 push。参考 [AutoTask]

## ✨获取帮助

学习一样东西，最重要的就是知道从哪里获取知识！

```powershell
Get-Help
# 了解 powershell

Get-Help <command>
# 获取每个命令的帮助信息

man <command>
help <command>
# 获取具体可配置参数。只是给出格式定义，不会有太多文本说明信息

Get-Help <command> -online
# 获取在线帮助打开对应命令的在线文档
```

## 环境变量

- `[Environment]::SetEnvironmentVariable(KEY, VALUE)`
- `[Environment]::GetEnvironmentVariable`

```powershell
[Environment]::SetEnvironmentVariable("NODE_HOME", $(npm root -g), "User")
# 添加用户环境变量。
# [Environment]::SetEnvironmentVariable() 是一个 .NET Framework 中 System.Environment 类
# 的静态方法，用于设置环境变量。


# 设置环境变量名和值
$envVariableName = "NGINX_HOME"
$envVariableValue = "C:\soft\it\nginx-1.25.4"
# 使用 [System.Environment]::SetEnvironmentVariable() 方法添加环境变量到用户级别
[System.Environment]::SetEnvironmentVariable($envVariableName, $envVariableValue, [System.EnvironmentVariableTarget]::User)
# 或者直接写成下面这样也是可以的
[Environment]::SetEnvironmentVariable("HELLO", "WORLD", "User")

[Environment]::SetEnvironmentVariable("TEMPORARY_KEY", "hello, world")
# 临时的环境变量

[Environment]::GetEnvironmentVariable("NGINX_HOME")
# 获取环境变量

# [System.Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";$env:NGINX_HOME", [System.EnvironmentVariableTarget]::Machine)
# [System.Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";$env:NGINX_HOME", "User")
# ⚠️测试这个命令前，先备份好原本的环境变量
```

- `env:`
- `$env`

```powershell
$env:NGINX_HOME
# 输出环境变量 NGINX_HOME
# 如果是用户权限，则只能获取用户级别的环境变量
# 如果是管理员权限，则可以获取系统级别的环境变量


Get-ChildItem env:
ls env:
# 获取环境变量 $env 的值
# 能获取什么级别，取决于运行的模式（用户还是管理员）

$env:<key> = "<value>"
# 设置临时环境变量

explorer $env:LOCALAPPDATA
# 使用环境变量

$env:PATH.Split(';')
# 查看 path 环境变量
```

通过注册表获取环境相关环境变量

```powershell
(Get-Item -Path "Registry::HKEY_CURRENT_USER\Environment").GetValue("Path", "", "DoNotExpandEnvironmentNames").split(';')
# 只获取用户级别的环境变量 Path

(Get-Item -Path "Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment").GetValue("Path", "", "DoNotExpandEnvironmentNames").Split(';')
# 只获取系统级别的环境变量 path
```

其他

```powershell
gv
Get-Variable
# 查看当前 powershell 的变量
```

### 常用的 Windows 内置变量

Windows 中一些我觉得有用的全局变量，内容提取自 `ls env:`

| env                     | path                                   |
|-------------------------|----------------------------------------|
| SystemDrive             | C:                                     |
| HOMEDRIVE               | C:                                     |
| SystemRoot              | C:\Windows                             |
| windir                  | C:\Windows                             |
|                         |                                        |
| PUBLIC                  | C:\Users\Public                        |
| USERPROFILE             | C:\Users\{username}                    |
| APPDATA                 | C:\Users\{username}\AppData\Roaming    |
| LOCALAPPDATA            | C:\Users\{username}\AppData\Local      |
| TEMP                    | C:\Users\{username}\AppData\Local\Temp |
| TMP                     | C:\Users\{username}\AppData\Local\Temp |
|                         |                                        |
| ProgramData             | C:\ProgramData                         |
| ALLUSERSPROFILE         | C:\ProgramData                         |
| ProgramFiles            | C:\Program Files                       |
| ProgramFiles(x86)       | C:\Program Files (x86)                 |
| CommonProgramFiles      | C:\Program Files\Common Files          |
| CommonProgramFiles(x86) | C:\Program Files (x86)\Common Files    |
|                         |                                        |
| COMPUTERNAME            | DESKTOP-???                            |
| HOMEPATH                | \Users\{username}                      |
| LOGONSERVER             | \\{HOST_NAME}                          |
| PROCESSOR_ARCHITECTURE  | AMD64                                  |
| USERDOMAIN              | {HOST_NAME}                            |
| USERNAME                | {username}                             |

## 文件和文件夹

- Copy-Item
- Get-Content
- New-Item
- Get-ChildItem

案例

```powershell
Copy-Item -Path "D:\draft\all-code-tmp\MyTool.psm1" -Destination "$PSHOME\Modules\MyTool"
# 将文件拷贝到指定目录

Get-Content G:\backup-mysql\db01.sql | mysql -uroot -p old_db01
# 导入 sql 文件

New-Item -ItemType SymbolicLink -Target (npm root -g) -Path "$HOME\.node_modules" -Force
# 以管理员方式运行。强制创建文件夹 $HOME\.node_modules，并将其指向 npm 全局模块中。
# 注意创建的是符号链接，而不是 win 中的快捷方式

cd C:\soft\it\mkcert
New-Item -ItemType SymbolicLink -Target .\mkcert-v1.4.4-windows-amd64.exe -Path mkcert.exe
# 为 mkcert-v1.4.4-windows-amd64.exe 创建一个软连接，名为 mkcert.exe 注意要有后缀名 exe
# 或者，如果已经添加 C:\soft\it\mkcert 到 path，则可以不需要移动到 mkcert，直接：
New-Item -ItemType SymbolicLink -Target mkcert-v1.4.4-windows-amd64.exe -Path C:\soft\it\mkcert\mkcert.exe
# 注意两个 .exe 都不能省略。

New-Item -Path '<new_directory_url>' -ItemType Directory
# 创建文件夹

New-Item -Path '<new_file_url>' -ItemType File
# 创建文件，如果文件已存在则报错

New-Item -Force -Path '<new_file_url>' -ItemType File
# 强制创建文件，如果文件已存在则会被覆盖

Get-ChildItem -Path . -Recurse -Exclude "node_modules" -File | Where-Object { $_.Name -like "playwright.config*" }
# 在该目录下查找 playwright.config 开头文件，并忽略 node_modules 文件夹

```

获取 lnk 文件的指向

```powershell
function get_lnk_target($fullpath) {
  $sh = New-Object -ComObject WScript.Shell
  $target = $sh.CreateShortcut($fullpath).TargetPath
  return $target
}
```

### 硬链接、软连接、快捷方式和普通文件

```powershell
echo 'hello' > a.txt
(Get-Item "a.txt").LinkType -eq $null
# 普通文件的链接类型为空


New-Item -ItemType SymbolicLink -Path ".\link-a.txt" -Value ".\a.txt"
# 通过管理员权限，为其创建一个符号链接
(Get-Item "link-a.txt").LinkType
# 输出 SymbolicLink


(Get-Item "a.txt - 快捷方式.lnk").LinkType -eq $null
# 输出 True
# 可以看出，快捷方式本质上只是一个普通 lnk 文件



(Get-Item "a.txt").LinkType -eq $null
# True
# 一个文件刚开始是普通文件

New-Item -ItemType HardLink -Path "hard-a.txt" -Value ".\a.txt"
# 为其创建一个硬链接后

(Get-Item "a.txt").LinkType
# 输出 HardLink
# 此时 a.txt 文件就变成硬链接了

(Get-Item "hard-a.txt").LinkType
# 输出 HardLink

```

为什么为一个普通文件创建硬链接后，这个普通文件也会变成硬链接呢？
这是因为硬链接文件只是一个空间引用，当你为一个普通文件创建硬链接后，
这块空间的所有者就会变成了两个（硬链接）。这个时候，如果你删除掉原本的
文件，你会发现硬链接文件同样还是有效的，这就像是编程中的垃圾回收一样。
只有当所有引用消失时，对应的空间才会被回收。

查看硬链接的数量：

```powershell

$ fsutil hardlink list a.txt
# 输出 \tmp\t\a.txt
# 输出 \tmp\t\hard-a.txt

$ fsutil hardlink list hard-a.txt
# 输出 \tmp\t\a.txt
# 输出 \tmp\t\hard-a.txt
```

通过备用视图来快速查看一个文件是否时硬链接：

```powershell
$ dir

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---            2024/4/3    22:39              7 a.txt
-a---            2024/4/3    22:39              7 hard-a.txt
la---            2024/4/3    22:39              0 link-a.txt -> .\a.txt

# 使用备用视图展示：

dir | Format-Table -View childrenWithHardlink

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
la---            2024/4/3    22:39              7 a.txt
la---            2024/4/3    22:39              7 hard-a.txt
la---            2024/4/3    22:39              0 link-a.txt -> .\a.txt

# 可以看到硬链接文件的 mode 中展示了 la---，
# 而在普通 dir 中仅仅只显示 -a---。
```

## 系统和硬件相关信息、pwsh 版本

```powershell
$PSVersionTable
$host.version
Get-Host
# pwsh 版本信息

Get-CimInstance -ClassName Win32_OperatingSystem
$PSVersionTable.OS.Version
# win 版本号。比如 19045.3805 版本时，能获取到 19045

Get-ItemProperty -Path  "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" | Select-Object -ExpandProperty "UBR"
# 通过注册表获取版本号后面的 3805
Get-ItemProperty -Path  "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" | Select-Object -Property "CurrentBuildNumber", "UBR"
# 获取直接显示内部版本号和 UBR


(Get-CimInstance win32_processor).NumberOfLogicalProcessors
# 获取逻辑处理器个数
```

获取硬件 ID 相关命令。
注意，没有什么是能够绝对标识唯一主机的，相对靠谱的是主板 UUID。

```powershell

systeminfo
# 获取系统信息，包括：
# 网卡 MAC 地址、BIOS、虚拟化支持等等

wmic cpu get processorid
# 可以获取 CPU ID。（并不唯一，Intel现在可能同一批次的CPU ID都一样）
# 实测，重装系统不会改变它

wmic diskdrive get serialnumber
# 获取硬盘序列号。（不一定所有的电脑都能获取到硬盘序列号）
# 实测，重装系统不会改变它

wmic csproduct get UUID
# 主板序列号（不是所有的厂商都提供一个UUID，可能返回一个全 F 的无效 UUID）
# dmidecode -s system-uuid 用于 linux 获取主板 UUID
# 实测，重装系统不会改变它
```

## 样式、颜色

```powershell
# 定义颜色数组
$colors = @(
    "Black", "DarkBlue", "DarkGreen", "DarkCyan",
    "DarkRed", "DarkMagenta", "DarkYellow", "Gray",
    "DarkGray", "Blue", "Green", "Cyan",
    "Red", "Magenta", "Yellow", "White"
)

# 遍历数组并输出每种颜色的示例
foreach ($color in $colors) {
    Write-Host "This is $color text" -ForegroundColor $color
}
```

## 计划任务

更多配置项可以参考：[new-scheduledtasksettingsset]

```powershell
$taskName = "MyTask"

# 检查任务是否存在
$taskExists = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

# 如果任务存在，则删除它
if ($taskExists) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
} else {
    Write-Host "任务 $taskName 不存在，不需要删除。"
}

# 如果需要隐藏窗口，可以直接在 Start-Process 后添加 -WindowStyle hidden
$action = New-ScheduledTaskAction -Execute "pwsh.exe" -Argument "-Command `"Start-Process -FilePath pwsh.exe -ArgumentList 'D:\github-code\AutoTask\scripts\auto-push.ps1'`""
# 每晚 10:20 分
$trigger = New-ScheduledTaskTrigger -Daily -At "10:20:00 PM"
# 需要有网络时才运行
$settings = New-ScheduledTaskSettingsSet -Hidden -RunOnlyIfNetworkAvailable
$description = "这是一个定时推送本地 git 仓库的计划任务"
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description $description
```

## 快捷键脚本

```powershell
Get-PSReadlineKeyHandler
# 查看快捷键说明。或者可以直接通过 ctrl+alt+? 快捷键。注意问号表示 shift + / 。


Set-PSReadLineOption -PredictionSource History
# 设置预测文本来源为历史记录



# 默认的 UpArrow 和 DownArrow 按键，只能切换到上一个命令和下一个命令，无法根据已输入的
# 内容进行搜索，所以常常得用 Ctrl+R 进行搜索。为此，可以修改这两个快捷键：

# 设置 UpArrow 快捷方式为向前搜索
Set-PSReadLineKeyHandler -Key UpArrow -ScriptBlock {
  [Microsoft.PowerShell.PSConsoleReadLine]::HistorySearchBackward()
  [Microsoft.PowerShell.PSConsoleReadLine]::EndOfLine()
} # 设置向上键为后向搜索历史记录
# 设置 DownArrow 快捷方式为向后搜索
Set-PSReadLineKeyHandler -Key DownArrow -ScriptBlock {
  [Microsoft.PowerShell.PSConsoleReadLine]::HistorySearchForward()
  [Microsoft.PowerShell.PSConsoleReadLine]::EndOfLine()
}
```

## 字符串

```powershell
$string = "C:\a\b\c"
$newString = $string -replace '\\', '/'
Write-Output $newString # C:/a/b/c
$newString = $string.Replace('\', '-')
Write-Output $newString # C:-a-b-c
```

## 零碎，暂不成体系

### 编码问题

```powershell
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
# 使用 chcp 修改无效的，得通过这种方式修改才有效
```

### 命令别名、函数

```powershell
Get-Alias
# 获取所有别名

New-Alias -Name "ls" -Value "Get-ChildItem"
# 为一个命令提供别名。只能是命令，不支持参数。
# New-Alias -Name "ll" -Value "get-childitem -af -h" ❌


# 想要为多个命令使用别名，可以采用函数的方式
function Get-NginxProcesses {
  tasklist | Select-Object -First 3
  tasklist | findstr "imagename eq nginx.exe"
}
Get-NginxProcesses


function hello_world {
  param(
    [string] $hello,
    [string] $world
  )

  Write-Host $hello $world -ForegroundColor "green"
}

hello_world -hello "你好" -world "世界"
```

为 pnpm 永久添加命令别名

```powershell
code $profile.AllUsersAllHosts
# 打开文件夹

set-alias -name pn -value pnpm
# 写入这项内容
```

### 错误处理

```powershell
function test {
  throw "这是一个自定义错误"
}

try {
  test
} catch {
  Write-Host $_
}
```

### 模块

```powershell
Write-Host $PSHOME\Modules
# 查看模块路径。pwsh

Copy-Item -Path "D:\draft\all-code-tmp\MyTool.psm1" -Destination "$PSHOME\Modules\MyTool"
# 模块内要有一个文件名与模块名相同

Get-Command -Module MyTool
# 查看模块

Hello-World
# 直接运行模块内的函数
```

### 工具 CertUtil, Get-Command

```powershell
CertUtil -hashfile <file_url> [<hash>]
# 可用于计算文件的哈希值。默认 SHA1，还支持 MD5, SHA256 等

Get-Command
# 获取所有可运行命令。替代 where。案例：
(Get-Command cmd).Path
(Get-Command cmd).Source
```

### 其他 ForEach-Object, Start-Process

```powershell
ls | ForEach-Object { echo $_ }
# ForEach-Object { } 是 PowerShell 中的一个 cmdlet，用于迭代集合中的每个对象
# $_ 代表当前迭代的对象

Start-Process -WindowStyle hidden -FilePath pwsh.exe -ArgumentList "D:\draft\all-code-tmp\test.ps1"
# 隐藏窗口运行脚本

Start-Process -FilePath pwsh.exe -ArgumentList "-File", "D:\draft\all-code-tmp\x.ps1", "-param1", "value1", "-param2", "value2"
# 运行脚本时提供参数
```

### 脚本参数

在 a.ps1 中

```powershell
Start-Process -FilePath pwsh.exe -ArgumentList "-File", "D:\draft\all-code-tmp\x.ps1", "-param1", "value1", "-param2", "value2"
```

在 D:\draft\all-code-tmp\x.ps1 文件夹中：

```powershell
param (
    [string]$param1,
    [string]$param2
)

Write-Host "参数1：$param1"
Write-Host "参数2：$param2"
```

### fsutil

```powershell
fsutil file createnew D:\draft\all-code-tmp\file4.txt $(1024 * 1024 * 2)
```

---
[AutoTask]: https://github.com/Linhieng/AutoTask
[new-scheduledtasksettingsset]: https://www.pdq.com/powershell/new-scheduledtasksettingsset/#RunOnlyIfNetworkAvailable
