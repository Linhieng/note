## exiftool

用于Window下用于读取、写入、编辑海量不同格式文件内的元数据。

## [PDFtk Server](https://www.pdflabs.com/tools/pdftk-server/)

### 拆分 / 合并
用 cat 选择想要的页面，可以对页面进行旋转。然后用 output 将选中的页面输出
```sh
pdftk 文件1 文件2 文件3 cat output 输出文件名.pdf
pdftk *.pdf cat output 全部合并.pdf
# 合并多个文件

pdftk 文件 burst output test\名称_%03d.pdf
# 拆分成单页面，%03d 表示用三位数序号

pdftk 文件1 cat [odd|even] output 结果.pdf
# 提取奇数/偶数页

pdftk A=文件1 B=文件2 cat A1-5 B1-endSouth output 结果.pdf
# 提取A文件1-5页，提取B文件所有（旋转180）

pdftk 文件 cat end-1 output 结果.pdf
# 倒序

pdftk A=odd.pdf B=even.pdf shuffle A Bend-1 output 修正顺序.pdf
# 交叉合并成一份。
# 无法双面扫描的机子，通常第二份是倒序。
```

### 旋转
```sh
pdftk 输入文件.pdf cat [页面范围][旋转参数] output 输出文件.pdf
# 基础语法
pdftk input.pdf cat 1right output rotated.pdf
# 单页旋转
pdftk input.pdf cat 1-endRight output all_rotated.pdf
# 多页旋转
pdftk input.pdf cat 1 2south 3left output mix_rotated.pdf
# 多页不同旋转：1不转，2转180，3逆转90

# north 不旋转
# south / down 旋转 180°
# east / right 顺时针旋转 90°
# west / left 逆时针旋转 90°
```

### 加密
```sh
pdftk 输入文件.pdf output 加密文件.pdf user_pw 打开密码
pdftk 输入文件.pdf output 加密文件.pdf owner_pw 权限密码 allow <权限列表>
# 基础语法

pdftk input.pdf output encrypted.pdf user_pw 123
# 设置打开密码 123
pdftk input.pdf output encrypted.pdf owner_pw 12
# 可以打开，但权限需要密码 12。
pdftk input.pdf output encrypted.pdf owner_pw 12 Allow CopyContents
# 可以打开复制内容，其他权限需密码 12
```

### 解压
```sh
pdftk 输入文件.pdf output 输出文件.pdf [compress | uncompress]
# uncompress：把 PDF 里被压缩的页面流（比如文本、图片的原始数据）解压成明文 / 可读格式，
# 方便用文本编辑器修改底层 PDF 代码。
# compress：把解压后的页面流重新压缩回去，恢复成标准 PDF 的压缩格式。
```

## [poppler-windows](https://github.com/oschwartz10612/poppler-windows/releases)

内部包括多个工具，比如
| 程序                   | 核心用途             |
| ---------------------- | -------------------- |
| pdfimages              | 扒 PDF 里的原图      |
| pdftocairo / pdftoppm  | PDF 整页转图片(矢量/位图)       |
| pdfinfo                | 查看 PDF 基本信息    |
| pdftotext              | 提取 PDF 文字        |
| pdfunite / pdfseparate | 合并 / 拆分 PDF 文件     |
| pdffonts               | 查看 PDF 内嵌字体    |
| pdfattach / pdfdetach  | 添加 / 提取 PDF 附件 |
| pdftohtml              | PDF 转网页           |
| pdftops                | PDF 转打印 PS 文件   |

### pdfimages

```sh
pdfimages.exe [可选参数] 输入文件.pdf 输出文件名前缀
# 执行后自动生成：前缀-000.jpg、前缀-001.png 有序图片文件
```
| 参数        | 作用                                                         |
| ----------- | ------------------------------------------------------------ |
| `-list`     | 打印图片信息（页码、宽高、格式、尺寸），不导出文件 |
| `-j`        | JPG 原图导出为 jpg；非 JPG 图转为 ppm  |
| `-png`      | 全部强制输出 PNG（透明图、图纸适合）                         |
| `-tiff`     | 强制输出 TIFF（印刷、扫描稿）                                |
| `-all`      | 等同 -png -tiff -j -jp2 -jbig2 -ccitt |
| `-raw`      | 提取原始未解码图像流（专业修图 / 逆向）                      |
| `-f N`      | 起始页码，从第 N 页开始提取                                  |
| `-l N`      | 结束页码，提取到第 N 页为止                                  |
| `-p`        | 文件名带上页码，如`img-p02-000.jpg`方便区分来源页面          |
| `-opw 密码` | 带所有者密码，解密加密 PDF                                   |
| `-upw 密码` | 用户密码打开加密 PDF                                         |
| `-q`        | 安静模式，屏蔽终端日志                                       |


### PDF转图片

```sh
pdftoppm -progress -png -r 300 -sep "_" input.pdf output
```

- `-progress`：显示转换进度。
- `-png`：输出为PNG格式。
- `-r 300`：设置图片分辨率。
- `-sep "_"`：指定输出文件名分隔符，默认为 `-`。
- `input.pdf`：待转换文件。
- `output`：输出文件名。


```sh
pdftoppm -progress -png -r 300 -f 2 -l 4 input.pdf output
```
- `-f 2 -l 4`：指定转换的页面范围(first - last)，从第2页到第4页（均包含）。


```sh
pdftoppm -png -r 300 -singlefile input.pdf output
```

- `-singlefile`：添加了该参数后，只转换首页，而且输出文件名不会添加序号后缀。


## 借助 python

### img2pdf

将图片转换为 PDF

```sh
img2pdf 1.png 2.jpg -o 1.pdf
# 直接封装为 PDF

img2pdf -o output.pdf images/*.jpg
img2pdf --pagesize A4 -o output.pdf *.png
```
- `images/*.jpg` 支持通配符，指定图片路径。也可以指定图片顺序，图片路径写在最后，用空格分隔
- `-o output.pdf` 指定输出文件名
- `--pagesize A4` 添加该参数将自适应页面大小为 A4

### pdf2docx

```sh
pdf2docx convert input.pdf output.docx
```
