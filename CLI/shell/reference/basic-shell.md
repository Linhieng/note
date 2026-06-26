# basic-shell

## echo

在终端输出字符串或变量提取后的值。

```sh
echo $<var>
# 输出变量值
$ export name="Tom"
$ echo $name



$ echo `pwd`
$ echo $(pwd)
# 输出命令运行结果
```

## date

支持格式

| var  |     |
| ---- | --- |
| `%a` |     |当地时间的星期名缩写（例如： 日，代表星期日）
| `%A` |     |当地时间的星期名全称 （例如：星期日）
| `%b` |     |当地时间的月名缩写 （例如：一，代表一月）
| `%B` |     |当地时间的月名全称 （例如：一月）
| `%c` |     |当地时间的日期和时间 （例如：2005年3月3日 星期四 23:05:25）
| `%C` |     |世纪；比如 %Y，通常为省略当前年份的后两位数字（例如：20）
| `%d` |     |按月计的日期（例如：01）
| `%D` |     |按月计的日期；等于%m/%d/%y
| `%F` |     |完整日期格式，等价于 %Y-%m-%d
| `%j` |     |按年计的日期（001-366）
| `%p` |     |按年计的日期（001-366）
| `%r` |     |当地时间下的 12 小时时钟时间 （例如：11:11:04 下午）
| `%R` |     |24 小时时间的时和分，等价于 %H:%M
| `%s` |     |自UTC 时间 1970-01-01 00:00:00 以来所经过的秒数
| `%T` |     |时间，等于%H:%M:%S
| `%U` |     |一年中的第几周，以周日为每星期第一天（00-53）
| `%x` |     |当地时间下的日期描述 （例如：12/31/99）
| `%X` |     |当地时间下的时间描述 （例如：23:13:48）
| `%w` |     |一星期中的第几日（0-6），0 代表周一
| `%W` |     |一年中的第几周，以周一为每星期第一天（00-53）

```sh
date
# 输出当前日期

date "+%Y-%m-%d %H:%M:%S"
# 指定格式

date "+%j"
# 查看今天是当年中的第几天


```

## whoami

```sh
whoami
# 打印用户名。如 root、keety 等等
```

## pwd

```sh
pwd
# Print Working Directory
```

## clear

```sh
clear
# 清屏。clear up your display
# 如果不想清屏，可以通过 Ctrl+L 快捷键
```

## tree


```sh
tree
# 为当前目录生成目录树

tree <path>
# 为特定目录生成目录树

tree -d
# 只显示目录

tee -L <depth>
#  指定深度
```


## lotout

```sh
logout
# 登出
```

## exit

```sh
exit
# 退出，同 logout
```

## cd

Change Directory

```sh
cd <path>
# 切换目录

cd .
# 当前目录。(current directory). This is the directory you are currently in.

cd ..
# 父目录。(parent directory). Takes you to the directory above your current.

cd ~
# 主目录。(home directory). This directory defaults to your “home directory”. Such as /home/pete.

cd -
# 前目录。(previous directory). This will take you to the previous directory you were just at.

cd
# 不携带任何 flags/arguments/options 时，等同 cd ~
```

## ls

List Directories

文件权限：

```sh

ls
# 查看当前目录下的文件。不显示 . 开头的文件

ls -a
# 显示以 . 开头的文件和文件夹

ll
ls -l
# 显示详细信息。shows a detailed list of files information:
#   file permissions
#   number of links
#   owner name          属主
#   owner group         属组
#   file size
#   timestamp of last modification
#   file/directory name.

ls -R
# recursively list directory contents

ls -t
# sort by modification time, newest first

ls -r
# 倒序。reverse order while sorting



ll /proc/PID
# 在该进程下的文件夹中，就有进程运行所在文件夹的信息
# cwd -> /usr/image-hosting-2
# cwd 后面的就是程序运行所在文件夹
#
# exe -> /usr/local/node/bin/node
# exe 后面代表的是执行程序的文件夹



ls -1
# 以每行一个文件的方式进行列出
ls -c
ls -C
ls -X
# 递增。先上到下，再左到右
ls -x
# 递增。先左到右，再上到下
ls -v
# 按数字大小排序。上到下，左到右

ls -1 target-folder2/ | sed "s|^|$(realpath target-folder2/)/|" | xargs -I {} mv {} target_folder/
# 将 target-folder2/ 中的内容都移动到 target_folder 中。
# 也可以用 mv target-folder2/* target_folder 代替。
```

