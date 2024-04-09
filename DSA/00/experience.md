---
outline: deep
---

<!--

该脚本用以获取 https://leetcode.cn/studyplan/top-interview-150/ 站点的
 150 道问题。
lis = document.querySelectorAll('div[class^="flex flex-col border-b-[1.5px] duration-300 last:border-b-0 border-lc-fill-02 dark:border-dark-lc-fill-02"]')

lis.forEach((li ,i)=> {
    let contents = li.textContent.split(/\s/).filter(v=>(v.trim() !== ' ')).join()
    console.log(i+1, contents)
})
-->

# 完成 150 道经典算法题的过程中所收获的经验

> [!NOTE] 注意！
> 有些题目没有给出相关经验，并不代表这道题目不重要，也不代表这道题目没有坑。
> 因为我是连续顺序刷题，所以还记得一些坑，这能能够一次 AC！但这并不代表我以后
> 就不会遇到这些坑，总的来说，还是要多刷，会的也刷，因为你既然会了，那么也不差
> 那么一点时间！

## 经验

必背算法
- KMP 算法 [23-find-the-index-of-the-first-occurrence-in-a-string]
- DFS 算法，比如 [70-invert-binary-tree]
- 二叉树必背：DFS, BFS, 前序、中序、后序、层序、mirror、递归和非递归！

必看思路
- 投票算法 [05-majority-element]
- 买卖股票 [07-best-time-to-buy-and-sell-stock]
- 罗马转数字 [17-roman-to-integer]
- 二分边界痛点！
  - [108-convert-sorted-array-to-binary-search-tree]
  - [114-search-insert-position]

有关比较时的等号问题：
- 下标 (base-0) 和长度 (base-1) 比较时，不需要相等，因为相等时会越界

使用双指针时注意事项：
- 在 while 循环中，应该同时判断两个指针是否越界！以[01-merge-sorted-array]为例。
- 判断两个指针时，应该考虑两个指针相等的情况。当它俩相等时也应该能够进入 while 循环，
  - 以 [02-remove-element] 为例
  - [114-search-insert-position] 也类似
- while 循环中，有多次判断双指针的情况时，要考虑清楚。详见 [25-valid-palindrome]

链表
- 判断是否为空时，不仅要注意 .next，也要注意 head 本身！参见 [57-linked-list-cycle]
- 我不期待你马上就能写出精简的代码，所以请你先完成需求，然后再考虑简化代码量。比如 [59-merge-two-sorted-lists]

二叉树
- 递归时，注意好当前节点是空节点，还是非空节点。同时判断好是否应该减 1。参见 [68-maximum-depth-of-binary-tree]

递归
- 有时会，递归这东西，就是你熟悉后，凭着感觉敲着敲着就过了。参见 [71-symmetric-tree]

其他需要注意的杂碎，随是杂项，但也重要！：
- 看清楚题意！比如是让你求根节点到叶子节点的路径，而不是任意一条路径，参见 [76-path-sum]
- 注意好顺序问题，参见 [03-remove-duplicates-from-sorted-array]
- 如果指针下标始终会加一，用于指向边界外面的话，那么该下标的值其实就是长度。参见 [03-remove-duplicates-from-sorted-array]
- 有时候，下标是从 0 还是和从 1 开始，将会对于两种不一样的应对方式，一种简单，一种复杂！。参见 [19-length-of-last-word]
- 永远不要真正弄成死循环！即使你觉得始终会跳出循环！参见 [20-longest-common-prefix]
- 该用哈希表是用 Map，不要想着用对象方便！因为有时候一些特殊的字符会坑了你，比如 constructor，参见 [41-word-pattern]
- 不要省变量长度，不然你可能会分不清哪个是哪个，即使你能改正过来，那也需要花费很多时间！s参见 [41-word-pattern]
- 有些题，有假设的话，就照着这个假设先实现，这个时候重要的就是如何自己提供一个测试数据。比如 [45-happy-number] 中，感觉就是每个数值都能变成小于 10，这个思路是对的，但问题在于，并不知道 7 也是满足的。如果没有给出错误通过的案例，我能想到 7 这个情况吗？
- 代码长无所谓，重点是不要出错，而且易懂！不要还没做出来，就在想着如何优化了！参见 [69-same-tree]

### 动态规划……

- [26-is-subsequence]
- [137-climbing-stairs]

### 速记

