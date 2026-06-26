## 🍕 基本概念

### 单位

- db: 数据库

  比如命令 `db.mycollection.find()` 中的 `db` 就是代指当前选中的数据库。
  这些数据库存储在 `data/db/` 目录中。

  MongoDB 中有三个特殊的数据库: `admin`, `config` 和 `local`。

  还有一个默认数据库, 名为 `test`, 当没有 use 数据库时, `db` 默认为 `test`

  数据库的名称一律使用小写, 大写是无效的, 不允许有 **空格**, `.`, `$`, `/`, `\` 和 `\0`(空字符)

- collection: 集合, 一个数据库可以有若干个集合。集合的概念有点类似于关系型数据库中的 "表", 但实际上是不一样的。
- document: 文档, 一个集合有许多个文档, 一般来说每一个文档都应该有固定的 scheme (结构), 但这不是强制要求的。文档的概念有点类似于 关系型数据库中的 "元组", 但实际上是不一样的。

一般操作的都是 document, db 和 collection 不需要单独创建。
只有当插入一个 document 时, db 和 collection 才会被创建。


### 基本指令

```bash
show dbs;
show databases;
# 显示所有 db (数据库)

db;
# 查看当前 db (数据库)

use <db-name>;
# 使用某一 db (数据库); 允许不存在的数据库名, 此时相当于创建一个新的数据库

show collections;
# 显示当前 db 的所有集合
```

### 数据类型

MongoDB 中没有 `undefined`。
插入数值时, 若该数值是 `undefined` 或者 `null`, 则会是 `null`

## 🍕 新机器使用 mongoDB

1. 进入[官方下载中心](https://www.mongodb.com/try/download/)下载压缩包

    它的位置可在[官网](https://mongodb.com)的 `Products` -- `Community Edition` -- **`Community Server`** 找到

1. 解压并配置环境变量。
1. 创建 **datafiles** 文件目录, 默认是 `\data\db\` 或 `C:\data\db\` 文件夹
1. 启动服务, 执行 `mongod`, 此时会在默认的 **datafiles** 文件目录下初始化数据

    **注意**: 如果在其他位置创建了 `data\db\` 文件, 可以指定 `--dbpath` 参数, 比如 `mongod --dbpath "C:\Users\soft\mongodb-win32-x86_64-windows-6.0.1\data\db\"`

1. 使用 DataGrid 连接。只需指定 localhost 和 port 即可连接 (本地连接无需账号密码)
1. 在 DataGrid 中测试一下:

    ```js
    db.testcollection.insertOne({title: '阿里云',
      description: '阿里云官网',
      by: '阿里云',
      url: 'https://www.aliyun.com/',
      tags: ['mongodb', 'database', 'NoSQL'],
      likes: 100
    });
    ```

## 🍕 将 mongod 作为系统服务

使用 window 的 `sc` 命令将 mongod 作为系统服务

1. 自己 **手动创建** 两个文件夹

  - `C:\Users\soft\mongodb-win32-x86_64-windows-6.0.1\data\db`
  - `C:\Users\soft\mongodb-win32-x86_64-windows-6.0.1\data\log`

