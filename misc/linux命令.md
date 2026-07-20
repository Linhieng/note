
CPU 有两种权限分级：内核态和用户态。
linux 内核，是纯底层管理程序，无内置命令、无脚本解释器，只管理硬件资源、提供系统调用接口；
那些命令、shell、启动管理器等程序，都属于用户态，主动通过系统调用向内核申请能力；
开机流程：内核初始化硬件后，立刻移交控制权给用户态初始化程序，由它负责执行脚本、启动服务、提供人机交互。

`uname -r` 命令用于查看 linux 内核。
  - 只要输出的内核版本带 `-`，则说明使用的是分发版linux（比如Ubuntu等）。此时需要查看对应分发版linux的手册。
  - 如果是核心linux，输出内容只会有版本号。核心linux版本可以查看对应 [kernel release]

## 命令常识

- [POSIX 规范]：跨 Unix（Linux/macOS/BSD/AIX）通用标准，所有合规程序必须遵守，写脚本、跨平台工具必须优先遵循；
- GNU 扩展规范：Linux 上 coreutils/procps/util-linux 等工具独有，macOS/BSD 不一定支持，仅 Linux 日常使用、本地脚本可用。

常见 POSIX 规范
- 短选项 `-` 后面只跟单个英文字母，比如 `-v`
- 无参数的短选项支持连续拼接，比如 -a -b -c = -abc
- 单独写 `--`，代表后面所有内容不再解析为命令参数，全部视为文件 / 操作字符串
- 选项在前，参数在后。
- 单引号的内容代表字符串，但不能包含单引号
- 双引号的内容保留 `$` 和 `\` 的特殊功能

常见 GNU 扩展规范
- 短选项配套对应长选项，可读性强，比如 `--version`
- 传参可以使用 `--key=value` 或 `--key value`

POSIX 要求预装的命令有？
- shell 解释器（必带）
- GNU coreutils（核心基础工具集，重中之重）
  - ls echo cat cp mv rm mkdir rmdir touch stat pwd whoami hostname uname date wc sort head tail tr cut basename dirname dd sync chmod chown
- util-linux（磁盘、挂载、系统基础工具）
  - mount umount blkid lsblk dmesg hwclock fdisk losetup free fallocate
  - sysctl
- procps（进程 / 内存查看）
  - ps top vmstat pidof
- iproute2（网络基础）
  - ip ss
- gawk / GNU grep（文本检索）
  - grep awk sed
主流发行版 linux 默认自带的命令有？
- systemd 整套工具套件（freedesktop 独立项目）
  - systemctl、journalctl、hostnamectl、timedatectl、systemd-analyze
- 网络工具集 ipconfig netstat route curl wget ssh
- 压缩工具 tar gzip bzip2 xz zip unzip
- 文档 / 文本工具 less more diff patch
- 用户管理工具 useradd usermod passwd su sudo
- 系统调试工具 strace lsof tcpdump

## 未整理
```sh
dpkg -S $(which ionice)
# ubuntu/Debian 中查看 ionice 命令归属哪个软件
dpkg -S $(which df)
# 查看不到，此时可以使用 man 命令，在末尾的左下角也会显示对应的软件及其版本。
# 但 man 下方的软件包可能不一定准？或者说不同版本存在差异？
# 比如 man hostname 中看到所属软件包是 net-tools，但 hostname 在 GNU coreutils 中也有。
# 而 net-tools 似乎已经过时，现在已经换成了 iproute2，通过 man ip 可以看到确实是 iproute2


prlimit
# 配置进程的资源限制

lsof | wc -l
# 查看文件打开数量

vmstat 1
# 查看 vm 状态，每1s刷新
# 好像没对齐

getconf PAGE_SIZE
# 查看内存页单位，通常是 4096，也就是 4KiB。
# tips：存储的计量单位通常都是 Byte，网络场景则喜欢 bit。

watch -n 0.1 -d free -h
# 使用 watch 界面，每0.1 秒刷新，查看 free -h 的情况。-d 表示高亮变化区域
# 退出使用 ctrl+c
# 其实 free 本身有 -s 实时刷新参数，不过是频繁输出，不好看

fg
# 恢复最近一个暂停任务
bg
# 后台恢复最近暂停任务
# ctrl+z 是挂起，ctrl+c是终止
jobs -l
# 查看终端后台作业（仅当前 shell

pgrep -u k2
# 查看 k2 的所有进程 PID
kill $(pgrep -u k2)
# 杀死 k2 用户所有进程

who -b
uptime
uptime -p
last reboot
cat /proc/uptime
# 查看开机时间

