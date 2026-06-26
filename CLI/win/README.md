<!-- cSpell:ignore JanDeDobbeleer rudolfs processorid csproduct -->
# Window


- TODO:
    -   提取 cmd 中的专属命令，并寻找对应的替代命令
    -   抛弃 cmd，拥抱 powershell，对标 shell！

推荐配置：

- [安装 Window 终端管理工具](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701)，[点击进入官方文档查看相关配置](https://learn.microsoft.com/zh-cn/windows/terminal/install)
- [安装 winget](https://apps.microsoft.com/detail/9NBLGGH4NNS1)
- [安装 powershell 7](https://github.com/PowerShell/PowerShell?tab=readme-ov-file#get-powershell)。（不推荐 cmd 和 powershell 5）

## 命令

```sh
<cmd1> && <cmd2>
# && 符号要求前一个命令正常运行时，才会运行第二个命令

<cmd1> || <cmd2>
# || 符号则相反，需要前一个命令运行失败才会运行第二个命令

<cmd1> | <cmd2>
# | 符号是管道字符，用于将第一个命令的结果作为第二个命令的输入，通常和 findstr 连用。
# 若第一个命令运行失败，则第二个命令也不会运行，最终只会输出第一个命令的标准错误输出。


# ------
<ps1> ; <ps2>
# 仅适用 ps。运行两个相互独立的命令
<cmd1> & <cmd2>
# 仅适用 cmd。运行两个相互独立的命令
```

```sh
help <command>
# ps 和 cmd 通用。推荐 :)

<cmd> /?
# 用于 cmd 中获取帮助

powershell -ExecutionPolicy ByPass -File "bat.ps1"
# bat 中执行 ps1 脚本

tree <path> [\F] [\A]
# 输出目录树。\F 表示包含文件。`\A` 表示使用 ASCII 字符构成 tree

echo (off | on)
# 显示/隐藏命令行提示符前的路径

explorer [<path>]
explorer %AppData% # cmd 打开 %AppData%\Roaming
explorer AppData # pwsh 打开 %AppData% 目录
explorer $(npm root -g) # pwsh
# 资源管理器，不添加 path 时等同于 win + E

findstr /?
# 搜索字符串，一般用在管道字符 | 之后

tasklist
# 显示正在运行的所有进程和对应 PID
taskkill  /PID  <PID值>   /F
# 强制终止指定 PID 进程

where  <command>
# 查看某命令所对应的可执行文件位置

SCHTASKS /Create /TN <唯一标识、任务名称> /TR <运行命令> /SC <频次> /ST <开始时间?>
# 通过该命令可以设置 Window 定时任务。指定频次为 ONCE 时，必须指定 /ST 参数。
```

### 环境变量

https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/set_1
用于临时修改环境变量的 set 命令

https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/setx
用于永久修改环境变量的 setx 命令


```sh
set
# 查看 cmd 环境下的环境变量
```


### ssh 网络

```powershell
ssh-keygen -t ECDSA
# 在本机生成 ECDSA 密钥（公钥和私钥）。
# 私钥通常存储在 ~/.ssh/id_ecdsa
# 公钥通常存储在 ~/.ssh/id_ecdsa.pub

ssh-copy-id username@hostname
# 该命令可将本机公钥添加到目标主机的 ~/.ssh/authorized_keys 文件中。
# 不过 Windows 没有内置该命令，可以选择安装 Cygwin
Get-Content $env:USERPROFILE\.ssh\id_ecdsa.pub | ssh root@xx.xx.xx "cat >> .ssh/authorized_keys"
# 实现与 ssh-copy-id username@hostname 同样的效果。

# The authenticity of host 'xx.xx.xx.xx' can't be established.
# ECDSA key fingerprint is SHA256:qq/xxxxxxxxxxx
# Are you sure you want to continue connecting (yes/no/[fingerprint])?
#
# 选项 [fingerprint]。表示可以选择输入指纹，即指定显示的密钥指纹，以验证服务器的身份。
# 指纹是服务器的一种唯一标识，通过对比指纹，用户可以确保他们正在连接的是正确的服务器，而不是遭遇了中间人攻击。
# 通过 ssh-keyscan -t rsa xxx.xx.xx.xx 可以获取指定主机的 SSH RSA 公钥和指纹
# 通过 ssh-keyscan -t ecdsa xxx.xx.xx.xx 可以获取指定主机的 SSH ECDSA 公钥和指纹
# Windows 10 内置的 OpenSSH 客户端提供了基本的 SSH 客户端和服务器功能，可以自动存储目标主机的指纹。使用方法：ssh username@hostname
# 目标主机的公钥通常存储在 ~/.ssh/known_hosts 中。
# RSA 和 ECDSA 都是常用的非对称加密算法。
# RSA 出现的早，它基于大素数的因子分解问题，安全性取决于密钥的长度（2048位或更长），所以 RSA 签名和加密速度相对较慢
# ECDSA 是基于椭圆曲线离散对数问题的算法，相对较新，但已被广泛采用并被证明是安全的。它提供了与RSA相当的安全性，但使用较短的密钥长度，所以签名和加密速度比 RSA 快。


ssh-keyscan -t rsa xx.xx.xx.xx | ssh-keygen -lv -f -
# https://superuser.com/a/1111974/1834019
# ssh-keyscan 工具用于获取指定 IP 地址的 RSA 密钥。-t rsa 参数指定了密钥类型为 RSA。这个命令的输出是被扫描主机的公钥。
# ssh-keygen 工具来验证从 ssh-keyscan 获取的公钥并显示其详细信息。-lv 参数让 ssh-keygen 显示密钥的详细信息，而不只是密钥指纹。-f - 参数告诉 ssh-keygen 从标准输入中读取密钥。

```

### 网络

```sh
Resolve-DnsName <domain>
# 解析域名

Get-NetTCPConnection
# 查看端口占用情况

Get-NetTCPConnection | Where-Object {$_.LocalPort -eq 80}
# 只查看 80 端口的占用情况 $_ 变量表示管道传递的对象。

Get-NetTCPConnection | Where-Object { $_.LocalPort -ge 3000 } | Format-Table -AutoSize
# 查看当前正在使用的 TCP 连接和端口信息。然后筛选端口号大于等于 3000 的连接


ipconfig /all
# 查看所有网卡的全部配置信息

netstat -ano
# 显示活动 TCP 连接、计算机正在侦听的端口、对应 PID

netsh winsock reset
# 重置网络。没用过。可能可以解决网络问题

tracert <domain_ip>
# 追踪路由

nslookup
# IP 地址检测器，可检测 DNS
```

### 窗口样式之类的

```sh
color [颜色代码]
# 修改前景色和背景色

chcp [code]
# 查看/设置活动代码页（终端字符编码）。默认是 GBK(936)；此外还有 65001(UT8) 和 20936(GBK2312)。

mode con cols=长  lines=宽
# 设置窗口大小

pause
# “请输入任意键继续…”

title <内容>
# 设置命令窗口标题
```

### 文件和文件夹

```sh
(md | mkdir) "<dir_path>"
# 创建文件夹。注意，路径中有空格时需要使用双引号括起来，不能使用单引号。

type <file_url>
# 输出文件内容

type nul > <file_url>
# 创建文件。nul 是一个特殊的文件，该文件的内容始终为空
echo '' 2> <file_url>
# 创建文件。原理：命令 echo '' 的标准错误输出为空

copy con <file>
# 创建文件并写入数据，以 ctrl + z 换行结束写入。

del <file_url>
# 删除文件

dir /ar
# Attribute Directory 只显示文件夹，

dir /b
# 只显示文件名称
```

### 磁盘管理

```sh
help DiskPart
# 查看该命令用法

DiskPart
# 进入磁盘管理

list disk
# 查看当前选中的磁盘
list volume
# 列出所有卷（一个磁盘可以分为多个卷）
list partition
# 显示当前磁盘的分区列表（可查看恢复分区）

select disk <ID>
# 选中某磁盘

attributes disk
# 查看相关属性。attributes 可简写成 att。
attributes disk set readonly
# 设置当前选中磁盘为只读。对于移动硬盘该命令立马生效，机械磁盘则需重新连接。
attributes disk clear readonly
# 取消当前选中磁盘为只读。无论是移动磁盘还是机械磁盘均能立即生效。
```

## 命令案例解决方案

### powershell 脚本中命令执行失败时，是否不会接收错误输出

```powershell
$tag = git describe --tags --exact-match HEAD
if ($?) {}
```

没错，当 `$?` 为 `$False` 时，命令执行失败，此时 `$tag` 值为 `null`。`$tag -eq $null` 为真。

### 开启 Administrator 账户

```powershell
net user administrator /active:yes
# 激活 Administrator 账户
net user administrator /active:no
# 关闭 Administrator 账户
```

### 查看当前终端是 cmd 还是 powershell

```powershell
(dir 2>&1 *`|echo CMD);&<# rem #>echo PowerShell
```

### 驱动的备份和恢复

```sh
DISM.exe /Online /Export-Driver /Destination:<backup_url>
# 备份驱动。比如 DISM.exe /Online /Export-Driver /Destination:E:\Drivers

PNPUTIL /add-driver <glob_patterns> /subDirs /install /reboot
# 恢复驱动。比如 PNPUTIL /add-driver E:\drivers\*inf" /subDirs /install /reboot
```

### 根据端口关闭指定进程

方法一：

```sh
$ netstat -ano | findstr ":7890"
# 查看指定端口对应 PID，双引号内是正则表达式

$ tasklist | findstr "PID值"
# 查看 PID 对应的进程

$ taskkill /F /PID <进程PID>
# 通过 PID 终止对应进程

$ tasklist | findstr "imagename eq nginx.exe"
# 查找 nginx.exe

$ tasklist | Select-Object -First 3 && tasklist | findstr "imagename eq nginx.exe"
# 通过显示前几行的方式显示表头，方便阅读。
```

方法二：

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess
# 该命令用于获取占用 8080 端口的进程信息，会输出以下信息：
#
# Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
# -------  ------    -----      -----     ------     --  -- -----------
#     581      39   229100     174772      20.39  14784   1 java
#
# handles 表示该进程打开的对象数量，比如文件句柄、线程句柄、事件句柄等
# NPM, PM 和 WS 都是内存相关参数
# Id 指的就是进程唯一 PID
# SI 是该进程的 Session ID

$processId = (Get-NetTCPConnection -LocalPort 8080).OwningProcess
# 获取端口 PID，保存在 $processId 变量中

Stop-Process -Id $processId
# 终止该进程
```

### 查看系统文件错误并尝试修复

以管理员模式运行 powershell，执行以下命令

```sh
$ sfc /SCANNOW
# 扫描所有受保护的系统文件，并用位于 %WinDir%\System32\dllcache 的压缩文件夹中的缓存副本替换损坏的文件。
$ Dism /Online /Cleanup-Image /ScanHealth
# 扫描全部系统文件并和官方系统文件对比，扫描计算机中的不一致情况。

$ Dism /Online /Cleanup-Image /CheckHealth
# 这条命令必须在前一条命令执行完以后，发现系统文件有损坏时使用。

$ DISM /Online /Cleanup-image /RestoreHealth
# 这条命令是把那些不同的系统文件还原成官方系统源文件。

# 完成后重启，再键入以下命令：
$ sfc /SCANNOW
# 检查系统文件是否被修复。
```

### balenaEtcher-portable 烧录 U 盘后恢复方法

```sh
$ diskpart
# 进入磁盘管理

$ list disk
# 查看 U 盘所对应的 ID，假如 U 盘是 D 盘，则对应 ID 应该是 1

$ select disk 1
# 选中 U 盘

$ clean
# 清楚 U 盘

$ create partition primary
# 创建分区

$ list partition
# 查看分区

$ select partition 1
# 选中对应分区

$ format quick
# 成功格式化 U 盘
```

## 配置 powershell 命令提示符

通过编辑 `$Profile` 文件（路径为 `%UserProfile%\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`）可以自定义 powershell 命令行提示符。如果已安装 vscode，可以直接运行 `code $Profile` 来编辑该文件。

> 如果提示“无法加载文件 ...，因为在此系统上禁止运行脚本”。尝试执行 `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` 命令解决。

### 风格：只显示当前目录

```powershell
function prompt {
    $p = Split-Path -leaf -path (Get-Location)
    "$p> " # 最后一个表达式默认就是返回值，所以这里省略了 return
}
```

### 风格：修改命令提示符的颜色

```powershell
function prompt {
    $promptString = Split-Path -leaf -path (Get-Location)
    "$([char]0x1b)[92m" + "$promptString" + "$([char]0x1b)[91m" + " > "
}
```

更多颜色，可通过运行 `Get-PSReadLineOption` 命令查看。

### 风格：正则替换路径中的 `\` 为 `/`

```powershell
function prompt {
    $full_path = "/" + (Get-Location) -replace ":?\\", "/"
    echo (
        $full_path +
        ([System.Environment]::NewLine) + "$([char]0x1b)[91m" + "$ "
    )
}
```

参考自 [正则替换字符串](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_comparison_operators#replacement-operator)

### 风格：换行 + 彩色 + 判断是否管理员

参考自 [about_Prompts](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_prompts?view=powershell-7.3) 和 [stack overflow](https://stackoverflow.com/questions/37367460/how-achieve-a-two-line-prompt)

```powershell
function prompt {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal] $identity
    $adminRole = [Security.Principal.WindowsBuiltInRole]::Administrator
    $fullpath = (Get-Location) -replace "\\", "/"

    if($principal.IsInRole($adminRole)) {
        ([System.Environment]::NewLine) + "[Admin] " + "$([char]0x1b)[92m" + "$fullpath" + "$([char]0x1b)[91m" + ([System.Environment]::NewLine) + "> "
    } else  {
        ([System.Environment]::NewLine) + "$([char]0x1b)[92m" + "$fullpath" + "$([char]0x1b)[91m" + ([System.Environment]::NewLine) + "> "
    }
}
```

### 风格：显式当前所在 git 分支

参考 [stack Overflow](https://stackoverflow.com/questions/1287718/how-can-i-display-my-current-git-branch-name-in-my-powershell-prompt)

```powershell
function Write-BranchName () {
    try {
        $branch = git rev-parse --abbrev-ref HEAD

        if ($branch -eq "HEAD") {
            # we're probably in detached HEAD state, so print the SHA
            $branch = git rev-parse --short HEAD
            Write-Host " ($branch)" -ForegroundColor "red"
        }
        else {
            # we're on an actual branch, so print it
            Write-Host " ($branch)" -ForegroundColor "blue"
        }
    } catch {
        # we'll end up here if we're in a newly initiated git repo
        Write-Host " (no branches yet)" -ForegroundColor "yellow"
    }
}

function prompt {
    $base = "PS "
    $path = "$($executionContext.SessionState.Path.CurrentLocation)"
    $userPrompt = "$('>' * ($nestedPromptLevel + 1)) "

    Write-Host "`n$base" -NoNewline

    if (Test-Path .git) {
        Write-Host $path -NoNewline -ForegroundColor "green"
        Write-BranchName
    }
    else {
        # we're not in a repo so don't bother displaying branch name/sha
        Write-Host $path -ForegroundColor "green"
    }

    return $userPrompt
}
```

### 风格：管理员+git分支+标签+子目录+空提交

```powershell
function parseGitPosition {
    <#
    可能的返回值：
        空

        (main) sub, not commit yet
        (main) not commit yet

        (main)
        (main) sub, tag: v1
        (main) tag: v1
        (a1s2d3f4)
        (a1s2d3f4) sub, tag: v1
        (a1s2d3f4) tag: v1
     #>

    # 空（非 git 仓库）
    if (!(git rev-parse --is-inside-work-tree)) {
        Write-Host ""
        return
    }

    $sub = ""

    # 非 git 根目录
    if (!(Test-Path .git)) {
        $sub = "sub"
    }

    # 无提交记录
    if (!(git log)) {

        $defaultBranch = git symbolic-ref --short HEAD
        Write-Host " (" -NoNewline
        Write-Host "$defaultBranch" -ForegroundColor "yellow" -NoNewline
        Write-Host ")" -NoNewline
        if ($sub -ne "") {
            Write-Host " ${sub}," -NoNewline
        }
        Write-Host " not commit yet"

        return
    }

    $tag = git describe --tags --exact-match HEAD
    if ($?) {
        # HEAD 在某一标签上
        $tag = "tag: $tag"
    }


    $branch = git symbolic-ref --short HEAD
    if ($?) {

        # normal
        Write-Host " (" -NoNewline
        Write-Host "$branch" -ForegroundColor "blue" -NoNewline
        Write-Host ")" -NoNewline
        if ($sub -ne "" -And $tag -ne $null) {
            Write-Host " ${sub}, ${tag}"
        } else {
            Write-Host " ${sub}${tag}"
        }

    } else {

        # detached HEAD status
        $hash = git rev-parse --short HEAD
        Write-Host " (" -NoNewline
        Write-Host "$hash" -ForegroundColor "red" -NoNewline
        Write-Host ")" -NoNewline
        if ($sub -ne "" -And $tag -ne $null) {
            Write-Host " ${sub}, ${tag}"
        } else {
            Write-Host " ${sub}${tag}"
        }
    }

}

function hasAdminPower {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal] $identity
    $adminRole = [Security.Principal.WindowsBuiltInRole]::Administrator
    return $principal.IsInRole($adminRole)
}

function prompt {
    $base = "PS$($Host.version.Major) "
    $path = "$($executionContext.SessionState.Path.CurrentLocation)"
    $prompt = "$('$' * ($nestedPromptLevel + 1)) " # 嵌套级别，比如输入一个 { 回车，就会变成 >>

    if (hasAdminPower) {
        $prompt = "$('#' * ($nestedPromptLevel + 1)) "
    }

    Write-Host "`n$base" -NoNewline
    Write-Host $path -NoNewline -ForegroundColor "green"
    parseGitPosition

    return $prompt
}

```

### [oh my posh](https://ohmyposh.dev/) 命令行提示符主题

基本步骤如下：

1. 安装 [Window terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701)
1. 安装 [`winget`](https://apps.microsoft.com/detail/9NBLGGH4NNS1) 工具
1. 执行 `winget install JanDeDobbeleer.OhMyPosh -s winget` 然后重启终端
1. 管理员权限下安装字体 `oh-my-posh font install`，不想通过管理员安装，则运行 `oh-my-posh font install --user`
1. 在 Window terminal 中修改字体为刚刚安装的字体
1. 通过 `echo "oh-my-posh init pwsh | Invoke-Expression" > $Profile` 命令启用 oh my posh
1. 查看所有可用主题 `Get-PoshThemes` 。如果没有出现图标/显示方块，那就是字体没有设置好，请重新设置字体然后重启终端。注意在 vscode 中主要在 settings 中设置字体，配置项为 `"terminal.integrated.fontFamily": "Hack Nerd Font"`，这样可以不覆盖编辑器中的字体。
1. 执行命令（自行替换 `<theme-name>`） `oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\<theme-name>.omp.json"`，此时会输出一行字符串，执行该字符串就可以应用主题。以主题 `rudolfs-dark` 为例，执行 `oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json"`，然后再执行输出的字符串。
1. 或者直接 `oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json" | Invoke-Expression` 就可以临时应用主题。
1. 想要永久保存主题则运行命令 `oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\<theme-name>.omp.json" > $profile`。

自定义主题：

1. 创建自己的文件样式文件：`code "$env:POSH_THEMES_PATH/lim-default.omp.json"`
2. 编写样式（可以在别人的主题上进行修改）~~快逃，这是个兔子洞~~
3. 应用：`oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/lim-default.omp.json" > $profile`

在 [nerd fonts 中查看所有可用特殊字符](https://www.nerdfonts.com/cheat-sheet)

[我的主题参考](https://gist.github.com/Linhieng/092192b87a23e9c53f77249f14e267dd)

虽然 oh my posh 很漂亮，但性能要求高，启动速度慢，所以电脑性能差的慎选（比如我）。
