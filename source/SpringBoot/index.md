---
title: SpringBoot
date: 2019-12-12 10:31:48
---
[TOC]
# Getting Start

# 1.介绍

（我们牛逼，开箱即用）

# 2.开始

1.spring-boot精髓之处就是简化了spring的配置，

Spring Boot依赖项使用org.springframework.boot，继承自spring-boot-starter-parent，另外还支持gradle(待补充)，下面示例中的注解可以详细看一下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>myproject</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <!-- Inherit defaults from Spring Boot -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.2.RELEASE</version>
    </parent>

    <!-- Override inherited settings -->
    <description/>
    <developers>
        <developer/>
    </developers>
    <licenses>
        <license/>
    </licenses>
    <scm>
        <url/>
    </scm>
    <url/>

    <!-- Add typical dependencies for a web application -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <!-- Package as an executable jar -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

2.groupId和artifactId（待补充）

3.

@RestController来标记控制器（Controller）一个是注释的作用，一个是告诉编译器，处理web请求的时候考虑一下我。

@RequestMapping做路由映射⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄，并返回string类型。

@EnableAutoConfiguration二级注解，这个注释告诉Spring Boot根据所添加的jar依赖关系“猜测”您如何配置Spring。由于spring-boot-starter-web添加了Tomcat和Spring MVC，因此自动配置假定您正在开发Web应用程序并相应地设置Spring。

```java
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableAutoConfiguration
public class Example {

    @RequestMapping("/")
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        SpringApplication.run(Example.class, args);
    }

}
```

4.Main方法

这是遵循Java约定的应用程序入口点的标准方法。我们的主要方法通过调用run来启动Spring Boot的SpringApplication类。SpringApplication会引导我们的应用程序，并启动Spring，并且又会启动自动配置的Tomcat Web服务器。将Example.class作为参数传递给run方法，以告诉SpringApplication哪个是主要的Spring组件。args数组也通过传递以公开任何命令行参数。

5.创建可执行的jar(把程序打包成jar)

```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

开始打包：mvn package

看细节：jar tvf target/myproject-0.0.1-SNAPSHOT.jar

原始jar：myproject-0.0.1-SNAPSHOT.jar.origin

6.启动

我将提供一个我在debug的项目供大家调试，<https://github.com/ShawnGoethe/money>

Application.java配置成启动项，在IDEA中就可以启动了，在/hello目录下就可以看到返回的字符串了

# 3.使用

## 3.1build

- 依赖管理：会自动升级除非指定依赖包本
- maven：继承自spring-boot-starter-parent获得默认配置

| 序号 | 特性                                                         |
| ---- | ------------------------------------------------------------ |
| 1.   | Java 1.8为基础                                               |
| 2    | UTF-8编码方式                                                |
| 3.   | 继承自spring-boot-dependencies 的A Dependency Management section可以省去version标签 |
| 4    | An execution of the repackage goal with a repackage execution id. |
|      | Sensible resource filtering.                                 |
| 5    | 智能插件配置                                                 |
| 6    | 资源过滤                                                     |

### maven

配置你的项目，从继承spring-boot-starter-parent开始

```xml
<!-- Inherit defaults from Spring Boot -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.2.RELEASE</version>
</parent>
<!--需要指定版本号，除了导入其他启动器-->
<properties>
    <!--覆盖parent中spring data的配置-->
    <spring-data-releasetrain.version>Fowler-SR2</spring-data-releasetrain.version>
