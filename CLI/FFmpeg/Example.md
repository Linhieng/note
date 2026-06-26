<!-- spell-checker:word cuda cuvid hwaccels -->
<!-- spell-checker:enableCompoundWords -->

# 积累的 FFmpeg 使用案例

案例中的说明会尽量简单一点，从而尽可能确保新手也能看懂。这也意味着某些选项的解释可能不够严谨。

## `ffprobe` 获取音频总时长

```sh
ffprobe -v error -select_streams a:0 -show_entries format=duration -of default=nw=1:nk=1 -sexagesimal <input_url>
```

说明：

- `-v error`
    - 控制消息输出级别为 `error`。在该级别下，info 类型的消息不会输出。banner（包括版权、版本、依赖库相关消息）也不会输出。如果想要输出 info 而不输出 banner，可以使用 `-hide_banner` 选项。
- `-select_streams a:0`
    - `a` 表示音频流，冒号后面的 `0` 表示第一个音频流。
- `-show_entries format=duration`
    - `-show_entries` 包含输入文件的所有条目信息。
    - `format` 表示输入文件的格式信息，这些信息会包裹在 `[FORMAT]`（表头） 和 `[/FORMAT]`（表尾）之间。
    - `duration` 表示输入文件的格式信息中的时长信息，也就是所谓的 key。
- `-of default=nw=1:nk=1`
    - `-of default=` 用于指定默认条目打印的方式
    - `nw=1` 是 `noprint_wrappers` 的简写，表示不显示表头和表尾。
    - `nk=1` 是 `nokey` 的简写，表示不显示 key。
- `-sexagesimal`
    - 没有这个选项时，输出的时长会将是一个数字，比如这样 `275.043265`。
    - 该选项的作用就是将这个数字以 `HH:MM:SS.MS` 的方式输出，比如这样 `0:04:35.043265`。

## `ffmpeg` 剪辑音频

剪辑音频时，我们一般会需要音频的总时长信息。但某些音频的时长和实际的时长可能是对不上的，这个时候就需要先对音频进行重新编码。命令如下：

```sh
ffmpeg -y -v error -i <input_url> <output_url>
```

说明：

- `-y`
    - 当输出文件 `<output_url>` 已经存在时，会询问是否要覆盖。
    - 该选项的作用就是：不需要询问，直接覆盖。
- `-i <input_url>`
    - 用于指定一个输入文件，也就是我们要处理的音频文件所在路径。
- `<output_url>`
    - 指定输出文件路径。注意不能直接指定为输入文件。如果想要直接覆盖，需要先输出为另外一个文件，然后删除旧文件，重命名新文件。
- 由于没有指定任何编码选项，默认就是会重新编码。具体编码为什么格式取决于 `<output_url>` 的后缀名。

剪辑音频其实就是指定一个时间段。这就需要两个值：开始时间和结束时间。开始时间可以通过 `-ss` 或者 `-sseof` 指定，结束时间可以通过 `-to` 指定。此外还提供了持续时间，通过 `-t` 指定。FFmpeg 中时间的流向始终是从小到大的，所以开始时间不能大于结束时间，否则会报错或者直接忽略结束时间。下面是一些案例：

