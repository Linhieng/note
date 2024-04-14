import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import { join, extname, basename } from 'node:path'

const nav = [
    // { pathPrefix: '/web/', dir: 'web/', text: 'web 相关', link: '/web/README' },
    // { pathPrefix: '/vscode/', dir: 'vscode/', text: 'vscode', link: '/vscode/README' },
    { pathPrefix: '/DSA/', dir: 'DSA/', text: '数据结构与算法', link: '/DSA/README' },
    // { pathPrefix: '/CLI/', dir: 'CLI/', text: '命令行', link: '/CLI/README' },
    // { pathPrefix: '/interview/', dir: 'interview/', text: '面试相关', link: '/interview/css' },
]
const getNav = () => nav.map(item => ({ text: item.text, link: item.link }))

function dfsReadme(dir) {
    const ans = []
    const subFiles = fs.readdirSync(dir)
    subFiles.sort((a,b) => {
        // 我要让以 _ 开头的排在前面
        if (a.startsWith('_') && !b.startsWith('_')) return -1
        else if (!a.startsWith('_') && b.startsWith('_')) return 1
        return a-b
    })

    for (const child of subFiles) {
        const childPath = join(dir, child)
        if (isDir(childPath)) {
            const items = dfsReadme(childPath)
            if (items.length > 0) {
                ans.push({
                    text: basename(childPath, '.md'),
                    items
                })

            }
        } else if (extname(childPath) === '.md') {
            ans.push({
                text: basename(childPath, '.md'),
                link: childPath
            })
        }
    }
    return ans
}
/**
 * 不同页面路径，输出不同的侧边栏
 */
function getOneSidebar(pathPrefix) {
    const sidebar = dfsReadme(pathPrefix)
    console.log(sidebar);
    return sidebar
        .filter(v => !(v.text === 'README.md'))
        .map(v => ({ ...v, collapsed: true }))
}
function getSideBar() {
    const sidebar = {}
    nav.forEach(item => {
        sidebar[item.pathPrefix] = getOneSidebar(item.dir)
    })
    return sidebar
}
function isDir(url) {
    return !fs.statSync(url).isFile()
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "我的笔记",
    description: "A VitePress Site",

    themeConfig: {
        nav: getNav(),
        sidebar: getSideBar(),

        editLink: {
            text: '在 Github 上查看此页',
            pattern: 'https://github.com/linhieng/note/tree/main/:path'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/linhieng/note' }
        ]
    }
})