2. 创建 `<install directory>\bin\mongod.cfg` [配置文件](https://www.mongodb.com/docs/v6.0/reference/configuration-options/), 内容如下:

  ```
  systemLog:
      destination: file
      path: C:/Users/soft/mongodb-win32-x86_64-windows-6.0.1/data/log/mongod.log
  storage:
      dbPath: C:/Users/soft/mongodb-win32-x86_64-windows-6.0.1/data/db
  ```

3. 用管理员身份打开 `cmd`, 通过 sc 命令添加服务

  ```bash
  sc create MongoDB binPath="\"C:/Users/soft/mongodb-win32-x86_64-windows-6.0.1/bin/mongod.exe\" --service --config=\"C:/Users/soft/mongodb-win32-x86_64-windows-6.0.1/bin/mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
  ```

4. 可通过 ctrl+shift+esc ——> 服务 ——> 打开服务 ——> 查看 MongoDB 服务是否正在运行, 来检查是否成功开启

如果想要取消其作为系统服务, 可以执行 `sc delete MongoDB` 命令

## 🍕 使用 vscode 连接 MongoDB 并操作

1. 下载 **MongoDB for VS Code** 插件 (mongodb.mongodb-vscode)
1. 点击左侧状态栏的 MongoDB
1. 增加一个连接, 然后输入 `mongodb://localhost:27017` (本地连接无需账号密码)
1. 在 PLAYGROUPS 中可以创建一个 `.mongodb` 文件书写相关脚本。`ctrl+alt+s` 快捷键可以执行选中的行

> 完整的 connecting URI 格式是 `mongodb://user:pass@sample.host:27017/?maxPoolSize=20&w=majority`
>
> 简单说明一下 URI 各个部分的含义:
> `mongodb` 是 protocol (协议), 不能省略;
> `user:pass` 是 credentials (证书), 使用 **authentication mechanism** 时可以省略, 省略时记得去掉 @ 符号;
> `sample.host:27017` 是 host (主机名 / IP 地址) 和 port, host 不能省略, port 可以省略, 默认为27017;
> `maxPoolSize=20&w=majority` 是配置, 可以省略;
>
> 如果在本地初次使用, 可以直接通过 `mongodb://localhost` 连接数据库

## 🍕 最基本的 CRUD

### Create

```js
db.COLLECTION_NAME.insertOne(document);
db.COLLECTION_NAME.insertMany(document);
```

参数说明:

- COLLECTION_NAME: 集合名称。
- document: 要写入的文档内容。

🌰:

```
db.testcollection.insertOne({
  title: '阿里云',
  description: '阿里云官网',
  by: '阿里云',
  url: 'https://www.aliyun.com/',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 100
});
```

### Retrieve

```
db.collection.find(query,projection);
```

参数说明:

- query: 可选, 使用查询操作符指定查询条件。
- projection: 可选, 使用投影操作符指定返回的键。查询时如果您需要返回文档中所有键值, 只需省略该参数即可（默认省略）。

🌰:

```js
db.testcollection.find();
```

### Update

```
db.collection.update(
    <query>,
    <update>,
    {
        upsert:<boolean>,
        multi:<boolean>,
        writeConcern:<document>
    }
);
```

参数说明:

- query: 必填,  update的查询条件, 类似sql update查询内where后面的条件。
- update: 必填, update的对象和一些更新的操作符（如$,$inc...）等, 也可以理解为sql update查询内set后面的部分。
- upsert: 可选, 该参数表示, 如果不存在update的记录, 是否插入objNew。取值: true（表示插入）|false（默认, 表示不插入）。
- multi: 可选, 该参数表示, 是否更新按条件查询到的全部记录。取值: true（表示更新查询到的全部记录）| false（默认, 表示只更新查询到的第一条记录）。
- writeConcern: 可选, 抛出异常的级别。

🌰:

```js
db.testcollection.update(
  {'title':'阿里云'},
  {$set:{'title':'aliyun阿里云官方网站'}}
);
```

### Delete

```ts
db.collection.deleteMany(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>
   }
)
```

参数说明:

- filter: 表示过滤条件, 用于规定一个查询规则, 筛选出符合该查询条件的所有文档。删除操作将作用于经过该查询条件筛选之后的文档, 类似于关系型数据库的where后面的过滤条件。如果要删除集合中的所有文档, 请传入一个空文档（{ }）。
- writeConcern: 可选参数, 写入关注, 其值为一个文档。
- collation: 可选参数, 指定用于操作的collation。collation允许用户指定特定语言的字符串进行比较规则。

🌰:

```js
db.testcollection.deleteMany({ title : "aliyun阿里云官方网站" });
```

## 🍕 MongoDB 基本条件操作符的使用

条件操作符用于比较两个表达式并从mongoDB集合中获取数据。

MongoDB中条件操作符有:

- `$gt`: greater than
- `$lt`: lesser than
- `$gte`: greater than equal
- `$lte`: lesser than equal
- `$type`: 指定 BSON 类型

> **BSON**, 全称 Binary JSON, 是 MongoDB 中使用的数据类型,
他在 JSON 的基础上增加了类型, 比如 `Date`, `Timestamp`, `Double`, `Regular Expression` 等等, 详细可见[官方文档说明](https://www.mongodb.com/docs/manual/reference/bson-types/)

### 🌰

1. 先插入三条文档

    ```js
    db.testcollection.insertOne({
        title: '阿里云官网',
        description: '阿里云官方网址。',
        by: '阿里云',
        url: 'https://www.aliyun.com/',
        tags: ['aliyun1'],
        likes: 200
    });
    db.testcollection.insertOne({
        title: '帮助中心',
        description: '阿里云帮助中心网址。',
        by: '阿里云',
        url: 'https://help.aliyun.com/',
        tags: ['aliyun2'],
        likes: 150
    });
    db.testcollection.insertOne({
        title: '体验实验室',
        description: '体验实验室网址',
        by: '阿里云',
        url: 'https://developer.aliyun.com/',
        tags: ['aliyun3'],
        likes: 100
    });
    db.testcollection.insertOne({
        title: 3355,
        description: '标题不是字符串',
        by: '',
        url: '',
        tags: [],
        likes: 0
    });
    ```

1. 使用大于操作符 `$gt`

    ```js
    db.testcollection.find({likes : {$gt : 100}});
    ```

1. 使用大于等于操作符 `$gte`

    ```js
    db.testcollection.find({likes : {$gte : 100}});
    ```

1. 使用小于操作符 `$lt`

    ```js
    db.testcollection.find({likes : {$lt : 150}});
    ```

1. 使用小于等于操作符 `$lte`

    ```js
    db.testcollection.find({likes : {$lte : 150}});
    ```

1. 使用类型操作符 `$type`

    ```js
    db.testcollection.find({"title" : {$type : 'string'}});
    ```

## 🍕 MongoDB 中基本方法的使用

`sort`, `skip`, `limit` 的执行顺序是 `sort` --> `skip` --> `limit`

### `limit()`

`limit()` 用于 MongoDB 中读取指定数量的数据

基本语法:

```
db.COLLECTION_NAME.find().limit(NUMBER);
```

参数说明:

- COLLECTION_NAME: 集合名称
- NUMBER: 读取的纪录条数

🌰:
```js
db.testcollection.find().limit(2);
// 只输出前面两个
```

### `skip()`

`skip()`  可以跳过指定数量的数据。
大数据量时，不建议使用 `skip()`, 因为 `skip()` 是一个一个数过去的, 效率差。

基本语法:

```
db.COLLECTION_NAME.find().skip(NUMBER);
```

参数说明:

- COLLECTION_NAME: 集合名称
- NUMBER: 跳过的记录条数

🌰:

```js
db.testcollection.find().skip(1);
// 不输出第一条纪录
```

### `sort()`

`sort()` 可以指定升序还是降序, MongoDB 中使用 `1` 代表升序, `-1` 代表降序

基本语法:

```
db.COLLECTION_NAME.find().sort({KEY:1})
```

参数说明:

- COLLECTION_NAME: 集合名称
- KEY: 根据文档中的某一 KEY 进行排序
- `1`: 升序

🌰:

```js
use test;
db.aa.insertMany(
    [
        {a: 1, b: 2},
        {a: 1, b: 4},
        {a: 2, b: 3},
        {a: 3, b: 3},
    ]
)
db.aa.find().sort({b:-1, a:1})
```