---
title: eventLoop
date: 2019-04-04 23:03:46
tags:
---
# what

Event Loop是一个程序结构，用于等待和发送消息和事件

a programming construct that waits for and dispatches events or messages in a program.

简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）。

![](..\img\eventloop.png)

由上图可以清楚知道Node的**单线程**指的是主线程为单线程

# 异步执行

```
// test.js
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
process.nextTick(() => console.log(3));//异步最快
Promise.resolve().then(() => console.log(4));
(() => console.log(5))();//同步任务最早执行
//53412
```

异步分为两种：

- 本轮循环：process.nextTick(),Promise
- 次轮循环:setTimeout(),setInterval,setImmediate

![](..\img\nodeTimer.png)

每一次循环中，setTimeout等次轮循环在timers阶段执行，而本轮循环就在check阶段执行，所以会先展示