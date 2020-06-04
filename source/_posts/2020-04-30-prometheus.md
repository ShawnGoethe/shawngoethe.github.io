---
title: prometheus
date: 2020-04-30 16:18:55
tags:
- intro
categories:
- prometheus
---
# 1. Introduction

# 2.Concepts

# 3. Prometheus

# 4.Visualization

# 5.Operating

## 5.1security

promethues具备很多组件，以及与其他系统集成，本身**可以**部署在受信任和不受信任的环境

### 5.1.1 Promethues

### 5.1.2 AlertManager

### 5.1.3 Pushgateway

### 5.1.4 Exporters

### 5.1.5 Client Libraries

### 5.1.6 Auth and encrytion

prometheus 及其组建不提供任何身份验证（server-side authentication）,授权（authorization） ,加密（encryption）

如果需要，建议采用`反向代理`

- 在管理或者mutating endpoints 使用简单的访问工具（如cURL）访问，由于prom没有内置的csrf保护模块，所以会破坏类用例（break such use cases）,因此使用反向代理，可以避免csrf攻击

- 对于非mutating endpoints ，你可以使用cors headers （如`Access-Control-Allow-Origin`）来避免xss攻击

- 对于非信任用户，使用转译
- 对于grafana，做好权限监控，不要限制使用代理方式运行查询语句的权限

### 5.1.7 Secrets

### 5.1.8 Denial of Service

### 5.1.9 Libraries

### 5.1.10 Build Process

### 5.1.11 External audits



## 5.2 Integrations

# 6.Instrumenting

# 7.Alerting

# 8.Best Practices

## 8.4 Histograms and summaries

### 8.4.1 Library support

官方：go java py ruby

译者注：目前node通过prom-client也可以使用

### 8.4.2 Count and sum of observations

两者都是样本观察，请求持续时间或者响应大小，观察value，求和，计算平均值

可以使用summaries & histogram计算负值（如温度），且无法使用rate

计算5min中内的请求持续时间，平均值的hisogram or summary

```js
rate(http_request_duration_seconds_sum[5m])/rate(http_request_duration_seconds_count[5m])
```



### 8.4.3 Apdex score

Apex =Application Performance Index



### 8.4.4 Quantiles

### 8.4.5 Errors of quantile estimation

### 8.4.6 if no library support

# 9.Guides