getpcaps [PID]
getpcaps $$
# 属于 libcap2-bin / libcap 工具包，专门用来查看正在运行进程的 Linux Capability（能力集）。
#  =ep 表示全部能力集合


LANG=en_US.utf8
export LC_ALL=en_US.utf8

date
date +%Y/%m/%d
date +%H:%M
cal [month] [year]

bc
scale=小数点位数
quit

[command] --help
man [command] # 空格翻页

who
netstat -a
ps -aux

sync # 将数据同步写入硬盘中
shutdown # 退出
poweroff # 关机
halt # 关机
reboot # 重启
systemctl [command] # 上面几个关机/重启命令实际都是调用该指令

ulimit -m
# 限制进程最大常驻物理内存 RSS（KB）
# 例：ulimit -m 1048576 单个进程最多 1G 物理内存，超出 malloc 失败；
ulimit -v
# 限制单个进程虚拟内存 VIRT，和 overcommit 互补。

lsof -p 6778
# 查看进程打开日志文件

systemd-cgtop
# 实时监控所有 cgroup 内存

systemctl status user-1000.slice
```

想要彩色提示，需要三个条件：/bin/bash, .bashrc, .profile
bashrc 中应该配置了彩色配置，profile 中应该指明了登录时默认加载 bashrc。
bash 用于支持配置命令（sh 通常只支持 POSIX 等命令，用于兼容 UNIX）
新创建的用户，自动创建家目录时，会复制默认模板目录 /etc/skel，所有可以在这个目录下创建默认。需要注意 /etc/skel/ 下的文件可读权限，不然新用户不一定复制的了

TTY = Teletype / Teletypewriter 电传打字机。早年计算机没有显示器、鼠标，人机交互靠一台叫「电传打字机」的硬件设备：一边打字输入指令，一边打印输出结果，设备缩写就是 TTY。Linux 沿用这个概念，把所有能输入输出文本的终端交互接口统一叫 tty。当使用 VNC 远程连接时，使用 w 命令可以看到来源时 tty


## [GNU coreutils]

GNU Core Utilities（通常简称为 coreutils）是 GNU 操作系统项目中的一个核心软件包，它包含了在类 Unix 操作系统中最基础、最常用的文件和 Shell 操作工具。目前有100多个命令。

下面这些常见的命令都是属于这个软件包的：
- ls
- cat
- cp
- mv
- rm
- rmdir
- pwd
- echo
- touch
- date
- df
- tail
- head
- sort
- uniq
- wc
- whoami
- hostname
- chmod
- chown
- kill
- id
- who
- test
- dir
- users
- groups
- tee 从标准输入读取并写入标准输出和文件

```sh
ls -ahlsv
# -a 显示 . 开头的文件
# -h 让文件大小更易读（需搭配 -l 或 -s 参数）
# -l 文件单行格式化显示
# -s 显示文件占用磁盘大小，默认以 block 为单位
# -v 表示按数字进行排序


stat -f /run
# 显示




df -h
# 查看服务器磁盘分区的整体使用情况，包含总容量、已用、剩余、挂载点、使用率
```


## [util-linux]

[util-linux] 是 Linux 内核组织维护的一套 Linux 专用工具集。含有很多命令，这些命令的官方手册，就是 man 手册。

AI 分类：
- 磁盘 / 分区管理：fdisk、cfdisk、sfdisk、lsblk、blkid、wipefs、swapon/mkswap、fstrim、blkdiscard、partx
- 硬件 / 系统信息：lscpu、lsirq、lsmem、hwclock、rtcwake、rfkill、zramctl
- 挂载与文件系统：mount、umount、findmnt、fsck 系列、fallocate、fsfreeze
- 用户 / 登录管理：su、runuser、vipw、chsh、last、lastlog2、login、newgrp
- 进程 / 资源调度：kill、ionice、chrt、taskset、prlimit、unshare、nsenter
- 日志与系统输出：dmesg、logger、hexdump、wall、write
- 通用运维工具：cal、more、script、uuidgen、whereis、column、flock


### ionice

- ionice 用于配置进程I/O调度类和优先级，IO调度类有三种：Idle(3)、Best-effort(2)、Realtime(1)、none(0)
  - Idle：最低优先级，仅系统无其他 IO 时才允许该进程读写磁盘；普通用户可用，无优先级层级。
  - Best-effort：系统进程默认类别；搭配优先级层级 0~7，数字越小 IO 优先级越高
  - Realtime：最高磁盘优先级，会抢占所有其他 IO，极易把系统 IO 打满；仅 root 用户能使用
  - none：

注意：主流调度器 mq-deadline/kyber（blk-mq 多队列）不支持 class 分级调度，就算设置了 ionice -c 也没用。
可以先查看一下调度器是什么类型。

可以尝试使用 cgroup v2 中的 io.weight 或者 systemd 中的 IOWeight 进行替代。

```sh
cat /sys/block/vda/queue/scheduler
# ？？？

