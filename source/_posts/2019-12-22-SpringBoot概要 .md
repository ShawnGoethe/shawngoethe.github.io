---
title: 2019-12-22-SpringBoot概要
date: 2019-12-16 20:37:30
tags:
- introduction
categories:
- SpringBoot
---

含义：spring 的简化配置版本（继承父类依赖，拥有父类的所有配置）

```xml
<!--你的项目pom文件-->
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
</parent>

<!--点开spring-boot-starter-parent，文件相对位置\org\springframework\boot\spring-boot-starter-parent\2.0.4.RELEASE-->
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>2.0.4.RELEASE</version>
        <relativePath>../../spring-boot-dependencies</relativePath>
</parent>
```



微服务

AOP

简化部署，可以再pom.xml中配置plugins来实现导出jar包，方便执行

Features:

- starter
- 入口类标记@SpringBootApplication
- SpringBoot配置类@SpringBootConfiguration
- 配置类@Configuration
- 开启自动配置@EnableAutoConfiguration
- 自动配置包@AutoConfigurationPackage
- 导入组件@Import



疑惑

- 为什么使用注解
- 为什么需要AOP
- 为什么选择springboot
- 

