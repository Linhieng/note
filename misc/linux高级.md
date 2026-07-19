# OOM、oom Killer、NUMA、D-Bus 通信标准

专门写篇文章介绍一下
# linux 高级

linux 高级，只记录 linux 内核相关的。

内核，主要负责：
- 硬件抽象：驱动管理 CPU、内存、磁盘、网卡等硬件；
- 进程管理：进程创建、调度、信号、cgroup、namespace 隔离；
- 内存管理：虚拟内存、页表、缓存、swap、内存回收、OOM；
- 文件系统：ext4/xfs/tmpfs/proc/sysfs 虚拟文件；
- 网络协议栈：TCP/IP、socket；
- 权限安全：用户 / 组、文件权限、capability；
- 系统调用：对外暴露统一接口，给用户态程序使用；
- 中断、时钟、锁、内核模块等底层基础设施。

## 内核、进程

- D状态不可中断的睡眠状态，使用 kill -9 也无法杀死。因为强制 kill 也只是给进程发送一个 SIGKILL 信号。当进程处于D状态时，无法处理任何信号，包括 SIGKILL，所以进程无法终止。

### [cgroup v2]

cgroup 是 control group 的缩写，文档术语规定了首字母永远不大写，默认挂载到 `/sys/fs/cgroup/` 目录中。

cgroup 是 Linux 内核进程分层资源管控机制，主要由两部分组成：core 和 controllers。cgroup core 负责进行层级化，cgroup controllers 主要负责资源管控。资源管控从上至下传递，子 cgroup 无法突破父级资源限制。

资源管控，主要管控的是 CPU、内存、IO、进程线程数量、网卡等等。

[cgroup v1 和 v2 版本对比]：
- v1 中采用多个独立层级，cpu、memory、io、pid等各自都是独立树形目录。v2 则采用统一层级，之前的独立层级全部挂到 `0::` 下。格式为 `0::$PATH`。可以通过 `/proc/$PID/cgroup` 文件查看进程归属 cgroup。
- v1 中父子层级约束混乱，v2 中解决了这个问题（资源管控自上而下传递）
  - 子 cgroup 无法突破父节点的资源限制
  - 子 cgroup 只能启用父节点允许的控制器
  - 父节点若开启域控制器，自身不能存在运行进程，彻底隔离父内部进程与子组资源竞争；（但根 cgroup 豁免该限制，承载系统匿名资源；）
- v1 各控制器接口不统一、语义割裂，v2 全局标准化接口规范，所有控制器复用同一套语义。
- v1 线程 / 进程模型混乱，v2 区分 domain/threaded 双模型。在 domain 模式下，一个进程的所有线程都必须属于同一个 cgroup


可以直接读写配置文件进行操作 cgroup，也可以借助 systemd 软件管理

```sh
cat /sys/fs/cgroup/xxx子组/控制文件
# 读取配置
echo xxx > /sys/fs/cgroup/xxx子组/控制文件
# 同步（阻塞）修改配置
```

#### [cgroup 内存管理]

cgroup 内存管理中，
- 父子层级有额度竞争：父额度是子组总额度上限，子组总额度超额时，按实际占用比例瓜分父级保护额度；
- 额度的单位是字节，并且会自动向上对齐 PAGE_SIZE（通常是4096B）

四种保护档位
- memory.min：硬保护，当实际内存占用低于该值时，无论系统压力多大，都不回收该 cgroup 的内存。无可回收内存时直接 OOM；
- memory.low：相比 min 更宽松，系统压力过大时会回收该 cgroup 的内存；
- memory.max：硬上限，当 cgroup 占用内存触及硬上限，并且没有可以回收的内存时，触发 OOM。
- memory.high：相比 max 更宽松，可以超出 high 值而不是直接触发 oom，但超限后 cgroup 内进程会被节流限流，同时承受高强度内存回收压力；
- 注意，max 和 high 有两种编辑方式：O_WRONLY（阻塞式/同步）和 O_NONBLOCK（非阻塞式/异步）。
- 使用命令行的编辑都是同步，同步修改后会进行同步回收、oom等操作。
- 通过编程语言可以传递 O_NONBLOCK 进行异步修改，异步修改会跳过同步回收、OOM 触发逻辑，延迟到下一次内存分配时处理。这个“延迟到下一次内存分配时再处理”意味着风险，如果业务侧持续疯狂申请、刷写内存，不触发新内存分配，那么内存占用将长时间高于 high/max。