```sh
$ ffmpeg -y -hide_banner -to 10 -i input.mp3 output.mp3
# 该命令没有提供开始时间，故使用默认开始时间是 0。结束时间指定为 10，表示第 10 秒。
# 最终会输出第 0 秒到第 10 秒的音频信息到 output.MP3 文件中。

$ ffmpeg -y -hide_banner -ss 5 -to 10 -i input.mp3 output.mp3
# 指定了开始时间为第 5 秒
# 最终会输出第 5 秒到第 10 秒的音频信息到 output.MP3 文件中。
# 注意：如果 -to 的值小于 -ss 的值，则会报错。

$ ffmpeg -y -hide_banner -ss 5 -t 10 -i input.mp3 output.mp3
# 指定了持续时间为 10 秒
# 最终会输出第 5 秒到第 15 秒的音频信息到 output.MP3 文件中

$ ffmpeg -y -hide_banner -sseof -20 -t 10 -i input.mp3 output.mp3
# -sseof 后面必须是一个负数，表示倒数第几秒。-20 就是倒数第 20 秒
# 最终会输出倒数第 20 秒到倒数第 10 秒的音频信息到 output.MP3 文件中

$ ffmpeg -y -hide_banner -sseof -20 -to 60 -i input.mp3 output.mp3
# 假设 input.MP3 的总时长为 70 秒。
# -sseof -20 表示开始时间为倒数 20 秒，也就是第 50 秒
# -to 60 表示结束时间为第 60 秒。
# 最终会输出第 50 秒到第 60 秒的音频信息到 output.MP3 文件中
# 注意：如果 -to 后面的数值改为 40，那么 -to 40 选项将会被忽略，最终输出第 50 秒到第 70 秒的音频信息。
```

如果你自己运行了上面的命令，你会发现处理速度似乎很慢，这是因为前面的命令明确声明编码方式，那么 FFmpeg 默认就会重新编码，这就是速度慢的原因。想要让速度变快，可以告诉 FFmpeg 不要重新编码，也就是直接拷贝原来的。方法是借助 `-c` 选项，该选项是 `-codec` 的简写，语法如下：

```sh
ffmpeg -i <input_url> -c copy <output_url>
```

说明：

- `-c copy`
    - 因为 `-c` 后面有 `output_url`，所以此处的 `-c` 表示指定编码方式。如果将 `-c` 写在 `-i <input_url>` 前面，则表示指定解码方式。
    - `copy` 是一个特殊的编码格式，表示不会重新编码，直接复制原来的，这样速度更快。
- 直接复制时会有一些副作用，比如最终的时长会有一些误差，无法压缩文件大小等。（没错，重新编码可以压缩文件大小，并且保证视觉上看不出效果）。

## `ffmpeg` 提取视频中的音频进行剪辑

