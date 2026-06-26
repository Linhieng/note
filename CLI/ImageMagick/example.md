# 案例

## 将多张图片拼接为 gif

```sh
magick convert -delay 100 -loop 0 -dispose previous frames/*.png animated.gif
#    convert
#        执行转换操作
#    -delay 100
#        每帧之间的延迟时间。 单位是毫秒 ms。最小值为 10
#    -loop 0
#        gif 动画重复次数。 0 表示永远
#    -dispose previous
#        在绘制下一帧之前，清除前一个帧。
#     frames/*.png
#        待拼接的图片，按名称进行排序，比如 1.png 2.png 3.png
#    animated.gif
#        生成的图片。
#        注意： gif 格式保存的图片清晰度肯定是不如原始图片的。

```
