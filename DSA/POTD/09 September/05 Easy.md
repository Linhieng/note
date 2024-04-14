# [230905 Print adjacency list](https://practice.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1)

【题意】：生成邻接表

【Excepted】

- Time Complexity: O(V + E)
- Auxiliary Space: O(V + E)

## Solution

```py
from typing import List

class Solution:
    def printGraph(self, V : int, edges : List[List[int]]) -> List[List[int]]:
        # 题目本身确保了 edges 是有序的，所以直接添加到末尾就可以。而且题目校验时也自动排序了！
        ans = [[] for _ in range(V)]
        for a,b in edges:
            ans[a].append(b)
            ans[b].append(a)
        return ans
```

```py
from typing import List

class Solution:
    def printGraph(self, V : int, edges : List[List[int]]) -> List[List[int]]:
        ans = [[] for _ in range(V)]

        def add(a, b):
            if len(ans[a]) == 0:
                ans[a].append(b)
                return
            for i,v in enumerate(ans[a]):
                if v > b:
                    ans[a].insert(i, b)
                    return
            ans[a].append(b)

        for v1,v2 in edges:
            add(v1, v2)
            add(v2, v1)

        return ans
```