---

每个终端窗口，都会在 /dev/pts/ 目录下有对应的伪终端设备文件
`ls /dev/pts`
如果只有一个窗口，则输出 0  ptmx
0 文件夹就是伪终端设备文件

将输出内容输出到对应的伪终端设备文件，则会将内容输出到对应的终端窗口

在第一个终端窗口（0）下执行命令：
`echo "hello" > /dev/pts/1`

此时第二个终端窗口（1）会显示 hello

---

## chmod

用于修改文件权限 mode，-R 参数以递归方式对子目录和文件进行修改。

```sh
ls -l
# 可显示文件权限，含义：
#               - 第 1 位表示存档类型。
#                            - 表示一般文件
#                            d 表示目录
#                            l 表示链接文件
#               - 接着 3 位表示当前用户的权限（属主权限）。
#                            rwx 依次表示读、写、执行权限。对应八进制表示为4、2、1。
#                            若某位上为 - 则表示无该权限
#               - 再接着 3 位同用户组的用户权限（属组权限）
#               - 再接着 3 位不同用户组的用户权限（其他用户权限）。
#               - 第 11 位(如果有的话)是一个半角句号. 表示 SELinux 安全标签。

$ echo "echo hello world"  > hello.sh
# 创建一个脚本文件
$ ll | grep hello.sh
# 查看权限，此时是 -rw-r--r-- 没有执行权限。此时权限把八进制是 644
$ chmod u+x hello.sh
# 为其增加属主的执行权限。
# u表示属主，g表示属组，o表示其他，a表示所有用户。
$ ll | grep hello.sh
# 查看权限，此时是 -rwxr--r-- 拥有主执行权限。此时权限把八进制是 744
$ chmod u-x hello.sh
# 撤销属主的执行权限。
$ chmod 744 hello.sh
# 为其增加属主的执行权限。
$ /bin/bash hello.sh
# 使用 bash 命令解释器执行 hello.sh 脚本文件。



$ chown -R keety /path/to/abc
# 将 /path/to/abc 文件夹的所有者设置为 keety 用户

$ chmod -R u+rwx /path/to/abc
# 为 keety 分配  /path/to/abc 文件夹的 rwx 权限
```

## chown

chown 命令修改文件的属主和属组；-R参数以递归方式对子目录和文件进行修改；`ls -l` 命令显示的第三列和第四列就是文件的属主和属组信息。

```sh

$ whoami
root
$ touch test.txt
$ ll | grep test.txt
-rw-r--r--  1 root root         0 Feb 20 23:30 test.txt
$ adduser test
$ adduser admin
# 可以通过 passwd <user> 设置密码
$ chown test test.txt && ll | grep test.txt     # 设置属主用户为 test
-rw-r--r--  1 test root         0 Feb 20 23:30 test.txt
$ chown admin:admin test.txt && ll | grep test.txt # 设置属主和属组用户为 admin
-rw-r--r--  1 admin admin         0 Feb 20 23:30 test.txt
```

## chgrp

chgrp命令用于修改文件的属组。

```sh
$ ll | grep test.txt
-rw-r--r--  1 admin admin         0 Feb 20 23:30 test.txt
$ chgrp root test.txt && ll | grep test.txt
-rw-r--r--  1 admin root         0 Feb 20 23:30 test.txt
```



## touch

```sh
touch <file>
# 创建文件或更新已存在文件的 timestamps。Make some files, also also used to change timestamps on existing files and directories

touch -- -file
# 创建一个名为 -file 的文件
```


## file


用于辨识文件类型

```sh
file <file>
# 查看文件类型。Linux 中不会根据后缀名来判断文件类型。
# 可能的输出有：
#   directory
#   ASCII text
#   HTML document, ASCII text, with very long lines
#   HTML document, UTF-8 Unicode text, with CRLF line terminators
#   sbin: symbolic link to usr/sbin

file <file> -b
# 列出辨识结果时，不显示文件名称

file <file> -c
# 详细显示指令执行过程，便于排错或分析程序执行的情形

file <file> -L
# 直接显示符号连接所指向的文件类别，如 file /sbin -L 则直接显示 directory

file <file> -f <my-magic-file>
# 使用自定义 magic 文件，来解析文件类型
# 未尝试过！
```