ionice
# 配置 io 作业的优先级

watch -d -n 0.1 iostat
# 看磁盘 IO 负载
```

## [systemd]

systemd 是一套用于 Linux 系统的基本构建模块。它提供了一个系统和服务管理器，该管理器以进程 ID 1（PID 1）的身份运行，并启动系统的其余部分。它替代数十个老式独立工具，虽然是软件，但涉及的级别和内核差不多，不理解内核是很难懂 systemd 的。推荐阅读 [《Rethinking PID 1》] 来了解 systemd 的起源。

systemd 具备强大的并行处理能力，采用套接字（socket）和 D-Bus 激活机制启动服务，支持守护进程按需启动，通过 Linux 控制组（cgroups）追踪进程，管理挂载点和自动挂载点，并实现了基于事务依赖关系的复杂服务控制逻辑。

其他功能包括
- 内置专属日志守护进程（`journald`）
- 基础系统配置管理工具（管控主机名、系统时间、区域、语言等）
- 进程与虚拟化资源监控管理（维护已登录用户列表、正在运行的容器和虚拟机等）
- 用户与运行时资源管理（系统账户信息、运行时目录、运行时参数等）
- 网络相关守护进程能力（简易网络配置管理、网络时间同步、日志转发、域名解析）



```sh
systemd --version
```

### systemd cgroup ^[1]^ ^[2]^

systemd 只封装了四种 cgroup controllers：cpu、io、memory、pids。

systemd 以三种不同的 unit 类型暴露了底层内核 cgroups 功能。
- .service 此单元类型用于封装systemd自身启动的进程的单元，服务单元通常基于磁盘上的单元文件实例化
- .scope 和 service 单元类似，但区别在于此类单元封装的进程由某个不相关的管理进程派生。与 service 不同，scope 只能通过编程方式声明和启动，即始终是临时的。
- .slice 切片单元，该单元类型不直接包含任何进程，它始终作为 cgroup 树中的内部节点（ service 和 scope 始终是 cgroup 树中的叶子节点）。它的命名直接对应 cgroup 树路径。通过命令 `ls /sys/fs/cgroup/ | grep slice` 查看

systemd 默认会创建四个切片单元：
- -.slice 是根切片，即所有其他切片的父级，直接映射到 cgroup v2 的顶级目录
- system.slice 系统服务的默认存放位置（systemd --system）
- user.slice 放置用户会话（所有用户，包括 root），每个用户在下面会有自己的切片
- machines.slice 虚拟机/容器的预设存放位置


通过 `systemd-cgls` 可以查看 cgroup 树，结构层级类似这样：
```text
-.slice # 根切片
├─ system.slice    # 系统后台服务总切片（所有系统服务放这里）
│  └─ yyy.service  # 单个系统服务，每个service独占一个cgroup子目录
├─ user.slice         # 所有用户会话总切片
│  ├─ user-1000.slice # UID=1000用户专属切片
│  │  ├─ session-1.scope  # 用户登录会话（图形/终端）
│  │  └─ app.service      # 用户级后台服务
└─ machine.slice  # 容器/虚拟机总切片
   └─ xx.scope
```


```sh
systemctl
# 操作 slice / service / scope
systemd-run
# 操作 transient unit
systemd-cgls
# 打印完整 cgroup 层级树
systemd-cgtop
# 实时监控各 cgroup CPU / 内存负载

systemd-cgls -u user.slice
# 打印完整 cgroup 层级树，只看用户会话


systemctl show xxx.slice
# 查看配置，具体是在查看 /sys/fs/cgroup/xxx.slice/ 文件下的相关文件。
systemctl show system.slice -p MemoryCurrent
# 是在读取 cat /sys/fs/cgroup/user.slice/memory.current
systemctl show user-0.slice -p MemoryCurrent
# 是在读取 cat /sys/fs/cgroup/user.slice/user-0.slice/memory.current
# 这两个命令，不能通过 /sys/fs/cgroup/user.slice/memory.current; systemctl show user.slice -p MemoryCurrent; 来查看，因为有误差，而且这个误差始终是 systemctl 查看的值会大一点。


systemctl set-property --runtime 子组和配置
# 修改配置，写入 /run 目录，重启失效
systemctl revert xxx.slice
# 重置配置

