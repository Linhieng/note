# 临时笔记区

## 乱码

在 Window 系统上，通过文件新建为 `in2.mp4` 视频添加“备注”信息为“一”。

### 操作一

分别在三个终端（powershell, bash, cmd）上执行命令 `ffprobe -v error -show_entries format_tags=comment in2.mp4`，结果均显示乱码，显示内容如下：

```text
[FORMAT]
TAG:comment=涓€
[/FORMAT]
```

### 操作二

分别在三个终端上执行同样的操作，但这次将输出重定向到文件中，命令为：`ffprobe -v error -show_entries format_tags=comment in2.mp4 > tmp` 此时：

- powershell 输出的内容如下，文件编码为 UTF-16LE，此时会乱码

    ```text
    [FORMAT]
    TAG:comment=涓€
    [/FORMAT]

    ```

- bash 输出的文件内容如下，编码为 UTF-8，不会乱码

    ```text
    [FORMAT]
    TAG:comment=一
    [/FORMAT]

    ```

- cmd 输出文件内容如下，编码为 UTF-8，不会乱码（效果同 bash）

    ```text
    [FORMAT]
    TAG:comment=一
    [/FORMAT]

    ```

### 操作三

- powershell
    - 先执行 `chcp 65001`
    - 然后执行操作一，终端上不输出乱码了。
    - 执行操作二，依旧是 UTF-16LE 编码，并且乱码。
- cmd
    - 先执行 `chcp 65001`
    - 然后执行操作一，终端上不输出乱码了。
    - 执行操作二，依旧是 UTF-8 编码，并且不会乱码。

- bash
    - 不管是执行 `export LANG="en_US.GB2312"`，还是 `export LANG="en_US.GBK"` 最终控制台的输出都是乱码。文件的输出都是 UTF-8, 没有乱码。

此外，ffprobe 似乎无法获取图片的元信息（至少目前为止我没找到），只能获取视频或音频的。