</properties>
```
如果你不想继承parent配置呢，也可以使用公司的依赖，通过scope标签来保留依赖项目管理↓
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <!-- Import dependency management from Spring Boot -->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.2.2.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<!--or-->
<dependencyManagement>
    <dependencies>
        <!-- Override Spring Data release train provided by Spring Boot -->
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-releasetrain</artifactId>
            <version>Fowler-SR2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.2.2.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
### maven plugin

目的：把你的项目打包成可执行的jar，类似npm里面的包

实现方式：pom中添加：（以下情况为默认配置）

```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```




- gradle（待补充）
- ant（待补充）
- starter(命名规则：spring-boot-starter-*)

| 名称                                        | 描述                                                |
| ------------------------------------------- | --------------------------------------------------- |
| spring-boot-starter                         | 启动核心（包括自动配置，日志和YAML）                |
| spring-boot-starter-activemq                | Apache ActiveMQ                                     |
| spring-boot-starter-amqp                    | Spring AMQP and Rabbit MQ                           |
| spring-boot-starter-aop                     | 使用AOP和AspectJ面向切片编程                        |
| spring-boot-starter-artemis                 | Apache Artemis                                      |
| spring-boot-starter-batch                   | 使用Spring Batch批处理                              |
| spring-boot-starter-cache                   | Spring Framework’s caching                          |
| spring-boot-starter-cloud-connectors        |                                                     |
| spring-boot-starter-data-cassandra          |                                                     |
| spring-boot-starter-data-cassandra-reactive |                                                     |
| spring-boot-starter-data-couchbase          |                                                     |
| spring-boot-starter-data-couchbase-reactive |                                                     |
| spring-boot-starter-data-elasticsearch      |                                                     |
| spring-boot-starter-data-jdbc               | Spring Data JDBC                                    |
| spring-boot-starter-data-jpa                |                                                     |
| spring-boot-starter-data-ldap               |                                                     |
| spring-boot-starter-data-mongodb            |                                                     |
| spring-boot-starter-data-mongodb-reactive   |                                                     |
| spring-boot-starter-data-neo4j              |                                                     |
| spring-boot-starter-data-redis              |                                                     |
| spring-boot-starter-data-redis-reactive     |                                                     |
| spring-boot-starter-data-rest               |                                                     |
| spring-boot-starter-data-solr               |                                                     |
| spring-boot-starter-freemarker              |                                                     |
| spring-boot-starter-groovy-templates        |                                                     |
| spring-boot-starter-hateoas                 |                                                     |
| spring-boot-starter-integration             |                                                     |
| `spring-boot-starter-jdbc`                  |                                                     |
| spring-boot-starter-jersey                  |                                                     |
| spring-boot-starter-jooq                    |                                                     |
| spring-boot-starter-json                    |                                                     |
| spring-boot-starter-jta-atomikos            |                                                     |
| spring-boot-starter-jta-bitronix            |                                                     |
| spring-boot-starter-mail                    |                                                     |
| spring-boot-starter-mustache                |                                                     |
| spring-boot-starter-oauth2-client           |                                                     |
| spring-boot-starter-oauth2-resource-server  |                                                     |
| spring-boot-starter-quartz                  |                                                     |
| spring-boot-starter-rsocket                 |                                                     |
| spring-boot-starter-security                |                                                     |
| spring-boot-starter-test                    |                                                     |
| spring-boot-starter-thymeleaf               |                                                     |
| spring-boot-starter-validation              |                                                     |
| spring-boot-starter-web                     | WEB服务包括RESTful，spring MVC应用，继承tomct的容器 |
| spring-boot-starter-web-services            |                                                     |
| spring-boot-starter-webflux                 |                                                     |
| spring-boot-starter-websocket               |                                                     |

除了上面的应用级别依赖，还有生产环境stater↓

| 名称                         | 描述                       |
| ---------------------------- | -------------------------- |
| spring-boot-starter-actuator | 帮助监控和管理生产应用程序 |

如果你想换一些技术可以参考↓

| 名称                              | 描述 |
| --------------------------------- | ---- |
| spring-boot-starter-jetty         |      |
| spring-boot-starter-log4j2        |      |
| spring-boot-starter-logging       |      |
| spring-boot-starter-reactor-netty |      |
| spring-boot-starter-tomcat        |      |
| spring-boot-starter-undertow      |      |

## 3.2 结构化代码

spring boot：我们很牛逼，不需要任何特定的代码布局就可以开始，但有些结构化可以对编程有帮助

### 3.2.1使用默认包

当类不包含package声明的时候，将视该类在默认程序包中（虽然我们不推荐，它会导致@ComponentScan，@ConfigurationPropertiesScan，@EntityScan，@SpringBootApplication等一些问题）

### 3.2.2 main类

我们建议将main文件放在应用的根目录，@SpringBootApplication的注解会在你的main类上方，它也会隐式定义一些搜索的基础功能，如写JPA的时候，@SpringBootApplication会帮你寻找@Entity注解，文件放在根目录，可以查到所有目录下的@Entity。

### 3.2.3 常用包tree

```
com
 +- example
     +- myapplication
         +- Application.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
```
Application.java文件将用@SpringBootApplication注解main主方法
```java
package com.example.myapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

## 3.3 配置类

SpringBoot支持基于Java的配置，尽可以使用XML格式的SpringApplication的配置，但我们仍然建议您的主要程序配置是一个简单的配置类，通常，main方法最好使用@Configuration

### 3.3.1 导入其他配置类

不需要把所有配置放在单个配置类中，@Import注解可以帮助你导入其他配置类，另外，你可以使用@ComponentScan来自动获取所有Spring组件，包括@Configuration类

#### 3.3.2 通过xml配置

如果你必须使用XML，仍然建议从@Configuration配置类开始，然后你可以使用@ImporResource注解来加载xml配置文件

## 3.4 自动配置

SpringBoot自动配置会尝试根据添加的依赖自动配置Spring应用程序，你需要通过@EnableAutoConfiguration或者@SpringBootApplication（仅能用一个）注解到配置类中

### 3.4.1逐渐取消自动配置

自动配置是不智能的，我们建议您自定义配置来替换自动配置

### 3.4.2禁用特定的自动配置类

通过@EnableAutoConfiguration中的exculde禁用，例如

```java
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.autoconfigure.jdbc.*;
import org.springframework.context.annotation.*;

@Configuration(proxyBeanMethods = false)
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class MyConfiguration {
}
```

## 3.5 Spring beans 和依赖注入(dependencyInjection)

你可以任意使用SpringFramework的技术来定义你的bean和注入依赖，如查找bean的@ComponetScan和构造注入的@Autowired

```java
package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseAccountService implements AccountService {
    //final后续无法修改
    private final RiskAssessor riskAssessor;

    @Autowired
    //如果bean有了构造器，就不需要@Autowired
    public DatabaseAccountService(RiskAssessor riskAssessor) {
        this.riskAssessor = riskAssessor;
    }

    // ...

}
```



3.6@SpringBootApplication

很受欢迎的一个注解，可以用于启用三个功能

- @EnableAutoConfiguration
- @ComponentScan
- @Configuration

```java
package com.example.myapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

## 3.7run

### 3.7.1 IDE

### 3.7.2 打包运行

### 3.7.3 使用MavenPlugin
### 3.7.4 使用GradlePlugin
### 3.7.5热更新

## 3.8 开发工具
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```
## 3.9 打包