- 0-9 是 48-57  / 0x30-0x39
- A-Z 是 65-90  / 0x41-0x5A
- a-z 是 97-122 / 0x61-7A
- 向下取整：使用两次取反，比如 `~~(3/2)`
- 除 2 向下取整：直接使用位运算，比如 `3 >> 1`
- 下标除以 2 `index >> 1)`。案例：
  - [108-convert-sorted-array-to-binary-search-tree]
  ```txt{1,4}
            0  1
            ↑

            0  1  2
              ↑
  ```
- 长度除以二 `length >> 1`
  ```txt{1,4}
              0  1
                ↑

              0  1  2
                ↑
  ```

- 双下标获取中点
  - `(leftIndex + rightIndex) >> 1`
  - 如果怕越界，则使用 `leftIndex + ((rightIndex - leftIndex) >> 1)`
    - 记得加括号，因为 js 中位运算优先级低于加减乘除
  - 参见 [108-convert-sorted-array-to-binary-search-tree]
  - 参见 [114-search-insert-position]
```txt{1,4}
        3  4  5  6
           ↑

        3  4  5  6  7
              ↑
```

## 150 题

### 简单001 [merge-sorted-array]

::: code-group
<<< ./150/01.js
:::

### 简单002 [remove-element]

::: code-group
<<< ./150/02-1.js
<<< ./150/02-2.js
:::

### 简单003 [remove-duplicates-from-sorted-array]

::: code-group
<<< ./150/03-1.js
<<< ./150/03-2.js
:::

### 简单005 [majority-element]

::: code-group
<<< ./150/05-1.js
<<< ./150/05-2.js
<<< ./150/05-3.js
:::

### 简单007 [best-time-to-buy-and-sell-stock]

::: code-group
<<< ./150/07-1.js
:::

### 简单017 [roman-to-integer]

::: code-group
<<< ./150/17-1.js
:::

### 简单019 [length-of-last-word]

::: code-group
<<< ./150/19-1.js
<<< ./150/19-2.js
:::

### 简单020 [longest-common-prefix]

::: code-group
<<< ./150/20-1.js
:::

### 简单023 [find-the-index-of-the-first-occurrence-in-a-string]

::: code-group
<<< ./150/23-1.js
<<< ./150/23-2.js
:::

### 简单025 [valid-palindrome]

::: code-group
<<< ./150/25-1.js
<<< ./150/25-2.js
:::

### 简单026 [is-subsequence]

::: code-group
<<< ./150/26-1.js
<<< ./150/26-2.js
:::

### 简单039 [ransom-note]

::: code-group
<<< ./150/39-1.js
<<< ./150/39-2.js
:::

### 简单040 [isomorphic-strings]

::: code-group
<<< ./150/40-1.js
<<< ./150/40-2.js
:::

### 简单041 [word-pattern]

::: code-group
<<< ./150/41-1.js
<<< ./150/41-2.js
:::

### 简单042 [valid-anagram]

::: code-group
<<< ./150/42-1.js
<<< ./150/42-2.js
:::

### 简单044 [two-sum]

::: code-group
<<< ./150/44-1.js
<<< ./150/44-2.js
:::

### 简单045 [happy-number]

::: code-group
<<< ./150/45-1.js
<<< ./150/45-2.js
<<< ./150/45-3.js
<<< ./150/45-4.js
:::

### 简单046 [contains-duplicate-ii]

::: code-group
<<< ./150/46-1.js
<<< ./150/46-2.js
:::

### 简单048 [summary-ranges]

::: code-group
<<< ./150/48-1.js
<<< ./150/48-2.js
:::

### 简单052 [valid-parentheses]

::: code-group
<<< ./150/52-1.js
:::


### 简单057 [linked-list-cycle]

::: code-group
<<< ./150/57-1.js
<<< ./150/57-2.js
:::

### 简单059 [merge-two-sorted-lists]

::: code-group
<<< ./150/59-1.js
<<< ./150/59-2.js
<<< ./150/59-3.js
<<< ./150/59-4.js
:::

### 简单068 [maximum-depth-of-binary-tree]

::: code-group
<<< ./150/68-1.js
<<< ./150/68-2.js
<<< ./150/68-3.js
:::

### 简单069 [same-tree]

::: code-group
<<< ./150/69-1.js
<<< ./150/69-2.js
:::

### 简单070 [invert-binary-tree]

::: code-group
<<< ./150/70-1.js
<<< ./150/70-2.js
:::

### 简单071 [symmetric-tree]

::: code-group
<<< ./150/71-1.js
<<< ./150/71-2.js
<<< ./150/71-3.js
<<< ./150/71-4.js
:::

### 简单076 [path-sum]

::: code-group
<<< ./150/76-1.js
<<< ./150/76-2.js
<<< ./150/76-3.js
:::

