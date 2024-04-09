## 用户权限

sudo 全称  superuser do

su 全称 substitute users

组代表的仅仅只是一系列用户的集合。所以当你创建一个新用户时，你会发现 `/etc/group` 中也会多出一个组。

```sh
sudo cat /etc/sudoers
# 并不是每个用户都有 sudo 权限的
# 不同用户的 sudo 权限所拥有的权限也是不同的
# 这就是这个文件的作用，但通常是在 /etc/sudoers.d 文件中编辑，而不是直接在 /etc/sudoers 中编辑

sudo cat /etc/passwd | column -t -s ':'
# root:x:0:0:root:/root:/bin/bash

sudo cat /etc/shadow | column -t -s ':'
# root:*:19752:0:99999:7:::

sudo cat /etc/group | column -t -s ':'
# root:x:0:

sudo useradd alan
# 添加用户。或者使用 adduser 也是一样的
sudo userdel alan
# 删除用户
sudo passwd alan
# 设置/修改特定用户密码

# 同理，还有
groupadd <group>
groupdel <group>
usermod -aG <group>  <user>
# 添加 user 到 group 中

passwd
# 设置/修改当前用户密码
```

`/etc/passwd` 以 colon 分割，从左到右依次是：
  - Username
  - User's password.
    - ` ` 空白表示没有设置密码。
    - `x` 表示密码存储在 /etc/shadow file
    - `*` 表示该用户没有登录权限
  - User ID (UID)
  - Group ID (GID)
  - GECOS field 备注信息，比如联系方式。使用逗号分割。
  - User's home directory
  - User's shell. 通常都是 bash


`/etc/shadow` 以 colon 分割，从左到右依次是：
  - Username
  - Encrypted password 加密后的密码，*
  - Date of last password changed 为 0 表示用户登录时需要修改密码。
  - Minimum password age 表示密码最短寿命，至少超过这个时间后才可以再次修改密码
  - Maximum password age 表示密码的最长寿命，超过这个时间后必须修改密码。
  - Password warning period 表示密码即将过期前多少天给出警告信息
  - Password inactivity period 表示密码过期后，还允许登录的时间期限
  - Account expiration date 表示超过这个日期后用户将无法登录
  - Reserved field for future use 保留字段

`/etc/group` 以 colon 分割，从左到右依次是：
  - Group name
  - Group password 组并不需要密码，默认设置为 *
  - Group ID (GID)
  - List of users

```sh
cat /etc/passwd | column -t -s ':'
# 输出 passwd 并对齐

{ echo "Username:Password:UID:GID:User Description:Home Directory:Login Shell"; cat /etc/passwd; } | column -t -s ':'
# 添加表头

{ echo "Name:Password:ID:Members"; cat /etc/group; } | column -t -s ':'
# 输出组

```

## 权限

`d | rwx | r-x | r-x ` 文件权限格式说明，从左到右依次是：

- filetype 文件类型，
  - `d` 表示目录。
  - `-` 表示一般文件
- user permissions 用户权限
- group permissions 组权限
- other permissions 其他用户/组权限

rwx- 分别表示可读、可写、可执行文件、无权限/非可执行文件。

```sh
$ ls -l
# 显示详细信息，第一个字段就是文件权限信息

$ chmod ugo+rwx <file>
$ chmod ugo-rwx <file>
$ chmod u+r <file>
$ chmod g+r <file>
# u 表示用户
# g 表示组
# o 表示其他
# + 表示添加权限
# - 表示移除权限

# 4 (100) r
# 2 (010) w
# 1 (001) x
# 0 (000) -
# 100 100 100 表示 r-- | r-- | r--
# 010 010 010 表示 -w- | -w- | -w-
# 001 001 001 表示 --x | --x | --x
# 101 101 101 表示 r-x | r-x | r-x
# 111 111 111 表示 rwx | rwx | rwx
# ...
# 所以
$ chmod 777 <file> # chmod ugo+rwx <file>
$ chmod 000 <file> # chmod ugo-rwx <file>
$ chmod 444 <file>
$ chmod 222 <file>
$ chmod 111 <file>
$ chmod 755 <file>
$ chmod 700 <file>
```

修改所有权（Ownership Permissions）

```sh
$ sudo chown user <file>
# Modify user ownership

$ sudo chgrp group <file>
# Modify group ownership

$ sudo chown user:group <file>
# Modify both user and group ownership at the same time


umask 022
umask 777 # 取走所有权限
umask 000 # 不取走权限，x 不是权限，所以默认是 -
# 配置创建文件/文件夹时的默认权限
# 数值表示拿走哪些权限，比如 022 表示不取走 user 的权限，
# 但对于 group 和 other，要取走他们的 w 权限。
```

### s

Setuid 是一种文件系统属性，它允许一个程序在执行时以文件所有者的权限来运行，而不是以执行程序的用户的权限来运行。Setuid 是 Set User ID 的缩写，意味着它会在执行时设置程序的有效用户 ID 为文件所有者的用户 ID。

通常情况下，当用户执行一个程序时，该程序以当前用户的权限来执行。但是，当设置了 Setuid 属性的程序被执行时，它会以文件所有者的权限来执行，即使执行程序的用户不是文件的所有者。

