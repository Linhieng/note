### 查找命令路径

```sh
gcm conda
# Get-Command 的别名，用在 pwsh 中，不一定有路径，因为可能是注册的函数
where conda
# 用在 cmd 中

which <command>
# linux 命令，只查第一个找到的路径
whereis <command>
# linux 命令，比 which 查到更多
type <command> # 扩展
command -v <command> # 扩展
```
