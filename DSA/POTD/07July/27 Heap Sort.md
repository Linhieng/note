## [230727 Heap Sort](https://practice.geeksforgeeks.org/problems/heap-sort/1)

【题意】: 堆排序

【Expected】:
- Time Complexity: O(N * Log(N)).
- Auxiliary Space: O(1).

永远不要信任算法题目的限制！从现在开始，笔记中不会再记载 constrain 。
当然，某些题目如果保证了每个节点的数值不一样，那么还是得说一下的。

### Python3

```py
class Solution:
    #Heapify function to maintain heap property.
    def heapify(self,arr, n, i):
        li = 2*i+1
        while li < n:
            max_i = li
            ri = li + 1
            if ri < n and arr[ri] > arr[max_i]:
                max_i = ri

            if arr[i] >= arr[max_i]:
                break

            arr[i], arr[max_i] = arr[max_i], arr[i]
            i = max_i
            li = 2*i + 1


    #Function to build a Heap from array.
    def buildHeap(self,arr,n):
        for i in range(n//2, -1, -1):
            self.heapify(arr, n, i)

    #Function to sort an array using Heap Sort.
    def HeapSort(self, arr, n):
        if n < 2:
            return

        self.buildHeap(arr, n)
        for i in range(n-1, -1, -1):
            arr[0], arr[i] = arr[i], arr[0]
            self.heapify(arr, i, 0)
```