```sh
# 当我们使用 passwd 命令时，它实际上是会修改 /etc/passwd 的
# 但这个文件不应该是管理员所有吗？为什么我们能修改呢？

$ ls -l /etc/passwd
-rw-r--r-- 1 root root 965 Feb  6 19:36 /etc/passwd

# 原因在于 passwd 命令
$ ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root 63960 Feb  7  2020 /usr/bin/passwd

# 可以看到文件权限中多了个 s 符号，这表示在执行 passwd 命令时，
# 将已文件所有者的权限执行。该文件的所有者是 root，所以我们可以修改 /etc/passwd 文件

chmod u+s <file>
chmod 4755 <file>
# 4 表示 setuid
```

### set group id

类似的，还有 setgid (set group ID, SGID)，它允许用户已文件所属组的权限运行。

```sh
ls -l /usr/bin/wall
-rwxr-sr-x 1 root tty 35048 Jan 20  2022 /usr/bin/wall

chmod g+s <file>
chmod 2555 <file>
# 2 表示 set group id
```

### t

此外还有 t 标识，它表示 The Sticky Bit，意为只有文件所有者，或者 root 用户才能删除或修改文件。

```sh
$ ls -ld /tmp
drwxrwxrwt 1 root root 12288 Mar 17 04:46 /tmp

# 可以看到 /tmp 文件夹，任何用户都可以添加文件、写入文件，但不能删除文件（除了 root 用户）

$ chmod +t <file>

$ chmod 1755 <file>
# 1 表示 t
```

### 进程权限

注意，能给运行带有 s 标志的 root 用户的进程，并不意味你临时拥有了 root 权限。

linux 中有很多 uid，其中和进程权限相关的，有三种：

- effective user ID 有效用户 id。它授予了进程执行时的权限。比如 alan 用户运行 passwd 命令（程序）时，它的有效用户 id 就是 alan。噢，等等，由于 passwd 设置了 s 标志，所以它的有效用户 id 应该是 passwd 文件的拥有者，也就是 root 用户。

- real user ID 真实用户 id。顾名思义，谁运行的程序，真实用户 id 就是谁。

- saved user ID 保存的用户 id。它进程根据需要在有效用户标识和真实用户标识之间进行切换。这种灵活性很重要，因为始终以提升的权限运行不是安全的做法。

所以，当你修改另一个用户时，进程知道你的真实 uid，也知道你要修改用户 uid，所以你没有权限修改（除非 root）

## package

包主要分为两类：

- debian (.deb) 系列，主要用于 Debian, Ubuntu, LinuxMint。
  - dpkg 基础
  - apt 增强
- Red Hat (.rmp) 系列，主要用于 Red Hat Enterprise Linux, Fedora, CentOS, etc
  - rpm 基础
  - yum 增强


### gzip 和 tar

`gzip` 是一个用于压缩文件的程序，压缩后的文件名为 `.gz`。但它无法压缩多个文件

```sh
$ gzip <file>
# 压缩
$ gunzip <file_gz>
# 解压缩
```

`tar` 命令则可以让我们将多个文件打包成一个文件，后缀名为 `.tar`。

```sh
$ tar cvf <target_tar> <src1> <src2>
# 打包
```

- c 表示 create
- v 表示 verbose，输出操作日志
- f 表示 filename，后面跟打包后的文件名

```sh
$ tar xvf <target_tar>
# 解包
```

- x 表示 extract 也就是解包
- v 表示 verbose 输出操作日志
- f 表示 filename，后面跟要解包的文件名


综上，linux 中的 package 借助 tar 来将多个文件捆绑成一个文件，然后用 gzip 对其压缩，所以很多 linux 文件的后缀名都是 .tar.gz。通常，可以借助 tar 命令的 `z` 参数整合 gzip 命令

```sh
$ tar czf <target_tar_gz> <src1> <src2>
# 打包并压缩

$ tar xzf <source_tar_gz> -C <folder>
# 解压，并解包到特定文件夹中。文件夹 folder 需存在
```

### 包管理的基础命令：rpm 和 dpkg

```sh
# 安装
dpkg -i some_deb_package.deb
rpm -i some_rpm_package.rpm
# -i 表示 --install

# 卸载
dpkg -r some_deb_package.deb
rpm -e some_rpm_package.rpm
# r 表示 remove
# e 表示 erase

# 查看已安装列表
dpkg -l
rpm -qa
# -l 表示 list
# q 表示 query；a 表示 all
```

### 包管理中的蝙蝠侠，rpm 和 dpkg 的增强板工具：yum 和 apt

```sh
$ apt install package_name
$ yum install package_name
# 安装

$ apt remove package_name
$ yum erase package_name
# 卸载

apt update ; apt upgrade
yum update
# 更新

apt show package_name
yum info package_name
# 获取已安装的 package 信息
```

### 编译源码



```sh
sudo apt install build-essential
# 首先，需要一个工具来帮助我们编译源码

tar -xzvf package.tar.gz
# 解压源码

./configure
# 一般来说，源代码中会有相关编译说明，而且会提供一个 configure 脚本文件
# 用于检查编译所需要的相关依赖等功能。

make
# 源代码中会有一个 Makefile 文件，指定了构建软件时所需要的规则
# 当运行 make 命令时，就会查看这个 Makefile 文件

sudo make install
# 安装软件。这个命令会将文件拷贝到电脑中的特定位置上

sudo make uninstall
# 卸载软件

# 注意，使用 make 在后台安装软件时，你可能并不知道它到底处理了哪些文件
# 当你删除文件时，你并不知道应该有哪些文件被删除。
# 所以，推荐使用下面命令，而不是 sudo make install
sudo checkinstall
# 这个命令本质上也是在运行 make install 命令
# 然后将其构建成一个 .deb 文件，这样能给更方便的安装和卸载
```
