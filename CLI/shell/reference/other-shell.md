## ufw

ubuntu 上的防火墙

```sh
ufw allow from 100.104.0.0/16 to any port 22
# 放行端口，才能让阿里云控制台登录进入
ufw delete allow 80/tcp
# 删除 80 端口
ufw allow 443
# 添加 443 端口
```

## cal

查看日历

## users

显示系统当前登录的用户。

## uptime

显示我们的系统运行了多少时间、当前登录的用户数，操作系统在过去的1、5、15分钟内的平均负载。

## column

```sh
sudo cat /etc/shadow | column -t -s ':'
# 以 : 作为分隔符打印输出
```

## tr

```sh
echo "hello" | tr '[:lower:]' '[:upper:]'
# 变大写

echo "hello" | tr '[:upper:]' '[:lower:]'
# 变小写
```

## getent

```sh
getent passwd
# 获取用户数据库中的所有用户
# 等同 cat /etc/passwd

getent group
# 获取所有组
# 等同 cat /etc/group
```

## disown

然后使用 disown %作业号 来从 shell 的作业表中移除该作业，使其脱离 shell 的控制。这样后台程序将不再受到 shell 关闭的影响，但仍在后台运行。

```sh
$ tail -f /etc/hosts &
$ jobs
# [1]-  Stopped                 vim aa.txt
# [2]+  Stopped                 vim ab.txt
# [3]   Running                 tail -f /etc/hosts &
$ disown %3
$ jobs
# [1]-  Stopped                 vim aa.txt
# [2]+  Stopped                 vim ab.txt
$ ps aux | head -1 && ps aux | grep tail | grep -v grep
# 虽然不在 jobs 中，但可以在这里查看
$ kill <PID>
# 然后关闭
```

## bg

如果希望后台进程不维持在后台停止状态，而是让其继续执行，可以通过 bg 命令将其转为后台执行状态
```sh
$ tail -f /etc/hosts &
$ jobs
# [1]-  Stopped                 vim aa.txt
# [2]+  Stopped                 vim ab.txt
# [3]   Running                 tail -f /etc/hosts &
$ kill -STOP %3
[3]+  Stopped                 tail -f /etc/hosts
$ jobs
# [1]   Stopped                 vim aa.txt
# [2]-  Stopped                 vim ab.txt
# [3]+  Stopped                 tail -f /etc/hosts
$ bg 3
# [3]+ tail -f /etc/hosts &
$ jobs
# [1]-  Stopped                 vim aa.txt
# [2]+  Stopped                 vim ab.txt
# [3]   Running                 tail -f /etc/hosts &
```

## fg

```sh
fg <jobs 编号>
# 将其唤醒到前台。如果不加编号，则唤醒最近被放入后台的任务
```

## jobs

```sh
jobs -l
# 查看当前后台进程

# 案例
$ tail -f /etc/hosts &
$ jobs
# [1]-  Stopped                 vim aa.txt
# [2]+  Stopped                 vim ab.txt
# [3]   Running                 tail -f /etc/hosts &
$ kill %3
# [3]   Terminated              tail -f /etc/hosts
$ jobs
# [1]-  Stopped                 vim aa.txt
# [2]+  Stopped                 vim ab.txt
```

## htpasswd



```sh
htpasswd -c <file> <username>
# 需要先安装 yum install httpd-tools 或者 apt install apache2-utils
# 然后在 nginx 配置文件中添加下面内容就可以实现网站加密
#                auth_basic "Admin Only";
#                auth_basic_user_file /etc/apache2/.htpasswd;
```

## arch

```sh
arch
# 查看系统架构。比如 x86_64
```

## uniq

忽略重复行


```shps -aux | grep aa.txt | grep -v grep
$ echo -e 'hi\nhi\nhi\nhello' | uniq
hi
hello
```

## dirname

```sh
dirname  /usr/80
/usr

dirname  /usr/itaem-test-api/img/
/usr/itaem-test-api
```

## ssh-keygen

