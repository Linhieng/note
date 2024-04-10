已发布到 [gist](https://gist.github.com/Linhieng/e94283ab1fd0fba96b96bf02b61e42c6)

## 🍕 安装依赖

```bash
pip install protobuf==3.20.0
pip install requests
```

## 🍕 相关文件说明

- [`bili_pb2.py`](https://gist.github.com/Linhieng/e94283ab1fd0fba96b96bf02b61e42c6#file-bili_pb2-py): 将 [B站弹幕的 proto](https://raw.githubusercontent.com/SocialSisterYi/bilibili-API-collect/bb437d2012e6291b38c78d42755db9d836d4975f/grpc_api/bilibili/community/service/dm/v1/dm.proto) 拷贝到 [这个在线 proto 编程中](https://protogen.marcgravell.com/#), 然后输出为 python 文件
- [`getDanMu.py`](https://gist.github.com/Linhieng/e94283ab1fd0fba96b96bf02b61e42c6#file-getdanmu-py): 用于将弹幕输出为 `danMu.txt` 文件(需要修改文件内的 `params`)
- [`cc32.py`](https://gist.github.com/Linhieng/e94283ab1fd0fba96b96bf02b61e42c6#file-crc32-py): 来自 [这篇博客](https://zhuanlan.zhihu.com/p/499708255#:~:text=%E4%B8%8B%E8%BD%BD%E5%B9%B6%E8%A7%A3%E6%9E%90%E5%BC%B9%E5%B9%95%E7%9A%84%E4%BB%A3%E7%90%86%E4%BB%A3%E7%A0%81%E5%A6%82%E4%B8%8B), [原版](https://github.com/esterTion/BiliBili_crc2mid/blob/master/crc32.htm) 是 js 实现的。
- [`midhash2userid-py`](https://gist.github.com/Linhieng/e94283ab1fd0fba96b96bf02b61e42c6#file-midhash2userid-py): 顾名思义

## 🍕 参考链接

- https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/danmaku/danmaku_proto.md
- https://github.com/esterTion/BiliBili_crc2mid/blob/master/crc32.htm
- https://blog.csdn.net/qq_39870538/article/details/124352010
- https://zhuanlan.zhihu.com/p/392931611
- https://zhuanlan.zhihu.com/p/499708255
