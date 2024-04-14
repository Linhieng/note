## [230713 - Unique Number of Occurrences](https://practice.geeksforgeeks.org/problems/unique-frequencies-of-not/1)

- 【题意】 给定一个大小为 N 的数组 arr, 统计里面各个元素出现的频率, 如果各元素出现的频率不重复, 则返回 true(1), 否则返回 false(0)。
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(N)
- 【Constraints】
    - 1 <= N <= $10^5$;
    - $-10^9$ <= arr[i] <= $10^9$

利用 map 存储各个元素的频率; 利用 set 判断频率是否唯一。

### Python3 代码

【我的】
```py
from typing import List


class Solution:
    def isFrequencyUnique(self, n : int, arr : List[int]) -> bool:
        freq_map = {}

        while n >= 1:
            n -= 1
            ele = arr[n]
            if freq_map.get(ele) is None:
                freq_map[ele] = 1
            else:
                freq_map[ele] += 1

        onlyone = set()
        for freq in freq_map.values():
            if freq in onlyone:
                return False
            onlyone.add(freq)
        return True
```