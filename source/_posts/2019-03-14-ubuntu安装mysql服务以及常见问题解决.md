---
title: 安装mysql服务以及常见问题解决
date: 2019-03-14 14:22:39
tags:
---
# 安装

sudo apt-get update

sudo apt-get install mysql-server

# 解决远程连接
> tips本人使用环境ubuntu16

完成安装后，远程连接你会发现2003报错，此时，你对 /etc/mysql/mysql.conf.d/ 文件夹中打开 mysqld.cnf文件修改即可

>  修改内容将#bind-address = 127.0.0.1 原本没有注释，进行注释

然后你重新远程连接mysql直接变成1130的拒绝访问服务，接下来你要在服务器端登录mysql，执行 

> 进入数据库
>
> mysql -u root -p
>
> 切换数据库,
>
> mysql>use mysql;
>
> 查看root账号的登录权限,
>
> mysql>select host, user from user;
>
> 修改登录权限
>
> mysql>update user set host = '%' where user = 'root';
>
> 刷新,生效,最后一步,至关重要
>
> mysql>flush   privileges;

