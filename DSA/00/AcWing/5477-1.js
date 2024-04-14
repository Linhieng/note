/**
 *
 * @param {number} n 一份套餐中的所有类型食物的总和，必须等于 n
 * @param {number} m 表示有多少种食物
 * @param {number[]} nums 元素值表示各种食物所拥有的数量
 * @returns
 */
function resolve(n, m, nums) {

    /** 判断制作 mealNum 个套餐时，所需食物总数是否大于 n */
    const check = (mealNum) => {
        let res = 0

        nums.forEach( num => {
            res += ~~(num / mealNum)
        })
        return res >= n
    }

    let left = 0
    // 最多可能制作 m/n 个套餐
    let right = ~~(m / n)

    // 对最终能做出来的套餐数量进行二分
    while (left < right) {
        let mid = left + right + 1 >>> 1
        if (check(mid)) {
            left = mid
        } else {
            right = mid - 1
        }
    }
    // 最终 left 和 right 相等，所以返回 left 或者 right 都可以
    return right
}


let buf = ''

process.stdin.on('readable', () => {
    let chunk = process.stdin.read()
    if (chunk) buf += chunk.toString()
})

process.stdin.on('end', () => {
    const inputs = []
    buf.split('\n').forEach(line => {
        inputs.push(
            line.split(' ').map(v => Number(v))
        )
    })
    const map = new Map()
    inputs[1].forEach(typeId => {
        map.set(typeId, map.get(typeId) + 1 || 1)
    })

    console.log(resolve(inputs[0][0], inputs[0][1], Array.from(map.values())))
})
