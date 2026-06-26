<!-- spell-checker:ignore Lavf -->

# 查看 `<writer_name>` 的输出效果

以输出文件格式信息（`-show_format`）为例

## default

```sh
$ ffprobe -v error -show_format input.mp3
# 等同 ffprobe -v error -show_format -of default input.mp3
[FORMAT] # 这个称为 section header
filename=input.mp3 # 这些就是 key=value
nb_streams=1
nb_programs=0
format_name=mp3
format_long_name=MP2/3 (MPEG audio layer 2/3)
start_time=0.025057
duration=341.968980
size=2735977
bit_rate=64005
probe_score=51
TAG:encoder=Lavf60.3.100
[/FORMAT] # 这个称为 section footer

```

## compact

```sh
$ ffprobe -v error -show_format -of compact input.mp3
format|filename=input.mp3|nb_streams=1|nb_programs=0|format_name=mp3|format_long_name=MP2/3 (MPEG audio layer 2/3)|start_time=0.025057|duration=341.968980|size=2735977|bit_rate=64005|probe_score=51|tag:encoder=Lavf60.3.100

```

## csv

```sh
$ ffprobe -v error -show_format -of csv input.mp3
format,input.mp3,1,0,mp3,MP2/3 (MPEG audio layer 2/3),0.025057,341.968980,2735977,64005,51,Lavf60.3.100

```

## flat

```sh
$ ffprobe -v error -show_format -of flat input.mp3
format.filename="input.mp3"
format.nb_streams=1
format.nb_programs=0
format.format_name="mp3"
format.format_long_name="MP2/3 (MPEG audio layer 2/3)"
format.start_time="0.025057"
format.duration="341.968980"
format.size="2735977"
format.bit_rate="64005"
format.probe_score=51
format.tags.encoder="Lavf60.3.100"

```

## ini

```sh
$ ffprobe -v error -show_format -of ini input.mp3
# ffprobe output

[format]
filename=input.mp3
nb_streams=1
nb_programs=0
format_name=mp3
format_long_name=MP2/3 (MPEG audio layer 2/3)
start_time=0.025057
duration=341.968980
size=2735977
bit_rate=64005
probe_score=51

[format.tags]
encoder=Lavf60.3.100

```

## json

```sh
$ ffprobe -v error -show_format -of json input.mp3
{
    "format": {
        "filename": "input.mp3",
        "nb_streams": 1,
        "nb_programs": 0,
        "format_name": "mp3",
        "format_long_name": "MP2/3 (MPEG audio layer 2/3)",
        "start_time": "0.025057",
        "duration": "341.968980",
        "size": "2735977",
        "bit_rate": "64005",
        "probe_score": 51,
        "tags": {
            "encoder": "Lavf60.3.100"
        }
    }
}

```

## xml

```sh
$ ffprobe -v error -show_format -of xml input.mp3
<?xml version="1.0" encoding="UTF-8"?>
<ffprobe>
    <format filename="input.mp3" nb_streams="1" nb_programs="0" format_name="mp3" format_long_name="MP2/3 (MPEG audio layer 2/3)" start_time="0.025057" duration="341.968980" size="2735977" bit_rate="64005" probe_score="51">
        <tag key="encoder" value="Lavf60.3.100"/>
    </format>
</ffprobe>

```
