## [230801 DFS of Graph](https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1)

【题意】： DFS

【 Excepted 】：
- Time Complexity: O(V + E)
- Auxiliary Space: O(V)

利用栈实现深度优先遍历，只有两点需要注意：
- 出栈后的元素，添加到 res 之前需要判断一下是否已添加过
- 一个元素可以入栈时，需要再次将它的父节点入栈。因为不一定遍历完了它的后续节点

### Python3

```py
class Solution:
    #Function to return a list containing the DFS traversal of the graph.
    def dfsOfGraph(self, V, adj):
        stack = [0]
        had = [False] * V
        res = []
        while len(stack) != 0:
            cur = stack.pop()
            res.append(cur) if not had[cur] else None
            had[cur] = True

            for next in adj[cur]:
                if not had[next]:
                    stack.append(cur)
                    stack.append(next)
                    break
        return res
```