systemctl list-units --type=service,slice,scope
# 列出所有 slice、scope、service
```

#### 切片

<!-- 前面的配置是不合理的，
user@.slice 是 systemd 模板单元，所有 UID≥1000 的普通用户会话自动生成 user-$UID.slice，可通过模板 drop-in 批量限制，不会作用于 UID=0 的 user-0.slice。

ssh登录时使用的是 system.slice？ssh 登录详细流程 -->

systemd 切片专属命名规则是短横线`-`表达层级父子关系，比如创建了 root-users.slice.d 文件后，会自动派生出 root.slice 父节点，该节点没有独立 .slice 实体文件。


- `user.slice` 是父切片，限制所有用户进程总和，不存在所有优先级问题。
- `user-.slice` 是模板前缀，代表每位用户的默认设置，优先级低于实例 user-xx.slice。并且该模板只能手动创建文件（直接就是永久生效）

登录时用 PAM + systemd 模板 user@.service 区分 UID，只对 UID≥1000 加载限制
单独为 root 创建 slice，开机时自动将 root 从 user.slice 中移除。
这两种方式都是AI给的，但似乎都是魔改，不适合。但如果确实需要将 root 从 user.slice 中抽离出来，应该怎么实现呢？

system.slice，管理什么？管理 sshd 等后台进程？shell bash top kill 算吗、那是否可以给他们设置最小内存，这样也能实现我的需求？目的就是奔溃时允许让 root 登进去调用命令操作。

```sh
systemctl set-property --runtime user.slice MemoryMax=700M MemorySwapMax=0
# 配置所有用户最大内存占用，包括root用户
systemctl set-property --runtime user-0.slice MemoryMin=200M
# 然后再单独为 root 用户配置最小内存占用
systemctl show user.slice | grep Memory
# 查看配置情况


# 创建临时目录
mkdir -p /run/systemd/system/root-users.slice.d
# 写入配置文件，注意，root-users.slice 这种命令，会让 systemd 自动派生父节点 root.slice
cat > /run/systemd/system/root-users.slice.d/override.conf <<'EOF'
[Slice]
MemoryMax=max
CPUWeight=10000
TasksMax=infinity
EOF
# 重载systemd让配置生效
systemctl daemon-reload
systemd-run --slice=root-users.slice --shell
# systemd-run：临时创建一个临时 systemd 服务单元
# --slice=root-users.slice：指定归属 cgroup 切片
# --shell：直接启动交互式 bash shell

cat /proc/self/cgroup
# 可以查看当前 shell 属于哪个切片。
systemctl cat root-users.slice
# 查看 slice 资源配置
systemctl list-units --type=scope
# 查看正在运行的临时 scope
```
#### IO 封装

IOAccounting=：开启 IO 统计
IOWeight=：IO 调度权重
IODeviceWeight=：单块磁盘 IO 权重
IOReadBandwidthMax=：读带宽上限
IOWriteBandwidthMax=：写带宽上限
IOReadIOPSMax=：读 IOPS 上限
IOWriteIOPSMax=：写 IOPS 上限
IODeviceLatencyTargetSec=：设备 IO 延迟目标

2. IO 压力监控（PSI）
IOPressureThresholdSec=
IOPressureWatch=

3. 进程 IO 调度优先级（linux SCHED_IDLE 等）
IOSchedulingClass=
IOSchedulingPriority=

#### systemctl

添加 `--runtime` 参数代表仅写入临时内存配置目录 /run/systemd/system.control/user-0.slice.d/，不会持久化到 /etc，方便测试。


```sh
systemctl set-property --runtime user.slice MemoryMax=1.5G MemorySwapMax=0
# 配置所有用户最大内存占用，包括root用户
systemctl set-property --runtime user-0.slice MemoryMin=200M
# 然后再单独为 root 用户配置最小内存占用（不配置不行，VNC同样会无法登录）
# 那只配置 root 的最小内存呢？测试了，不行，普通用户依旧可以占满内存。
systemctl show user.slice | grep Memory
# 查看配置情况


systemctl set-property --runtime user-0.slice MemoryMin=
# 想要恢复默认值，可以直接留空
systemctl revert user-0.slice
# 或者直接使用 revert，它会删除该 slice 所有 drop-in 覆盖文件（包含 /run 下 --runtime 生成的临时配置、/etc 持久配置）