### 简单080 [count-complete-tree-nodes]

::: code-group
<<< ./150/80-1.js
<<< ./150/80-2.js
<<< ./150/80-3.js
<<< ./150/80-4.js
<<< ./150/80-5.js
:::

### 简单083 [average-of-levels-in-binary-tree]

::: code-group
<<< ./150/83-1.js
<<< ./150/83-2.js
:::

### 简单086 [minimum-absolute-difference-in-bst]

::: code-group
<<< ./150/86-1.js
<<< ./150/86-2.js
:::

### 简单108 [convert-sorted-array-to-binary-search-tree]

::: code-group
<<< ./150/108-1.js
<<< ./150/108-2.js
:::


### 简单114 [search-insert-position]

::: code-group
<<< ./150/114-1.js
<<< ./150/114-2.js
:::

### 简单126 [add-binary]

::: code-group
<<< ./150/126.js
<<< ./150/126.py
:::

### 简单127 [reverse-bits]

::: code-group
<<< ./150/127.js
:::

### 简单128 [number-of-1-bits]

::: code-group
<<< ./150/128.js
:::

### 简单129 [single-number]

::: code-group
<<< ./150/129.js
:::

### 简单131 [palindrome-number]

::: code-group
<<< ./150/131-1.js
:::

### 简单132 [plus-one]

::: code-group
<<< ./150/132-1.js
:::

### 简单134 [sqrtx]

::: code-group
<<< ./150/134.js
:::

### 简单137 [climbing-stairs]

::: code-group
<<< ./150/137.js
:::


---
[01-merge-sorted-array]: #简单001-merge-sorted-array
[02-remove-element]: #简单002-remove-element
[03-remove-duplicates-from-sorted-array]: #简单003-remove-duplicates-from-sorted-array
[05-majority-element]: #简单005-majority-element
[07-best-time-to-buy-and-sell-stock]: #简单007-best-time-to-buy-and-sell-stock
[17-roman-to-integer]: #简单017-roman-to-integer
[19-length-of-last-word]: #简单019-length-of-last-word
[20-longest-common-prefix]: #简单020-longest-common-prefix
[23-find-the-index-of-the-first-occurrence-in-a-string]: #简单023-find-the-index-of-the-first-occurrence-in-a-string
[25-valid-palindrome]: #简单025-valid-palindrome
[26-is-subsequence]: #简单026-is-subsequence
[39-ransom-note]: #简单039-ransom-note
[40-isomorphic-strings]: #简单040-isomorphic-strings
[41-word-pattern]: #简单041-word-pattern
[42-valid-anagram]: #简单042-valid-anagram
[44-two-sum]: #简单044-two-sum
[45-happy-number]: #简单045-happy-number
[46-contains-duplicate-ii]: #简单046-contains-duplicate-ii
[48-summary-ranges]: #简单048-summary-ranges
[52-valid-parentheses]: #简单052-valid-parentheses
[57-linked-list-cycle]: #简单057-linked-list-cycle
[59-merge-two-sorted-lists]: #简单059-merge-two-sorted-lists
[68-maximum-depth-of-binary-tree]: #简单068-maximum-depth-of-binary-tree
[69-same-tree]: #简单069-same-tree
[70-invert-binary-tree]: #简单070-invert-binary-tree
[71-symmetric-tree]: #简单071-symmetric-tree
[76-path-sum]: #简单076-path-sum
[80-count-complete-tree-nodes]: #简单080-count-complete-tree-nodes
[83-average-of-levels-in-binary-tree]: #简单083-average-of-levels-in-binary-tree
[86-minimum-absolute-difference-in-bst]: #简单086-minimum-absolute-difference-in-bst
[108-convert-sorted-array-to-binary-search-tree]: #简单108-convert-sorted-array-to-binary-search-tree
[114-search-insert-position]: #简单114-search-insert-position
[126-add-binary]: #简单126-add-binary
[127-reverse-bits]: #简单127-reverse-bits
[128-number-of-1-bits]: #简单128-number-of-1-bits
[129-single-number]: #简单129-single-number
[131-palindrome-number]: #简单131-palindrome-number
[132-plus-one]: #简单132-plus-one
[134-sqrtx]: #简单134-sqrtx
[137-climbing-stairs]: #简单137-climbing-stairs

