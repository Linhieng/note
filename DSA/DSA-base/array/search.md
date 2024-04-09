# 搜索

## [二分查找](https://leetcode.cn/problems/binary-search)

二分查找不难，重点在于对边界的处理。边界有下面三者类型：

- `[left, right]`
- `[left, right)`
- `(left, right]`

```py
class Solution:
    def search(self, nums, target):
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
```

```py
class Solution:
    def search(self, nums, target):
        left, right = 0, len(nums)
        while left < right: # 相等时没有意义，因为 right 不是下标
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid # 由于 right 不是下标，所以这里不会 - 1
        return -1
```

```py
class Solution:
    def search(self, nums, target):
        left, right = -1, len(nums) - 1
        while left < right:
            mid = (left + right) // 2 + 1 # 由于 left 不是下标，而向下取整是会取到 left 的，所以要 +1
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid
            else:
                right = mid - 1
        return -1
```

## 二分搜索
