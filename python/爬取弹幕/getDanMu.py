import requests
import google.protobuf.text_format as text_format
import bili_pb2 as Danmaku


url = 'http://api.bilibili.com/x/v2/dm/web/seg.so'
params = {
    'type':1,           # 弹幕类型
    'oid':493424989,    # cid
    'pid':210946256,    # avid
    'segment_index':1   # 弹幕分段
}
resp = requests.get(url,params)
data = resp.content

danmaku_seg = Danmaku.DmSegMobileReply()
danmaku_seg.ParseFromString(data)

print_log = open("danMu.txt",'w')

for j in danmaku_seg.elems:
    parse_data = text_format.MessageToString(j, as_utf8=True)
    print(parse_data, file = print_log)

print_log.close()