```sh
ssh-keygen -t ed25519 -f "$HOME\.ssh\id_ed25519-remote-ssh"
#-f 参数用于指定生成的密钥文件的名称（文件路径）

ssh-keygen -t ECDSA
# 在本机生成 ECDSA 密钥（公钥和私钥）。
# 私钥通常存储在 ~/.ssh/id_ecdsa
# 公钥通常存储在 ~/.ssh/id_ecdsa.pub

ssh-keyscan -t rsa xx.xx.xx.xx | ssh-keygen -lv -f -
# https://superuser.com/a/1111974/1834019
# ssh-keyscan 工具用于获取指定 IP 地址的 RSA 密钥。-t rsa 参数指定了密钥类型为 RSA。这个命令的输出是被扫描主机的公钥。
# ssh-keygen 工具来验证从 ssh-keyscan 获取的公钥并显示其详细信息。-lv 参数让 ssh-keygen 显示密钥的详细信息，而不只是密钥指纹。-f - 参数告诉 ssh-keygen 从标准输入中读取密钥。

```

## ssh

```sh
ssh -i /path/to/private_key user@hostname
# -i 参数 (IdentityFile) 指定本机私钥，以便远程主机验证本机的身份。

```

## export

```sh
<key>=<value>
# 临时保存环境变量（仅限当前会话）

export <key>=<value>
# 长期保存环境变量
```

## type

```sh
type -a ifconfig
# 查看命令所在位置
```

## which

```sh
which ifconfig
# 查看命令所在位置
```


## whereis

```sh
whereis <command>
# 查看某命令所在路径

whereis node
whereis npm
```

## gedit

```sh
gedit /etc/ssh/sshd_config
# 安装完后，可以再配置一下文件，允许根用户登录
#   sudo gedit /etc/ssh/sshd_config
# 添加一项内容：
#       PermitRootLogin yes
# 然后保存即可

```

## lsb_release

```sh
lsb_release -a
# 列出所有版本信息，适用于所有的Linux发行版
```

## nohup

no hang up ，不挂起，理解为通过该命令调用的进程，不属于 SSH 控制，即退出 SSH 连接后依然可以运行

在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。

```sh
$ nohup <COMMAND> [Arguments] [&]
# <COMMAND> 为要执行的命令
# Arguments 为可选参数
# & 代表后台运行

```

## pgrep

```sh
pgrep <进程名>
# 查看进程占用的所有 PID
```

## &

```sh
<SHELL> &
# 后台运行命令 &

```

## mount

```sh
mount
# mount 命令是挂载文件系统用的, 不带任何参数运行, 会打印包含文件系统类型在内的磁盘分区的信息

```

## id

```sh
id [username]
# 查看用户的 uid 信息

id [用户名]
# 查看当前用户的 id(uid) 和主分组 id(gid)，还有所在分组 groups

```

## groups

```sh
groups
# 查看当前用户所属的组

groups [用户名]
# 查看当前用户所在组，一个用户可以存在多个组别中

```

## w

```sh
w
# 查看当前登录用户信息
```

## su

```sh
# 切换用户登录
su [username]

```

## service

案例 - 解决 `service network restart` 时报错

报错信息:
```
Bringing up interface eth0:  Error: No suitable device found: no device found for connection 'System eth0'.
```

搜索到的相关文章
- https://blog.csdn.net/temphy/article/details/77524732
- https://blog.csdn.net/seven_zhao/article/details/43429571
- https://debugah.com/bringing-up-interface-eth0-error-no-suitable-device-found-no-device-found-for-connection-system-eth0-failed-23769/

涉及到的文件有:
- `/etc/udev/rules.d/70-persistent-net.rules`
- `/etc/sysconfig/network-scripts/` 文件夹中的 `ifcfg-eth` 开头的文件

涉及到的命令有
- `ifconfig`
- `uuidgen` 输出一个系统内的唯一标识
- `nmcli con list` 可查看 UUID; 执行失败时试试将 list 换成 show
- `nmcli dev list` 可查看 MAC; 执行失败时试试将 list 换成 show
- `service network restart` 重启

解决:
1. 执行命令 `ifconfig`, 获取正确的 `HWaddr`
2. 用正确的 `HWaddr` 替换 `vim /etc/sysconfig/network-scripts/ifcfg-eth0` 中的 `HWaddr`
3. 再次执行 `service network restart`, 无报错
4. 执行 `ifconfig`, 依旧显示 eth1, 而不是 eth0
5. `rm /etc/udev/rules.d/70-persistent-net.rules`
6. 重启系统, 再次执行 `ifconfig` 成功出现 eth0, 但没有 `ipv4` 地址
7. 等待一下, 再次执行 `ifconfig`, 成功出现 `ipv4` 地址

