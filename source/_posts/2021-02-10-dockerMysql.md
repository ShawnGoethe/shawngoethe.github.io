---
title: dockerMysql
date: 2021-02-10 14:54:33
tags:
- mysql
categories:
- docker 
---

> link:[mysql-docker](https://hub.docker.com/_/mysql?tab=description&page=1&ordering=last_updated)

# 支持标签 

- [`8.0.23`, `8.0`, `8`, `latest`](https://github.com/docker-library/mysql/blob/2966bfbd71cf370770cd880aa45f3c8f155d0aae/8.0/Dockerfile.debian)
- [`5.7.33`, `5.7`, `5`](https://github.com/docker-library/mysql/blob/2966bfbd71cf370770cd880aa45f3c8f155d0aae/5.7/Dockerfile.debian)
- [`5.6.51`, `5.6`](https://github.com/docker-library/mysql/blob/2966bfbd71cf370770cd880aa45f3c8f155d0aae/5.6/Dockerfile.debian)

# 快速手册 

- **issues**: https://github.com/docker-library/mysql/issues
- **支持平台**: ([more info](https://github.com/docker-library/official-images#architectures-other-than-amd64)) [`amd64`](https://hub.docker.com/r/amd64/mysql/)
- **发布image 详情**: [repo-info repo's `repos/mysql/` directory](https://github.com/docker-library/repo-info/blob/master/repos/mysql) ([history](https://github.com/docker-library/repo-info/commits/master/repos/mysql)) (image metadata, transfer size, etc)
- **Image 更新**: [official-images repo's `library/mysql` label](https://github.com/docker-library/official-images/issues?q=label%3Alibrary%2Fmysql)
  [official-images repo's `library/mysql` file](https://github.com/docker-library/official-images/blob/master/library/mysql) ([history](https://github.com/docker-library/official-images/commits/master/library/mysql))
- **描述来源**: [docs repo's `mysql/` directory](https://github.com/docker-library/docs/tree/master/mysql) ([history](https://github.com/docker-library/docs/commits/master/mysql))

# 什么是 MySQL?

MySQL 是最受欢迎的，开源的数据库. 凭借被验证过的性能表现，可靠性，易用性, MySQL已经成为基于web的应用程序的 主要选择,包括完整得个人项目和网站项目（电子上午，信息服务）,也包括优秀的Facebook Facebook, Twitter, YouTube, Yahoo! 

# 如何使用mysql image

## 创建 `mysql` 服务实例

启动 MySQL 比较简单:

```sh
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

- some-mysql 容器名称
- my-secret-pw 是root账户的密码
- tag 是mysql的版本

## 通过mysql命令行连接mysql

以下命令可以启动mysql容器并运行终端，执行SQL语句

```sh
$ docker run -it --network some-network --rm mysql mysql -hsome-mysql -uexample-user -p
```

- some-mysql 容器名称
- some-network 连接网络（方便容器间访问）

也可以直接运行客户端，访问远程数据库

```
$ docker run -it --rm mysql mysql -hsome.mysql.host -usome-mysql-user -p
```

更多命令请访问 [MySQL documentation](http://dev.mysql.com/doc/en/mysql.html)

## 使用docker stack 或docker-compose部署

示例`stack.yml`

```yaml
# Use root/example as user/password credentials
version: '3.1'
services:

  db:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

-  `docker stack deploy -c stack.yml mysql` 
-  `docker-compose -f stack.yml up`

启动后, 访问 `http://swarm-ip:8080`, `http://localhost:8080`, or `http://host-ip:8080` 

## shell访问查看 MySQL 日志

使用 `docker exec` 可以让你在容器内执行命令，命令如下 

```sh
$ docker exec -it some-mysql bash
```

容器日志:

```
$ docker logs some-mysql
```

## 自定义 MySQL 配置文件

mysql默认配置文件在 `/etc/mysql/my.cnf`, 也可能指定了额外文件如： `/etc/mysql/conf.d` or `/etc/mysql/mysql.conf.d`. 请检查mysqlimage本身的相关文件和目录以了解更多信息

如果 `/my/custom/config-file.cnf` 是你自定义的文件未知和名字, 你可以这样启动你的`mysql` 容器 

```sh
$ docker run --name some-mysql -v /my/custom:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

你会启动一个用你自定义配置 `/etc/mysql/my.cnf` and `/etc/mysql/conf.d/config-file.cnf`, 的mysql容器

### 不使用`cnf` 文件配置

很多配置都可以传给 `mysqld`. 使你自定义容器而不需要 `cnf` 文件. 如当你想改变默认编码和排序规则，使用 UTF-8 (`utf8mb4`) 只需要执行如下命令:

```sh
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

如果你想看到所有的配置项，只需要执行:

```sh
$ docker run -it --rm mysql:tag --verbose --help
```

## 环境变量

docker run 时，可以一个或多个参数进行配置. 不过需要注意，如果使用已经包含数据库的数据目录启动容器，以下变量不会产生影响，在启动时，任何预先存在的数据库都保持不变，任何之前存在的数据库在容器启动时将保持不变.

### `MYSQL_ROOT_PASSWORD`

该变量是必须的，是root账户的密码.

### `MYSQL_DATABASE`

该变量可选，允许在启动时，指定数据库的名称. 如果提供了用户名/密码，用户会被赋予超级权限.

### `MYSQL_USER`, `MYSQL_PASSWORD`

可选变量，用于创建新用户和密码，用户将获得超级管理员权限，两个参数都是必须的.

注意：不需要使用该机制来创建root超级用户，默认使用 `MYSQL_ROOT_PASSWORD` 来创建密码

### `MYSQL_ALLOW_EMPTY_PASSWORD`

可选变量，设置非空值（如yes），允许root用户无密码启动容器. *注意*: 除非你知道你在做什么，否则不建议设置为 `yes` ,因为这将使mysql实例完全不受保护,允许所有人获得完全的超级用户权限.

### `MYSQL_RANDOM_ROOT_PASSWORD`

可选变量，设置非空值（如yes）,使用pwgen , 为root用户随机生成密码 .密码将被打印.

### `MYSQL_ONETIME_PASSWORD`

设置用户 初始化完成后过期，在首次登录时候强制修改密码. 任何非空值将激活这个配置，注意：仅支持5.6+版本，以下版本会报错

### `MYSQL_INITDB_SKIP_TZINFO`

默认，entrypoint脚本自动加载`CONVERT_TZ()`函数需要的时区数据，如果不需要，任何非空值都将禁用时区加载

## Docker Secrets

通过环境变量传递敏感信息，还有另一种方法, `_FILE`  可以附加到前面列的环境变量，使得可以从文件中的变量初始化脚本，特别是，这可以用于存在`/run/secrets/<secret_name>`中的docker screts从加载密码, 如 ：

```sh
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql-root -d mysql:tag
```

目前仅支持： `MYSQL_ROOT_PASSWORD`, `MYSQL_ROOT_HOST`, `MYSQL_DATABASE`, `MYSQL_USER`, 和`MYSQL_PASSWORD`.

# 初始化新实例

刚启动容器,指定名字的新数据库会被创建，并且根据提供的变量初始化. 此外,它将执行扩展名为`.sh`, `.sql` 和 `.sql.gz` （ `/docker-entrypoint-initdb.d`文件夹中）.文件将按照字幕顺序执行. 你可以轻松使用dump备份填充，. 默认情况下，sql文件将被保存在 `MYSQL_DATABASE` 指定的数据库中.

# Caveats//告诫

## 数据存储在哪里

重要内容：有几种方式在容器运行时存储数据. 我们推荐 `mysql` 用户熟悉可用的选项,包括:

- 让docker使用自己的内部volume 将数据库文件写入主机系统上的磁盘（而不在容器内）从而管理数据库数据的存储。这也是默认的配置，也非常简单透明。缺点是相比直接部署**找文件困难**.
- 在主机上创建一个数据目录，并将其装载到容器内部的一个目录中，使得数据库文件放置在主机已知的位置上，更轻松访问文件，缺点是需要确保目录存在，且有权限和安全机制

Docker 文档是理解不同存储选项和变量的最好起步，并且有很多博客论坛讨论并提供建议，我们将简单展示基本过程:

1. 创建文件夹在主机如 `/my/own/datadir`.

2. 启动 `mysql` 容器

   ```sh
   $ docker run --name some-mysql -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
   ```

 `-v /my/own/datadir:/var/lib/mysql` 将 `/my/own/datadir` 目录从主机装入容器中作为 `/var/lib/mysql`  默认不传-v情况下，mysql将写入其他数据文件.

## 直到初始化完成才有连接

如果容器启动没有初始化数据库，则创建默认数据库. 初始化完成之前不会接受传入连接. 在使用自动化工具如 `docker-compose`同时启动多个容器时,这可能会导致问题.

如果应用尝试连接不提供服务的mysql，需要继续重试等待连接成功. 官方示例, 详见 [WordPress](https://github.com/docker-library/wordpress/blob/1b48b4bccd7adb0f7ea1431c7b470a40e186f3da/docker-entrypoint.sh#L195-L235) or [Bonita](https://github.com/docker-library/docs/blob/9660a0cccb87d8db842f33bc0578d769caaf3ba9/bonita/stack.yml#L28-L44).

## 现用数据库使用

如果在一个有mysql数据目录的volume启动mqsql，应省略 `$MYSQL_ROOT_PASSWORD`命令; 及时填写也不会生效, 且不会更改预先存在的数据库.

## 以任意用户身份运行

如果你正确设置了目录权限，或者你需要使用特定的uid/gid运行mysqld，则可以通过 `--user` 设为任意值（root/0外）来实现所需的权限/配置:

```sh
$ mkdir data
$ ls -lnd data
drwxr-xr-x 2 1000 1000 4096 Aug 27 15:54 data
$ docker run -v "$PWD/data":/var/lib/mysql --user 1000:1000 --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

## 创建备份

大多数工具都会正常工作,尽管他们的使用在某些情况下可能有点复杂， 以确保可以访问mysqld服务器，确保这一点的一个简单方法是使用 `docker exec` 并从同一容器运行工具，如:

```sh
$ docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql
```

## 从备份还原数据

```sh
$ docker exec -i some-mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sqlwith any relevant licenses for all software contained within.1
```