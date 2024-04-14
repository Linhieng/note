`from pydub import AudioSegment`

- 读取音频
    - `AudioSegment.from_mp3(<输入路径>)`
- `AudioSegment` 对象
    - `duration_seconds` 查看音频时长
    - `export(<导出路径>, format='mp3')`
    - `[:(duration-20) * 1000]` 剪切，单位是毫秒。