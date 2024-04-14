# [230906 Mother Vertex](https://practice.geeksforgeeks.org/problems/mother-vertex/1)

【题意】：找到单向图的“根节点”

【Excepted】

- Time Complexity: O(V + E)
- Space Complexity: O(V)

## Solution

```py
class Solution:

    #Function to find a Mother Vertex in the Graph.
    def findMotherVertex(self, V, adj):

        def dfs(node):
            visited = set()
            stack = [node]
            while len(stack) > 0:
                cur = stack.pop()
                visited.add(cur)
                for child in adj[cur]:
                    if child not in visited:
                        stack.append(cur)
                        stack.append(child)
                        break
            return len(visited)

        visited = [False] * V
        def infect(node):
            visited[node] = True
            for neighbor in adj[node]:
                if not visited[neighbor]:
                    infect(neighbor)

        # 时间复杂度 N + V，会遍历所有节点，同时走遍所有存在的边
        last_visited_node = -1
        for i in range(V):
            if not visited[i]:
                infect(i)
                last_visited_node = i

        return last_visited_node if dfs(last_visited_node) == V else -1
```
