# 学习 rust

## 开始：使用 vscode + docker 学习 rust

安装 vscode 插件：

- remote.remote-containers
- remote.vscode-remote-extensionpack

```sh
git clone https://github.com/microsoft/vscode-remote-try-rust.git
```

1. vscode 中关闭 http.proxy 代理配置。
2. Windows 中启动系统全局代理。
3. 打开 docker。
4. vscode 中运行 `Dev Containers: Open Folder in Containers...`，打开刚刚克隆的仓库。
5. 然后 show log，可以看到 vscode 在下载一系列依赖
6. 此时 docker 中会多了一个名为 vscode 的 volume
7. 下载完成后，docker 中会多出一个名为 mcr.microsoft.com/devcontainers/rust 的 images （大小为 2.2GB）
8. 同时也会多出一个名为 gallant_ganguly 的 containers，它的 images 就是 mcr.microsoft.com/devcontainers/rust
9. 此时 vscode 应该处于容器里面了，目录就是刚刚克隆的仓库。

> 需要注意的是，vscode 的本机 workspace 不支持容器中的目录！

在目录中执行以下命令

```sh
# 当前目录是 /workspaces/vscode-remote-try-rust

# 初次进入容器时，不是 root 用户，并且此时默认没有 root 密码
# 所以需要设置初始密码
sudo passwd root

# 默认的用户是 vscode
whoami

cd ..
# 进入 /workspaces

sudo git clone https://github.com/Linhieng/learn-rust.git
# 刚刚克隆的 vscode-remote-try-rust 项目没有用，它只是用来帮助下载 rust 镜像的
# 实际学习中，使用自己的仓库。

sudo chown -R vscode:vscode learn-rust/
# 将所有者改为 vscode

cd learn-rust
code .
# 打开新窗口，注意此时还是使用的系统全局代理，而不是 vscode 中的 http.proxy

cargo run
# 成功运行
```

好了，到这里就可以成功运行 rust 了。后面的内容就是 linux 的知识了，不在这里记录！
