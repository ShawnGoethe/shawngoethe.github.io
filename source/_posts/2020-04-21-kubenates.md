---
title: kubernetes
date: 2020-04-21 16:18:55
tags:
- intro
categories:
- kubernetes
---
# 2.Basic

## 2.1 创建集群

minikube create

## 2.2 部署应用

一旦运行了 Kubernetes 集群，就可以在其上部署容器化应用程序。 为此，您需要创建 Kubernetes **Deployment** 配置。Deployment **指挥 Kubernetes 如何创建和更新应用程序的实例**。创建 Deployment 后，Kubernetes master 将应用程序实例调度到集群中的各个节点上。

创建应用程序实例后，Kubernetes Deployment 控制器会持续监视这些实例。 如果托管实例的节点关闭或被删除，则 Deployment 控制器会将该实例替换为群集中另一个节点上的实例。 **这提供了一种自我修复机制来解决机器故障维护问题。**

```
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```



## 2.3 了解应用

Kubernates pods（工作节点）

创建 Deployment 时, Kubernetes 添加了一个 **Pod** 来托管你的应用实例。Pod 是 Kubernetes 抽象出来的，表示一组一个或多个应用程序容器（如 Docker 或 rkt ），以及这些容器的一些共享资源。这些资源包括:

- 共享存储，当作卷
- 网络，作为唯一的集群 IP 地址
- 有关每个容器如何运行的信息，例如容器映像版本或要使用的特定端口。

Pod 为特定于应用程序的“逻辑主机”建模，并且可以包含相对紧耦合的不同应用容器。例如，Pod 可能既包含带有 Node.js 应用的容器，也包含另一个不同的容器，用于提供 Node.js 网络服务器要发布的数据。Pod 中的容器共享 IP 地址和端口，始终位于同一位置并且共同调度，并在同一工作节点上的共享上下文中运行。

## 2.4 暴露应用

## 2.5 伸缩应用

## 2.6 更新应用

# 3.在线培训课程

# 4. 配置

# 5.无状态应用

# 6.有状态应用

# 7.集群

# 8.Service