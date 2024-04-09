## [230731 BFS of graph ](https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1)

【题意】： BFS

【 Excepted 】：
- Time Complexity: O(V + E)
- Auxiliary Space: O(V)

利用队列 + set 解决。队列中是还未访问的节点， set 中是已经访问的节点，所以空间复杂度为节点数量。

### Python3

【我的 - 数组解决】
```py
class Solution:
    #Function to return Breadth First Traversal of given graph.
    def bfsOfGraph(self, V: int, adj: List[List[int]]) -> List[int]:
        if V < 2 or len(adj) < 2:
            return adj

        queue = [0]
        had = [False] * V
        res = []

        while len(queue) != 0:
            cur = queue.pop(0)
            res.append( cur )
            had[cur] = True
            for next in adj[cur]:
                if not had[next]:
                    queue.append(next)
                    had[next] = True

        return res
```

【我的 - set 解决】
```py
from typing import List
from queue import Queue
class Solution:
    #Function to return Breadth First Traversal of given graph.
    def bfsOfGraph(self, V: int, adj: List[List[int]]) -> List[int]:
        if V < 2 or len(adj) < 2:
            return adj

        queue = Queue()
        had = set()
        queue.put(0)
        had.add(0)
        res = []

        while not queue.empty():
            cur = queue.get()
            res.append( cur )
            had.add(cur)
            for next in adj[cur]:
                if next not in had:
                    queue.put(next)
                    had.add(next)

        return res
```