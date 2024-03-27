type MarkdownList = Array<{
    /** 对路径进行分割，并存储在数组中，比如 [docs, debug, index.md] */
    splitPath: string[],
    /** 链接路径，比如 docs/debug/index.md */
    linkPath: string,
}>
