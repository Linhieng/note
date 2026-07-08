### stress-ng

压测工具

```sh
stress-ng --vm 1 --vm-bytes 400M --timeout 300
# --vm 1 创建 1 个独立内存压测线程/进程？
# --vm-bytes 1400M 控制每个 vm 进程？占用内存大小
# --timeout 300 运行 300s 后自动结束，默认需要 ctrl+c 才结束

```