## cat

用于查看内容较少的纯文本文件

```sh
cat <file1> <file2>
# 输出文件内容。

cat /dev/null > <file>
# 清空文件内容


cat <file> -n
cat <file> --number
# 输出行号

cat <file> -b
cat <file> --number-nonblank
# 输出行号，但是不对空白行进行编号

cat <file> -s
cat <file> --squeeze-blank
# 当遇到有连续两行以上的空白行，只输出一行的空白行

cat <file> -E
cat <file> --show-ends
# display $ at end of each line

cat <file> -T
cat <file> --show-tabs
# display TAB characters as ^I

cat <file> -ns
# 当遇到有连续两行以上的空白行，只输出一行的空白行。然后进行编号

cat <file> -bs
# 当遇到有连续两行以上的空白行，只输出一行的空白行。然后对非空白行进行编号


cat /etc/os-release
cat /proc/version
# 查看 linux 内核版本


cat /etc/redhat-release
# 列出所有版本信息，只适合Redhat系的Linux
cat /etc/issue
# 列出所有版本信息，适用于所有的Linux发行版
```

## less

与 `more` 命令相似，但使用 `less` 可以随意浏览文件，而 `more` 仅能向前移动，却不能向后移动。

| hotkey                      | info |
| --------------------------- | ---- |
| `q`                         |      | 退出
| `y`                         |      | 向前滚动一行
| `Enter`                     |      | 向后滚动一行
| `u`                         |      | 向前翻半页
| `d`                         |      | 向后翻半页
| `PgUp` / `b` / `Ctrl+B`     |      | 上翻一页
| `PgDn` / `Ctrl+F` / `Space` |      | 下翻一页
| `g`                         |      | 跳到首页
| `G`                         |      | 跳到尾页
| `h`                         |      | 帮助
| `/<str>`                    |      | 向下搜索字符串
| `?<str>`                    |      | 向上搜索字符串
| `n`                         |      | 重复前一个搜索
| `N`                         |      | 反向重复前一个搜索

```sh
less <file>
# 分页查看文件内容。

less -e	 <file>
# 当文件显示结束后，自动离开

less -m	 <file>
# 显示类似 more 命令的百分比

less -N	 <file>
# 显示每行的行号

less -s	 <file>
# 显示连续空行为一行

less +10 -Nm <file>
# 从第 10 行开始，并且显示行号和百分比
```

## more

从前向后分页显示文件内容。

| hotkey              | info |
| ------------------- | ---- |
| `Enter`             |      | 向下 n 行，n 需要定义，默认为 1 行
| `Ctrl+F` /  `Space` |      | 向下滚动一页
| `Ctrl+B`            |      | 向上滚动一页
| `=`                 |      | 输出当前行的行号
| `!<command>`        |      | 执行 `<command>`
| `q`                 |      | 退出

案例：

```sh
more +20 /var/log/messages
# 从第 20 行开始分页查看系统日志文件 /var/log/messages。
```

## history

用于显示历史执行过的命令。

bash默认记录 1000 条执行过的历史命令，被记录在 `~/.bash_history` 文件中。



```sh
history
# 查看命令历史
# Ctrl+R 可以搜索历史命令

history 10
# 显示最新 10 条记录

history -c
# 清除历史记录。
```


## cp

```sh
cp <src> <dest>
# Copy. 将 src 复制到 dest 位置
# 可以借助通配符（wildcards）拷贝多个文件
#     * represent all single characters or any string
#     ?  represent one character
#     [] represent any character within the brackets

cp -r <src> <dest>
# 递归拷贝非空文件夹。recursively copy the files and directories within a directory

cp -i <src> <dest>
# 覆盖（overwritten）文件时提示。输入 y 则确定覆盖，直接回车则取消



-d
# 复制时保留链接
-f
# 覆盖已经存在的目标文件而不给出提示
-p
# 除复制文件的内容外，还把修改时间和访问权限也复制到新文件中

```

## mv

