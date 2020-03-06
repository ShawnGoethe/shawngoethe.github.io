---
title: KnowledgeTree
date: 2020-01-18 23:03:00
---

[TOC]

# 数据结构

## 队列

队列有两种实现方式，一个是连续空间的数组（无需空间存指针，但是扩容只能整体复制到新的大数组，而且线性，基本首位相连使用），一种是链表形态（需要额外空间存指针，但扩容直接追加，以及增删元素不需要动其他元素）

Java中队列分为阻塞和非阻塞两种，顾名思义，阻塞队列是一个一个顺序执行，非阻塞队列是并发的

- 非阻塞队列：ConcurrentLinkedQueue(无界线程安全)，采用CAS机制（compareAndSwapObject原子操作）。
- 阻塞队列：ArrayBlockingQueue(有界)、LinkedBlockingQueue（无界）、DelayQueue、PriorityBlockingQueue，采用锁机制；使用 ReentrantLock 锁。

阻塞队列的DelayQueue可以做成延时队列，可以见这篇文章→:[**关于Promise的思考**](http://zehai.info/2020/01/07/2020-01-07-%E5%85%B3%E4%BA%8EPromise%E7%9A%84%E6%80%9D%E8%80%83/)，原本Node需要借助Promise循环一次只取一个特性的延时队列，可以使用delayQueue直接求解

队列除了**数组，链表的区别**，**阻塞** 分类，还可以**安全**区分，简单来说就是多线程下并发读写是否会出问题。

## 集合

Set:注重独一无二的性质,该体系集合可以知道某物是否已近存在于集合中,不会存储重复的元素

hashset

hashtable

treeset

## 链表、数组

链表List数组Array其实和队列queue是一种东西，只是队列（或者堆栈）是特殊化的链表/数组，他们限制了元素的进出方式，解决了顺序处理/递归压栈的问题。

**不过链表，数组区别于set，前者是有序的，set是无序不重复的**

List主要分为3类，ArrayList， LinkedList和Vector，都继承自Collection，只是各自有自己的特性的方法

- ArrayList是一个数组实现的列表，由于数据是存入数组中的，所以它的特点也和数组一样，查询很快，但是中间部分的插入和删除很慢

- LinkedList还是一个双向链表

- Vector就是ArrayList的线程安全版，它的方法前都加了synchronized锁，其他实现逻辑都相同。如果对线程安全要求不高的话，可以选择ArrayList，毕竟synchronized也很耗性能

## 字典、关联数组

## 栈

## 树

树结构是**一对多**的数据结构

他的应用包括：红黑树，数据库存储，磁盘文件存储等

### 二叉树

每个节点最多有两个叶子节点

### 完全二叉树

### 平衡二叉树

### 二叉查找树BST

### 红黑树

### B系列树

B-树是一种多路搜索树

- 关键字集合分布在整颗树中；
- 任何一个关键字出现且只出现在一个结点中；
- 搜索有可能在非叶子结点结束；
- 其搜索性能等价于在关键字全集内做一次二分查找；
- 自动层次控制

B+ 树是一种树数据结构，是一个n叉树，每个节点通常有多个孩子，一棵B+树包含根节点、内部节点和叶子节点。根节点可能是一个叶子节点，也可能是一个包含两个或两个以上孩子节点的节点

- B+ 树通常用于[数据库](http://lib.csdn.net/base/14)和操作系统的文件系统中

B* 树

- 是B+树的变体，在B+树的非根和非叶子结点再增加指向兄弟的指针；

### LSM树

LSM（Log-Structured Merge-Trees）和 B+ 树相比，是牺牲了部分读的性能来换取写的性能(通过批量写入)，实现读写之间的平衡。 Hbase、LevelDB、Tair（Long DB）、nessDB 采用 LSM 树的结构。LSM可以快速建立索引。

- B+ 树读性能好，但由于需要有序结构，当key比较分散时，磁盘寻道频繁，造成写性能较差。
- LSM 是将一个大树拆分成N棵小树，先写到内存（无寻道问题，性能高），在内存中构建一颗有序小树（有序树），随着小树越来越大，内存的小树会flush到磁盘上。当读时，由于不知道数据在哪棵小树上，因此必须遍历（二分查找）所有的小树，但在每颗小树内部数据是有序的。
- 极端的说，基于LSM树实现的HBase的写性能比MySQL高了一个数量级，读性能低了一个数量级。
- 优化方式：Bloom filter 替代二分查找；compact 小数位大树，提高查询性能。
- Hbase 中，内存中达到一定阈值后，整体flush到磁盘上、形成一个文件（B+数），HDFS不支持update操作，所以Hbase做整体flush而不是merge update。flush到磁盘上的小树，定期会合并成一个大树。

## BitSet



# 常用算法

## 排序+查找

## 布隆过滤器

## 字符串比较

## DFS+BFS

## 贪心

## 回溯

## 剪枝

## 动态规划

## 朴素贝叶斯

## 推荐算法

推荐算法通常被分为四大类

- 协同过滤推荐算法
- 基于内容的推荐算法
- 混合推荐算法
- 流行度推荐算法

## 最小生成树

## 最短路径算法

# 并发

## 概念

## 多线程

## 线程安全

## 事务

## 锁

# 操作系统

## 原理

## CPU

## 进程

## 线程

## 协程

## 通信

## Linux

# 设计模式

## 六大原则

- 开闭原则：对扩展开放,对修改关闭，多使用抽象类和接口。
- 里氏替换原则：基类可以被子类替换，使用抽象类继承,不使用具体类继承。
- 依赖倒转原则：要依赖于抽象,不要依赖于具体，针对接口编程,不针对实现编程。
- 接口隔离原则：使用多个隔离的接口,比使用单个接口好，建立最小的接口。
- 迪米特法则：一个软件实体应当尽可能少地与其他实体发生相互作用，通过中间类建立联系。
- 合成复用原则：尽量使用合成/聚合,而不是使用继承。

## 23种常见设计模式

## 应用场景



## 单例模式

单例模式：单例模式的意思就是只有一个实例。单例模式确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例。这个类称为单例类。

单例模式有三种：

- 懒汉式单例：第一次调用初始化，但初始化时需加锁

  ```java
  public class Singleton{
      private static Singleton singleton;
      private Singleton {};
      public static synchronized Sigleton getInstance{
          if(singleton ==null){
              singleton=new Singleton();
          }
          retrun singleton;
      }
  }
  ```

- 饿汉式单例:类加载初始化，后续一直存在，浪费内存

  ```
  public class Singleton{
      private static final Singleton SINGLETON=new Singleton();
      private Signleton(){    }
      public static Signleton getInstance(){
          retrun SINGLETON;
      }
  }
  ```

  

- 登记式单例:内部类在外部调用加载，无需用锁

  ```
  public class Singleton{
      private Sigleton(){}
      public static Singleton getInstance(){
          retrun Holder.SINGLETON;
      }
      private static class Holder{
          private static final Singleton SINGLETON=new Singleton();
      }
  }
  ```

  



## 责任链模式

## MVC

## IOC

## AOP

## UML

## 微服务

# 运维

## 监控

## APM

##  统计分析

## 持续继承CI/CD

### Jenkins

### 环境分离



## 自动化运维

### Ansible

### puppet

### chef

## 测试

### TDD理论

### 单元测试

### 压力测试
### 全链路压测
### A/B、灰度、蓝绿测试
##虚拟化
### KVM
### Xen
### OpenVZ
## 容器化
### Docker
## 云技术
### Openstack
## DevOps
## 文档管理
# 中间件
## Web Server

### Nginx

### OpenResty

### Tengine

### Apache Httpd

### Tomcat

### Jetty

## 缓存

### 本地缓存

## 客户端缓存

## 服务端缓存

### Web缓存

### Memcached

### Redis

#### 架构

#### 回收策略

### Tair

## 消息队列

### 消息总线

### 消息顺序

### RabbitMQ

### RocketMQ

### ActiveMQ

### Kafka

### Redis

### ZeroMQ

## 定时调度

### 单机定时调度

### 分布式定时调度

## RPC

RPC = Remote Procedure Call

目的：调用远程服务接口如同调用本地（方便本地开发，及服务间调用）

构成：server，client，registry（Redis,zookeeper,consul,more）

技术：动态代理（CgLib,Javasisit），序列化，NIO（Netty），注册中心

流程：

- clent调用本地方法
- client stub，封装成为网络传输消息体
- client stub 从registry获取地址发送

- server解码，调用本地方法，返回到server stub
- server stub 结果打包返回给client

- client解码，获取结果

优秀框架：

| 框架   | 简介                                   | 开发语言 |      | 分布式 | 多序列化框架支持 |
| ------ | -------------------------------------- | -------- | ---- | ------ | ---------------- |
| Dubbo  | 阿里，Java高性能优秀的服务框架         | java     |      | √      | √                |
| Motan  | 微博，Java框架                         | java     |      | √      | √                |
| rpcx   | Go                                     | go       |      | √      | √                |
| gRPC   | Google，基于protoBuf序列化，不是分布式 | 多语言   |      | ×      | ×                |
| thrift | Apache，跨语言                         | 多语言   |      | ×      | ×                |



### Dubbo

### Thrift

### gRPC

## 数据中间件

### Sharding Jdbc

## 日志系统

### 日志搜集

## 配置中心

## API网关

# 网络

## 协议OSI

### TCPIP

### HTTP

### HTTP2

### HTTPS

## 网络模型

### Epoll

### Java NIO

### Kqueue

## 连接和短连接

## 框架

## 零拷贝

## 序列化

序列化是二进制协议

Hessian

Protobuf

### Hessian

### protobuf

# 数据库

# 搜索引擎

# 性能

# 大数据

# 安全

# 常用开源框架

# 分布式设计

# 设计思想+开发模式

# 项目管理

# 通用业务术语

# 技术趋势

# 政策法规

# 架构师素质

# 团队管理

# 资讯

# 技术资源