systemctl set-property --runtime system.slice MemoryMin=50M
systemctl revert system.slice
```

## shadow-utils

shadow-utils 是 Linux 系统中用于管理用户账户、用户组以及 Shadow 密码文件的实用工具集

常用命令：
- useradd：创建新的用户账户或更新默认的新用户信息。
- userdel：删除用户账户及其相关文件。
- usermod：修改现有用户账户的属性。
- passwd：修改用户密码
-
- groupadd：创建新的用户组。
- groupdel：删除指定的用户组。
- groupmod：修改用户组的定义或属性。
- groupmems：管理用户主组的成员。
- gpasswd：管理 /etc/group 和 /etc/gshadow 文件。
-
- lastlog：打印所有用户的最后登录时间。
- chage：更改用户密码的过期信息。
- newgrp：登录到一个新的用户组。
- vipw / vigr：安全地编辑密码、组、Shadow 密码或 Shadow 组文件（编辑时会自动加锁，防止冲突）。
-
- pwconv：将系统密码转换为 Shadow 密码格式。
- pwunconv：将 Shadow 密码转换回标准的 UNIX 密码格式。
- pwck：验证密码文件和 Shadow 文件的完整性。
- grpck：验证用户组配置文件的完整性。

```sh
useradd -m -s /bin/bash k
# 创建用户，
# -m：自动创建家目录，默认是在 /home/[user]
#     如果忘记创建家目录，可以手动创建文件夹，注意权限也要分配给对应用户，不然用户无法登录
#     chown -R k:k /home/k 将目录以及目录下的所有文件所有者改为 k
# -s /bin/bash：指定用户 shell，默认为 /bin/sh
#     sh 代表 POSIX 兼容模式，用于兼容所有 unix 平台，而 bash 更加强大，支持命令补全、别名、彩色提示等等。
#     如果忘记修改 shell 了，可以通过 usermod -s /bin/bash k 修改

passwd k
# 设置密码，通常不推荐设置密码，而且服务器一般默认禁止密码登录，具体可以查看一下
#     cat /etc/ssh/sshd_config | grep PasswordAuthentication
#     的设置，默认为 no
# 所以通常建议使用公私钥进行登录。
# 在 window 上运行命令 ssh-keygen -t rsa，然后生成一份公私钥，将私钥保存在 C:\Users\k\.ssh 中
# 然后将公钥内容复制到服务器 /home/[user]/.ssh/authorized_keys 文件中。
# 这样就可以通过秘钥登录了

su k2
# 切换为 k2 身份，但环境不变。
su - k2
# 切换 k2 登录，但环境也变更为 k2 的
sudo su - k2
# 如果忘记 k2 密码，但知道自身密码以及具有管理员权限，可以免密码登录 k2
su -
# 后面不带用户名，代表切换 root 登录，需要输入 root 密码
# su 不一定成功，比如 k2 没有设置密码时代表密码不可用，此时 su k2 是无法切换过去的。
# 或者说系统设置了 pam_wheel 权限


# 切换为 root，需要 root 密码
sudo -i
# 切换为 root 权限

passwd -S k2
# 查看用户 k2 的密码情况
# P 代表已设置可用密码
# L 代表密码锁定（无有效登录密码）


chgrp # 改变文件所属群组
chown # 改变文件拥有者
chmod # 改变文件权限

useradd # 创建用户 passwd k，密码 Qwe112233@
adduser # 相当于 useradd -m，自动创建家目录
passwd # 设置用户密码
change # 修改密码属性
usermod # 修改用户信息
userdel # 删除用户
id # 查看 UID、GID
chfn # change finger
chsh # change shell
groupadd #
groupmod
groupdel
gpasswd # 群组管理员功能


su # 切换到 root 身份，需要获取 root 密码
sudo # 以 root 权限运行命令，需要用户本身密码，同时用户须在 /etc/sudoers 中
visudo # 不要直接编辑 /etc/sudoers 文件，而是借助此命令，
usermod -aG sudo k # 默认创建了一个 sudo 组，可以将新用户添加到此组中
# -a 是追加 append，-G 是添加附属组。
# 主组：一个用户只能有一个主组，创建用户时自动分配，默认组名和用户名相同。
# 附属组，一个用户可以归属多个附属组，附属组才是常规上理解的“组”
gpasswd -d k sudo # 将用户 k 从 sudo 组中移除

cat /etc/ssh/sshd_config | grep PubkeyAuthentication
# 查看是否允许 ssh 秘钥登录，默认是允许的
cat /etc/ssh/sshd_config | grep PasswordAuthentication
# 查看默认是否允许密码登录，默认是不允许的


whoami
who
who -uH
id
w
tty
users
# 上面这些都只能看到顶层用户（SSH、VNC），诸如 vscode 这种远程连接的是看不到的
# 此时可以使用进程搜索哪些用户在线
ps -eo user | sort -u


