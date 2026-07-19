### stress-ng 手搓内存占用

压测工具
```sh
stress-ng --vm 1 --vm-bytes 400M --timeout 30
# --vm 1 创建 1 个独立内存压测线程/进程？
# --vm-bytes 1400M 控制每个 vm 进程？占用内存大小
# --timeout 30 运行 30s 后自动结束，默认需要 ctrl+c 才结束，这个时间是CPU运行时间，遇到卡顿会延长

stress-ng --vm 1 --vm-bytes 100M --vm-lock --timeout 30
stress-ng --vm 1 --vm-bytes 100M --vm-populate --timeout 30
# --vm-lock 调用 mlock 锁定内存，禁止内核回收、swap 迁出页面？
# --vm-populate，mmap 阶段一次性预分配所有物理页面？
# 效果就是在 top 中对应压测进程不会抖动。不过实测这两个在前面 10s 还是会抖动，后面才稳定。
# 但修改占用 500M 时，--vm-lock 参数加上后，直接不分配内存了。--vm-populate 参数加上后，则是30s还是在抖动，加了等于没加。这个时候我就怀疑，这两个参数大概率根本就没法防抖动，所以不加这两个参数，纯测试了 100M，发现100M在10s后也不抖动了！
```

感觉这个软件，还不如 AI 手搓的 C 程序：
```sh
vim alloc_mem.c
# 创建文件， 写入下面的代码
gcc alloc_mem.c -o alloc_mem
# 编译生成可执行程序
./alloc_mem 1500
# 一次性申请占用 1500M内存，按下 ctrl+c 取消占用
```

具体源码：
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/mman.h> // mmap / munmap 内存映射系统调用、映射宏定义

// 参数：./alloc_mem 占用大小(MB)
int main(int argc, char **argv)
{
	// 入参校验
    if (argc != 2) {
        printf("Usage: %s MB\n", argv[0]);
        return 1;
    }
    long mb = atol(argv[1]);
    long bytes = mb * 1024 * 1024;

    // MAP_ANONYMOUS 匿名内存，MAP_POPULATE 一次性预分配物理页
    char *p = mmap(NULL, bytes, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS|MAP_POPULATE, -1, 0);
    if (p == MAP_FAILED) {
        perror("mmap failed");
        return 2;
    }
    // memset逐字节写入内存，强制 CPU 访问每一页虚拟内存，确保全部物理页绑定，避免缺页延迟分配
    memset(p, 0x55, bytes);
	// 执行到 printf 这一行时，指定大小的物理内存已经 100% 全部占用完毕，没有惰性延迟分配。
    printf("Success alloc %ld MB memory, hold 60s\n", mb);
    sleep(60);

	// mmap 配套释放函数，归还虚拟内存与物理内存给操作系统；
    munmap(p, bytes);
    return 0;
}
```
