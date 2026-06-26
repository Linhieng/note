# [ExifTool](https://exiftool.org/) 处理图片元信息

Window 上的 png 格式文件不支持“标题”、“作者”、“备注”等元信息，但 jpg 格式可以。

之所以会找到 ExifTool 这个工具，是因为我想要在 png 格式文件上添加“备注”信息。但最终发现即使你在图片上添加了“备注”信息，Window 也不会显示，所以 ExitTool 的使用应该到此为止了。

## 案例

```sh
$ exiftool.exe a.png
# 查看 a.png 图片的元信息

$ exiftool.exe -XPComment="this is a Comment" a.jpg
# 修改 XP Comment 元信息。虽然 tag name 中有空格，但是在使用时直接忽略空格即可，不要用引号之类的将空格包裹住。
# 此外，通过命令行的方式似乎不支持中文……。
# 虽然可以用这种方式为 .png 图片添加元信息，但 Window 上并不会显示。
```