pkill -u k
# 关闭用户 k 的所有进程（正常关闭）
pkill -9 -u k
# 强制关闭

```

## 其他常用单软件

### [xx]stat

iostat
pidstat
mpstat
tapestat
cifsiostat

vmstat: procps-ng?

### locale

### man / whatis

man 命令，全称 manual 手册，是 linux 系统中的离线手册。
手册分为9个章节：
1. 可执行程序或者 shell 命令
2. 内核提供的系统调用函数
3. 库调用（程序库提供的函数）
4. 特殊的文件（通常位于 /dev 下）
5. 文件格式和约定（比如 /etc/passwd）
6. Games
7. Miscellaneous（其他一些零碎的，比如一些宏包之类的）
8. 只能用 root 执行的命令
9. 内核程序（非标准）

通过 whatis 可以查看对应命令在 man 中的各章节简介（one-line）

```sh
whatis hostname
# 查看 hostname 在各个章节中的简介

man 5 hostname
# 查看 hostname 第5章节内容。默认打开第一章节
```

### grep

grep 命令用于打印与 PATTERNS（匹配内容） 所匹配的行。早期一些旧命令（egrep, fgrep, rgrep）已经废弃，可以使用参数实现对应功能。

```sh
命令 | grep [参数] "匹配内容"
# 管道用法（最常用）

grep [参数] "匹配内容" 文件名
# 其他用法

grep -E
# 等同 egrep，表示扩展 grep，支持扩展正则（EREs）
grep -F
# 等同 fgrep，表示将匹配内容识别为纯字符串
grep -r
# 等同 rgrep，表示递归 grep
```

以实际命令来学习
```sh

ps aux | grep -- -bash
# 注意，这条 grep 命令和 grep '-bash' 并不等价
# 必须使用 -- ，因为单引号是 shell 的语法，grep 接收到的还是 -bash，依旧会将其识别为参数。


cat /proc/meminfo | grep -w -e Buffers -e Cached -e SReclaimable
grep -wi -e Buffers -e Cached -e SReclaimable /proc/meminfo
# 从文件 /proc/meminfo 中读取出 Buffers + Cached + SReclaimable 的值
# -w 表示精准匹配（默认模糊匹配）
# -i 表示忽略大小写（默认严格大小写）
# -e 表示增加匹配内容（解释的好像不太好，但懂那个意思）

systemctl status user.slice | grep -m 1 "Memory:"
# -m 1 只取第一个匹配到的值
```

### hostname

主机名，有关文件有：
- `/proc/sys/kernel/hostname` 内核文件，系统重启时通过读取磁盘文件获取主机名
- `/etc/hostname` 磁盘文件

```sh
hostname
uname -n
cat /proc/sys/kernel/hostname
cat /etc/hostname
# 查看主机名

hostname K
echo "K" > /proc/sys/kernel/hostname
# 临时修改主机名，主机重启失效
# 注意，修改后，当前会话 bash 并不会刷新，因为 bash 一般使用 /h 获取主机名，登录时获取到该值就会放在缓存中
# 想要刷新当前会话的主机名，可以执行 exec bash 刷新 bash。
# 还有，linux 中一切皆文件，指的是内核对外提供的统一访问接口。
# 对于进程自己的缓存（堆栈内存）并不存在具体的文件，比如 bash 启动时 /h 获取主机名后，就会始终存放在进程自己申请的内存中了。这点要清楚。

echo "K" > /etc/hostname
# 修改磁盘主机名，重启生效。
hostnamectl set-hostname K
# 修改内核和磁盘主机名。
```

## dmesg 和 journalctl

dmesg 读取内核环形缓冲区（kernel ring buffer），需要管理员权限运行
journalctl 是 systemd 日志客户端。systemd 服务提前抓取、存为二进制日志库，journalctl 负责读取这个二进制日志库，普通用户可以读取自己的相关信息，但无法读取其他用户的。

```sh
sudo dmesg -H
# 查看全部内核日志
# -H 表示分页视图，方便查看
sudo dmesg -xT -l err,warn
# -T 表示修改日期显示方式为时分秒而不是开机时间
# -x 表示显示日志类型
# -l 指定日志级别，过滤无用的 info 日志。故障级别是 crit,alert,emerg
sudo dmesg -wT
# -w 持续监听内核缓冲区，实时打印
sudo dmesg -c
# -c 打印日志然后清空。-C 是直接清空


