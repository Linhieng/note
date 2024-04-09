# [230928 Wave Array](https://practice.geeksforgeeks.org/problems/wave-array-1587115621/1)

【题意】让有序数组变成 arr[1] >= arr[2] <= arr[3] >= arr[4] <= arr[5].....

【Excepted】

- Time Complexity: O(n).
- Auxiliary Space: O(1).

## Solution

```py
from typing import List

class Solution:
    def convertToWave(self, n : int, arr : List[int]) -> None:
        for i in range(1, n, 2):
            arr[i-1], arr[i] = arr[i], arr[i-1]
```
