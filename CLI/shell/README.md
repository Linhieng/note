# shell
<!--
文本处理
	文本编辑
		vim
	文本查看
		cat
		more
		less
		head
		tail
		stat
		wc
		file
		diff
	文件处理
		grep
		sed
		awk
		cut
		tr
文件管理
	cat
	cmp
	diff
	file
	find

系统管理
	常用系统工作命令
		echo
		date
		wget
		ps
		top
		pidof
		kill
		killall
	系统状态检测
		ifconfig
		uname
		uptime
		free
		who
		last
		history
磁盘管理
	df
	du
	fdisk
文件与权限
	 文件目录管理
		ls
		pwd
		cd
		touch
		mkdir
		rm
		cp
		mv
		rename
	文件权限
		chmod
		chown
		chgrp

 -->

- 迁移说明
  - prompt 相关内容迁移至[博客文章](https://github.com/Linhieng/linhieng.github.io/blob/main/_posts/2024-02-22-style-ternimal.md)，以后处理终端命令行提示符的内容都写在博客中
  - vim 的使用也迁移至博客文章中

对于来说，学习 linux，其实就是在学习命令，所以笔记的核心在于积累命令。

当看到 [Linux命令大全搜索工具](https://github.com/jaywcjlove/linux-command) 这个网站后，真的已经失去了继续在这里编辑 shell 笔记的想法，我也想要创建一个自己的命令工具网站！

- [bash 键盘快捷键](#hotkey)
- [基础 shell 命令](reference/basic-shell.md)
  - 简单命令
    - [echo](reference/basic-shell.md#echo)
    - [date](reference/basic-shell.md#date)
    - [whoami](reference/basic-shell.md#whoami)
    - [pwd](reference/basic-shell.md#pwd)
    - [lotout](reference/basic-shell.md#lotout)
    - [exit](reference/basic-shell.md#exit)
    - [clear](reference/basic-shell.md#clear)
    - [tree](reference/basic-shell.md#tree)
  - 帮助
    - [help](reference/basic-shell.md#help)
    - [man](reference/basic-shell.md#man)
    - [whatis](reference/basic-shell.md#whatis)
  - 文件和目录
    - [cd](reference/basic-shell.md#cd)
    - [ls](reference/basic-shell.md#ls)
    - [file](reference/basic-shell.md#file)
    - [find](reference/basic-shell.md#find)
    - [stat](reference/basic-shell.md#stat)
  - 文件权限
    - [chmod](reference/basic-shell.md#chmod)
    - [chown](reference/basic-shell.md#chown)
    - [chgrp](reference/basic-shell.md#chgrp)
  - 文件和目录的创建、删除、修改
    - [cp](reference/basic-shell.md#cp)
    - [mv](reference/basic-shell.md#mv)
    - [rename](reference/basic-shell.md#rename)
    - [touch](reference/basic-shell.md#touch)
    - [mkdir](reference/basic-shell.md#mkdir)
    - [rm](reference/basic-shell.md#rm)
  - 查看内容
    - [cat](reference/basic-shell.md#cat)
    - [less](reference/basic-shell.md#less)
    - [more](reference/basic-shell.md#more)
    - [head](reference/basic-shell.md#head)
    - [tail](reference/basic-shell.md#tail)
  - 字符串处理函数
    - [wc](reference/basic-shell.md#wc)
    - [grep](reference/basic-shell.md#grep)
    - [sed](reference/basic-shell.md#sed)
    - [awk](reference/basic-shell.md#awk)
    - [cut](reference/basic-shell.md#cut)
    - [tr](reference/basic-shell.md#tr)
  - 其他
    - [history](reference/basic-shell.md#history)
    - [alias](reference/basic-shell.md#alias-unalias)
    - [unalias](reference/basic-shell.md#alias-unalias)
    - [diff](reference/basic-shell.md#diff)
    - [cmp](reference/basic-shell.md#cmp)
- 文本处理（编辑、查看）
  - [vim](reference/vim.md)
- 未好好整理
  - [systemctl](reference/other-shell.md#systemctl)
  - [firewall-cmd](reference/other-shell.md#firewall-cmd)
  - [hostname](reference/other-shell.md#hostname)
  - [tar](reference/other-shell.md#tar)
  - [wget](reference/other-shell.md#wget)
  - [ps](reference/other-shell.md#ps)
  - [top](reference/other-shell.md#top)
  - [pidof](reference/other-shell.md#pidof)
  - [kill](reference/other-shell.md#kill)
  - [killall](reference/other-shell.md#killall)
  - [ipconfig](reference/other-shell.md#ipconfig)
  - [uanme](reference/other-shell.md#uanme)
  - [uptime](reference/other-shell.md#uptime)
  - [free](reference/other-shell.md#free)
  - [who](reference/other-shell.md#who)
  - [last](reference/other-shell.md#last)
  - [df](reference/other-shell.md#df)
  - [du](reference/other-shell.md#du)
  - [fdisk](reference/other-shell.md#fdisk)
  - [tee](reference/other-shell.md#tee)

## hotkey

Bash keyboard shortcuts

| hotkey   |     |
| -------- | --- |
| `Ctrl+u` |     | 清除光标左侧的所有内容
| `Ctrl+k` |     | 清除光标右侧的所有内容
| `Ctrl+w` |     | 删除光标前的一个单词
| `Ctrl+c` |     | 取消当前的输入行；结束当前任务
| `Ctrl+d` |     | 如果当前行为空，则退出终端（退出登录）
| `Ctrl+z` |     | 挂起任务，后续可通过 `jobs` 查看
| `Ctrl+l` |     | 清屏（但不清空内容）

| hotkey           |     |
| ---------------- | --- |
| `Ctrl+Backspace` |     | 某些无法通过删除键删除的内容，再按下 ctrl。
| `Ctrl+insert`    |     | 复制
| `Shift+insert`   |     | 粘贴


Bash Navigation

| Shortcut           | Action                                                                            |
| ------------------ | --------------------------------------------------------------------------------- |
| Ctrl + A           | Move to the start of the command line                                             |
| Ctrl + E           | Move to the end of the command line                                               |
| Ctrl + F           | Move one character forward                                                        |
| Ctrl + B           | Move one character backward                                                       |
| Ctrl + XX          | Switch cursor position between start of the command line and the current position |
| Ctrl + ] + x       | Moves the cursor forward to next occurrence of x                                  |
| Alt + F / Esc + F  | Moves the cursor one word forward                                                 |
| Alt + B / Esc + B  | Moves the cursor one word backward                                                |
| Alt + Ctrl + ] + x | Moves cursor to the previous occurrence of x                                      |

Bash Control/Process

| Shortcut | Action                                                            |
| -------- | ----------------------------------------------------------------- |
| Ctrl + L | Similar to clear command, clears the terminal screen              |
| Ctrl + S | Stops command output to the screen                                |
| Ctrl + Z | Suspends current command execution and moves it to the background |
| Ctrl + Q | Resumes suspended command                                         |
| Ctrl + C | Sends [SIGI](SIGI) signal and kills currently executing command   |
| Ctrl + D | Closes the current terminal                                       |

Bash History

| Shortcut              | Action                                                               |
| --------------------- | -------------------------------------------------------------------- |
| Ctrl + R              | Incremental reverse search of bash history                           |
| Alt + P               | Non-incremental reverse search of bash history                       |
| Ctrl + J              | Ends history search at current command                               |
| Ctrl + _              | Undo previous command                                                |
| Ctrl + P / Up arrow   | Moves to previous command                                            |
| Ctrl + N / Down arrow | Moves to next command                                                |
| Ctrl + S              | Gets the next most recent command                                    |
| Ctrl + O              | Runs and re-enters the command found via Ctrl + S and Ctrl + R       |
| Ctrl + G              | Exits history search mode                                            |
| !!                    | Runs last command                                                    |
| !*                    | Runs previous command except its first word                          |
| !*:p                  | Displays what !* substitutes                                         |
| !x                    | Runs recent command in the bash history that begins with x           |
| !x:p                  | Displays the x command and adds it as the recent command in history  |
| !$                    | Same as OPTION+., brings forth last argument of the previous command |
| !^                    | Substitutes first argument of last command in the current command    |
| !$:p                  | Displays the word that !$ substitutes                                |
| ^123^abc              | Replaces 123 with abc                                                |
| !n:m                  | Repeats argument within a range (i.e, m 2-3)                         |
| !fi                   | Repeats latest command in history that begins with fi                |
| !n                    | Run nth command from the bash history                                |
| !n:p                  | Prints the command !n executes                                       |
| !n:$                  | Repeat arguments from the last command (i.e, from argument n to $)   |

Bash Editing

| Shortcut        | Action                                                   |
| --------------- | -------------------------------------------------------- |
| Ctrl + U        | Deletes before the cursor until the start of the command |
| Ctrl + K        | Deletes after the cursor until the end of the command    |
| Ctrl + W        | Removes the command/argument before the cursor           |
| Ctrl + D        | Removes the character under the cursor                   |
| Ctrl + H        | Removes character before the cursor                      |
| Alt + D         | Removes from the character until the end of the word     |
| Alt + Backspace | Removes from the character until the start of the word   |
| Alt + . / Esc+. | Uses last argument of previous command                   |
| Alt + <         | Moves to the first line of the bash history              |
| Alt + >         | Moves to the last line of the bash history               |
| Esc + T         | Switch between last two words before cursor              |
| Alt + T         | Switches current word with the previous                  |

Bash Information

| Shortcut | Action                                                 |
| -------- | ------------------------------------------------------ |
| TAB      | Autocompletes the command or file/directory name       |
| ~TAB TAB | List all Linux users                                   |
| Ctrl + I | Completes the command like TAB                         |
| Alt + ?  | Display files/folders in the current path for help     |
| Alt + *  | Display files/folders in the current path as parameter |



## 优质参考资料

- [Linux Journey](https://linuxjourney.com/)
- [Linux命令大全搜索工具](https://github.com/jaywcjlove/linux-command)

[SIGI]: https://www.computerhope.com/unix/signals.htm#:~:text=The%20INT%20signal%20is%20sent%20to%20a%20process%20by%20its%20controlling%20terminal%20when%20a%20user%20wants%20to%20interrupt%20the%20process.