```sh
mv <old> <new>
# Move. 移动并重命名。moving files and also renaming them

mv <file1> <file2> <directory>
# 移到指定目录

mv -i <old> <new>
# prompt you before overwriting anything

mv -b <old> <new>
# 覆盖时，重命名旧文件（在末尾添加 ~）。


-f
# 如果目标文件已经存在，不会询问而直接覆盖
```

## rename

rename命令用字符串替换的方式批量改变文件名。rename命令有C语言和Perl语言两个版本，这里介绍C语言版本的rename命令，不支持正则表达式。

```sh
$ touch demo1.txt demo2.txt
$ ls | grep -i demo
demo1.txt
demo2.txt
$ rename demo DEMO *
$ ls | grep -i demo
DEMO1.txt
DEMO2.txt
# 将当前目录下所有文件名中的字符串demo改为大写的字符串DEMO。

$ ls | grep -E '\.(text|txt)'
DEMO1.txt
DEMO2.txt
$ rename .txt .text *
$ ls | grep -E '\.(text|txt)'
DEMO1.text
DEMO2.text
# 将当前目录下所有.txt文件后缀都改为text。
```

## mkdir

```sh
mkdir <dir1> <dir2>
# Make Directory. 创建文件夹


$ mkdir test/{a,b,c,d}
# 创建多个文件夹, 主要分隔符是逗号, 且不能有空格

mkdir -p <dir>
# parent flag. 创建时同时创建子文件夹

mkdir -p .github/workflows && touch $_/pages.yml
# 创建 .github/workflows/pages.yml 文件

```

## rm

```sh
rm <file>
# Remove. 删除文件和空文件夹。
# 注意！删除后文件并不会放入所谓的回收站（trash），而是直接消失了

rm -f <file>
# 强制删除所有文件，包括受保护的文件。

rm -i <file>
# give you a prompt on whether you want to actually remove the files or directories.

rm -- -file
# 删除一个名为 -file 的文件
```


## find

该命令用来在指定目录下查找文件。任何位于参数之前的字符串都将被视为欲查找的目录名。如果使用该命令时，不设置任何参数，则find命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。

```sh
find [参数] [文件]
#   -mount	只检查和指定目录在同一个文件系统下的文件，避免列出其它文件系统中的文件。
#   -amin n	在过去n分钟内被读取过文件。
#   -type c	文件类型是c的文件。
#   -cmin n	在过去n分钟内被修改过。
#   -name name	查找文件名称为name的文件。

find / -type f -size 0 -exec ls -l {} \;
# 查找系统中所有文件长度为0的普通文件，并列出它们的完整路径。

find . -maxdepth 2 -type d -name "node_modules"
# 查找 node_modules

find . -maxdepth 2 \( -name "*.js" -o -name "*.html" -o -name "*.json" \) -exec dirname {} \; | uniq
# 查找当前目录中包含 js / html / json 文件的文件夹

find . -maxdepth 2 -type d -exec sh -c 'ls -1 "{}"/*.js >/dev/null 2>&1' \; -print
# 查找包含 js 文件的文件夹

find . -maxdepth 2 \( -name "*.js" -o -name "*.html" -o -name "*.json" \) -exec dirname {} \; | uniq | xargs -I {} mv {} target_folder
#  将找到的目录全部移动到 target_folder 目录中。

```


```sh

find -name <file>
# 在当前目录递归查找名称为 <file> 的文件

find <path> -name <file>
# 在 <path> 目录递归查找名称为 <file> 的文件

find <path> -type d -name <file>
# 指定查找类型为目录


find . -type d -name "node_modules" -prune -o -type f -name "playwright.config*"
# 在该目录下查找 playwright.config 开头文件，并忽略 node_modules 文件夹
```

## help

```sh
help <command>
# 获取命令帮助。
# 对于其他命令，通常还可以借助 --help 参数来获取帮助。比如 tree --help

# 案例：
$ help echo
echo: echo [-neE] [arg ...]
    Write arguments to the standard output.

    Display the ARGs, separated by a single space character and followed by a
    newline, on the standard output.

    Options:
      -n        do not append a newline
      -e        enable interpretation of the following backslash escapes
      -E        explicitly suppress interpretation of backslash escapes
  # ....
$ logout --help
logout: logout [n]
    Exit a login shell.

    Exits a login shell with exit status N.  Returns an error if not executed
    in a login shell.
#-------------
```

## man

