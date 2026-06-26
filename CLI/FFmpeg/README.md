<!-- spell-checker:ignore dframes -->
<!-- spell-checker:word muxer demuxer vcodec scodec acodec -->
<!-- spell-checker:enableCompoundWords -->

# FFmpeg 基本知识点

[FFmpeg](https://ffmpeg.org/about.html) 包含以下三个命令工具

- `ffmpeg` 用于处理多媒体资源
- `ffprobe` 用于分析多媒体相关信息
- `ffplay` 用于播放多媒体。没用过

掌握 ffmpeg 的重点就是理解“流”、知道如何选择流（stream_specifier）。

掌握 ffprobe 的重点是 section，知道常见的 section 及其对应的 key。

语法说明：

- 左右没有尖括号的表示原样输入，比如 `ffprobe`, `ffmpeg`
- 命令行中，由尖括号包裹着的，表示变量，一般是数字或者字符串。特别的变量有格式要求，一般会进行说明，比如 `<stream_specifier>`。容易理解的变量不会进行特殊说明，比如 `<input_url>` 表示输入文件的路径。`<input>` 表示输入，相当于 `-i <input_url>`。
- 命令行中，除了 `()`, `[]`, `<>` 符号，其他符号都是需要原样输入的，比如 `:`, `=`, `,`, `-`， `.` 等。
- 具体情况具体分析。没有什么是百分百正确的。

阅读说明：由于不是系统的学习 FFmpeg，而是遇到需求了才去官方文档查找。所以下面笔记的内容不一定连贯。当看不懂时先继续往下看。如果还看不懂，或者没有想要的内容，欢迎创建一个 issue 来询问。

## FFmpeg 的处理流程简介

ffmpeg 常规转换流程如下：

1. 提取 input 的信息
2. 解码（耗时）
3. 转码（耗时）
4. 将处理后的信息输出到 output

```draw
 _______              ______________
|       |            |              |
| input |  demuxer   | encoded data |   decoder
| file  | ---------> | packets      | -----+
|_______|            |______________|      |
                                           v
                                       _________
                                      |         |
                                      | decoded |
                                      | frames  |
                                      |_________|
 ________             ______________       |
|        |           |              |      |
| output | <-------- | encoded data | <----+
| file   |   muxer   | packets      |   encoder
|________|           |______________|
```

通过流拷贝可以加快速度，此时转换流程如下：

```draw
 _______              ______________            ________
|       |            |              |          |        |
| input |  demuxer   | encoded data |  muxer   | output |
| file  | ---------> | packets      | -------> | file   |
|_______|            |______________|          |________|
```

## `ffprobe` 和 `ffmpeg` 通用的选项

### `<stream_specifier>` 格式说明

命令语法中的 `<stream_specifier>` 表示“流选择”。常见的 `<stream_specifier>` 有下面几种格式：

- `<stream_index>`
    - 流的索引值。通过 `ffprobe -show_entries stream=index <input_url>` 可以查看 `<input_url>` 文件中各个流的索引值。
- `<stream_type>[:<additional_stream_specifier>]`
    - `<stream_type>` 有以下可选值：
        - `v`（视频流）
        - `a`（音频流）
        - `s`（字幕流）
        - `d`（数据流）
        - `t`（附件流）
    - `<additional_stream_specifier>` 是数字，表示某一类型流中的第几个。从 0 开始计数。
    - 举例说明：
        - `a` 选择所有的音频流
        - `a:0` 选择第一个音频流
        - `s:1` 选择第二个字幕流
- 还有其他的格式，但不用过，所以不记录。

### 消息输出

- `-hide_banner`
    - 执行命令时默认会先输出 banner 信息，banner 中包括其版权、版本、配置、依赖包等相关信息。
    - 该选项就是用来关闭 banner 的输出的。
- `-v <loglevel>`
    - 终端输出只有两种 —— 标准输出和标准错误输出。这很明显是不够用的。所以 FFmpeg 有自己的一套消息级别。不必要的消息会被输出到标准错误输出中。也就是说，标准错误输出的内容不一定是报错信息。
    - `-v` 是 `-loglevel` 的简写。
    - `<loglevel>` 可以是关键字，也可以是数字，数字是从 -8 开始，依次递增 8。
        - `quiet` 或 `-8`
            - 不输出任何多余信息。即只会输出“标准输出”。
        - `panic` 或 `0`
            - 目前没有用处。不过其数字形式刚好是 0。
        - `fatal` 或 `8`
            - 只显示致命错误信息，这意味着程序无法继续执行。
        - `error` 或 `16`
            - 显示所有报错。推荐设置为这个。
        - `warning` 或 `24`
            - 显示所有警告信息。众所周知，警告不影响程序执行。
        - `info` 或 `32`
            - 这是默认值。输入文件的相关信息、banner 都属于该级别。
        - `verbose` 或 `40`
            - 和 `info` 一样
        - `debug` 或 `48`
        - `trace` 或 `56`
    - 一般使用 `-v error`

### 时间相关选项

常用的有下面四个选项：

- `-t <duration> (<input>/<output>)`
- `-to <position> (<input>/<output>)`
- `-ss <position> (<input>/<output>)`
- `-sseof <position> (<input>)`

`<duration>` 和 `<position>` 的格式必须是 [time duration 格式](#time-duration-格式)。

想要确定一段时间，需要以下信息：

- 开始时间
    - 通过 `-ss` 或者 `-sseof` 指定开始时间点。
    - 如果没有指定开始时间，则默认从 0 开始。
- 结束时间
    - 通过 `-to` 指定结束时间点。
- 持续时间
    - 通过 `-t` 指定持续时间。
    - `-t` 参数和 `-to` 参数是互斥的。如果这两个选项都没有配置，则默认的结束时间是文件末尾。

注意：大部分格式是无法准确找到某某时间点的，具体参考下面的 `-ss` 中的说明

- `-ss <position> (<input>/<output>)`
    - 指定开始时间点
    - `<position>` 不能为负数。因为 `<position>` 是相对于文件开头进行计算的。比如 `-ss 10` 表示开头第 10s 左右。
    - 大部分格式文件都是不能精确定位到 `<position>` 时间点。FFmpeg 定位到的时间点称为 seek point, seek point 会在 `<position>` 前面。
    - 当重新编码时，如果配置了 `-accuracy_seek` 选项（这是默认配置），则会将 seek point 和 `<position>` 之间的内容解码然后丢弃。
    - 当进行流复制，或者配置了 `-noaccurate_seek` 选项时，则会将 seek point 和 `<position>` 之间的内容解码并保留。

- `-sseof <position> (<input>)`
    - `<position>` 只能为负数。因为 `<position>` 是相对于文件末尾进行计算的。比如 `-sseof -10` 表示倒数第 10s 左右。
    - 注意：`-sseof` 指定的是开始时间点。所以不要以为 `-sseof -10 -to 10` 会从第 10 秒开始，在倒数第 10 秒结束。实际情况是从倒数第 10 秒开始，文件末尾结束。

- `-t <duration> (<input>/<output>)`
    - 指定持续时间。`<duration>` 不能为负数。
    - 具体是从哪里开始计算持续时间，得看 `-ss` 或者 `-sseof` 的值。默认是从文件开头开始计算。
    - 比如 `-ss 10 -t 5` 表示从第 10 秒左右开始，在第 15 秒左右停止。

- `-to <position> (<input>/<output>)`
    - 指定在什么时间点停止。`<position>` 不能为负数，因为 `-to` 必须大于 `-ss`。
    - 比如 `-ss 10 -to 5` 会报错。
    - 但 `-to` 和  `-sseof` 一起使用时，如果 `-to` 的时间点在 `-sseof` 之前，则 `-to` 会被忽略，即结束时间为文件末尾。

案例：

```sh
$ ffmpeg -v error -ss 10  -i input.mp3  -c copy o.mp3
# 从 input.mp3 第 10s 位置开始截取，直到结束。

$ ffmpeg -v error -sseof -10 -i input.mp3 -c copy o.mp3
# 从 input.mp3 的倒数第 10s 秒位置开始截取，直到结束。（即截取最后 10s）

$ ffmpeg -v error -ss 10 -t 5 -i input.mp3 -c copy o.mp3
# 从 input.mp3 的第 10s 开始，截取 5s 时长的音频。（最终音频只有 5s 左右）

$ ffmpeg -hide_banner -ss 10 -t 13 -i input.mp3 -c copy o.mp3
# 从 input.mp3 的第 10s 开始截取，直到第 13s 时结束。（最终音频只有 3s 左右）
```

### time duration 格式

只有两种格式。

第一种格式：

```sh
[-][HH:]MM:SS[.m...]
```

说明：

- `-` 为可选，表示负数。
- `HH` 为可选，表示 时, 必须是两位数。
- `MM` 为必选，表示 分，必须是两位数。
- `SS` 为必选，表示 秒，必须是两位数。
- `.m` 为可选，跟在 `SS` 后面，`m` 前面有个小数点。不要求多少位（一般是一到四位）。

第二种格式：

```sh
[-]S[.m][s|ms|us]
```

说明

- `-` 为可选，表示负数。
- `S` 为必选，默认表示的是秒。不要求具体多少位。
- `.m` 为可选，跟在 `S` 后面，前面有个小数点，不要求多少位（一般是一到四位）
- `s`, `ms`, `us` 为可选，用于指定 `S` 的单位，分别表示 秒、毫秒、微秒。默认是秒。

很明显，当语法中有冒号 `:` 时，表示第一个格式，否则表示第二种格式。

| 案例值     | 第几种格式                          | 说明                     |
|------------|--------------------------------|------------------------|
| `24:08`    | 第一种格式，指定了 `HH` 和 `MM`      | 表示 24 分 8 秒。         |
| `01:30:10` | 第一种格式，指定了 `HH`, `MM`, `SS`， | 表示 1 小时 30 分 10 秒。 |
| `-02:00`   | 第一种格式，指定了 `-`, `HH`, `MM`   | 表示最后两分钟。          |
| `55`       | 第二种格式，并且只指定了 `S`，        | 表示 55 秒。              |
| `0.2`      | 第二种格式，指定了 `S` 和 `.m`，      | 表示 0.2 秒。             |
| `200ms`    | 第二种格式，指定了 `S` 和 `ms`       | 表示 200 毫秒            |
| `-120s`    | 第二种格式，指定了 `-`, `S`, `s`     | 表示最后两分钟（120 秒）。  |

## `ffprobe`

### `ffprobe` 语法

```sh
ffprobe [options] <input_url>
```

### 常见选项

- `-select_streams <stream_specifier>`
    - 选择指定流。`<stream_specifier>` 格式参考 [Stream specifiers](#stream_specifier-格式说明)
    - 案例：
        - `-select_streams 0` 选择索引值为 `0` 的流。比如视频文件的第一个流一般是视频流。
        - `-select_streams a:0` 选择第一个音频流。

- `-of <writer_name>[=writer_options]`
    - `-of` 是 `-print_format` 的简写。
    - `<writer_name>` 表示输出格式，有以下可选值，点击对应值可查看对应的输出案例
        - [`default`](writer_name.md#default)
        - [`compact`](writer_name.md#compact)
        - [`csv`](writer_name.md#csv)
        - [`flat`](writer_name.md#flat)
        - [`ini`](writer_name.md#ini)
        - [`json`](writer_name.md#json)
        - [`xml`](writer_name.md#xml)

- `-of default=<writer_options>`
    - 用于指定默认的信息输出格式。有下面两个配置项：
        - `nw` / `noprint_wrappers`
            - 默认值为 0，设置为 1 时不输出 section header 和 section footer。
        - `nk` / `nokey`
            - 默认为 0，设置为 1 时不输出 key。
    - 举例说明：默认输出的信息格式是下面这样的：

        ```syntax
        [SECTION]
        key1=val1
        ...
        keyN=valN
        [/SECTION]
        ```

        - 设置为 `-of default=nw=1` 时不输出 `[SECTION]` 和 `[/SECTION]`
        - 设置为 `-of default=nk=1` 时不输出 `key1`, ..., `keyN`
        - 设置为 `-of default=nw=1:nk=1` 时只输出 `val1`,...`valN`
    - section。常见的有：
        - `[STREAM]` 流相关信息。常见的信息有：
            - `index` 流的索引值。
            - `codec_type` 流类型，比如 `video`, `audio`, `subtitle`。
            - `channels` 声道数量。
            - `width`, `height`, `coded_width`, `coded_height` 视频的宽高。
        - `[FORMAT]` 文件相关信息，常用的信息有：
            - `duration` 时长，比如视频时长或音频时长。
            - `filename` 文件名。
            - `format` 资源的格式，如 mp3, mp4 等。
            - `size` 资源大小，单位字节。

show 开头的选项都是用来查看 section 的，比如下面这样：

- `-show_entries <section_entries>`
    - 学过 js 的都知道，js 中也经常有 key, value, entries。key 和 value 不用说，entries 就是包含 key 和 value。所以 show_entries 就是所有的键值对信息，由于这个信息非常庞大，所以必须指定 `<section_entries>`。
    - entries 可划分为一个个 section, 每一个 section 都有许多 key-value。所以 `<section_entries>` 就是用来指定 section 和 key 的。它的具体语法为 `<section1>=<key1>,<keyN>:<section2>=<key1>,<key2>`。相关案例会在下面给出。
- `-show_streams` 查看 `[STREAM]`。
- `-show_format` 查看 `[FORMAT]`。
- `-show_error` 查看 `[ERROR]`（如果有的话）。
- `-show_data`
- `-show_data_hash <algorithm>`
- `-show_packets`
- `-show_frames`
- `-show_log <loglevel>`
- `-show_programs`
- `-show_chapters` 等等。

- `-sexagesimal`
    - time 类型的输出，默认是普通数字格式，添加该选项能够其转换为 "HH:MM:SS.MS" 格式。
    - 比如 `275.043265` 会变成 `0:04:35.043265`。

### `-show_entries <section_entries>`

`<section_entries>` 的语法为：

```sh
<section1>=<key1>,<keyN>:<section2>=<key1>,<key2>
```

案例值                                                     | 说明
-----------------------------------------------------------|---------------------------------------
`-show_entries format`                                     | 等同于 `-show_format`，查看所有 `[FORMAT]`
`-show_entries format=filename`                            | 查看所有 `[FORMAT]` 中 key 为 `filename` 条目。
`-show_entries format=filename,size`                       | 通过逗号可以拼接多个 key
`-show_entries stream`                                     | 等同于 `-show_stream`，查看所有 `[STREAM]`
`-show_entries format=size:stream=index`                   | 通过冒号 `:` 可以拼接多个 section
`-show_entries format=duration,size:stream=index,channels` | 连用
`-show_entries format_tags=title,comment`                  | 获取 TAG 时需要添加 `_tags` 后缀。

一般会再结合 `-of <writer_name>[=writer_options]` 来省略一些冗余信息。比如下面这样

```sh
$ ffprobe -v error -show_entries format=duration input.mp3
[FORMAT]
duration=341.968980
[/FORMAT]

$ ffprobe -v error -show_entries format=duration  -of default=nw=1 input.mp3
duration=341.968980

$ ffprobe -v error -show_entries format=duration  -of default=nk=1 input.mp3
[FORMAT]
341.968980
[/FORMAT]

$ ffprobe -v error -show_entries format=duration  -of default=nw=1:nk=1 input.mp3
341.968980

```

## `ffmpeg`

### `ffmpeg` 语法

```sh
ffmpeg [<global_options>] {[<input_file_options>] -i <input_url>} ... {[<output_file_options>] <output_url>} ...
```

说明：

- 顺序很重要。
- 允许指定多个输入文件，所有的输入文件必须在输出文件之前。当出现多个输入文件时，通过输入顺序（从 0 开始）指定对应的输入文件
- options 应用在下一个指定的文件。所以，全局配置必须写在输入文件配置前面，即 `<global_options>` 必须在 `<input_file_options>` 前面

### 流选择和流控制的默认行为

ffmpeg 默认会根据以下规则选择流：

- 视频流：选取最高分辨率的视频流
- 音频流：选取包含最多通道的音频流
- 字幕流：只选取第一个字幕流。比如简繁两种字幕，则只会选择第一个。
- 数据流：不会被选择
- 附件流：不会被选择

流控制，指的的解码和编码。ffmpeg 默认会按照以下规则处理流：

- 视频流：会重新编码，耗时长
- 音频流：会重新编码，耗时长
- 字幕流：重新编码为图片，而不是文本。图片会导致字幕变得不清晰，但好处是不需要额外的字体文件。
- 由于数据流和附件流默认不会被选择，所以也不存在默认流控制行为。

当提供 `-map` 配置项时，将会变成手动选择流。`-map` 的值由三部分组成：`<input_file_id>:<stream_type>:<additional_stream_specifier>`

举例说明：

```text
input file 'input.mkv'
      stream 0: 视频流，分辨率 1920x1080
      stream 1: 音频流 2 channels
      stream 2: 简体字幕
      stream 3: audio 5.1 channels
      stream 4: 繁体字幕
```

`-map 0` 则选择第一个输入的所有流（包括视频音频字幕）
`-map 0:s:0` 则选择第一个输入的第一个字幕流（即简体字幕），此时不会选择视频和音频。这可用于提取字幕文件 `ffmpeg -i A.mp4 -map 0:s:0 output_subtitle.ass`
`-map 0:a` 表示选择所有的音频流，此时不会包含视频和字幕。
如果想要选择多个，可以指定多个 `-map`。比如 `ffmpeg -i input.mkv -map 0:v -map 0:s -c:v copy -c:s copy output.mkv` 不选择音频

通过 `-codec:<stream_specifier> <encodes>` 手动控制流。 `-codec` 可简写为 `-c`，如下：

### 全局选项

- `-y`
&emsp;&emsp;输出文件已存在时直接覆盖
- `-n`
&emsp;&emsp;输出文件已存在时直接退出。

### 常用选项

- `-map [-]<input_file_id>[:<stream_specifier>][?] (<output>)`
    - `-` 表示不选择（取反）。
    - `<input_file_id>` 表示第几个输入文件，从 0 开始计数。
    - `<stream_specifier>` 用来指定流，
    - `?` 表示可选，当不存在该流时直接忽略，而不是报错。

案例值        | 说明
--------------|--------------------------------
`-map 0`      | 表示选择第一个输入文件的所有流。
`-map 1:0`    | 表示选择第二个输入文件的第一个流。
`-map 0:s:0`  | 表示选择第一个输入文件的第一个字幕流。
`-map 0:s?`   | 表示选择第一个输入文件的所有字幕流。如果没有字幕流的话则忽略。
`-map -0:a:1` | 表示不选择第一个文件的第二个音频流。

- `-c[:<stream_specifier>] <codec> (<input>/<output>)`
    - `-c` 是 `-codec` 的简写。
    - 当后面是 `<input>` 时，`<codec>` 表示输入文件的解码方式（`<decoder>`）。
    - 当后面是 `<output>` 时，`<codec>` 表示输出文件的编码方式（`<encoder>`）。
        - 如果不想重新编码，可以指定 `<codec>` 为 `copy`。这样运行速度更快。
    - 案例：
        - `ffmpeg -i input.mkv -map 0 -c:v libx264 -c:a copy output.mkv`
            - `-map 0` 可以省略，原因在于只有一个输入文件。
            - `-c:v libx264` 后面跟的是输出文件，所以选项表示输出时，将所有视频流重新编码为 libx264 格式。
            - `-c:a copy` 输出时，不会重新编码所有音频流。
        - `ffmpeg -i input.mkv -map 0 -c copy -c:v:1 libx264 -c:a:1 libvorbis output.mkv`
            - `-c copy -c:v:1 libx264` 除了第二个视频流会被重新编码为 libx264 外，其他视频流都不会重新编码
            - `-c:a:1 libvorbis` 对第二个音频流重新编码为 libvorbis 格式。
        - `-c:v <encode>` 指定输出视频的编码格式，比如
            - `-c:v copy` 表示重新编码，速度更快。
            - `-c:v libx264` 表示先解码，然后编码为 `libx264`。（根据流程的描述，我认为：即使原本编码格式就是 `libx264`，那么也会重新编码）
        - `-c:a <encode>` 指定输出音频的编码格式
        - `-c:s <encode>` 执行字幕流编码格式。字幕格式有两种：文本或者图片。一般都是使用文本而不是图片。编码为图片的好处是不需要字体文件。

- `-vcodec <codec> (<output>)`
    - 等同 `-c:v <codec>`（或 `-codec:v <codec>`）
- `-acodec <codec> (<output>)`
    - 等同 `-c:a <codec>`（或 `-codec:a <codec>`）
- `-scodec <codec> (<output>)`
    - 等同 `-c:s <codec>`（或 `-codec:s <codec>`）

- `-vn (<input>/<output>)`
    - 不选择所有视频流。
- `-an (<input>/<output>)`
    - 不选择所有音频流。
- `-sn (<input>/<output>)`
    - 不选择所有字幕流。
- `-dn (<input>/<output>)`
    - 不选择所有数据流。

- `-fs <limit_size> (<output>)`
    限制输出的文件大小，单位是字节

- `-metadata[:<metadata_specifier>] <key>=<value> (<output>)`
    - 配置输出文件的元信息。通过设置空值（空字符串）可以删除某个元信息。
    - `<metadata_specifier>` 是可选的，它可以用来设置或覆盖流的元信息。更多细节可以查看 `-map_metadata`。
    - 常见的元信息有：
        - `title`
        - `language`
    - 案例：
        - `ffmpeg -i in.mkv -metadata title="my title" out.mkv`
            - 设置输出文件的 title
        - `ffmpeg -i in.mkv -metadata:s:a:0 language=eng out.mkv`
            - 设置第一个字幕流和第一个音频流的语言为英文。

- `-frames[:<stream_specifier>] <framecount> (<output>)`
    - 当帧数达到 `<framecount>` 后就停止写入。
    - 曾经的选项 `-dframes <number> (<output>)` 已经被废弃了，该选项现在可以用 `-frames:<d>` 代替。

- `-attach <filename> (<output>)`
    - 添加附件。
    - 比如添加字幕文件： `ffmpeg -i in.mkv -attach DejaVuSans.ttf -metadata:s:0 mimetype=application/x-truetype-font out.mkv`
- `-dump_attachment[:<stream_specifier>] <filename> (<input>)`
    - 导出并移除附件。
    - 比如导出字体文件，并重命名为 `out.ttf` 文件。`ffmpeg -dump_attachment:t:0 out.ttf -i in.mkv`
    - 比如移除所有附件，文件名同元信息中的文件名相同。`ffmpeg -dump_attachment:t "" -i in.mkv`
