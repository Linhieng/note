### 配置环境：

* 下载 MongoDB
* 配置环境变量
* 创建文件夹 c:/data/db（默认位置）
* DOS 窗口输入 mongod 启动 MongoDB 服务器（在默认位置会初始化内容）
* 新建 DOS 窗口输入 mongo 连接前一步打开的服务器

后面一般不使用 DOS 窗口来操作数据库，会使用相关软件来操作，比如 [mongodb-manager]( https://www.mongodbmanager.com/download-mongodb-manager-free )

---

## 一问一答

如何指定创建的服务器目录

  mongod 启动的默认路径就是 c:/data/db
  后面使用参数 【--dbpath 路径】可以指定路径
  例如 mongod --dbpath 路径

如何制定端口号

  使用【--port 端口号】可以指定
  例如 mongod --dbpath 路径 --port 端口号

数据库的服务器和客户端是什么

  数据是存放在服务器中的，mongod 命令启动服务器
  客户端用来操作数据（服务器），mongo 启动客户端

---

## 如何将 MongoDB 设置为系统服务，让其自动在后台启动（旧版本）

  1. 创建 db 和 log 文件夹
  mkdir c:\data\db
  mkdir c:\data\log

  2. 在 bin 同级目录下创建配置文件 mongod.cfg，内容为
	 	systemLog:
		    destination: file
		    path: c:\data\log\mongod.log
		storage:
		    dbPath: c:\data\db

  3. 在管理员权限下的 DOS 窗口下 执行命令
	 	sc.exe create MongoDb binPath="\"E:\mongodb-win32-x86_64-windows-5.0.3\bin\mongod.exe\" --service --config=\"E:\mongodb-win32-x86_64-windows-5.0.3\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

  4. 最后在 ctrl+shift+esc —— 服务 —— 打开服务 —— 找到 MongoDb
  开启服务即可

  > [来源]( https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/#configure-a-windows-service-for-mongodb-community-edition )

## 如何删除 MongoDB 配置的服务，让其不作为系统服务

	执行命令 	sc delete MongoDB


---

## 基本认识

1. 单位

    - 数据库：一个数据库即一个仓库，可以存放多个集合

    - 集合：类似于数组，可以在集合中存放多个文档

    - 文档：最小单元，也是我们的操作单位。

2. 基本指令

    - 显示所有数据库
    `show dbs`
    `show databases`

    - 使用数据库（无需存在）
    use 数据库名

    - 显示所有集合
    `show collections`

    - 显示当前所处的数据库
    `db`

3. 数据库和集合不需要手动创建，直接 use 后插入时，就会自动创建

### 其他

- MongoDB 可以使用 js 的 for 循环等相关语句

```js
// 效率低，不推荐多次执行 sql 语句
for (let i = 1; i < 100; i++) {
    db.numbers.insertOne({num:i})
}
// 推荐这样插入多条数据
let arr = []
for (let i = 1; i < 100; i++) {
    arr.push({num:i})
}
db.numbers.insertMany(arr)
```

---

## CRUD

### 插入文档

* db.<collection>.insert(doc)

* 举例

向 temp 数据库中的 student 集合中插入一个学生文档

```sql
use temp
db.student.insert({name:"孙悟空", age:18, gender: "男"})
```

插入多个文档

```sql
db.student.insert([
    {name: 'shaHeSan', age: 38, gengder: 'man'},
    {name: 'baiGuJing', age: 16, gengder: 'woman'},
    {name: 'spider', age: 14, gengder: 'woman'},
])
```

可以插入内嵌文档，即文档的属性值还是文档

```sql
use temp
db.student.insertOne(
    {name: 'name1',
     love:{
        movie: 'Harry Potter',
        people: 'maria'
     }

    }
)
db.student.find()

```

* 3.2 版本起，新增了 insertOne 和 insertMany，作用就是让插入的语句更加语义化

### 查询当前集合中的所有文档

* db.<collection>.find()

* 举例

查询 student 集合中的所有文档

  db.student.find()

find 可以接受一个对象作为条件参数，比如

  db.student.find({age: 38})

find 返回的是一个数组，在后面加上一个 count() 可以统计该数组的大小，比如

  db.student.find({age: 38}).count()

findOne，查询的是符合条件的第一个文档，返回的是一个文档对象

* 如果要查询的是内嵌文档的值，那么属性需要使用引号包裹起来

` db.student.find({'love.people': 'maria'}) `



### 修改

* db.<collection>.update(查询条件, 新对象)

update 默认是直接使用新对象替换掉

使用“修改操作符”可以指定修改方式，比如 $set 用来修改 / 增加 文档中的指定属性

```sql
db.student.update({age: 14}, {
    $set: {new: 'new content'}
})
```

使用 $unset 用来删除文档中的指定属性

```sql
db.student.update({age: 14}, {
    $unset: {new: ''}
})
```

* update 默认只会修改匹配到的第一个，如果想要修改多个，需要指定第三个参数对象中的 multi 属性 为 true，比如

```sql
db.student.update(
    {age: 14},
    {$unset: {new: ''}},
    {multi: true}
)
```


* 除了 update 外，还有 updateOne 和 updateMany



### 删除

* remove、deleteOne、deleteMany，同理，remove 可以删除多个也可以删除一个，默认是删除多个

`db.student.remove({_id: 'DIY'})`

* 想要删除单个，则第二个参数传入 true

`db.student.remove({name: 'shaHeSan'}, true)`

* 不要使用 remove() 删除所有，因为效率差，它是一个一个删除，如果真有这个需求，使用 drop 可以删除整个集合，比如删除 student 集合

`db.student.drop()`

* 删除当前数据库

`db.dropDatabase()`

---

查询条件

* 大于、小于
$lt 小于
$gt 大于
$lte 小于等于
$gte 大于等于

{$or: [{a: 1}, {b:2}]}

* limit() 显示指定数量

* skip() 跳过指定数量

skip 和 limit 的顺序，MongoDB 会帮我们跳转顺序，谁前谁后无所谓

* sort() 排序

1 正序，-1 倒序
db.emp.find({}).sort({sal:1, empno:-1})

* 投影

投影即显示指定的属性
1 代表显示，0 代表不显示
db.emp.find({}, {ename:1, _id:0, sal:1})

---

** 文档之间的关系

都是需要人为去设计的，比如在这个文档中，会保存一个用户的唯一标识，代表这个文档是独属于这个用户的。

### 一对一

使用内嵌

### 一对多


### 多对多

---

## mongoose

Mongoose是MongoDB的一个对象模型工具，封装了MongoDB对文档的的一些增删改查等常用方法，让NodeJS操作Mongodb数据库变得更加灵活简单。

主要的好处就是有了约束
MongoDB 本身没有约束

### mongoose 的好处

* 可以为文档创建一个模式结构（Schema）
* 可以对模型中的对象 / 文档进行验证
* 数据可以通过类型转换 转换为对象模型
* 可以使用中间件来与应用逻辑挂钩
* 比 Node 原生的 MongoDB 驱动更简单

### 新的对象

mongoose 中为我们提供了几个新的对象

* Schema（模式对象）

  Schema 对象定义约束了数据库中的文档结构（思维有点像 ts 对 js 类型的约束）

* Model

  Model 对象作为集合中所有文档的表示，相当于 MOngoDB 数据库中的集合 collection

* Document

  Document 表示集合中的具体文档，相当于集合中的一个具体文档


---

## 注意

mongoose 中创建 model 时，会自动为名称附上 s，代表负数（如果没有以 s 结尾）

mongoose 中的大写会自动变成小写

---

## linux 中配置 mongo 环境

## 说明

> [官网安装包地址](https://www.mongodb.com/try/download/community)

根据 linux 版本来选择对应的安装包

下面的步骤，是基于 CentOS Linux release 8.3.2011 版本的，官网上选择的安装包是 5.0.6 版本，系统是 Redhat / centOS 8.0，文件类型是 tgz（不是shell tgz）

## 步骤

```bash

$ cd /usr

$ mkdir mongodb

$ cd mongodb/

$ wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel80-5.0.6.tgz
下载压缩包

$ tar -xvzf mongodb-linux-x86_64-rhel80-5.0.6.tgz
解压到当前目录

$ mv mongodb-linux-x86_64-rhel80-5.0.6 mongoDB
将解压后的文件夹重命名

$ echo "export PATH=$PATH:/usr/mongodb/mongoDB/bin" >> /etc/profile
将可执行文件添加入全局环境中

$ source /etc/profile
令环境配置生效

$ echo $PATH
查看是否成功将可执行文件加入全局变量，最后面应该能够看到 mongoDB 目录

$ mkdir -p /data/db
为 mongoDB 创建默认的文件夹

$ mongod
启动服务，检查是否有 “waiting for connections on port 27017”。（我只看到 ` "msg": "Waiting for connections", "attr": { "port": 27017, "ssl": "off" } `

$ mongo
连接进入 mongoDB 数据库

```