总结
- `UUID` 只作用于系统内, 确保每个网卡的 `UUID` 唯一即可。通过 `uuidgen` 命令可生成系统内的唯一标识
- `/etc/udev/rules.d/70-persistent-net.rules` 可以删除, 重启系统会自动重新生成
- linux 中一切皆文件, `ifcfg-eth0` 就相当于 `以太网0`
- 使用虚拟机克隆新系统时, 往往会在网卡部分出现问题, 因为 MAC 地址改变了


## locale

区域设置（编码）

`locale` 可以获取区域相关信息，比如字符编码和时间格式等等。

直接执行 `locale` 会输出和区域有关的变量，比如 `LANG` 变量。该变量表示系统语言使用的字符编码。（（注意 Linux 上环境变量区分大小写）

通过 `locale -m` 或 `locale --charmaps` 可以查看所有可用的编码，比如 ASCII, BIG5, GB2312, GBK, UTF-8 等等。更多配置项可通过 `locale -h` 获取。

Window 上通过 `chcp` 来修改当前终端字符集，而 Linux 上可以通过 `LANG` 变量实现类似的效果。比如 `export LANG=C.gb2312` 可以临时修改字符编码。

## curl

```sh
curl ifconfig.me
# 获取外网IP. 需要预安装 curl: sudo apt install curl
```

## ipconfig

```sh
ifconfig -a
# 需要预安装软件: sudo apt install net-tools
```

## ip

```sh
$ ip addr show
$ ip a
# 查看一下系统的 IP 地址
```

## netstat

```sh
netstat -ntlp
# 查看Linux中网络系统状态信息
# -n或--numeric：直接使用ip地址，而不通过域名服务器；
# -l或--listening：显示监控中的服务器的Socket；
# -p或--programs：显示正在使用Socket的程序识别码和程序名称；
# -t或--tcp：显示TCP传输协议的连线状况；
```

## lsof

```sh
lsof -i:<PORT>
# 查看谁在使用该端口
```

## ln

```sh
ln -snf <target> <link_name>
# 将 <target> 链接到 <link_name>
# -s, --symbolic
#              make symbolic links instead of hard links
# -f, --force
#              remove existing destination files
# -n, --no-dereference
#              treat LINK_NAME as a normal file if it is a symbolic link to a directory

sudo ln -s /usr/local/go/bin/go /usr/bin/go
# 这个是将命令通过软连接的方式链接到 /usr/bin 目录下（ln 命令）

ln -s 443 80
# 80 端口使用 443 端口的内容。
```


## systemctl

```sh
systemctl status <service_name>.service
systemctl status <service_name>
# 可以省略 .service 后缀名
systemctl start <service_name>.service
# 启动服务
systemctl stop <service_name>.service
# 停止服务
systemctl restart <service_name>.service
# 重启服务
systemctl reload  <service_name>.service
# 如果只是想应用的新的服务配置，可以使用重新加载服务而不需要重启
systemctl reload-or-restart <service_name>.service
# 如果不确定是应该重新加载还是重启，可以使用 reload-or-restart


systemctl is-active <service_name>.service
# 检查每个特定服务是否在允许。Check if a Particular Service is Running



systemctl enable <service_name>.service
# 允许服务开机自启
systemctl disable <service_name>.service
# 取消服务开机自启
systemctl is-enabled <service_name>.service
# 查看是否开启自启



systemctl list-units
# 列出所有运行单元，包括 services, timers, sockets and more.
systemctl list-dependencies
# Display List of Dependent Units
# 以树状图列出所有运行单元，树状图表示了各个服务直接的依赖关系（启动顺序）
systemctl list-jobs
# List All Currently Active Systemd Jobs
# job 表示当前系统的某个操作的进度。比如启动某个服务的进度或者停止某个服务的进度。

systemctl daemon-reload
# Reload Systemd Manager Configuration Files
# This command reloads the systemd manager configuration files. Use this command after modifying any service files or after adding new units to the system.

```

常见服务 / Systemd Unit

```sh
firewalld.service
# 防火墙

nginx.service
# 开源 Web 服务器 Nginx

httpd.service
# 开源 Web 服务器软件 Apache
```

优秀文章：

