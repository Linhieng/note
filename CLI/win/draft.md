# 草稿

```powershell
[System.Security.Principal.NTAccount]::new
# 可以查看语法
```

## powershell 处理文件夹所有者

Get-Acl 命令用于获取文件夹权限相关信息

```powershell
Get-Acl -Path ".\tx-comic\"
# 获取指定文件夹的权限信息。

Get-Acl . | fl
Get-Acl . | Format-List
# 上面命令输出时，显示的信息较少。可以通过 fl 查看更详细的信息

(Get-ACL -Path ".").Access | Format-Table IdentityReference,FileSystemRights,AccessControlType,IsInherited,InheritanceFlags -AutoSize
# 输出的 Access 不容易读，可以修改一下输出格式：
```

```powershell
$acl = Get-Acl -Path ".\tx-comic\"
# 获取 ".\tx-comic\" 文件夹的 ACL

$newOwner = New-Object System.Security.Principal.NTAccount($env:USERNAME)
# 创建一个所有者，对象是当前登录的用户

$acl.SetOwner($newOwner)
# 修改 ACL 中的所有者

Set-Acl -Path ".\tx-comic\" -AclObject $acl
$acl | Set-Acl -Path ".\tx-comic\"
# 应用修改后的 ACL 到文件夹
```

修改时，你会发现提示报错：Set-Acl: Some or all identity references could not be translated.

报错信息说的很清楚了，所设置的某个项是无效的。所以呢？是哪个项啊啊啊

```powershell
# 太难了，太难了，搞不定，搞不定啊啊啊啊啊啊
# 一直报错 Set-Acl: Some or all identity references could not be translated.
# 所以到底是哪个字段无效也不提示，我真的是……

# 后面的命令自己慢慢看吧，我真的没时间了……
# 后面命令都是不行的，但肯定是哪里出了错！但这一定不是哔咔的错！

# 获取当前文件夹的 ACL
$acl = Get-Acl -Path ".\tx-comic\"

# 创建新的所有者和组
$newOwner = New-Object System.Security.Principal.NTAccount($env:USERNAME)
$newGroup = New-Object System.Security.Principal.NTAccount($env:USERDOMAIN, $env:USERNAME)

# 修改 ACL 中的所有者和组
$acl.SetOwner($newOwner)
$acl.SetGroup($newGroup)

# 应用修改后的 ACL 到文件夹
Set-Acl -Path ".\tx-comic\" -AclObject $acl







# 获取当前登录用户的用户名
$currentUsername = $env:USERNAME

# 创建一个新的 DirectorySecurity 对象
$acl = New-Object System.Security.AccessControl.DirectorySecurity
; $acl =  New-Object System.Security.AccessControl.DirectorySecurity( ".\tx-comic\")


# 获取当前用户的安全标识符（SID）
$currentUserSID = [System.Security.Principal.WindowsIdentity]::GetCurrent().User.Value

# 创建一个新的 NTAccount 对象来表示当前用户
$currentUser = New-Object System.Security.Principal.NTAccount($currentUsername)

# 创建一个新的 FileSystemAccessRule 对象，将当前用户设置为所有者
$ownerRule = New-Object System.Security.AccessControl.FileSystemAccessRule($currentUser, "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
# 创建新的所有者和组
$newOwner = New-Object System.Security.Principal.NTAccount($env:USERNAME)
$newGroup = New-Object System.Security.Principal.NTAccount($env:USERDOMAIN, $env:USERNAME)


# 将新的访问规则添加到 ACL 中
$acl.AddAccessRule($ownerRule)
# 修改 ACL 中的所有者和组
$acl.SetOwner($newOwner)
$acl.SetGroup($newGroup)

# 应用 ACL 到文件夹
Set-Acl -Path  ".\tx-comic\" -AclObject $acl


# 清空 sddl
$acl.SetSecurityDescriptorSddlForm("")

# 清空后，你设置 rule 或者 owner 时，它会自动添加对应 sddl 的。
```

或者，我们只通过 icacls 修改所有者。

```powershell
# 首先，该命名相等于是界面操作：属性——安全——高级——所有者，更改 的命令行版本
# 这需要以管理员权限运行

icacls .\tx-comic\ /setowner $env:USERNAME /T /Q
# /T 参数表示应用修改到文件夹下的所有子文件夹和文件，
# /Q 参数表示以静默模式执行命令（不显示成功消息）。因为子文件夹很多时，会输出很长的日志。
```

批量编辑 D:\ 盘中的所有文件

```powershell
d:
# 切换到 D盘

cd d:\
# 切换到根目录

$files = Get-ChildItem .
# 获取所有文件

foreach ($file in $files) {
    Write-Output $file.FullName
    # 遍历输出
}


确定没问题后，将 forEach 中的代码换成
icacls $file.FullName /setowner $env:USERNAME /T /Q
```

---

vssadmin delete shadows	删除卷影副本。	客户端和服务器
vssadmin list shadows	列出现有的卷影副本。	客户端和服务器
vssadmin list writers	列出系统上所有已订阅的卷影副本编写器。	客户端和服务器
vssadmin resize shadowstorage	调整卷影副本存储关联的最大大小。	客户端和服务器
