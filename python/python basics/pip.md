[pip 文档 v22.3](https://pip.pypa.io/en/stable/cli/)

## 🍕 零碎

```powershell
python -m site #　查看 sys.path
pip --version
pip --help
pip list # 列出已安装的包
pip install <package> # 如果已安装, 可以显示出包所在位置
pip uninstall <package> # 不要通过删除文件夹的方式进行卸载, 因为那样卸载不干净
pip show <package> # 查看安装的包的相关信息

pip install [-i | --index-url] <url> <package>
# 使用指定下载源下载包
# 默认的镜像是: https://pypi.org/simple
# 豆瓣: https://pypi.doubanio.com/simple/
# 清华: https://pypi.tuna.tsinghua.edu.cn/simple

pip install <package>==1.7 # 可通过 ==, >=, <=, >, < 来指定安装版本

```

## 🍕 pip

```powershell
py -m pip <command> [options]
# 后面的语句一律省略 py -m
```

### options

- `--proxy <proxy>`

  比如 `pip install <package> --proxy "127.0.0.1:7890"`

### Description

pip offers `-v`, `--verbose` and `-q` `--quiet` to control the **console log** level.

## 🍕 pip cache

```powershell
pip cache dir # Show the cache directory

pip cache info

pip cache list [<pattern>] [--format=[human, abspath]]
# List filenames of packages stored in the cache.

pip cache remove <pattern>
# Remove one or more package from the cache
# <pattern> can be a glob expression or a package name.

pip cache purge

```

## 🍕 pip config

```powershell
pip config [<file-option>] list
# List the active configuration (or from the file specified)

pip config [<file-option>] [--editor <editor-path>] edit
pip config [<file-option>] get command.option
pip config [<file-option>] set command.option value
pip config [<file-option>] unset command.option
pip config [<file-option>] debug
```

### 示例

```powershell
pip config set global.proxy "127.0.0.1:7890" # 配置代理, user.proxy 不生效,有问题
```


### Options

- `--editor <editor>`
- `--global`
- `--user`
- `--site`
