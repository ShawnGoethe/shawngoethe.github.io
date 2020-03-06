---
title: dockerfile
date: 2019-03-04 21:09:55
tags:
- docker
categories:
- Linux
---
# what
通过dockerfile写入程序、库、资源、配置参数等，来生成image文件，可以类比node的package.json或者nginx.conf的文件

# format

```shell
##  Dockerfile文件格式

# This dockerfile uses the ubuntu image
# VERSION 2 - EDITION 1
# Author: docker_user
# Command format: Instruction [arguments / command] ..
 
# 1、第一行必须指定 基础镜像信息
FROM ubuntu
 
# 2、维护者信息
MAINTAINER docker_user docker_user@email.com
 
# 3、镜像操作指令
RUN echo "deb http://archive.ubuntu.com/ubuntu/ raring main universe" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
 
# 4、容器启动执行指令
CMD /usr/sbin/nginx
```

## build image

```shell
docker build
```

运行该命令时，根据dockerfile文件及上下文构建新的docker镜像，其中上下文是指dockerfile所在的本地路径或者网络路径url。

ps:dokcer build时候，会在后台守护进程daemon中进行，而不是cli（common line interface）中，构建前，构建进程将全部内容递归放到守护进程，将dockerfile文件放在（本就在空目录下构建）该目录下

还可以通过.dockerignore的文件来忽略上下文目录中的部分文件和目录，同.gitignore

通过-f命令指定文件位置，如：

```shell
docker buid -f /path/to/dockerfile .
```

# image tag

镜像标签docker build -t ngix/v3

# cache

Docker 守护进程会一条一条的执行 Dockerfile 中的指令，而且会在每一步提交并生成一个新镜像，最后会输出最终镜像的ID。生成完成后，Docker 守护进程会自动清理你发送的上下文。 Dockerfile文件中的每条指令会被独立执行，并会创建一个新镜像，RUN cd /tmp等命令不会对下条指令产生影响。 **Docker 会重用已生成的中间镜像**，以加速docker build的构建速度。

# example

```shell
mkdir mynginx
cd mynginx
vi Dockerfile

//制作dokcerfile
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html

//save && run this code in mynginx
docker build -t nginx:v1 .
//v1 后面有一个空格和一个点
//点代表当前目录
//查看image
dokcer images

//run
dokcer run --name docker_nginx_v1 -d -p 80:80 nginx:v1
//docker_nginx_v1为容器名
//nginx:v1为image名
```

