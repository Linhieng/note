
cgroup

## 内核、进程

- D状态不可中断的睡眠状态，使用 kill -9 也无法杀死。因为强制 kill 也只是给进程发送一个 SIGKILL 信号。当进程处于D状态时，无法处理任何信号，包括 SIGKILL，所以进程无法终止。

### [cgroup v2]

cgroup格式模板为 `层级ID::控制组路径`，而 cgroup v2 的一个重大变更，就是摒弃了 v1 多独立层级的设计，全局只有单一统一层级，层级编号固定就是 `0`；在 v1 中，各子系统会有专属层级号。

- /sys/fs/cgroup/
  - user.slice
  - system.slice
  - machine.slice
  - init.scope
  - systemd.slice

三层管理资源：Slice（大分组） → Scope/Service（进程组） → 进程

#### 用户切片

- `user.slice` 是父切片，限制全部用户进程总和，不存在所有优先级问题。
- `/etc/systemd/system/user-.slice.d/` 是模板前缀，代表每位用户的默认设置，优先级低于实例 user-xx.slice。并且该模板只能手动创建文件（直接就是永久生效）
- `user@.service` 是 ？

登录时用 PAM + systemd 模板 user@.service 区分 UID，只对 UID≥1000 加载限制
单独为 root 创建 slice，开机时自动将 root 从 user.slice 中移除。

```sh
systemctl set-property --runtime user.slice MemoryMax=700M MemorySwapMax=0
# 配置所有用户最大内存占用，包括root用户
systemctl set-property --runtime user-0.slice MemoryMin=200M
# 然后再单独为 root 用户配置最小内存占用
systemctl show user.slice | grep Memory
# 查看配置情况


# 创建临时目录
mkdir -p /run/systemd/system/root-users.slice.d
# 写入配置文件，注意，root-users.slice 这种命令，会让 systemd 自动派生父节点 root.slice
cat > /run/systemd/system/root-users.slice.d/override.conf <<'EOF'
[Slice]
MemoryMax=max
CPUWeight=10000
TasksMax=infinity
EOF
# 重载systemd让配置生效
systemctl daemon-reload
systemd-run --slice=root-users.slice --shell
# systemd-run：临时创建一个临时 systemd 服务单元
# --slice=root-users.slice：指定归属 cgroup 切片
# --shell：直接启动交互式 bash shell

cat /proc/self/cgroup
# 可以查看当前 shell 属于哪个切片。
systemctl cat root-users.slice
# 查看 slice 资源配置
systemctl list-units --type=scope
# 查看正在运行的临时 scope
```

[cgroup 内存控制]

规则 A：memory.max（父 user.slice=300M）是整个父组总占用天花板
user.slice 下所有子 slice（user-0、user-1000、user-1001…）进程内存总和 ≤300M，一旦总和触达 300M，父 cgroup 触发全局回收 / 内部 OOM。
这个上限是累加统计：root 占用 + 所有普通用户占用 合并计算，没有自动给 root 预留 200M 空白额度。
规则 B：memory.min=200M 仅保护「user-0 已经占用的内存」，不预留空白内存
min 的生效逻辑：
root 已经跑起来的进程占用了 X MB（X≤200M）→ 这 X MB 内核绝不回收；
root 还没用到的 200-X MB，不会锁死、不会隔离，完全可以被普通用户进程占用；
普通用户占用总和可以轻易超过 100M，只要 root + 普通用户 合计不超父 300M 上限。

min和max是硬限制。
low和high是软限制，就是可能被突破
比如low规定的内存可能被回收，但min规定的内存肯定不会被回收。

前面的配置是不合理的，
user@.slice 是 systemd 模板单元，所有 UID≥1000 的普通用户会话自动生成 user-$UID.slice，可通过模板 drop-in 批量限制，不会作用于 UID=0 的 user-0.slice。

system.slice、user.slice、user-xxx.slice、user@.slice
又多少 slice？ssh登录时使用的是 system.slice？

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
  - 原因是该值只限制一次性的虚拟内存申请（无法测试成功），并不是强制保留 1G 物理内存不给普通用户（这句话到是对的）。
  - 使用c代码一次性申请 1380，会消耗10多秒才申请到内存，并且占用10多秒后就会被kill。
  - 但申请 1352MiB 空间，就能够申请成功，并且持续占用，此时会发现 root 用户明显卡顿，新建 ssh 登录也会发现无法登录，这不就是 vscode 的场景！我现在是弄出了我想要的可复现的场景出来！有点区别的就是我精准的控制了内存占用大小，不会被 kill，但同时又会导致所有用户卡顿，无法ssh登录，而且我可以随时 ctrl+c 终止这种状态！
  - 测试发现，不管我设不设置该值，普通用户都能申请 1352MiB 空间，并导致所有用户卡顿。
  - 如果我改成 never 模式呢？崩，所有用户直接被强制退出，无法登录，VNC也一样！大概率是因为我前面操作了一些东西，导致很多进程占用了申请的内存，所以其他进程就无法继续申请内存了，连root也无法申请。重启一下再改为 never 就没问题了，但也只是 root 用户没问题，普通用户登进去只敲了个 `w` 就被闪退了
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
[cgroup 内存控制]: https://kernel-internals.org/mm/memcg-hierarchy/
[cgroup v2]: https://docs.kernel.org/admin-guide/cgroup-v2.html