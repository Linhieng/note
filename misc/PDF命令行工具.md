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

## [PDFtk Server](https://www.pdflabs.com/tools/pdftk-server/)

### 作用

- 旋转PDF
- 合并PDF

### 案例：所有页面旋转 180°

```sh
pdftk input.pdf cat 1-endsouth output rotated.pdf
```
-   `1-end`：表示所有页面（第1页到最后一页）。
-   `south`：表示旋转 180°。
-   注意 end 和 south 之间没有空格


**PDFtk 旋转参数对照表**

| **旋转角度**              | **可用关键字**    | **示例命令**                                        |
| ------------------------- | ---------------- | --------------------------------------------------- |
| **90° 顺时针**           | `east` / `right` | `pdftk a.pdf cat 1-endeast output rotated_90.pdf`   |
| **180°**              | `south` / `down` | `pdftk a.pdf cat 1-endsouth output upside_down.pdf` |
| **90° 逆时针** | `west` / `left`  | `pdftk a.pdf cat 1-endwest output rotated_270.pdf`

### 案例：只旋转第4-6页

```sh
pdftk input.pdf cat 1-3 4-6left 7-end output rotated.pdf
```

- 注意数字和方向之间没有空格。


### 案例：将页面倒序，并翻转

```sh
pdftk input.pdf cat end-1down output rotated-reversed.pdf
```

- 核心就是 `cat end-1down`


### 案例：合并扫描件的单双页

```sh
pdftk A=1.pdf B=2.pdf shuffle A B output merged.pdf
```

- `1.pdf` 是奇数页，`2.pdf` 是偶数页，merged.pdf 是这两份PDF按序合并后的结果
- `shuffle` 作用是交替合并多个 PDF 文件页面


### 案例：合并指定内容，并翻转特定页

```sh
pdftk A=1.pdf B=2.pdf cat A1 B1down A2 B2 output merged.pdf
```

- 顾名思义，提取 `A1 B1down A2 B2` 然后合并为一份文档，其中 `B1` 被翻转
- 前面的 `shuffle A B` 就相当于 `cat A1 B1 A2 B2 A3 B3 ....`

## 案例：合并多个 PDF 文件

新建一个文件夹，把 PDF 文件放在里面，然后执行下面代码。注意，需要文件名有序。

```sh
pdftk *.pdf cat output merged.pdf
```

## python 环境工具

### img2pdf

将图片转换为 PDF

```sh
img2pdf -o output.pdf images/*.jpg
```

- `images/*.jpg` 支持通配符，指定图片路径。也可以指定图片顺序，图片路径写在最后，用空格分隔
- `-o output.pdf` 指定输出文件名
- `--pagesize A4` 添加该参数将自适应页面大小为 A4
