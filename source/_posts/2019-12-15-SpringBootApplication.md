---
title: 2019-12-15-@SpringBootApplication
date: 2019-12-15 23:13:51
tags:
- annotation
categories:
- SpringBoot
---
# 启动类
我们可以见到最简单的springboot的application.java文件如下
```java
@SpringBootApplication
public class SpringTestApplication {
 
	public static void main(String[] args) {
		SpringApplication.run(SpringTestApplication.class, args);
	}
```

**实际上，SpringApplication的run方法时首先会创建一个SpringApplication类的对象，利用构造方法创建SpringApplication对象时会调用initialize方法**

```java
public static ConfigurableApplicationContext run(Object source, String... args) {
		return run(new Object[] { source }, args);
	}
 
public static ConfigurableApplicationContext run(Object[] sources, String[] args) {
		return new SpringApplication(sources).run(args);
	}
 
public SpringApplication(Object... sources) {
		initialize(sources);
	}
```

其中initialize方法如下

```java
`private void initialize(Object[] sources) {
    // 在sources不为空时，保存配置类
    if (sources != null && sources.length > 0) {
        this.sources.addAll(Arrays.asList(sources));
    }
    // 判断是否为web应用
    this.webEnvironment = deduceWebEnvironment();
    // 获取并保存容器初始化类，通常在web应用容器初始化使用
    // 利用loadFactoryNames方法从路径MEAT-INF/spring.factories中找到所有的ApplicationContextInitializer
    setInitializers((Collection) getSpringFactoriesInstances(
        ApplicationContextInitializer.class));
    // 获取并保存监听器
    // 利用loadFactoryNames方法从路径MEAT-INF/spring.factories中找到所有的ApplicationListener
    setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
    // 从堆栈信息获取包含main方法的主配置类
    this.mainApplicationClass = deduceMainApplicationClass();
}
```

实例化后调用run：

```java
public ConfigurableApplicationContext run(String... args) {
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();
    ConfigurableApplicationContext context = null;
    FailureAnalyzers analyzers = null;
    // 配置属性
    configureHeadlessProperty();
    // 获取监听器
    // 利用loadFactoryNames方法从路径MEAT-INF/spring.factories中找到所有的SpringApplicationRunListener
    SpringApplicationRunListeners listeners = getRunListeners(args);
    // 启动监听
    // 调用每个SpringApplicationRunListener的starting方法
    listeners.starting();
    try {
        // 将参数封装到ApplicationArguments对象中
        ApplicationArguments applicationArguments = new DefaultApplicationArguments(
            args);
        // 准备环境
        // 触发监听事件——调用每个SpringApplicationRunListener的environmentPrepared方法
        ConfigurableEnvironment environment = prepareEnvironment(listeners,
            applicationArguments);
        // 从环境中取出Banner并打印
        Banner printedBanner = printBanner(environment);
        // 依据是否为web环境创建web容器或者普通的IOC容器
        context = createApplicationContext();
        analyzers = new FailureAnalyzers(context);
        // 准备上下文
        // 1.将environment保存到容器中
        // 2.触发监听事件——调用每个SpringApplicationRunListeners的contextPrepared方法
        // 3.调用ConfigurableListableBeanFactory的registerSingleton方法向容器中注入applicationArguments与printedBanner
        // 4.触发监听事件——调用每个SpringApplicationRunListeners的contextLoaded方法
        prepareContext(context, environment, listeners, applicationArguments,
            printedBanner);
        // 刷新容器，完成组件的扫描，创建，加载等
        refreshContext(context);
        afterRefresh(context, applicationArguments);
        // 触发监听事件——调用每个SpringApplicationRunListener的finished方法
        listeners.finished(context, null);
        stopWatch.stop();
        if (this.logStartupInfo) {
            new StartupInfoLogger(this.mainApplicationClass)
                .logStarted(getApplicationLog(), stopWatch);
        }
        // 返回容器
        return context;
    }
    catch (Throwable ex) {
        handleRunFailure(context, listeners, analyzers, ex);
        throw new IllegalStateException(ex);
    }
}
```

为了建立调用逻辑画了一张图，比较粗糙

![](..\img\springbootApplication.png)

# 总结

SpringApplication.run一共做了两件事

- 创建SpringApplication对象；在对象初始化时保存事件监听器，容器初始化类以及判断是否为web应用，保存包含main方法的主配置类。
- 调用run方法；准备spring的上下文，完成容器的初始化，创建，加载等。会在不同的时机触发监听器的不同事件

<https://www.cnblogs.com/davidwang456/p/5846513.html>

