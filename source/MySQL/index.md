---
title: MySQL
date: 2020-03-09 15:04:55
---

> 免责声明：该文章个人翻译，仅做学习使用，可能存在翻译错误
# The InnoDB Storage Engine

[15.1.1 Benefits of Using InnoDB Tables](https://dev.mysql.com/doc/refman/8.0/en/innodb-benefits.html)

[15.1.2 Best Practices for InnoDB Tables](https://dev.mysql.com/doc/refman/8.0/en/innodb-best-practices.html)

[15.1.3 Verifying that InnoDB is the Default Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-check-availability.html)

[15.1.4 Testing and Benchmarking with InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-benchmarking.html)

通用存储，默认使用InnoDB，如需更换引擎，创建表时ENGINE参数指定

- 高性能
- 高可靠

## key Advantage

- DML遵循ACID规则（支持事务）
- Row-level locking（行锁），和Oracle风格的一致读取可提高多用户并发性和性能。
- 聚簇索引：InnoDB表将数据放在在磁盘上，来方便基于主键优化查询。每个InnoDB表都有一个称为聚集索引（ [clustered index](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_clustered_index)）的主键索引，该索引组织数据以最小化主键查找的I / O。
- 外键约束

| Feature                                                      | Support                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **B-tree indexes**                                           | Yes                                                          |
| **Backup/point-in-time recovery** (Implemented in the server, rather than in the storage engine.) | Yes                                                          |
| **Cluster database support**                                 | No                                                           |
| **Clustered indexes**                                        | Yes                                                          |
| **Compressed data**                                          | Yes                                                          |
| **Data caches**                                              | Yes                                                          |
| **Encrypted data**                                           | Yes (Implemented in the server via encryption functions; In MySQL 5.7 and later, data-at-rest tablespace encryption is supported.) |
| **Foreign key support**                                      | Yes                                                          |
| **Full-text search indexes**                                 | Yes (InnoDB support for FULLTEXT indexes is available in MySQL 5.6 and later.) |
| **Geospatial data type support**                             | Yes                                                          |
| **Geospatial indexing support**                              | Yes (InnoDB support for geospatial indexing is available in MySQL 5.7 and later.) |
| **Hash indexes**                                             | No (InnoDB utilizes hash indexes internally for its Adaptive Hash Index feature.) |
| **Index caches**                                             | Yes                                                          |
| **Locking granularity**                                      | Row                                                          |
| **MVCC**                                                     | Yes                                                          |
| **Replication support** (Implemented in the server, rather than in the storage engine.) | Yes                                                          |
| **Storage limits**                                           | 64TB                                                         |
| **T-tree indexes**                                           | No                                                           |
| **Transactions**                                             | Yes                                                          |
| **Update statistics for data dictionary**                    | Yes                                                          |
mysql8.0 innoDB enhancements  [InnoDB enhancements](https://dev.mysql.com/doc/refman/8.0/en/mysql-nutshell.html)



## 15.1.1Benefits of InnoDB Tables

- 重新启动数据库(主动or意外)后都无需执行任何特殊操作
- 拥有缓冲池（buffer pool）经常访问的数据放到内存中处理
- 设置外键，更新或删除数据，并自动更新或删除其他表中的相关数据。
- 数据损坏提示
- 设计正确的主键，会自动优化，使得where,order,group迅速
- CRUD通过自动机制（change buffering）可以对同一张表并发读写（行锁的优势），以及缓存CRUD后一起写入减少磁盘IO
- 慢查询性能优异，自适应哈希索引（[Adaptive Hash Index](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_adaptive_hash_index)）使得一行被多次访问时，读取更快，就像hash一样
- 支持压缩表和关联索引（associated indexes）
- 支持创建和删除索引，而对性能和可用性影响较低
- Truncating a [file-per-table](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_file_per_table) tablespace is very fast, and can free up disk space for the operating system to reuse, rather than freeing up space within the [system tablespace](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_system_tablespace) that only `InnoDB` can reuse.（不知道在说什么）
- DYNAMIC格式解决BLOB和长文本的存储问题
- INFORMATION_SCHEMA监视存储引擎内部信息
- 通过查询性能架构表（performance schema）来监视存储的性能
- 兼容其他引擎的table
- 处理大量数据时提高CUP效率，获得最佳性能
- 支持处理大量数据

## 15.1.2 Best Practices for InnoDB Tables