#### [cgroup IO管理]

IO 控制器支持两种资源管控模型：一是按权重比例分配 IO 资源（只有在）；二是设置硬上限限制，上限可选择限制带宽或 IOPS

io-interface-files：基础限流、权重、监控（最核心）
writeback：缓冲写脏页 IO 专项管控（内存 + IO 联动）
io-latency + how-io-latency-throttling-works + io-latency-interface-files：完整一套 IO 延迟保障 QoS（概述 + 原理 + 配置文件）
io-priority：全局批量调整进程 IO 抢占优先级

- $CGROUP/io.stat
  - rbytes：累计读取字节，全盘扫描会暴涨；
  - rios：累计读 IO 次数，大量小文件扫描该值飙升；
  - depth/avg_lat（开启 io.latency 后出现）：磁盘队列深度、平均 IO 延迟，D 进程越多 avg_lat 越高；
- 开启 io.latency，io.stat 会新增
  - avg_lat：IO 平均完成延迟，全盘扫描会从几 ms 飙升至几十 / 上百 ms；
  - depth：磁盘排队 IO 深度，队列越长进程越容易 D 阻塞。
  - $CGROUP/memory.stat 中 file 字段 = 文件页缓存，扫描文件越多该值越大。
- $CGROUP/io.pressure
  - some：部分进程等待 IO 的时长；
  - full：组内所有进程都卡在 IO 等待（大量 D 进程时该数值持续上涨）；只要 full 数值持续走高，就说明全盘扫描的读 IO 把磁盘打满，进程无法获取 IO 资源进入 D 状态。

- io.max 硬限制读带宽 / 读 IOPS
- io.weight 权重分配（多业务共享磁盘场景）。前提：磁盘调度器切换为 bfq
- io.latency 给核心业务 cgroup 设置延迟目标，磁盘拥塞时内核自动节流扫描任务 cgroup，优先保障核心业务 IO 延迟。逻辑：当扫描任务把磁盘打满、业务 IO 延迟超过 75ms，内核主动限制扫描 cgroup 的并发 IO 数量，降低扫描抢占，业务进程不会进入 D 状态。
- io.prio.class 把全盘扫描的 cgroup 所有进程 IO 优先级改为最低 IDLE，只有磁盘完全空闲时才允许扫描读 IO，完全不抢占业务 IO。

```sh
cat /sys/block/[xx]/queue/scheduler
# 查看当前支持的调度器，默认 mq-deadline
```

### `/proc/[pid]`


- oom_adj 已废弃（2.6 版本以前使用，区间-16 ~ 15，值 -17 代表豁免）
- oom_score 只读，
- oom_score_adj 人工调节偏移量
oom 取值区间固定：-1000 ~ 1000，默认值全部为 0，表示完全按内核默认规则打分。
指定为 -1000 表示豁免，但也仅屏蔽系统全局 OOM Killer，如果是 cgroup 内存限制触发的容器内部 OOM，该参数不生效。
可以直接使用 `echo -1000` 或者 `choom` 命令人工调节偏移量。

### /proc/zoneinfo 和 [/proc/meminfo]



### [/proc/sys/vm]

`/proc/sys/vm` 是 Virtual Memory 虚拟内存，该文件夹下的文件都是存在内核中的，不是磁盘中的具体文件，这些文件是用来调控 Linux 虚拟内存子系统行为的，比如内存分配策略、缓存回收、脏页刷盘、OOM 查杀、Swap 倾向、内存预留、缓存清理等。

