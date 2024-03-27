# 我的一些笔记

## 为什么要三报文握手

*因为客户端发送的第一个报文，可能是无效的！* 在这种情况下，如果服务端没有收到客户端的确认，那么它就知道这是无效报文，从而不会傻傻地继续在那里等待！

## 简单描述三报文握手

前提条件：server 处于监听状态（LISTEN）。

1. 首先，client 发起一个 SYN 请求同步，此时 client 进入 SYN-SEND 状态
2. 接着，server 收到 SYN，于是响应 SYN + ACK，此时 server 进入 SYN-RCVD 状态
3. 最后，client 返回确认报文 ACK，此时 client 进入 ESTABLISHED 状态
4. server 收到确认后，也会进入 ESTABLISHED 状态

> [!TIP]
> TCP 规定，SYN 报文段不能携带数据，但要消耗掉一个序号 seq

用最简单的话描述：

```txt{2}
client 说：我要来了
                      server 反问：真的吗？
client 说：真的！
```

## 简单描述四报文握手

前提条件：两端都处于 ESTABLISHED 状态

1. 第一个报文：client 停止发送数据，然后发送 FIN，此时 client 进入 FIN-WAIT-1 状态
2. 第二个报文：server 通知应用程序要关闭连接，同时响应 ACK。此时 server 进入 CLOSE-WAIT。也就是半关闭状态，客户端不会发生数据了，但服务端还会发送数据。
3. client 收到 server 的确认后，进入 FIN-WAIT-2 状态，等待 server 传送完最后的数据。
4. 第三个报文：server 传送完最后的数据后，响应 FIN + ACK，此时 server 进入 LAST-ACK 状态
5. 第四个报文：client 收完数据后，回复 ACK，然后等待 2MSL (Maximum Segment Lifetime)
6. server 收到第四个报文后，直接进入 CLOSE 状态。
7. 2MSL 过后，client 也进入 CLOSE 状态

简单描述上面过程，就是：

```txt{1,3,6}
client 说：我停止发数据了
                                server 会：好的，但我这边还有点数据，你记得记得接受
client 说：好的
                                server 传送完数据
                                server 说：好了，最后一点数据已经传送完毕，你签收一下
client 说：我已经签收，你可以关了
                                server 收到后，直接关

client 担心 server 没收到“已签收”这个信号
于是会等几分钟，如果 server 收到，那么 client 就不会收到任何消息。
但如果 server 没收到，那么 server 就会重新发送一条消息
这就是为什么 client 在签收后，还会继续等待 2MSL 的原因
它要确保 server 能够成功关闭
```