journalctl -k --since "2026-07-08 14:00" --until "2026-07-09 05:00" > oom_history.log
# ？
```

## /proc

linux 把 CPU、内存、IO、进程状态全部存在 `/proc` 文件夹中，`ps`、`top`、`free` 等命令都是属于软件工具，本质上就是读取 `/proc/stat`、`/proc/meminfo`、`/proc/[pid]/status`、`/proc/[pid]/stat` 等文件的内容，然后整理输出。

### ps

`ps`：process status 进程状态。

`pstree` 可以以树形输出进程关系，其中 `*[{}]` 表示线程

```sh
pstree -u
# 在括号中显示进程所属用户，没有括号代表 root
pstree k
# 只查看用户 k 的
pstree -p
# 显示 PID
pstree -ap
# 显示 PID 和进程命令（不一定显示全）

ps -ft pts/1
# ？？

ps -eo user | sort -u
# -e：every，显示系统全部进程
# -o user：自定义输出字段，只查看 user 列
# sort -u 排除并去重（--unique）

ps -u k -o rss | awk 'NR>1{sum+=$1}END{print sum/1024,"MB"}'
# 查看用户 k 所有进程占用物理内存总和。

ps -ef | grep [pid]
# 查看 PID 的进程相关信息

ps -o pid,ppid,cmd -p [pid]
# 查看指定 pid 有谁调用


```

### free

free 属于 procps-ng（procps）工具集，本质上读取的是 /proc/meminfo 数据，用于查看物理内存和交换内存情况，有以下值，默认单位是 KiB，原因是 /proc/meminfo 中使用 KiB 作为单位：
- total：总内存，读取 MemTotal / SwapTotal 值
  - 具体地说，MemTotal = 物理总内存 - 硬件预留内存 - 内核占用内存
  - 想要查看物理总内存，可以直接查看 bios 数据 `dmidecode -t memory`
- free：裸空闲内存，读取 MemFree / SwapFree 值
  - 属于狭义上的空闲内存，不考虑可回收内存等信息
- shared：共享内存，读取 Shmem 值，主要是 tmpfs 占用内存
- available：可用内存，读取 MemAvailable 值（内核≥3.14）
- buffers：内核块设备缓冲，读取 Buffers 值
- cache：文件页缓存 + 可回收 slab 内存。通过计算 Cached + SReclaimable 得到
- buff/cache：buffers + cache
- used：已使用内存，也就是“总的”减去“可用的”，具体是通过计算 MemTotal - MemFree - Buffers - Cached - SReclaimable / SwapTotal - SwapFree 值得到。
  - 注意，SwapCached 值指曾经被换出到 swap，之后又重新加载回内存，但 swap 并不会回收这块数据，目的是下次回收时，不需要再次写入 swap ，这能节省磁盘 IO 开销。所以计算 swap used 时不会减去 SwapCached

```sh
free -h -w
# -h / --human，自动适配单位
# -w / --wide，将 buffers 和 cache 拆分成两列单独展示

dmidecode -t memory
# 通过查看 bios 数据来查看物理总内存

systemctl status user.slice | grep -m 1 "Memory:"
# 查看 user.slice 的内存占用情况
```

### top

`top` 和 `ps` 一样，只不过是实时系统资源监控工具。
- 按键 `e` 切换内存单位 KiB / MiB / GiB
- 按键 `d` 设置刷新间隔（单位秒）

- `htop`
- `pidstat`

```sh
top -e g -E g
# -e 指定进程列表 VIRT/RES/SHR 单位
# -E 指定顶部内存行 Mem/Swap 单位
# 可选值：k(KiB) / m(MiB) / g(GiB) / t(TiB) / p(PiB) / e(EiB)

top -d 0.1
# 指定刷新间隔0.1s（默认3s）
top -u k
# 只监控指定用户 k 的进程
top -p 3839
# 只监控指定PID进程

top -b -n 1
# 等同 ps 快照。
# -b 表示批处理，-n 1 表示只输出一次就退出，适合脚本采集数据
```

```sh
top - 16:09:01 up 55 min,  5 users,  load average: 1.71, 14.66, 10.37
Tasks: 144 total,   1 running, 143 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1690.6 total,   1165.8 free,    312.1 used,    212.6 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1226.3 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   4430 k         20   0 1747900  65656  12196 S   0.0   3.8   0:13.73 MainThread
   4479 k         20   0 1555300  36732   9980 S   0.0   2.1   0:04.64 MainThread