具体手册可以查看官网 [/proc/sys/vm]

相关配置命令有：
```sh
cat /proc/sys/vm/[config]
sysctl vm.[config]
# 查看当前值

echo [value] > /proc/sys/vm/[config]
sysctl vm.[config]=[value]
# 修改值，立刻生效，不过重启失效

# 想要永久生效，就将上面的修改命令写入到开机脚本中 /etc/sysctl.conf
echo "vm.[config]=[value]" >> /etc/sysctl.conf
sysctl -p # 啥作用？
sysctl -w # 啥作用？
```

#### oom 相关参数

- panic_on_oom
  - OOM(out-of-memory,内存耗尽) 时行为控制，可选杀死进程或整机 panic（奔溃重启）。
  - 0 表示触发 OOM killer，挑选进程杀掉，尽量保系统运行（默认值）
  - 1 表示仅整机内存耗尽才 panic；若仅单个 NUMA 节点内存不足，只杀该节点进程，不 panic。
  - 2 表示任意区域发生 OOM（含 cgroup 内 OOM、单节点 OOM），整机强制 panic，配合 kdump 可抓崩溃快照排查内存泄漏。
  - 内存耗尽后，会根据 `/proc/sys/kernel/panic` 的值判断多少秒后重启内核。默认为 0 表示永不重启
- oom_kill_allocating_task
  - 设置 oom kill 的选择被杀进程的策略
  - 0 表示遍历所有进程，选分数最高的杀，耗时久。（默认）
  - 1 表示直接杀死触发 oom 的任务，响应更快。
- oom_dump_tasks
  - OOM 触发时是否打印全系统进程内存信息（pid、rss、vm 大小、oom_score_adj 等），用于定位内存大户。
  - 可以通过 dmesg / journalctl 命令查看，或者查看日志文件，日志通常保存在 /var/log/messages 或 /var/log/kern.log
  - 注意日志中的进程打分表，也就是 Tasks state (memory values in pages)，他的 rss 列单位是内存页，一般服务器的内存页单位都是 4096（即4KiB），具体可以通过 `getconf PAGE_SIZE` 命令查看。
  - 1 表示打印（默认）
  - 0 表示只打印极简日志，减少开销


- overcommit_memory
  - 控制系统内存超额分配策略（控制的是进程申请的虚拟地址空间总大小，而不是进程实际占用的空间大小）
  - 间接决定 oom 触发概率
  - 0 表示 guess 模式，允许超额，但拒绝明显不合理超大内存申请（默认）
  - 1 表示允许超额，无任何限制。
  - 2 表示 never 模式，禁止超额分配，可申请上限取决于 overcommit_ratio 和 overcommit_kbytes
  - 不要随便设置成 never 模式，很可能导致所有 ssh 被杀死，并且无法登录进去，VNC也无法登录，因为无法分配到内存，最终只能重启（毕竟修改测试时应该是使用临时生效吧，如果修改成开机生效，那恐怕就得加内存或者重装了）。
  - 重启后正常设置为 never 模式后，很多软件的运行都会有问题，因为这些软件系统性申请冗余内存，但因为 never 模式禁止他们申请太多内存，就导致很多软件无法正常使用。
- overcommit_ratio
  - 当 overcommit_memory 为 2 时生效。
  - 控制物理内存计入上限的比例，默认 50。
  - 最大允许申请虚拟地址空间 = Swap 总大小 + (物理内存总量 × overcommit_ratio百分比)
- overcommit_kbytes
  - 当 overcommit_memory 为 2 时生效。
  - 直接指定可使用的物理内存额度
  - 最大允许申请虚拟地址空间 = Swap 总大小 + overcommit_kbytes（KiB）