提取视频中的音频进行剪辑和 [剪辑音频](#ffmpeg-剪辑音频) 的区别只在于，对视频进行操作时你需要明确指定你要处理的是音频，而不是视频和字幕等内容。也就是选中音频流。

想要选中音频流，需要借助 `-map` 选项。该选项功能很强大，具体使用不会在这里细说。简单举一个例子就明白了它的基本使用：

```sh
$ ffmpeg -hide_banner -i input.mkv -map 0:a:0 output.mp3
# 0:a:0 中，第一个 0 表示的是第一个输入文件，也就是 input.mkv
# 0:a 的 a 表示第一个输入文件的所有音频流
# 0:a:0 的第二个 0 表示第一个输入文件的第一个音频流。
```

知道如何选取音频了，那么就可以很方便的提取视频中的音频了，下面的语法表示提取视频中的所有音频如下：

```sh
ffmpeg -i <input_url> -map 0:a <output_audio_url>
```

如果只想提取某一段，语法如下：

```sh
ffmpeg -ss 10 -to 100 -i <input_url> -map 0:a <output_audio_url>
```

## 压缩视频 mkv 视频（保存字幕）

`ffmpeg -i input.mkv -map 0 -c:s copy output.mkv` ✔️
&emsp;&emsp;`-map 0` 选择了所有流，效果是保存了所有的字幕。默认只会保留第一个字幕
&emsp;&emsp;`-c:s copy` 复制原视频字幕格式，效果是保存字幕为文本格式而不是图片格式

## 提取字幕

`ffmpeg -i input.mkv -map 0:s:0 01.ass` ✔️
&emsp;&emsp;`-map 0:s:0` 选择流（第一个视频的第一个字幕）
&emsp;&emsp;注意单个 ass 文件不支持同时保存多个字幕。所以 `ffmpeg -i input.mkv -map 0:s 01.ass` 是无法保存所有字幕的。

## mkv 内封字幕

```sh
ffmpeg -hide_banner -i in.mp4 -i CHS-ENG.srt -i eng.srt  -c:v copy -c:a copy -c:s copy -map 0 -map 1 -map 2 -metadata:s:s:0 language=chi -metadata:s:s:0 title="中英双语字幕" -metadata:s:s:1 language=eng -metadata:s:s:1 title="纯英字幕"  out.mkv
```

简单说明：

- language 表示语言标识、比如 eng 标识英文，chi 标识中文。
- title 是字幕标题，可以作为字幕的简单描述来使用。
- `-metadata:s:s:1` 中的第一个 s 表示设置字幕的元信息，第二个 s 和后面的数字是用来指定第一个字幕流的。
- mkv 只是一个盒子，用来存放 mk4 和两个字幕。

## 内嵌字幕

```sh
ffmpeg -i input.mp4 -vf "subtitles=eng.srt" -c:v libx264 -c:a copy output_with_embedded_subs.mp4
```

⚠️还没试过。先放在这里，以后要用到时容易找。

## 提取视频中的帧（图片）

```sh
ffmpeg -i input.mp4 frames/%3d.png
#    frames/%3d.png
#        指定输出位置，需要自己创建　frames　文件夹
#    %3d
#        表示生成连续的编号 001 002 ……
#    默认会将整个视频的帧提取出来。

ffmpeg -i input.mp4 -vf fps=1 frames/%3d.png
#    -vf fps=1
#        -vf 表示 video filter ，视频过滤
#    fps=1
#        每秒取 1 帧。 可以自己修改数值：
#        fps=10
#            每秒 10 帧
#        fps=1/60
#            每分钟 1 帧

ffmpeg -i input.mp4 -vf select='between(n,1,10)' frames/%3d.png
#    -vf select='between(n,1,10)'
#        select 用于指定选取范围。注意：引号不能省略，引号中的内容不能用空格。
#    between(n,1,10)
#       n 表示帧; 1,10 表示选取的帧范围。
#       可以通过 + 号拼接多个范围内的帧：
#            'between(n,0,4)+between(n,20,24)'

ffmpeg -i input.mp4 -vf select='between(t,0,1)' frames/%3d.png
#    between(t,0,1)
#        t 表示秒，0,1 表示选取的时间范围。（动画通常是每秒 24 帧）
#        注意单位只能是秒，无法使用 HH:MM:SS 这种格式。
#        不过，可以这样修改单位：
#        between(t*1000, 60000, 70000)
#            毫秒。表示选择视频时间从 60000 毫秒到 70000 毫秒之间的帧。
#        between(t/60, 1, 1.5)
#            分钟。表示选择视频时间从 1 分钟到 1.5 分钟之间的帧。

ffmpeg  -i input.mp4 -vf select='between(n,20,24)' -fps_mode drop frames/%3d.png
#    -fps_mode drop
#        设置匹配视频流的帧率模式。这个能够解决重复帧的问题。
#        除了 drop，还可以是以下值
#            -fps_mode vfr
#            -fps_mode 2
#        这个选项是用来替代旧版本中的 -vsync 0 配置。
#            -vsync 0
#                用于输出帧的选项。-vsync 控制同步操作
#                0 表示使用无同步模式。
#                这意味着输出的帧不会根据输入的时间戳进行重新排序，而是按照它们在源文件中出现的顺序进行提取。

ffmpeg -i input.mp4 -s 480x360 frames/%3d.png
#    -s 480x360
#        指定输出分辨率。 高度和宽度必须是合法值

ffmpeg -i input.mp4 -vf "scale=480:-1" frames/%3d.png
#    -vf "scale=480:-1"
#        -1 表示（高度）自适应利用。

```

## “兔子洞”

**还是不要想着使用 GPU 加速了。难搞。**

- `-preset <string>`
    - `<string>` 可选值有 `ultrafast`, `superfast`, `veryfast`, `faster`, `fast`, `medium`, `slow`, `slower`, `veryslow`, `placebo` 越后执行速度越慢，压缩率越高。
- `ffmpeg -hwaccels` 查看可用的硬件加速方法
- `ffmpeg -codecs | findStr cuvid` 查看支持 cuda 的编码器
