## [230803 Shortest path in Directed Acyclic Graph](https://practice.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1)

【题意】： DAG （有向不循环图）的最短路径

【 Excepted 】：
- Time Complexity: O(N+M), where N is the number of nodes and M is edges
- Space Complexity: O(N)

Dijkstra 算法需要的信息有：
- nexts 数组 / map。 nexts[i] = [ [to, to_w] ] 表示： i 节点到 to 节点花费的代价为 to_w
- shortest 数组 / map。 shortest[i] = min_dist 表示： 起始节点到 i 节点的最短距离为 min_dist
- pq 有序数组。 按距离（或代价）从小到大排序。 该数组每个元素存储两个信息： 起始节点到 to 节点花费的代价 src_to_w

容易出错的地方：
- 初始化 nexts 时，如果某一节点没有邻接节点，则需要初始化为空数组，不然后面访问时会出现 KeyError
- 从 pq 中取出元素后，要先更新到达元素的最短距离，然后再去更新到达其邻接节点的距离

自己实现优先级队列思路：
- 首先，明确提供的 API, 在这里我们只提供三个 API:
    - PriorityQueue()
    - pq.empty()
    - pq.put([weight, node])
    - pq.get()
- 然后，确定私有属性，最重要的属性就是 __items, 它就是优先级队列本身，我们所做的一切都是在维护这个数组。 除 __items 外的属性都是可选的
    - __size, 完全可以使用 len(self.__items) 代替
    - __nodes_map, 空间换时间，因为我们的元素项不是简单的数字，而且数组。
- 实现我们提供的 API, 在实现过程中，每当修改 __items 时，都要思考此时其他的私有属性是否需要更新！ 并且，对于一些复杂操作，先声明一个私有方法占位。 等完成了 API 核心逻辑后，再实现对应的私有方法。在这里我们提供了下面几个私有方法：
    - __insert() 添加新元素到 __items 中
    - __update() 添加的元素已经存在，则更新该元素在优先级队列中的位置
    - __heapify() 向下调整
    - __bubble() 向上调整
    - __swap() 交换

优先级队列有待优化的地方：
- 限制死了 __items 元素项的类型
- 可以抽象化 __items 元素项，让他是一个对象，并且提供比较器方法！

### Python3

【我的 - 自己实现优先级队列】：
```py
from typing import List

class PriorityQueue:

    def __init__(self):
        self.__items = []
        self.__size = 0
        self.__nodes_map = {}

    def empty(self):
        return self.__size <= 0

    def put(self, item):
        if item is None or len(item) < 2:
            raise Exception('Unaccepted item.')

        weight, node = item
        if node not in self.__nodes_map:
            self.__insert(item)
        else:
            self.__update(item)

    def get(self):
        if self.empty():
            raise Exception('Queue is empty.')

        self.__swap(0, self.__size-1)
        res = self.__items.pop()
        self.__size -= 1
        self.__nodes_map.pop(res[1])
        self.__heapify(0)
        return res

    def __insert(self, item):
        self.__size += 1
        self.__items.append(item)
        self.__nodes_map[item[1]] = self.__size-1
        self.__bubble(self.__size-1)

    def __update(self, item):
        new_weight, node = item
        i = self.__nodes_map[node]
        old_weight = self.__items[i][0]
        self.__items[i][0] = new_weight

        if new_weight > old_weight:
            self.__heapify(i)
        else:
            self.__bubble(i)

    def __heapify(self, i):
        while 2*i+1 < self.__size:
            left = 2*i+1
            right = left+1
            min_child = left
            if right < self.__size and self.__items[right][0] < self.__items[min_child][0]:
                min_child = right

            if self.__items[i][0] <= self.__items[min_child][0]:
                break

            self.__swap(i, min_child)
            i = min_child

    def __bubble(self, i):
        parent = (i-1)//2
        while i > 0 and self.__items[i][0] < self.__items[parent][0]:
            self.__swap(i, parent)
            i = parent
            parent = (i-1)//2

    def __swap(self, i, j):
        self.__items[i], self.__items[j] = self.__items[j], self.__items[i]
        self.__nodes_map[self.__items[i][1]] = i
        self.__nodes_map[self.__items[j][1]] = j


class Solution:
    def shortestPath(self, n : int, m : int, edges : List[List[int]]) -> List[int]:
        shorted = [-1] * n
        pq = PriorityQueue()
        pq.put( [0, 0] )

        nexts = {i: [] for i in range(n)}
        for fr, to, w in edges:
            nexts[fr].append( [to, w] )

        while not pq.empty():
            src_to_w, to = pq.get()

            # 自己实现优先级队列后，可以直接修改！
            shorted[to] = src_to_w

            for to_next, to_next_w in nexts[to]:
                if shorted[to_next] == -1 or shorted[to_next] > src_to_w + to_next_w:
                    shorted[to_next] = src_to_w + to_next_w
                    pq.put( [shorted[to_next], to_next] )

        return shorted
```

【我的 - Dijkstra 】：
```py
from typing import List
from queue import PriorityQueue
class Solution:
    def shortestPath(self, n : int, m : int, edges : List[List[int]]) -> List[int]:
        shorted = [-1] * n
        pq = PriorityQueue()
        pq.put( [0, 0] )

        nexts = {i: [] for i in range(n)}
        for fr, to, w in edges:
            nexts[fr].append( [to, w] )

        while not pq.empty():
            src_to_w, to = pq.get()

            if shorted[to] == -1 or shorted[to] > src_to_w: # 这里不能直接更新，因为我们的 pq 中有冗余的数据。
                shorted[to] = src_to_w
                src_to_w = shorted[to]

            for to_next, to_next_w in nexts[to]:
                if shorted[to_next] == -1 or shorted[to_next] > src_to_w + to_next_w:
                    shorted[to_next] = src_to_w + to_next_w
                    pq.put( [shorted[to_next], to_next] )

        return shorted
```