> [!WARNING]
> overcommit_ratio 和 overcommit_kbytes 是互斥的，两者只能生效一个。修改其中一个，另外一个会自动变为 0。
> 不要随便测试，防止改错设置导致断开所有连接（包括VNC），最终只能强制重启。

- admin_reserve_kbytes
  - 为具备 cap_sys_admin 的用户预留的最小内存。
  - 按照官方文档的说法，需要预留的最小内存 = 登录服务 (sshd/login) + shell (bash) + 运维工具 (top/ps/kill)。
  - 当 overcommit_memory 为 0（guess模式）时，按程序实际驻留内存 RSS 求和，x86_64 架构约 8MB。
  - 当 overcommit_memory 为 2（never模式） 时，取所有工具最大虚拟内存 VSZ + 全部 RSS 之和，x86_64 架构建议 128MB。
  - 该值不受 overcommit_memory 影响，一直生效
  - TODO：实际测试下来，物理内存1.7G，无交换，设置 admin_reserve_kbytes 为1G，guess模式，然后用普通用户压测，依旧可以占满内存让所有用户都无法操作，只不过使用 stress-ng 压测会触发 oom，但使用 vscode 则不会 oom
  - 原因是该值只限制一次性的虚拟内存申请（无法测试成功），并不是强制保留 1G 物理内存不给普通用户。
  - 使用c代码一次性申请 1380MiB，会消耗10多秒才申请到内存，并且占用10多秒后就会被kill。
  - 但申请 1352MiB 空间，就能够申请成功，并且持续占用，此时会发现 root 用户明显卡顿，新建 ssh 登录也会发现无法登录，这不就是 vscode 的场景！我现在是弄出了我想要的可复现的场景出来！有点区别的就是我精准的控制了内存占用大小，不会被 kill，但同时又会导致所有用户卡顿，无法ssh登录，而且我可以随时 ctrl+c 终止这种状态（当然也会卡顿10多秒，但好过等好几个小时）！
  - 测试发现，不管我设不设置该值，普通用户都能申请 1352MiB 空间，并导致所有用户卡顿。
  - 如果我改成 never 模式呢？崩，所有用户直接被强制退出，无法登录，VNC也一样！大概率是因为我前面操作了一些东西，导致很多进程占用了申请的内存，所以其他进程就无法继续申请内存了，连root也无法申请。重启一下再改为 never 就没问题了，但也只是 root 用户没问题，普通用户登进去只敲了个 `w` 就被闪退了
  - 总的来说，这个参数没什么用，具体可以看看 [博客VmAdminReserveNotEnough]，不过这篇文章说 已登录的 root 可以使用该保留的内存，我实测下来发现普通用户占满内存后，已登录的root依旧卡顿，没法使用保留的内存。
- user_reserve_kbytes
  - 当 overcommit_memory 为 2 时生效。
  - 给用户预留的内存。默认128MiB
  - TODO：因为前面的 admin_reserve_kbytes 没测试明白，这个配置我就不解读了。当我彻底弄懂了上面的后，这里的也很容易理解了。
- lowmem_reserve_ratio
  - 保护 DMA/DMA32 低区内存，和整机用户预留无关。


- min_free_kbytes
  - 设置内核强制预留的最小空闲物理内存（单位：KiB）
  - 这是用来隔离「内核」和「上层应用」的，和用户无关系，
  - 低于该值时会触发进程同步回收、卡死、OOM。
  - /proc/meminfo 中的 MemAvailable 计算时，会先用 MemFree 减去 min_free_kbytes 值。不过修改此值对用户的感知只是可用内存变少了，毕竟保留的内存并不会给用户使用，所以内存占满时，依旧会无法敲命令，无法ssh登录。
  - 验证方法：该值默认是 44MiB，用自建函数占用临界值内存，执行 `free` 命令会发现 free 值比 available 大 44。修改此值为100MiB，再次用自建函数占用临界值内存，会发现临界值内存变小了，并且查看到的 free 值比 available 大 100。两个值都可以找到临界值内存，也就是占用此内存后，所有用户卡顿，并且占用内存的进程不会被 oom killer

