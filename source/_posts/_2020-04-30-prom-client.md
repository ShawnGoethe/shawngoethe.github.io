---
title: prom-client
date: 2020-04-30 16:18:55
tags:
- client
categories:
- prometheus
---
prom-clinet

prometheus的client，支持histogram summaries gauges counters

# usage

- cluster模式,避免各个worker都有一个metric
- 非cluster模式，全局挂载

# api

## Config

所有metric都有两个强制属性

- name
- help（描述）

## DefaultMetrics

collectDefaultMetrics({options})

Options （Object）具备以下四个参数

- prefix：metric添加前缀 ，默认没有前缀（job instance后更加细分）
- registry:指向哪个register，默认全局
- gcDurationBuckets 自定义buckets的gc持续时间直方图，默认[0.001, 0.01, 0.1, 1, 2, 5]` (in seconds).
- eventLoopMonitoringPrecision 采样率以毫秒为单位（>0），默认10

```js
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
const prefix = 'my_application_';

collectDefaultMetrics({ register,prefix,gcDurationBuckets: [0.1, 0.2, 0.3] });
```

## counter

当进程重启时，counter会清空，使用函数解决

作者注：

- 可以监控按钮点击次数，请求次数来监控业务数据
- 同时也**支持labelNames**，参考Histogram
- 从0开始增，**不可减**，（减->gauge）

```js
const client = require('prom-client');
const counter = new client.Counter({
  name: 'metric_name',
  help: 'metric_help',
});
counter.inc(); // Inc with 1
counter.inc(10); // Inc with 10
```

## gauge

counter功能基础上支持减法

```js
//base
const client = require('prom-client');
const gauge = new client.Gauge({ name: 'metric_name', help: 'metric_help' });
gauge.set(10); // Set to 10
gauge.inc(); // Inc with 1
gauge.inc(10); // Inc with 10
gauge.dec(); // Dec with 1
gauge.dec(10); // Dec with 10

//others
gauge.setToCurrentTime(); // Sets value to current time

const end = gauge.startTimer();
xhrRequest(function (err, res) {
  end(); // Sets value to xhrRequests duration in seconds
});
```

## histogram

追踪事件的大小和频率

### 配置

默认的buckets旨在覆盖常规的web/rpc请求，也可以被override

```js
const client = require('prom-client');
new client.Histogram({
  name: 'metric_name',
  help: 'metric_help',
  labelNames: ['status_code'],//**Array**
  buckets: [0.1, 5, 15, 50, 100, 500],
});
```

### Examples

```js
const client = require('prom-client');
const histogram = new client.Histogram({
  name: 'metric_name',
  help: 'metric_help',
});
histogram.observe(10); // Observe value in histogram
```

### Utility to observe request durations

```js
const end = histogram.startTimer();
xhrRequest(function (err, res) {
  const seconds = end(); // Observes and returns the value to xhrRequests duration in seconds
});
```

## summary

计算观察值的百分比数据

### Configuration

默认百分比[0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999]，但可以被覆盖

```js
const client = require('prom-client');
new client.Summary({
  name: 'metric_name',
  help: 'metric_help',
  percentiles: [0.01, 0.1, 0.9, 0.99],
});

```

如果启用滑动窗口功能，需要新增`maxAgeSeconds` and `ageBuckets`

```js
const client = require('prom-client');
new client.Summary({
  name: 'metric_name',
  help: 'metric_help',
  maxAgeSeconds: 600,
  ageBuckets: 5,
});
```

maxAgeSeconds 可以知道bucket重制前的使用时常

ageBuckets 滑动窗口中最多的buckets数目

### Usage example

```js
const client = require('prom-client');
const summary = new client.Summary({
  name: 'metric_name',
  help: 'metric_help',
});
summary.observe(10);
```

### Utility to observe request durations

```js
const end = summary.startTimer();
xhrRequest(function (err, res) {
  end(); // Observes the value to xhrRequests duration in seconds
});
```

## labels

所有metrics可以设置labelNames属性，两种赋值方式

```js
const client = require('prom-client');
const gauge = new client.Gauge({
  name: 'metric_name',
  help: 'metric_help',
  labelNames: ['method', 'statusCode'],
});

gauge.set({ method: 'GET', statusCode: '200' }, 100); // 1st version, Set value 100 with method set to GET and statusCode to 200
gauge.labels('GET', '200').set(100); // 2nd version, Same as above
```

用来记录请求结果

```js
const end = startTimer({ method: 'GET' }); // Set method to GET, we don't know statusCode yet
xhrRequest(function (err, res) {
  if (err) {
    end({ statusCode: '500' }); // Sets value to xhrRequest duration in seconds with statusCode 500
  } else {
    end({ statusCode: '200' }); // Sets value to xhrRequest duration in seconds with statusCode 200
  }
});
```

### default labels



# gc



