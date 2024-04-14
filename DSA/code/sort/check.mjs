import sortBubble from './sort_bubble.mjs'
import sortInsert from './sort_insert.mjs'
import sortMerge1 from './sort_merge-1.mjs'
import sortQuick1 from './sort_quick-1.mjs'
import sortQuick2 from './sort_quick-2.mjs'
import sortSelect2 from './sort_select-2.mjs'
import sortSelect from './sort_select.mjs'

check(sortBubble)
check(sortInsert)
check(sortMerge1)
check(sortQuick1)
check(sortQuick2)
check(sortSelect2)
check(sortSelect)

function check(fn) {
    const checkOne = () => {
        const length = ~~(Math.random() * 100)
        const arr = Array.from({length}, () => {
            ~~(Math.random() * 10)
        })
        if (fn([...arr]).join(',') !== arr.toSorted((a,b)=>a-b).join(',')) {
            throw new Error(arr)
        }
    }
    for (let i = 0; i < 100; i++) {
        checkOne()
    }
}