- zone_reclaim_mode
  - NUMA 节点本地内存耗尽时优先回收本地缓存，避免跨节点分配、延迟本地 OOM 触发。
  - NUMA 专用，本地 node 内存不够时，优先回收本地缓存，尽量不跨 node 拿远端内存，降低延迟。


- swappiness
  - 控制 swap 交换积极性，0 表示尽可能不交换，100表示尽可能交换。
  - 默认是 0
- page-cluster
  - 一次交换读写连续页面数量，优化 Swap IO 性能
  - 取值为对数：0=1 页、1=2 页、2=4 页、默认 3=8 页
- vfs_cache_pressure
  - swappiness 控制「页缓存 vs 匿名页（swap）」回收权重；
  - vfs_cache_pressure 控制「目录项 / 索引节点缓存（dentry/inode）vs 页缓存」回收权重。
- vfs_cache_pressure_denom
  - 默认 100

- 控制 kswapd 回收激进程度，水位调大提前回收内存，减少 OOM 概率。
  - watermark_scale_factor
  - watermark_boost_factor
- 脏页回写（脏页回收减少文件缓存占用，间接改变 swap 触发时机）
  - dirty_background_bytes
  - dirty_background_ratio
  - dirty_bytes
  - dirty_expire_centisecs
  - dirty_ratio
  - dirty_writeback_centisecs
- 辅助碎片 / 压缩参数（间接改变内存可用量，影响 swap 频率）
  - compaction_proactiveness /compact_memory/defrag_mode 内存压缩整理连续页，提升大页分配成功率，减少内存碎片化导致的虚假内存不足，降低 swap 触发概率。
  - extfrag_threshold 碎片阈值，达到阈值触发压缩 / 直接回收，回收会包含匿名页，间接增加 swap。



#### 其他未整理
```sh
admin_reserve_kbytes
compact_memory
compact_unevictable_allowed
compaction_proactiveness
dirty_background_bytes
dirty_background_ratio
dirty_bytes
dirty_expire_centisecs
dirty_ratio
dirty_writeback_centisecs
dirtytime_expire_seconds
drop_caches
extfrag_threshold
hugetlb_shm_group
legacy_va_layout
lowmem_reserve_ratio
max_map_count
memory_failure_early_kill
memory_failure_recovery
min_free_kbytes
min_slab_ratio
min_unmapped_ratio
mmap_min_addr
mmap_rnd_bits
mmap_rnd_compat_bits
nr_hugepages
nr_hugepages_mempolicy
nr_overcommit_hugepages
numa_stat
numa_zonelist_order
oom_dump_tasks
oom_kill_allocating_task
overcommit_kbytes
overcommit_memory
overcommit_ratio
page_lock_unfairness
page-cluster
panic_on_oom
percpu_pagelist_high_fraction
stat_interval
stat_refresh
swappiness
unprivileged_userfaultfd
user_reserve_kbytes
vfs_cache_pressure
watermark_boost_factor
watermark_scale_factor
zone_reclaim_mode
laptop_mode
```


[cgroup v2]: https://docs.kernel.org/admin-guide/cgroup-v2.html
[cgroup 内存管理]: https://docs.kernel.org/admin-guide/cgroup-v2.html#memory-interface-files
[cgroup IO管理]: https://docs.kernel.org/admin-guide/cgroup-v2.html#io
[/proc/meminfo]: https://www.kernel.org/doc/Documentation/filesystems/proc.rst
[/proc/sys/vm]: https://docs.kernel.org/admin-guide/sysctl/vm.html
[博客VmAdminReserveNotEnough]: https://utcc.utoronto.ca/~cks/space/blog/linux/VmAdminReserveNotEnough
[cgroup v1 和 v2 版本对比]: https://docs.kernel.org/admin-guide/cgroup-v2.html#issues-with-v1-and-rationales-for-v2