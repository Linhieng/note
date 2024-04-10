import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

// 使用 defineConfig 是为了获得类型提示，直接导出一个对象也是可以的
export default defineConfig({
    input: 'src/index.ts',
    // resolve() 默认会将所有外部依赖打包，不想打包的外部依赖需要添加到这里
    external: ['the-answer'],
    plugins: [
        // 导入模块时，经常会省略扩展名，该插件就是用来自动判断扩展名的
        nodeResolve({ extensions: ['.ts'] }),
        // ⚠️ extensions 默认不包含 ts，所以需要提供 .ts
        babel({ babelHelpers: 'bundled', extensions: ['.ts'] }),
        commonjs(),
        resolve(),
    ],
    output: [
        {
            file: 'dist/build.js',
            format: 'cjs',
        },
        {
            file: 'dist/build.min.js',
            format: 'cjs',
            plugins: [terser()], // 打包后再处理的插件要放在这里
        },
    ],
})
