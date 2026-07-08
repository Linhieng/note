
cgroup

## 进程

### user.slice

```sh
systemctl set-property --runtime user.slice MemoryMax=700M MemorySwapMax=0
# 配置所有用户最大内存占用，包括root用户
systemctl set-property --runtime user-0.slice MemoryMin=200M
# 然后再单独为 root 用户配置最小内存占用
systemctl show user.slice | grep Memory
# 查看配置情况
```

### OOM、oom Killer、NUMA

专门写篇文章介绍一下


### `/proc/[pid]`


- oom_adj 已废弃（2.6 版本以前使用，区间-16 ~ 15，值 -17 代表豁免）
- oom_score 只读，
- oom_score_adj 人工调节偏移量
oom 取值区间固定：-1000 ~ 1000，默认值全部为 0，表示完全按内核默认规则打分。
指定为 -1000 表示豁免，但也仅屏蔽系统全局 OOM Killer，如果是 cgroup 内存限制触发的容器内部 OOM，该参数不生效。
可以直接使用 `echo -1000` 或者 `choom` 命令人工调节偏移量。

### /proc/zoneinfo 和 /proc/meminfo



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
  - 1 表示打印（默认）
  - 0 表示只打印极简日志，减少开销


- overcommit_memory
  - 控制系统内存超额分配策略（控制的是进程申请的虚拟地址空间总大小，而不是进程实际占用的空间大小）
  - 间接决定 oom 触发概率
  - 0 表示允许超额，但拒绝明显不合理超大内存申请（默认）
  - 1 表示允许超额，无任何限制。
  - 2 表示禁止超额分配，可申请上限取决于 overcommit_ratio 和 overcommit_kbytes
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
  - 为具备 cap_sys_admin 的用户保留的内存，默认 8MiB。
  - 一直生效，不受 overcommit_memory 影响
  - TODO: 实际测试下来，总内存1.7G，设置 admin_reserve_kbytes 为1G，然后用普通用户压测，依旧可以占满内存让所有用户都无法操作
- user_reserve_kbytes
  - 当 overcommit_memory 为 2 时生效。
  - 给用户预留的内存。默认128MiB
  - TODO: 因为前面的没法测试成功，该选项是作用于所有用户，还是非管理员，已经无所谓了


- min_free_kbytes
  - 设置内核强制预留的最小空闲物理内存（单位：KiB）
  - 这是用来隔离「内核」和「上层应用」的，和用户无关系，
  - 低于该值时会触发进程同步回收、卡死、OOM。

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


[/proc/sys/vm]: https://docs.kernel.org/admin-guide/sysctl/vm.html