- [What is Systemctl? An In-Depth Overview](https://www.liquidweb.com/kb/what-is-systemctl-an-in-depth-overview/)

## firewall-cmd

```sh

firewall-cmd --list-ports
firewall-cmd --zone=public --list-ports
# 查看开放了哪些端口

firewall-cmd --zone=public --add-port=<PORT>/tcp # 重启失效
firewall-cmd --zone=public --add-port=<PORT>/tcp --permanent #　永久生效
# 开放端口


firewall-cmd --zone=public --remove-port=<PORT>/tcp # 重启失效
firewall-cmd --zone=public --remove-port=<PORT>/tcp --permanent # 永久生效
# 关闭端口

firewall-cmd --state
# 查看防火墙是否在运行

firewall-cmd --list-all
# 可以查看防火墙相关信息

firewall-cmd --reload
# 重新加载防火墙

firewall-cmd --list-services
# 查看防火墙开启的服务

firewall-cmd --permanent --add-service=http
# 永久开启一个 http 服务

firewall-cmd --query-panic
# 查看是否拒绝所有包

firewall-cmd --panic-on
# 拒接所有包（将会断开连接）

firewall-cmd --panic-off
# 关闭拒接所有包（无法连接时使用 VNC 连接）

firewall-cmd --query-panic
# 查看是否拒绝所有包

firewall-cmd --panic-on
# 拒接所有包（将会断开连接）

firewall-cmd --panic-off
# 关闭拒接所有包（无法连接时使用 VNC 连接）
```

参考资料：

- [firewalld 官网](https://firewalld.org/)

## hostname

主机名、主机号和IP地址是不一样的概念

临时修改的主机名, 需要在新会话中才会生效。
永久修改的主机号, 一般需要重启系统才生效

```bash
$ hostname # 查看主机名
$ hostname <new-hostname> # 修改主机名
$ hostname -i # 解析 "主机名" 的 IP 地址
$ hostname -I # 查看分配给系统网络接口的所有IP地址

```

## tar

<!-- -x 参数是解压
-f 参数是指定文件夹
-C 参数是指定解压到哪个文件夹
-v 显示冗余信息（往控制台输出信息）

```sh
tar -xvf node-v16.17.0-linux-x64.tar.xz -C /usr/local/lib/
# 解压到 /usr/local/lib/ 文件夹里面
``` -->

## apt, apt-get

```sh
apt-get

sudo apt-get update
sudo apt-get install openssh-server
#



# 列出所有可更新的软件清单命令
apt update
# 安装指定的软件命令
apt install <package-name>
# 安装多个软件包
apt install <package1> <package2> <package3>
# 更新指定的软件命令
apt update <package-name>
# 删除软件包命令
apt remove <package-name>
# 查找软件包命令
apt search <keyword>
# 列出所有已安装的包
apt list --installed
```

## ntpdate

```sh
ntpdate time.nist.gov
# 用ntpdate从时间服务器更新时间
```

## yum
```sh
yum -y install ntp
# 安装ntp校时工具
```

## wget
-b	后台下载
-P	下载到指定目录
-t	最大重试次数
-c	断点续传
-p	下载页面内所有资源，包括图片、视频等
-r	递归下载

```sh

wget -P /root/static/img/ http://img.alicdn.com/tfs/TB1.R._t7L0gK0jSZFxXXXWHVXa-2666-1500.png
# 下载一张图片到路径/root/static/img/中，-p参数默认值为当前路径，如果指定路径不存在会自动创建。
```

## ps

ps命令用于查看系统中的进程状态。

-a	显示现行终端机下的所有程序，包括其他用户的程序
-u	以用户为主的格式来显示程序状况
-x	显示没有控制终端的进程，同时显示各个命令的具体路径
-e	列出程序时，显示每个程序所使用的环境变量
-f	显示当前所有的进程
-t	指定终端机编号，并列出属于该终端机的程序的状况

```sh
ps -ef | grep sshd

ps -ef | grep [process-name]
# 查看启动的某一进程

ps -e | grep ssh
# 此时应该看到有 sshd 服务，还会有一个 ssh-agent
# 如果没有 ssh ,可以先启动 ssh
#    sudo /etc/init.d/ssh start


ps -aux | grep aa.txt | grep -v grep
# 查看进程状态

ps -eo pid
# 查看所有 pid
ps -eo pid --no-headers | tr '\n' '\t'
# 不换行

ps -eo pid | ls -v
ls /proc -v
# 输出相同
```

## top

top命令动态地监视进程活动与系统负载等信息。

命令输出参数解释：
以上命令输出视图中分为两个区域，一个统计信息区，一个进程信息区。
• 统计信息区
    • 第一行信息依次为：系统时间、运行时间、登录终端数、系统负载（三个数值分别为1分钟、5分钟、15分钟内的平均值，数值越小意味着负载越低）。
    • 第二行信息依次为：进程总数、运行中的进程数、睡眠中的进程数、停止的进程数、僵死的进程数。
    • 第三行信息依次为：用户占用资源百分比、系统内核占用资源百分比、改变过优先级的进程资源百分比、空闲的资源百分比等。
    • 第四行信息依次为：物理内存总量、内存使用量、内存空闲量、作为内核缓存的内存量。
    • 第五行信息依次为：虚拟内存总量、虚拟内存使用量、虚拟内存空闲量、预加载内存量。
• 进程信息区
    PID	进程ID
    USER	进程所有者的用户名
    PR	进程优先级
    NI	nice值。负值表示高优先级，正值表示低优先级
    VIRT	进程使用的虚拟内存总量，单位kb
    RES	进程使用的、未被换出的物理内存大小，单位kb
    SHR	共享内存大小，单位kb
    S	进程状态D：不可中断的睡眠状态R：正在运行S：睡眠T：停止Z：僵尸进程
    %CPU	上次更新到现在的CPU时间占用百分比
    %MEM	进程使用的物理内存百分比
    TIME+	进程使用的CPU时间总计，单位1/100秒
    COMMAND	命令名


```sh
# 查看某个进程
top -p [PID]

top
# 全部进程动态实时视图
```

## pidof

pidof
命令描述：pidof命令用于查询指定服务进程的PID值。

命令格式：pidof [服务名称]。

-s	仅返回一个进程号
-c	只显示运行在root目录下的进程，这个选项只对root用户有效
-o	忽略指定进程号的进程
-x	显示由脚本开启的进程

```sh
pidof crond
# 查询出crond服务下的所有进程ID。
```

## kill

命令描述：kill命令用于终止指定PID的服务进程。

kill可将指定的信息送至程序。预设的信息为SIGTERM(15)，可将指定程序终止。若仍无法终止该程序，可使用SIGKILL(9)信息尝试强制删除程序。

命令格式：kill [参数] [进程PID]。

```sh
kill -9 1247
# 删除pid为1247的进程。

kill [PID]
# 关闭指定的进程

kill [信号] <PID>
# 向进程发送一个关闭信号
# 没有指定信号时，是让进制自行关闭，即进程可保存数据后再关闭
# 指定信号为 -9 或 -SIGKILL ，即让进制立即关闭（会丢失数据）


```

## killall

命令描述：killall命令用于终止指定名称的服务对应的全部进程。

命令格式：killall [进程名称]。

```sh
killall crond
# 删除crond服务下的所有进程。


killall apt apt-get
# ...
```

## ipconfig

ifconfig命令用于获取网卡配置与网络状态等信息。

命令使用示例：

```sh
ifconfig
# 获取网卡配置与网络状态等信息。
#
# 命令输出说明：
#   第一部分的第一行显示网卡状态信息。
#       eth0表示第一块网卡。
#       UP代表网卡开启状态。
#       RUNNING代表网卡的网线被接上。
#       MULTICAST表示支持组播。
#   第二行显示网卡的网络信息。
#       inet（IP地址）：172.16.132.195。
#       broadcast（广播地址）：172.16.143.255。
#       netmask（掩码地址）：255.255.240.0。
#   RX表示接收数据包的情况，TX表示发送数据包的情况。
#   lo表示主机的回环网卡，是一种特殊的网络接口，不与任何实际设备连接，而是完全由软件实现。与回环地址（127.0.0.0/8 或 ::1/128）不同，回环网卡对系统显示为一块硬件。任何发送到该网卡上的数据都将立刻被同一网卡接收到。
```

## uanme

uname命令用于查看系统内核与系统版本等信息。

命令语法：uname [-amnrsv][--help][--version]

```sh
uname -a
# 显示系统信息。查看linux内核版本（可能无此命令）

uname -i
# 显示当前系统的硬件架构。

uname -r
# 显示操作系统发行编号。

uname -s
# 显示操作系统名称。

uname -n
# 显示主机名称。

```

## uptime

用于查看系统的负载信息。

```sh
uptime
# 查看系统的负载信息。
# 命令输出说明：
#    负载信息	命令输出值
#    当前服务器时间	14:20:27
#    当前服务器运行时长	2 min
#    当前用户数	2 users
#    当前负载情况	load average: 0.03, 0.04, 0.02（分别取1min，5min，15min的均值）

```


## free


free用于显示当前系统中内存的使用量信息。

命令语法：free [-bkmotV][-s <间隔秒数>]

-b	以Byte为单位显示内存使用情况
-k	以KB为单位显示内存使用情况
-m	以MB为单位显示内存使用情况
-h	以合适的单位显示内存使用情况，最大为三位数，自动计算对应的单位值。

```sh
free -h
# 显示当前系统中内存的使用量信息。
# 命令输出说明：
#       total	物理内存总数
#       used	已经使用的内存数
#       free	空间的内存数
#       share	多个进程共享的内存总额
#       buff/cache	应用使用内存数
#       available	可用的内存数
#       Swap	虚拟内存（阿里云ECS服务器默认不开启虚拟内存）

```

## who

命令描述：who 命令显示关于当前在本地系统上的所有用户的信息。

```sh
who
# 显示当前登录系统的用户

who -l -H
# 显示用户登录来源

who -m -H
# 只显示当前用户

who -q
# 精简模式显示

who am i
# 可以查看当前用户名, pts 和登录时间
```


## last

last 命令用于显示用户最近登录信息。

```sh
last
# 显示用户最近登录信息。
```

由于这些信息都是以日志文件的形式保存在系统中，黑客可以很容易地对内容进行篡改，所以该命令输出的信息并不能作为服务器是否被入侵的依据。

## df

df 命令描述：该命令检查文件系统的磁盘空间占用情况。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

```sh
df [参数] [目录或文件名]
#   -a	列出所有的文件系统，包括系统特有的/proc等文件系统。
#   -k	以KBytes为单位，返回各文件系统容量。
#   -m	以MBytes为单位，返回各文件系统容量。
#   -h	以GBytes、MBytes、KBytes为单位，返回各文件系统容量。
#   -H	以M=1000K取代M=1024K的进位方式显示各文件系统容量。
#   -T	显示文件系统类型。
#   -i	显示inode信息。


df
# 显示磁盘使用情况。

df -i
# 以inode模式来显示磁盘使用情况。

df -aT
# 显示系统内的所有特殊文件格式、名称及磁盘使用情况。

df -h
# 以GBytes、MBytes、KBytes等格式显示各文件系统容量。
```

## du

du命令描述：查看磁盘使用空间。du与df命令不同点在于，du命令用于查看文件和目录磁盘的使用空间。

```sh
du [参数] [文件或目录名称]
#   -a	列出所有的文件与目录容量。
#   -h	以G、M、K为单位，返回容量。
#   -s	列出总量。
#   -S	列出不包括子目录下的总量。
#   -k	以KBytes为单位，返回容量。
#   -m	以MBytes为单位，返回容量。


du
# 列出当前目录下的所有文件夹的容量。

du -a
# 列出当前目录下的所有文件夹和文件的容量。

du -ah
# 列出当前目录下的所有文件夹和文件的容量。

du -sm /*
# 列出根目录底下每个目录所占用的容量，并以MBytes单位显示容量。


df -T
# df 命令报告文件系统磁盘空间利用率

```

## fdisk

fdisk命令描述：该命令用于磁盘分区。

```sh
fdisk [-l] 装置名称
# -l 表示：输出后面装置名称的所有的分区内容。若仅有 fdisk -l时， 则系统将会把整个系统内能够搜寻到的装置的分区均列出来。

fdisk -l
# 列出系统所有装置的分区信息。

df /
# 列出系统中的根目录所在磁盘，并查阅该硬盘内的相关信息。

fdisk /dev/vda
# 对磁盘/dev/vda进行分区操作。
# 注意：对磁盘进行分区操作时，磁盘名不包含数字。

```

## tee

tee 命令在 Unix 和类 Unix 系统中是一个常用的命令，它通常用于从标准输入读取数据，并将其写入到标准输出以及一个或多个文件中。它的基本语法如下：

```sh
tee [OPTION]... [FILE]...
```

其中 [OPTION] 是一些可选参数，[FILE] 是要写入的文件名。

常见的选项包括：

-a：追加写入，将数据追加到文件末尾而不是覆盖文件。
-i 或 --ignore-interrupts：忽略中断信号。
-p：将输出写入标准输出之前，先将数据写入文件。
-u：即使输出重定向到了管道，也使用非缓冲的输出。

```sh
# 将标准输入的内容写入到文件中
echo "Hello, world" | tee file.txt

# 将标准输入的内容写入到多个文件中
echo "Hello, world" | tee file1.txt file2.txt

# 使用追加模式将标准输入的内容写入到文件中
echo "Hello, world" | tee -a file.txt

# 读取文件的内容，并同时显示在终端上，并写入到文件中
cat file.txt | tee output.txt
```
