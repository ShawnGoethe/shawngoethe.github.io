---
title: Node.js
date: 2019-04-05 10:49:57
---
# what
> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

- Node是JavaScript运行环境
- 事件驱动，非阻塞IO模型
- 使用npm管理包

# 基本原理

![](..\img\Node原理.png)

- Chrome V8 是 Google 发布的开源 JavaScript 引擎，采用 C/C++ 编写，在 Google 的 Chrome 浏览器中被使用。Chrome V8 引擎可以独立运行，也可以用来嵌入到 C/C++ 应用程序中执行。
- Event Loop 事件循环（由 libuv 提供）
- Thread Pool 线程池（由 libuv 提供）

带来的好处

- 用户体验
- 资源分配

# Blocking 与Non-blocking

大量诸如IO，锁操作会造成堵塞，node标准库中所有IO都提供了非阻塞的一步版本，接受回调函数

- 回调函数可以放入底层线程池操作，不阻塞主线程
- 可以自定义回调函数，处理返回结果

我们可以直接比较一下阻塞和非阻塞的代码：

```javascript
//blocking 且如果错误需要catch否则程序会**崩溃**
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
//non-blocking
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
//执行第6行后，放进队列，开始执行下面的业务数据
```

## 并发和吞吐量

Node起服务大概会启动一个进程，包含7个线程，

1 个 Javascript 执行主线程；1 个 watchdog 监控线程用于处理调试信息；1 个 v8 task scheduler 线程用于调度任务优先级，加速延迟敏感任务执行；4 个 v8 线程（可参考以下代码），主要用来执行代码调优与 GC 等后台任务；以及用于异步 I / O 的 libuv 线程池。

并发指的是执行完其他工作后，事件循环执行回调的能力，高并发原理：如一个请求50ms请求，其中45ms都在数据库，那么我可以5ms处理完，推入队列，其余时间继续响应其他请求。

eventloop是JS的特性，在其他语言中，会创建线程来处理并发工作（比如同时两个请求，创建两个线程来处理，但是他们之间可能访问数据会加锁，如果有100个请求，访问同一个数据，加个锁，99个请求都只能等着了）

## 混合阻塞代码和非阻塞代码

处理io应该避免如下写法：

```javascript
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');//unlink first
//应该将unlink写入回调函数
```



# EventLoop

## what

eventloop（事件循环）给予node非阻塞IO的优势，尽管JS是单线程

由于大多数内核支持多线程，他们可以再后台执行多个任务，当某个任务完成的时候，内核会告诉node，以便将callback添加到poll队列来执行

## Explained

当node启东时，他会初始化eventloop，处理输入的script(或者放入REPL)，这些script可以执行异步API调用，定时器，或者调用process.nextTick(),然后开始处理事件循环![](..\img\phaseOfEventloop.png)

其中每个矩形被称作phase（个人理解：阶段）

每一个phase都有一个有callbacks等待执行的FIFO的队列，尽管每个phase都有自己特殊的地方，但是通常，当eventloop执行到某一个phase时候，他将执行该阶段特定的操作，然后调用queue里面的callback function直到**队列为空**或者达到该phase**最大的回调执行数量**。

- timers：`setTimeout()` and `setInterval()`
- **pending callbacks**: 执行推迟到下一个tick的IO回调
- **idle, prepare**: 内部使用
- **poll**: 接收新的IO event，执行与IO相关的回调（关闭回调，计时器回调，setImmediate）(该phase可能会block)
- **check**: `setImmediate()` 
- **close callbacks**: 关闭回调, 如 `socket.on('close', ...)`.

由于执行某一个phase都可能新增更多的操作任务，一些新的event也会进入poll 队列中排队，因此可在处理轮询事件时候将poll event排队，使得长时间运行的回调也可以使轮询阶段运行的时间比计时器的阈值长很多。

## 待更新

# 计时器

目的：设定时间段后执行函数，直接使用无需require

## 使用nodejs控制时间连续性

### settimeout





# 异步编程

# [Buffer](https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html)

> The `Buffer` class was introduced as part of the Node.js API to enable interaction with octet streams in TCP streams, file system operations, and other contexts.

原因：应用需要

- 处理网络协议
- 操作数据库
- 处理图片
- 接受上传文件等

处理大量二进制数据，JavaScript自由的字符串不能满足这些要求

## 结构

与C++结合：node_buffer-->Buffer/SlowBuffer

也就是JavaScript的Buffer或者SlowBuffer依赖于C++的内建模块，buffer内存不归v8管理，是堆外内存

## 声明

```javascript
const str="helloworld"
const buf=new Buffer(str,'utf-8')
console.log(buf)
//=><Buffer xx xx xx>16进制数字
buf[22]=10
//只能赋值0-255的数值，否则会取余256
```

## 内存分配

Node的C++层面实现内存申请，在JavaScript中分配内存的策略，Node采用slab的动态内存管理机制，slab的3种状态

- full：完全分配
- partial：部分分配
- empty：没有分配

Buffer.poolSize=8*1024，即以8kb为大小Buffer的分界，小于8Kb拼单，大于8kb分配大的slab被大buffer独占

## 转换

可以转换的类型

- asc2
- utf-8
- utf-16LE/UCS-2
- Base64
- Binary
- Hex

采用new Buffer(str,[encoding]),**默认utf-8**

buf.write(string,[offset],[length],[encoding])默认utf-8

buf.toString([encoding],[start],[end])默认utf-8

## 拼接



## 性能

性能大概是字符串的一倍



# EventLoop

# libuv

[介绍page](<https://nikhilm.github.io/uvbook/introduction.html>)

