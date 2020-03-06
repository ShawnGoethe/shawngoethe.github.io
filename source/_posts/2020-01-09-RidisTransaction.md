---
title: 2020-01-09-RedisTransaction
date: 2020-01-09 22:42:06
tags:
- Transaction
categories:
- Redis

---

> 官网doc：<https://redis.io/topics/transactions>
>
> 本文纯属阅读笔记，无学术参考价值

# what

事务（transaction）的本质就是处理好几个动作，要么都成功，要么其中一个失败就全部回滚

每门语言都会有事务的支持，node也有async的方法实现事务几个动作串行，或者并行，一个失败全部回滚，之前写过支付的例子，使用async.waterfall,购买会员后

1.查询支付宝返回支付是否成功

2.获取用户所买会员的等级及相关权限

3.将权益插入用户表中

4.将订单数据记录到订单表中，方便后台查看订单量

大致步骤就是这些

Redis主要使用MULTI ,EXEC,DISCARD WATCH来实现事务的功能

遵循以下原则：

- 所有命令被序列化后顺序执行，且执行期间不接受其他请求，保证隔离性
- EXEC命令触发事务中所有命令的执行，因此，如果客户端调用MULTI命令之前失去连接，则不执行任何操作。如果EXEC命令调用过，则所有的命令都会被执行



# how

MULTI输入事务以OK答复，此时用户可以发送多个命令，Redis都不会执行，而是排队，一旦调用EXEC，则将会执行所有命令，调用DISCARD将刷新（Flush？清空？重新执行？）事务队列并退出事务

示例代码：

```
> MULTI
OK
> INCR foo
QUEUED
> INCR bar
QUEUED
> EXEC
1) (integer) 1
2) (integer) 1
```

可以看出EXEC返回一个数组，其中每个元素都是事务中单个命令的答复，其发出顺序与命令相同

当Reids连接处于MULTI的请求时，所有的命令都将以字符串queued答复，当EXEC时，将顺序执行

## errors

可能存在两种命令错误：

- 命令可能无法排队，因此在EXEC之前可能有错误（包括命令语法错误）
- 调用EXEC后，命令执行失败

客户端通过检查已排队（queued）的命令返回值来判断第一种错误，另外从2.6.5开始，服务器将记住在命令排队期间发生的错误，并且拒绝执行事务，返回错误并自动丢弃事务

**EXEC执行后错误不会特殊处理，所有的命令都将被执及时有些命令失败**

```
MULTI
+OK
SET a abc
+QUEUED
LPOP a
+QUEUED
EXEC
*2
+OK
-ERR Operation against a key holding the wrong kind of value
```

**即时命令失败，队列里的其他命令也会处理**

```
{
    name:stu
    time:1
}
```



