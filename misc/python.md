[window 命令行安装 miniconda](https://www.anaconda.com/docs/getting-started/miniconda/install/windows-cli-install)，记得在命令行设置代理

### pip 镜像源

推荐安装 miniconda，从[清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)安装。

```sh
# 设置默认清华源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip config set global.trusted-host pypi.tuna.tsinghua.edu.cn

pip config list
# 查看配置
```

### conda 镜像源

conda 的包是按「频道」分类管理的，不同的包存在不同的频道下，必须全部配置才能保证下载完整。

```sh
conda config --set show_channel_urls yes
# 安装时显示频道源地址，方便排查

# 配置清华源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
# 主频道，存放 Python、conda 工具等核心包
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
# 社区维护的第三方包频道，绝大多数 Python 库都在这里，是最常用的扩展频道
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/
# 存放平台的编译工具链，比如 gcc、make，部分包编译需要依赖它
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
# 存放 R 语言相关的包（如果不做数据分析也可以不配置）


conda config --show channels
# 查看源
conda config --remove-key channels
# 删除所有源，恢复默认
```

### pipdeptree 

该依赖包按层级查看安装的依赖包

```sh
pipdeptree | grep -E '^\w+'
pipdeptree | findstr /B /R /C:"^[^ ]"
# linux  / window 查看顶级安装包
```

### conda 管理虚拟环境

miniconda 和 anaconda 区别只在于后者预装了许多数据处理的依赖包，而且提供了GUI图形化界面，适合新手。

```sh
conda env list
conda info --envs
# 两种方式查看所有环境

conda create -n py39 python=3.9 numpy requests
# 创建虚拟环境，-n 指定名称，后面带预装包
# 必须指定Python版本，不然会使用默认环境中的Python版本，这样包环境就错乱了
conda list python
# 查看当前环境下的 Python 版本
where pip
# 查看 pip 所在位置

conda activate py39
# 激活虚拟环境

conda deactivate
# 退出当前环境


# conda 没有改虚拟环境的功能，可以使用克隆实现类似效果
conda create -n newname --clone oldname
# 1. 克隆oldname环境为newname
conda remove -n oldname --all
# 2. 删除旧环境
```

- conda 的 Anaconda Prompt 本质上只是一串快捷运行方式，内容是 `%WINDIR%\System32\cmd.exe "/K" C:\Users\k\miniconda3\Scripts\activate.bat C:\Users\k\miniconda3`。
- 照猫画虎，可以自己修改为使用 pwsh 启动，内容是 `"C:\Program Files\PowerShell\7\pwsh.exe" -ExecutionPolicy ByPass -NoExit -Command "& 'C:\Users\k\miniconda3\shell\condabin\conda-hook.ps1'`
- conda 并不推荐直接把路径写死在环境变量中，而是采用脚本的方式写入环境变量

简单解释一下 conda 的脚本逻辑，以 pwsh 为例：
- 初始化时，conda 会在 pwsh 配置文件中写入一串脚本，该脚本让 conda 生成适用于 pwsh 的初始化脚本文本，
- 可以执行 `& "C:\Users\k\miniconda3\Scripts\conda.exe" "shell.powershell" "hook"` 看看生成的脚本文本是怎样的
- 简单来说就是定义了 conda 的环境变量，并注册了一个 conda 函数（命令）
- 最后执行脚本文本，伪代码就是 `conda.exe shell.powershell hook | Invoke-Expression`。

```sh
conda config --set auto_activate true
# 初始化时，允许自动激活环境，但在 cmd 中无法生效，在pwsh中可测试生效
# 原因是 conda 在 cmd 配置，只是在注册表中添加了 hook
conda config --set default_activation_env k
# 设置默认激活的虚拟环境
conda init
# 执行配置

conda init --reverse
# 恢复默认配置文件
# 其中 HKEY_CURRENT_USER\Software\Microsoft\Command Processor\AutoRun 用于设置启动 cmd 时自动执行的命令
# 修改注册表时，记得重启 explorer.exe，不然很多东西读的还是缓存（比如 win+r 运行），不过在 WT 中新建时读取的是最新信息

```

注意：在新建虚拟环境中，依旧可以调用到 base 中的命令，原因是 path 环境变量导致的。
新建虚拟环境时：
- 会把 `k\Scripts`、`k\Lib\site-packages` 加到 PATH 的最前面（优先调用虚拟环境里的工具）
- 但不会删除原来的 PATH 路径，包括 `miniconda3\Scripts`、`miniconda3\Lib\site-packages` 这些 base 环境的路径
具体可以通过 where 来查看调用的具体路径，比如 `where python`、`where pip`。