```sh
man <command>
# 获取命令手册——更详细的使用说明。
```

## whatis

如果发现该命令不生效，始终输出 "nothing appropriate"，则需要先运行 `mandb`。 [参考来源](https://stackoverflow.com/questions/11774230/unix-cygwin-whatis-returns-all-commands-as-nothing-appropriate)

```sh
whatis <command>
# 获取命令的简短描述，内容来自手册（man）
```

## unalias

```sh
unalias <alias>
# 移除别名
```

## alias-unalias

```sh
alias <alias>=<long-command>
# 为某个长命令配置一个别名。
# 如果想要长期生效，可以将该命令添加到 ~/.bashrc 文件中

alias
# 查看所有命令别名

alias get-all-user='{ echo "Username:Password:UID:GID:User Description:Home Directory:Login Shell"; cat /etc/passwd; } | column -t -s ":"'

alias get-all-group='{ echo "Name:Password:ID:Members"; cat /etc/group; } | column -t -s ":"'
```

## head

用于查看文件开头指定行数的内容。


```sh
head <file>
# 显示前 10 行内容

head <file> -n <line-number>
# 显示开头指定行数的文件内容

head <file> -c <char-number>
# 显示开头指定个数的字符数

head <file1> <file2> -n 4
# 显示多个文件内容，并且只显示前 4 行

head <file1> <file2> -q
# 显示多文件时，不显示文件名字信息

cat -n <file> | head -n <line-number>
# 显示开头指定行数和行好

```

## tail

用于查看文档的后N行或持续刷新内容。

```sh
tail <file>
# 显示文件末尾 10 行

tail <file> -n <line-number>
# 显示文件末尾指定行数

tail <file> -c <char-number>
# 显示文件的尾部特定个字节内容

tail <file1> <file2> -q
# 当有多个文件参数时，不输出各个文件名

tail <file> -v
# 总是输出文件名

tail <file> -f
# 实时追踪文件最新内容！
# ctrl+c 可退出

tail -f -n 2 /var/log/messages
# 查看 /var/log/messages 系统日志文件的最新 2 行，并保持实时刷新。


cat -n <file> | tail -n <line-number>
# 显示文件末尾指定行首和行号
```


## stat

用来显示文件的详细信息(元信息)，比如

-   inode 索引节点（Linux 中文件的唯一标识）
-   Access 权限
-   atime 访问时间
-   mtime 修改时间
-   ctime 状态更改时间

```sh
stat <file>
```


## wc

用于统计指定文本的行数、字数、字节数。


```sh
wc <file> -l
# 只显示行数

wc <file> -w
# 只显示单词数

wc <file> -c
# 只显示字符数

wc <file> -cwl
# 依次输出：行数、单词数、字符数
```




## diff

该命令用于比较文件的差异。diff命令以逐行的方式，比较文本文件的异同处。如果指定要比较目录，则diff会比较目录中相同文件名的文件，但不会比较其中子目录。

```sh
diff [参数] [文件或目录1] [文件或目录2]
#   -<行数>	指定要显示多少行的文本。此参数必须与-c或-u参数一并使用。
#   -c	显示全部内文，并标出不同之处。
#   -u	以合并的方式来显示文件内容的不同。
#   -a	diff预设只会逐行比较文本文件。
#   -b	不检查空格字符的不同。
#   -d	使用不同的演算法，以较小的单位来做比较。
#   -i	不检查大小写的不同。
#   -y	以并列的方式显示文件的异同之处。
#   -W<宽度>	在使用-y参数时，指定栏宽。

diff test1.txt test2.txt -y -W 50
# 比较test1.txt文件和test2.txt文件，以并排格式输出。

```

```sh
diff <file1> <file2>
# 比较文件差异。

# 举例：
$ echo -e '第一行\n第二行\n我是log1第3行\n第四行\n第五行\n第六行' > 1.log
$ cat 1.log
第一行
第二行
我是log1第3行
第四行
第五行
第六行
$ echo -e '第一行\n第二行\n我是log2第3行\n第四行' > 2.log
第一行
第二行
我是log2第3行
第四行
$ diff 1.log 2.log
3c3
< 我是log1第3行
---
> 我是log2第3行
5,6d4
< 第五行
< 第六行
# 对比结果中的 3c3 表示两个文件在第3行有不同，
# 5,6d4 表示 2.log 文件相比 1.log 文件在第 4 行处开始少了 1.log 文件的第 5 和第 6 行。

# ------------ 举例完毕
```

## cmp

该命令用于比较两个文件是否有差异。当相互比较的两个文件完全一样时，该指令不会显示任何信息。否则会标示出第一个不同之处的字符和列数编号。当不指定任何文件名称，或文件名为"-"，则cmp指令会从标准输入设备读取数据。

```sh
cmp [-clsv][-i <字符数目>][--help][第一个文件][第二个文件]
#   -c	除了标明差异处的十进制字码之外，一并显示该字符所对应字符。
#   -i <字符数目>	指定一个数目。
#   -l	标示出所有不一样的地方。
#   -s	不显示错误信息。
#   -v	显示版本信息。
#   --help	在线帮助。
```

## grep

grep (Global Regular Expression Print) 根据正则查找字符串并打印

在Shell脚本中，grep通过返回一个状态值来表示搜索的状态：

-   `0` 匹配成功。
-   `1` 匹配失败。
-   `2` 搜索的文件不存在。

```sh
grep [<option>] <reg> <file>
cat <file> | grep [<option>] <reg>
# 输出匹配内容所在行。比如
$ echo -e "\".\"\n'.'\n\"..\"" > test.txt
$ cat test.txt
"."
'.'
".."
$ grep "." test.txt
"."
'.'
".."
$ grep '.' test.txt
"."
'.'
".."
$ grep '"' test.txt
"."
".."
$ grep "'" test.txt
'.'



grep --line-number <reg> <file>
grep -n <reg> <file>
# 显示行号。比如
$ grep -n IdentityFile /etc/ssh/ssh_config
34:#   IdentityFile ~/.ssh/id_rsa
35:#   IdentityFile ~/.ssh/id_dsa
36:#   IdentityFile ~/.ssh/id_ecdsa
37:#   IdentityFile ~/.ssh/id_ed25519


grep --count <reg> <file>
grep -c <reg> <file>
# 输出匹配行的数量。比如
$ grep -c IdentityFile /etc/ssh/ssh_config
4


grep -e <reg> <file>
# 指定字符串做为查找文件内容的样式。比如
$ echo -e '-e\n-E\neee---e\n' > test.txt
$ cat test.txt
-e
-E
eee---e
$ grep -e -e test.txt
-e
eee---e


grep --extended-regexp <reg> <file>
grep -E <reg> <file>
# 将样式为延伸的正则表达式来使用。比如
$ echo -e "apple\nbanana\ncarrot" > test.txt
$ cat test.txt
apple
banana
carrot
$ grep -E 'app|rot' test.txt
apple
carrot


grep --fixed-regexp <str> <file>
grep -F <str> <file>
# 将样式视为固定字符串的列表。


grep --ignore-case <reg> <file>
grep --ignore <reg> <file>
grep -i <reg> <file>
# 匹配时忽略大小写


grep --invert-match <reg> <file>
grep -v <reg> <file>
# 反向匹配 / 输出不匹配的行


grep -r <reg> <folder>
grep -d recurse <reg> <folder>
# 指定要查找的是目录而非文件。比如
$ grep -r *.sh /etc
/etc/bashrc:    for i in /etc/profile.d/*.sh; do
/etc/profile:for i in /etc/profile.d/*.sh /etc/profile.d/sh.local ; do
/etc/NetworkManager/dispatcher.d/11-dhclient:    for f in $ETCDIR/dhclient.d/*.sh; do


grep -w <str>
grep --word-regexp <str>
# 要求匹配整个 word
$ cat test.txt
hello, world
hi, world
hiiii, world
$ cat test.txt | grep hi
hi, world
hiiii, world
$ cat test.txt | grep -w hi
hi, world


grep -x <line-str>
grep --line-regexp <line-str>
# 要求全行匹配


grep -A <after-line-number>
grep --after-context=<after-line-number>
# 除了显示符合范本样式的那一列之外，并显示该行之后的 <after-line-number> 行 。

grep -B <before-line-number>
grep --before-context=<before-line-number>
# 除了显示符合样式的那一行之外，并显示该行之前的 <before-line-number> 行。

grep -C <line-number>
grep --context=<line-number>
grep -<line-number>
# 除了显示符合样式的那一行之外，并显示该行前和该行后的 <line-number> 行。



-a 或 --text : 不要忽略二进制的数据。
-b 或 --byte-offset : 在显示符合样式的那一行之前，标示出该行第一个字符的编号。

-d <动作> 或 --directories=<动作> : 当指定要查找的是目录而非文件时，必须使用这项参数，否则grep指令将回报信息并停止动作。
-h 或 --no-filename : 在显示符合样式的那一行之前，不标示该行所属的文件名称。
-H 或 --with-filename : 在显示符合样式的那一行之前，表示该行所属的文件名称。
-l 或 --file-with-matches : 列出文件内容符合指定的样式的文件名称。
-L 或 --files-without-match : 列出文件内容不符合指定的样式的文件名称。
-o 或 --only-matching : 只显示匹配PATTERN 部分。
-q 或 --quiet或--silent : 不显示任何信息。
-r 或 --recursive : 此参数的效果和指定"-d recurse"参数相同。
-s 或 --no-messages : 不显示错误信息。
-y : 此参数的效果和指定"-i"参数相同。






grep 'physical id' /proc/cpuinfo | sort -u | wc -l
# 查看颗数

grep 'core id' /proc/cpuinfo | sort -u | wc -l
# 查看核心数量

grep 'processor' /proc/cpuinfo | sort -u | wc -l
# 查看线程数

```


日常使用时，补充案例

```sh
$ ls | grep  \.log
3.log
4.log
wget-log
$ ls | grep  "\.log"
3.log
4.log
# 使用正则时，记得添加引号！
```


## sed

<!-- TODO -->

sed 是一种流编辑器，支持正则表达式。基本流程：

1. 处理时，把当前处理的行存储在临时缓冲区中，称为模式空间（pattern space）。
2. 接着用 sed 命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。
3. 接着处理下一行，这样不断重复，直到文件末尾。

注意：

- sed 命令不会修改原文件，例如删除命令只表示某些行不打印输出，而不是从原文件中删去。
- 如果要改变源文件，需要使用 `-i` 选项。

```sh
sed [参数] [动作] [文件]
```

参数说明：

- `-e <script>` 执行多个 script
- `-f <script>` 执行指定 script 文件
- `-n`	仅显示 script 处理后的结果
- `-i`	输出到原文件，静默执行（修改原文件）

动作说明：

- `a` 在行后面增加内容
- `c` 替换行
- `d` 删除行
- `i` 在行前面插入
- `p` 打印相关的行
- `s` 替换内容

```sh
sed '3,$d' <file>
# 删除第三行和后面所有内容。
$ cat test
    1
    2
    3
    4
    5
    6
$ sed '3,$d' test
    1
    2
# 这里仅仅是在输出中删除，想要将变更应用到源文件中，需要使用 -i 参数：
$ sed -i '3,$d' test





sed '$a <new-line-content>' <file>
# 在最后新增一行，内容为 <new-line-content>
$ cat test
    1
$ sed '$a hello' test
    1
    hello





sed 's/<old>/<new>/' <file>
sed 's|<old>|<new>|' <file>
# 将所有 <old> 替换为 <new>
# 案例一
$ cat test
    1
    foo, foo=key, bar
    5
    foo, foo=key, bar
    6
$ sed 's/foo=key/foo=bar/' test
    1
    foo, foo=bar, bar
    5
    foo, foo=bar, bar
    6
# 案例二
$ cat test
    hello
    export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/local/node/bin
    ---
    export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/local/node/bin
    world
$ sed 's/:\/usr\/local\/node\/bin//' test
# 当要替换的内容有斜杠 / 那么我们可以使用 | 作为分隔符。所以也可以使用下面命令
$ sed 's|:/usr/local/node/bin||' test
    hello
    export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
    ---
    export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
    world





sed '<line-number>c <new-line-content>' <file>
# 将第 <line-number> 行内容替换为 <new-line-content>
$ cat test
    1
    2
    3
    4
$ sed '3c good' test
    1
    2
    good
    4


sed '/<str>/d' <file>
# 删除含有 <str> 内容的行
$ cat test
    good
    hello, world
    hello, world
    job
$ sed '/o/d' test
    good
    job
```

## awk

<!-- TODO -->

和 sed 命令类似，awk 命令也是逐行扫描文件（从第 1 行到最后一行），寻找含有目标文本的行，如果匹配成功，则会在该行上执行用户想要的操作；反之，则不对行做任何处理。

```sh
awk [参数] [脚本] [文件]
```

参数说明

- `-F fs` 指定以 fs 作为输入行的分隔符，awk 命令默认分隔符为空格或制表符
- `-f file` 读取 awk 脚本
- `-v val=val`  在执行处理过程之前，设置一个变量 var，并给其设置初始值为 val

内置变量

- `FS` 字段分隔符
- `$n` 指定分隔的第n个字段，如$1、$3分别表示第1、第三列
- `$0` 当前读入的整行文本内容
- `NF` 记录当前处理行的字段个数（列数）
- `NR` 记录当前已读入的行数
- `FNR` 当前行在源文件中的行号

awk中还可以指定脚本命令的运行时机。默认情况下，awk会从输入中读取一行文本，然后针对该行的数据执行程序脚本，但有时可能需要在处理数据前运行一些脚本命令，这就需要使用BEGIN关键字，BEGIN会在awsk读取数据前强制执行该关键字后指定的脚本命令。

和BEGIN关键字相对应，END关键字允许我们指定一些脚本命令，awk会在读完数据后执行它们。

```sh
$ cat test
  good
      ipv4: 127.0.0.1
      ipv6: :1
  job
$ awk '/ipv/{print $1}' test
ipv4:
ipv6:
$ cat test | awk '/ipv/{print $2}'
127.0.0.1
:1


$ cat test
  good
      ipv4:127.0.0.1
      ipv6::1
  job
$ awk '/ipv/{print $1}' test
ipv4:127.0.0.1
ipv6::1



$ df -h |awk '/\/$/{print $4}'
65G
# 查看本机剩余磁盘容量。不支持用 | 分隔符

$ awk -F: '$3<1000{x++} END{print x}' /etc/passwd
31
# 统计系统用户个数。


$ awk -F: '$7!~/nologin$/{print $1,$7}' /etc/passwd
root /bin/bash
sync /bin/sync
shutdown /sbin/shutdown
halt /sbin/halt
mysql /bin/false
# 输出其中登录Shell不以nologin结尾（对第7个字段做!~反向匹配）的用户名、登录Shell信息。


$ head -3 /etc/passwd | awk  'BEGIN{FS=":";print "name\tuid"}{print $1,"\t"$3}END{print "sum lines "NR}'
name    uid
root    0
bin     1
daemon  2
sum lines 3
# 输出/etc/passwd文件中前三行记录的用户名和用户uid。



$ netstat -na | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
LISTEN 17
SYN_RECV 1
ESTABLISHED 27
TIME_WAIT 1
# 查看tcp连接数。



$ ps -ef | grep httpd | awk {'print $2'} | xargs kill -9
# 关闭指定服务的所有的进程。
```

## cut

cut 命令主要用来切割字符串，可以对输入的数据进行切割然后输出。

```sh

$ echo 'hello你好world,good' | cut -b 1,5,13
hoo
$ echo 'hello你好world,good' | cut -b 1-8
hello你
# -b 按字节进行切割。


$ echo 'hello你好world,good' | cut -c 1,5,13
ho,
$ echo 'hello你好world,good' | cut -c 1-8
hello你好w
# -c 按字符进行切割

$ echo 'good,job. hah,hh' | cut -d , -f 1,3
good,hh
$ echo 'good,job. hah,hh' | cut -d . -f 1
good,job
# -d 指定字符进行切割
```

## tr

tr命令用于对来自标准输入的字符进行替换、压缩和删除。

```sh
echo "HELLO, WorlD" | tr 'A-Z' 'a-z'
hello, world
# 将输入字符由大写转换为小写。


echo "hello 123 world 456" | tr -d '0-9'
hello  world
# -d 删除字符


echo "thissss is      a text linnnnnnne." | tr -s ' sn'
this is a text line.
# 压缩字符。-s 将重复的字符压缩成一个字符


cat /dev/urandom | tr -dc a-zA-Z0-9 | head -c 13
# 生成随机密码。 -c 反选指定字符
# 注意，不要直接运行 cat /dev/urandom
```
