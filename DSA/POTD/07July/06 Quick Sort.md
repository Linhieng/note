## [230706 - QuickSort](https://practice.geeksforgeeks.org/problems/quick-sort/1)

- 【题意】 快排
- 【要求】
    - Time Complexity O(N*logN)
    - Auxiliary Space O(logN)
- 【Constraints】
    - 1 <= N <= $10^3$;
    - -$1$ <= arr[i] <= $10^4$

需要注意的地方：
    - 边界条件，返回的下标到底是包不包含小于区和大于区

### Python3 代码

【三项分布快排】
```py
from random import randint as rd
class Solution:
    #Function to sort a list using quick sort algorithm.
    def swap(self, arr, i, j):
        arr[i], arr[j] = arr[j], arr[i]


    def quickSort(self,arr,low,high):
        if low < high:
            # self.swap(arr, rd(low, high), high) 随机快排
            less, more = self.partition(arr, low, high)
            self.quickSort(arr, low, less)
            self.quickSort(arr, more, high)


    def partition(self,arr,low,high):
        pivot = arr[high]
        less, more = low, high

        while low <= more:
            if arr[low] < pivot:
                self.swap(arr, less, low)
                less += 1
                low += 1
            elif arr[low] == pivot:
                low += 1
            else:
                self.swap(arr, more, low)
                more -= 1
        return less-1, more+1 # 返回包含小于区和大于区的下标
```