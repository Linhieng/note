## [230802 Shortest Source to Destination Path](https://practice.geeksforgeeks.org/problems/shortest-source-to-destination-path3544/1)

【题意】： 图最短路径

【 Excepted 】：
- Time Complexity:O(N*M)
- Auxillary Space:O(N*M)

Dijkstra 算法核心：
- 维护一张最短距离表 `dist_table`，该表存储了起始点到任意点的最短距离。
- 维护一个有序队列，每次从中取出最短的路径的节点，利用该路径和节点的可到达节点来更新 `dist_table`。

本题需注意的地方：
- 由于我将节点的二维信息转换为一维信息，在求取节点的左右两个节点时，需要判断该节点是否处于边界线上。

看了评论区，发现很多都是 BFS ，我才想到这道题并不一定得用 Dijkstra 解决！

这道题不适合用深度优先遍历，因为遍历到目标节点后，你无法保证这条路径是最短路径。

### Python 3

【评论区 - 优化 py 代码结构】：
```py
class Solution:
    def shortestDistance(self,N,M,A,X,Y):

        queue = [(0, 0, 0)]
        A[0][0] = 0

        while len(queue) != 0:
            cx, cy, depth = queue.pop(0)

            if (cx, cy) == (X, Y):
                return depth

            nexts = [ (cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1) ]

            for nx, ny in nexts:
                if 0 <= nx < N and 0 <= ny < M and A[nx][ny] == 1:
                    queue.append( (nx, ny, depth+1) )
                    A[nx][ny] = 0

        return -1
```

【我的 - BFS 】：
```py
class Solution:
    def shortestDistance(self,N,M,A,X,Y):

        queue = [(0, 0, 0)]
        had = [ ([False] * M) for _ in range(N) ]
        had[0][0] = True

        while len(queue) != 0:
            cx, cy, depth = queue.pop(0)

            if cx == X and cy == Y:
                return depth

            if cx > 0 and A[cx-1][cy] == 1 and not had[cx-1][cy]:
                queue.append( (cx-1, cy, depth+1) )
                had[cx-1][cy] = True
            if cx+1 < N and A[cx+1][cy] == 1 and not had[cx+1][cy]:
                queue.append( (cx+1, cy, depth+1) )
                had[cx+1][cy] = True
            if cy > 0 and A[cx][cy-1] == 1 and not had[cx][cy-1]:
                queue.append( (cx, cy-1, depth+1) )
                had[cx][cy-1] = True
            if cy+1 < M and A[cx][cy+1] == 1 and not had[cx][cy+1]:
                queue.append( (cx, cy+1, depth+1) )
                had[cx][cy+1] = True

        return -1
```

【我的 - Dijkstra 算法】：
```py
class Solution:
    def shortestDistance(self,N,M,A,X,Y):
        nm = N*M
        dist_table = [None] * nm
        dist_table[0] = 0

        pq = PriorityQueue()
        pq.put( (0, 0) )

        while not pq.empty():
            min_dist, min_node = pq.get()
            dist = dist_table[min_node]

            top = min_node - M
            bottom = min_node + M
            left = min_node - 1
            right = min_node + 1

            # 注意左右两侧的判断
            if min_node % M == 0:
                left = -1
            if (min_node+1) % M == 0:
                right = nm

            if top >= 0 and A[top//M][top%M] == 1:
                if dist_table[top] is None or dist_table[top] > dist + 1:
                    dist_table[top] = dist + 1
                    pq.put( (dist_table[top], top) )
            if bottom < nm and A[bottom//M][bottom%M] == 1:
                if dist_table[bottom] is None or dist_table[bottom] > dist + 1:
                    dist_table[bottom] = dist + 1
                    pq.put( (dist_table[bottom], bottom) )
            if left >= 0 and A[left//M][left%M] == 1:
                if dist_table[left] is None or dist_table[left] > dist + 1:
                    dist_table[left] = dist + 1
                    pq.put( (dist_table[left], left) )
            if right < nm and A[right//M][right%M] == 1:
                if dist_table[right] is None or dist_table[right] > dist + 1:
                    dist_table[right] = dist + 1
                    pq.put( (dist_table[right], right) )

        return dist_table[X*M + Y] if dist_table[X*M + Y] is not None else -1

```