# [230907 Minimum Multiplications to reach End](https://practice.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1)

【题意】：最少需要多少步才能从 start 走到 end。给你一个数组 arr，两个数字 start 和 end。每一步，start 可以从 arr 中乘以任意一个值，然后对 100000 求模，求模结果就是一个新的 start。问，最少需要多少步，能够从 start 走到 end。

【Excepted】

- Time Complexity: O(10^5)
- Space Complexity: O(10^5)

真没想到具体是用 dfs……。

end 的范围是在 100000 内，虽然 arr 中每个数字可以使用任意次数，但由于最后会求 100000 求模，所以最终能在 100000 范围内的结果肯定是有限的。故时间复杂度和空间复杂度是 10^5。具体的步骤就是，利用 dfs，不断探索 0~100000 这片区域，标记探险过的格子。具体的请看代码

## Solution

```py
from typing import List

class Solution:

    def minimumMultiplications(self, arr : List[int], start : int, end : int) -> int:

        M = 10 ** 5
        ans = [-1] * M # 一共只有 M 个等待探索的格子
        ans[start] = 0 # 到达 start 格子的步数是 0
        queue = [start % M] # DFS
        while len(queue) > 0:
            top = queue.pop(0)
            if top == end: # 找到目的地。queue 中的值都是探索过的格子
                return ans[end]
            for a in arr:
                mul = (a * top) % M
                if ans[mul] == -1: # 找到新区域
                    queue.append(mul) # 探索新区域
                    ans[mul] = ans[top] + 1 # 步数加 1

        return -1
```