```

第1行：系统运行状态
```
top - 15:43:33 up 30 min,  2 users,  load average: 0.25, 0.17, 0.18
```
- `15:43:33`：当前系统时间
- `up 30 min`：服务器已开机运行30分钟
- `2 users`：当前登录系统的用户总数（SSH/本地终端都算）
- `load average: 0.25, 0.17, 0.18`：1分钟、5分钟、15分钟平均负载
   - 单核机器：负载接近1代表满载；多核看逻辑CPU总数，4核CPU负载4才是满载

第2行：任务进程统计
```
Tasks: 138 total,   1 running, 137 sleeping,   0 stopped,   0 zombie
```
- `138 total`：系统当前全部进程总数
- `1 running`：正在占用CPU运行的进程
- `137 sleeping`：休眠进程（等待IO/定时事件，绝大多数服务都处于此状态）
- `0 stopped`：被暂停的进程（`Ctrl+Z`后台暂停那种）
- `0 zombie`：僵尸进程（子进程退出父进程未回收，0代表无异常）

第3行：CPU 全局占用（单位百分比）
```
%Cpu(s):  4.8 us,  4.8 sy,  0.0 ni, 90.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```
注意一下，这顶部的百分比，是整机的百分比，下方表格的 %CPU列则不是整机的百分比，而是单核上限100，双核则上限200
字段含义：
- `us` user：用户态CPU占用（程序自身代码，业务进程消耗）
- `sy` system：内核态CPU占用（系统内核、驱动调用开销）
- `ni` nice：调整过优先级的用户进程CPU占比
- `id` idle：空闲CPU（这里90.5%，CPU非常闲）
- `wa` iowait：CPU 空闲但在等待磁盘 IO 的时间占比（数值高代表磁盘瓶颈）
- `hi` hardware irq：硬件中断消耗CPU
- `si` software irq：软中断消耗CPU（网络收发高时会上涨）
- `st` steal：被虚拟化宿主机抢占走的CPU（物理机永远0，云虚拟机才会有数值）

第4行：物理内存 Mem（单位 MiB）
```
MiB Mem :  1690.6 total,   214.3 free,   344.3 used,  1132.1 buff/cache
```
- `total`：总物理内存 ≈ 1.7G
- `free`：完全空闲、未分配的裸内存（数值很小是Linux正常机制，会缓存文件）
- `used`：进程程序实际占用内存
- `buff/cache`：缓冲区+页缓存（磁盘文件、目录元数据缓存，可回收给进程使用）

第5行：交换分区 Swap + 可用内存
```
MiB Swap:    0.0 total,    0.0 free,    0.0 used.  1170.2 avail Mem
```
- `total`：交换分区总大小（0 = 未创建 swap）
- `free`：交换分区空闲空间
- `used`：已经把内存数据写到磁盘 swap 的容量
- `avail Mem`：系统可分配给新程序的总内存，也就是 /proc/meminfo 中的 MemAvailable，数值等于 free 空白内存 + 可回收的buff/cache缓存 + 可回收slab内核内存。它写在交换分区这一行只是排版美观，并不是指虚拟内存

第6行表头
```sh
 PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
4430 k         20   0 1747900  65656  12196 S   0.0   3.8   0:13.73 MainThread
```
- PID：Process ID，进程唯一ID号
- USER：运行用户，启动进程的系统用户名
- PR：Priority，内核调度优先级，默认20，数值越小优先级越高
- NI：Nice值，用户可调优先级，范围 -20~19；负数更高权限，0默认
- VIRT：Virtual Memory，虚拟内存总量（VMSIZE）：堆+栈+共享库+交换占用，单位KiB。这是程序申请的内存，并不是实际占用内存
- RES：Resident Memory，常驻物理内存（RSS）：真正占用的物理RAM，不含交换
- SHR：Shared Memory，共享内存大小（共享库、共享页面）
- S：Status，进程状态，
  - S，sleeping 休眠
  - R，运行
  - Z，僵尸
  - T，暂停
  - D，不可中断休眠，调用 kill -9 也无法终止。
- %CPU：CPU占用率，单CPU核心瞬时占用，多核进程可超过100%
- %MEM：内存占比，该进程占用整机物理内存百分比
- TIME+：CPU累计时间，进程启动后总共占用CPU的时长（时分秒毫秒）
- COMMAND：启动命令，进程程序名/完整启动命令


[kernel release]: https://www.kernel.org/releases.html
[systemd]: https://systemd.io/
[1]: https://systemd.io/CONTROL_GROUP_INTERFACE/
[2]: https://systemd.io/CGROUP_DELEGATION/
[util-linux]: https://github.com/util-linux/util-linux/tree/master
[GNU coreutils]: https://github.com/coreutils/coreutils
[《Rethinking PID 1》]: https://0pointer.de/blog/projects/systemd.html
[POSIX 规范]: https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html