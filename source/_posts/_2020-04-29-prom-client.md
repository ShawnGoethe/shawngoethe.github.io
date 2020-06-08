---
title: prom-client
date: 2020-04-29 16:18:55
tags:
- client
categories:
- prometheus
---

# 简介

prom-client 支持nodejs收集metrics，直方图histogram，summaries，gauges，和counters

prometheus通过pull获取node服务数据

## 支持cluster

# API

## 配置

所有metric有两个必填参数，name与help

## 默认

1.`collectDefaultMetrics`为prom推荐metric（部分metric仅在linux生效）

2.包含node特有的metric，如eventLoop lag，active handles，gc，node version

3.collectDefaultMetrics可以接受以下参数

- prefix：metric自定义前缀，默认空
- registry ：自定义注册表，默认global
- `gcDurationBuckets`
- `eventLoopMonitoringPrecision` 

### 更换registry

```js
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });
```



### To use custom buckets for GC duration histogram, pass it in as `gcDurationBuckets`:

```js
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ gcDurationBuckets: [0.1, 0.2, 0.3] });
```

### To prefix metric names with your own arbitrary string, pass in a `prefix`:

```js
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const prefix = 'my_application_';
collectDefaultMetrics({ prefix });
```

### You can get the full list of metrics by inspecting `client.collectDefaultMetrics.metricsList`.

Default metrics are collected on scrape of metrics endpoint, not on an interval.

```js
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();
```

# counter

# Gauge

# Histogram

# Summary
# Labels
# Multiple registries
# Register
# Pushgateway
# Utilities
# GC stats