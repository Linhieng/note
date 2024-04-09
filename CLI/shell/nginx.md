# nginx

```sh
whereis nginx
# 查找 nginx 命令路径

sudo nginx
# 启动

sudo nginx -s stop
# 立即停止

sudo nginx -s quit
# 处理完当前连接后再停止

sudo nginx -s reload
# 重新加载配置文件。

sudo nginx -t
# 测试当前配置文件是否有效。会输出配置文件路径
```

## nginx 问题

修改路径后发现 403 错误
    403 错误有一个原因就是权限不够
    如果网页文件是放在 root 路径下，那么就会报 403

安装了 nginx 后还是无法打开网页
    1. 安装后是否有输入 nginx 运行一下呢？
    2. 云端服务器的安全组中是否有开启 80 端口？

修改配置文件或 root 路径后发现网页不无效
    1. 没有注释掉 include /etc/nginx/conf.d/*.conf
        （始终调用默认配置，怎么可能修改有效呢？）
    2. 修改后没有重启一下 nginx，重加载命令是 nginx -s reload


## nginx.conf 配置说明

`$uri` 变量是什么？
    访问：http:itaem.cn;39000/js/a.js
    $uri 就是 /js/a.js

## nginx.conf 配置示例

最简单的配置

```conf
http {
    server {
    listen   80; # 设置监听端口
    root     /usr/80; # 会自动获取此目录下的 index.html 文件
    }
}
```

添加证书：

```conf
server {
    listen 443;
    root /usr/443;

    # 开启 ssl
    ssl on;
    # 指定 ssl 证书路径
    ssl_certificate /path/to/example.com.crt;
    # 指定私钥文件路径
    ssl_certificate_key /path/to/example.com.key;
}
```

添加请求头

```conf
server {
    listen          39000;
    location / {
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    X-Real-IP $remote_addr;
    }
}
```

代理后台服务器

    浏览器想服务器的 39000 端口发送 get 请求后，nginx 会将该请求转发给服务器上的 3900 端口。

```conf
server {
    listen          39000;
    location / {
            proxy_pass      http://127.0.0.1:3900;
    }
}
```

将 80 端口永久重定向到 443 端口

```conf
    server {
        listen 80;
        # root /usr/80;
        server_name oonoo.cn;

        location / {
            return 301 https://$host$request_uri;
        }
    }
```

或
```conf
    server {
        listen 80 default_server;
        # server_name oonoo.cn;
        listen [::]:80 default_server;

        location / {
            return 301 https://$host$request_uri;
        }
    }
```

直接通过 IP 访问时，直接转到域名。（如果故意通过 ip 访问 443 端口，则无效）

```js

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _; # 匹配任何域名，包括空字符串

        location / {
            return 301 https://www.oonoo.cn$request_uri;
        }
    }
    server {
        listen 80;
        listen [::]:80;
        server_name oonoo.cn www.oonoo.cn;
        location / {
            return 301 https://$host$request_uri;
        }
    }
    server {
        listen 443;
        root /usr/443;

        ssl on;
        ssl_certificate /.keys/cert.pem;
        ssl_certificate_key /.keys/key.key;
    }
```

## 卸载 nginx

// 使用的 yum 安装的 nginx

1. 输入 `ps -ef | grep nginx` 检查是否还在运行 nginx

2. 输入 `nginx -s stop` 停止运行 nginx

3. 输入 `netstat -lntp` 查看一下 80 端口是否关闭

4. 输入 `whereis nginx` 查找 nginx 的相关文件路径

5. 输入 `find / -name nginx` 查找 nginx 的相关文件

6. 删除找到的相关文件
    `rm -rf /usr/sbin/nginx`
    ...
    一个一个删（有没有快捷方法？）

7. 再使用 yum 清理一下
    `yum remove nginx`