[merge-sorted-array]: https://leetcode.cn/problems/merge-sorted-array/submissions/517636833/?envType=study-plan-v2&envId=top-interview-150
[remove-element]: https://leetcode.cn/problems/remove-element/?envType=study-plan-v2&envId=top-interview-150
[remove-duplicates-from-sorted-array]: https://leetcode.cn/problems/remove-duplicates-from-sorted-array/?envType=study-plan-v2&envId=top-interview-150
[majority-element]: https://leetcode.cn/problems/majority-element/?envType=study-plan-v2&envId=top-interview-150
[best-time-to-buy-and-sell-stock]: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-interview-150
[roman-to-integer]: https://leetcode.cn/problems/roman-to-integer/description/?envType=study-plan-v2&envId=top-interview-150
[length-of-last-word]: https://leetcode.cn/problems/length-of-last-word/description/?envType=study-plan-v2&envId=top-interview-150
[longest-common-prefix]: https://leetcode.cn/problems/longest-common-prefix/description/?envType=study-plan-v2&envId=top-interview-150
[find-the-index-of-the-first-occurrence-in-a-string]: https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/?envType=study-plan-v2&envId=top-interview-150
[valid-palindrome]: https://leetcode.cn/problems/valid-palindrome/?envType=study-plan-v2&envId=top-interview-150
[is-subsequence]: https://leetcode.cn/problems/is-subsequence/description/?envType=study-plan-v2&envId=top-interview-150
[ransom-note]: https://leetcode.cn/problems/ransom-note/?envType=study-plan-v2&envId=top-interview-150
[isomorphic-strings]: https://leetcode.cn/problems/isomorphic-strings/description/?envType=study-plan-v2&envId=top-interview-150
[word-pattern]: https://leetcode.cn/problems/word-pattern/description/?envType=study-plan-v2&envId=top-interview-150
[valid-anagram]: https://leetcode.cn/problems/valid-anagram/description/?envType=study-plan-v2&envId=top-interview-150
[two-sum]: https://leetcode.cn/problems/two-sum/?envType=study-plan-v2&envId=top-interview-150
[happy-number]: https://leetcode.cn/problems/happy-number/?envType=study-plan-v2&envId=top-interview-150
[contains-duplicate-ii]: https://leetcode.cn/problems/contains-duplicate-ii/description/?envType=study-plan-v2&envId=top-interview-150
[summary-ranges]: https://leetcode.cn/problems/summary-ranges/description/?envType=study-plan-v2&envId=top-interview-150
[valid-parentheses]: https://leetcode.cn/problems/valid-parentheses/description/?envType=study-plan-v2&envId=top-interview-150
[linked-list-cycle]: https://leetcode.cn/problems/linked-list-cycle/description/?envType=study-plan-v2&envId=top-interview-150
[merge-two-sorted-lists]: https://leetcode.cn/problems/merge-two-sorted-lists/description/?envType=study-plan-v2&envId=top-interview-150
[maximum-depth-of-binary-tree]: https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150
[same-tree]: https://leetcode.cn/problems/same-tree/description/?envType=study-plan-v2&envId=top-interview-150
[invert-binary-tree]: https://leetcode.cn/problems/invert-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150
[symmetric-tree]: https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=top-interview-150
[path-sum]: https://leetcode.cn/problems/path-sum/description/?envType=study-plan-v2&envId=top-interview-150
[count-complete-tree-nodes]: https://leetcode.cn/problems/count-complete-tree-nodes/description/?envType=study-plan-v2&envId=top-interview-150
[average-of-levels-in-binary-tree]: https://leetcode.cn/problems/average-of-levels-in-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150
[minimum-absolute-difference-in-bst]: https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/?envType=study-plan-v2&envId=top-interview-150
[convert-sorted-array-to-binary-search-tree]: https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/?envType=study-plan-v2&envId=top-interview-150
[search-insert-position]: https://leetcode.cn/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-interview-150
[add-binary]: https://leetcode.cn/problems/add-binary/description/?envType=study-plan-v2&envId=top-interview-150
[reverse-bits]: https://leetcode.cn/problems/reverse-bits/?envType=study-plan-v2&envId=top-interview-150
[number-of-1-bits]: https://leetcode.cn/problems/number-of-1-bits/?envType=study-plan-v2&envId=top-interview-150
[single-number]: https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=top-interview-150
[palindrome-number]: https://leetcode.cn/problems/palindrome-number/description/?envType=study-plan-v2&envId=top-interview-150
[plus-one]: https://leetcode.cn/problems/plus-one/?envType=study-plan-v2&envId=top-interview-150
[sqrtx]: https://leetcode.cn/problems/sqrtx/description/?envType=study-plan-v2&envId=top-interview-150
[climbing-stairs]: https://leetcode.cn/problems/climbing-stairs/?envType=study-plan-v2&envId=top-interview-150
