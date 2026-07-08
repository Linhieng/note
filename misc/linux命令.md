
- `uname -r` 命令用于查看 linux 内核。
  - 只要输出的内核版本带 `-`，则说明使用的是分发版linux（比如Ubuntu等）。此时需要查看对应分发版linux的手册。
  - 如果是核心linux，输出内容只会有版本号。核心linux版本可以查看对应 [kernel release]

```sh
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

## 用户和权限

### 用户管理和权限分配

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

su -
# 切换为 root，需要 root 密码
sudo -i
# 切换为 root 权限

passwd -S k2
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
id
w

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

ps -u k -o rss | awk 'NR>1{sum+=$1}END{print sum/1024,"MB"}'
# 查看用户 k 所有进程占用物理内存总和。

ps -ef | grep [pid]
# 查看 PID 的进程相关信息

ps -o pid,ppid,cmd -p [pid]
# 查看指定 pid 有谁调用


```

### free

```sh
free -h
               total        used        free      shared  buff/cache   available
Mem:           1.7Gi       490Mi       120Mi       2.0Mi       1.1Gi       1.0Gi
Swap:             0B          0B          0B
```
- total 代表的是物理总内存大小
- free 代表的是完全干净、无数据、没被缓存占用的裸物理页。

### top

`top` 和 `ps` 一样，只不过是实时系统资源监控工具。
- 按键 `e` 切换内存单位 KiB / MiB / GiB

- `htop`
- `pidstat`

```sh
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
字段含义：（单位为
- `us` user：用户态CPU占用（程序自身代码，业务进程消耗）
- `sy` system：内核态CPU占用（系统内核、驱动调用开销）
- `ni` nice：调整过优先级的用户进程CPU占比
- `id` idle：空闲CPU（这里90.5%，CPU非常闲）
- `wa` iowait：等待磁盘IO的CPU（数值高代表磁盘瓶颈）
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
| 列名    | 全称            | 含义                                                                                           |
| ------- | --------------- | ---------------------------------------------------------------------------------------------- |
| PID     | Process ID      | 进程唯一ID号                                                                                   |
| USER    | 运行用户        | 启动进程的系统用户名                                                                           |
| PR      | Priority        | 内核调度优先级，默认20，数值越小优先级越高                                                     |
| NI      | Nice值          | 用户可调优先级，范围 -20~19；负数更高权限，0默认                                               |
| VIRT    | Virtual Memory  | 虚拟内存总量（VMSIZE）：堆+栈+共享库+交换占用，单位KiB。这是程序申请的内存，并不是实际占用内存 |
| RES     | Resident Memory | 常驻物理内存（RSS）：真正占用的物理RAM，不含交换                                               |
| SHR     | Shared Memory   | 共享内存大小（共享库、共享页面）                                                               |
| S       | Status          | 进程状态<br>S=sleeping 休眠<br>R=运行<br>Z=僵尸<br>T=暂停<br>D=不可中断休眠，需 kill -9                               |
| %CPU    | CPU占用率       | 单CPU核心瞬时占用，多核进程可超过100%                                                          |
| %MEM    | 内存占比        | 该进程占用整机物理内存百分比                                                                   |
| TIME+   | CPU累计时间     | 进程启动后总共占用CPU的时长（时分秒毫秒）                                                      |
| COMMAND | 启动命令        | 进程程序名/完整启动命令                                                                        |


[kernel release]: https://www.kernel.org/releases.html