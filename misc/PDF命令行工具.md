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

### 作用

- PDF转图片

### 案例：PDF转图片

```sh
pdftoppm -progress -png -r 300 -sep "_" input.pdf output
```

- `-progress`：显示转换进度。
- `-png`：输出为PNG格式。
- `-r 300`：设置图片分辨率。
- `-sep "_"`：指定输出文件名分隔符，默认为 `-`。
- `input.pdf`：待转换文件。
- `output`：输出文件名。

### 案例：转换指定页面为图片

```sh
pdftoppm -progress -png -r 300 -f 2 -l 4 input.pdf output
```

- `-f 2 -l 4`：指定转换的页面范围，从第2页到第4页（均包含）。

### 案例：只转换首页为图片

```sh
pdftoppm -png -r 300 -singlefile input.pdf output
```

- `-singlefile`：添加了该参数后，只转换首页，而且输出文件名不会添加序号后缀。


## python 环境工具

### img2pdf

将图片转换为 PDF

```sh
img2pdf -o output.pdf images/*.jpg
img2pdf --pagesize A4 -o output.pdf *.png
```
旋转图片？
- `images/*.jpg` 支持通配符，指定图片路径。也可以指定图片顺序，图片路径写在最后，用空格分隔
- `-o output.pdf` 指定输出文件名
- `--pagesize A4` 添加该参数将自适应页面大小为 A4

### pdf2docx

```sh
pip install

pdf2docx convert input.pdf output.docx
```
