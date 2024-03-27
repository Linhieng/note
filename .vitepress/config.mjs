import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import { join, sep, basename } from 'path'
import { normalize } from 'node:path'

const docsRoot = './docs'

/** 侧边栏中的一级标题，可能需要更改名称 */
const basenameMapping = (_basename) => {
    _basename = basename(_basename, '.md')
    switch (_basename) {
        case 'debug': return '个人遇到的问题以及解决方案'

        case 'misc': return '其他杂项'

        case 'base': return '概览'

        case 'my': return '个人整理'

        default: return _basename
    }
}
function isFile(docsDir) {
    const stat = fs.statSync(docsDir)
    return stat.isFile()
}
function splitPath(path) {
    return path.split(sep)
}
function formatLink(link) {
    return '/' + normalize(link).split(sep).join('/')
}
/**
 *
 * @param {string} rootPath
 * @returns {MarkdownList}
 */
function dfs(rootPath) {
    /** @type {MarkdownList} */
    const markdownList = []
    const stack = [rootPath]
    const hadVisited = [rootPath]
    let curNode, children
    while (stack.length !== 0) {
        curNode = stack.pop()
        if (isFile(curNode)) {
            if (curNode.endsWith('.md')) {
                markdownList.push({
                    splitPath: splitPath(curNode),
                    linkPath: formatLink(curNode)
                })
            }
            continue
        }
        children = fs.readdirSync(curNode).map(v => join(curNode, v))
        for (const child of children) {
            if (!hadVisited.includes(child)) {
                stack.push(curNode, child)
                hadVisited.push(child)
                break
            }
        }
    }
    return markdownList
}

/**
 *
 * @param {MarkdownList} markdownList
 * @returns
 */
function generateSideBar(markdownList) {
    const sidebar = [{
        text: '',
    }]
    const sideBarItems = []
    const textMap = new Map()

    markdownList.forEach(({ splitPath, linkPath }) => {
        const firstFolder = splitPath[1]
        if (splitPath.length === 2) {
            // 对于单个文件，没有文件夹的情况，直接展示，不需要拥有子项
            textMap.set(firstFolder, linkPath)
            return
        }

        if (textMap.has(firstFolder)) {
            const items = textMap.get(firstFolder)
            textMap.set(firstFolder, [...items, linkPath])
        } else {
            textMap.set(firstFolder, [linkPath])
        }
    })
    for (const [text, links] of textMap) {
        if (links instanceof Array) {
            const items = links.map(link => ({
                text: basenameMapping(link),
                link
            }))
            sideBarItems.push({
                text: basenameMapping(text),
                items
            })
        } else {
            // 单标签，无下拉
            sideBarItems.push({
                text: basenameMapping(text),
                link: links
            })
        }
    }
    sidebar[0].items = sideBarItems
    return sidebar
}
const markdownList = dfs(docsRoot)
const sidebar = generateSideBar(markdownList)


// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "linhieng 整理的面经/前端基础",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/' },
            { text: '面经', link: '/README' },
            { text: 'web 笔记', link: 'https://blog.linhieng.com/Lim-note-web' },
            { text: 'vscode 笔记', link: 'https://blog.linhieng.com/Lim-note-vscode' },
        ],

        sidebar,

        socialLinks: [
            { icon: 'github', link: 'https://github.com/linhieng/lim-note-interview' }
        ],

        search: {
            provider: 'local'
        }
    }
})
