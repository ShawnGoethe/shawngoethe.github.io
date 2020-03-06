---
title: 2020-01-07-SetTimeout
date: 2020-01-07 13:01:52
tags:
---

执行了一下程序：

```
while(true){
    setTimeout(()=>{
        console.log(1)
    },0)
}
```

返回了一下内容：

```
<--- Last few GCs --->

[12308:000001E565C2F6F0]    14167 ms: Mark-sweep 1395.9 (1425.2) -> 1395.9 (1423.7) MB, 1754.1 / 0.0 ms  (+ 0.0 ms in 39 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1764 ms) (average mu = 0.105, current mu = 0.020) a[12308:000001E565C2F6F0]    14175 ms: Scavenge 1397.3 (1423.7) -> 1397.3 (1425.2) MB, 7.0 / 0.0 ms  (average mu = 0.105, current mu = 0.020) allocation failure


<--- JS stacktrace --->

==== JS stack trace =========================================

    0: ExitFrame [pc: 000002AFCABDC5C1]
Security context: 0x037b5391e6e9 <JSObject>
    1: /* anonymous */ [0000016D4360B9A1] [D:\working\h3yun\test.3.js:~1] [pc=000002AFCAC7210F](this=0x016d4360bad1 <Object map = 000001F79EE82571>,exports=0x016d4360bad1 <Object map = 000001F79EE82571>,require=0x016d4360ba91 <JSFunction require (sfi = 00000397F3EC6A31)>,module=0x016d4360ba09 <Module map = 000001F79EED3DA1>,__filename=0x0397f3ece219 <Strin...

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 00007FF7C7BFC6AA v8::internal::GCIdleTimeHandler::GCIdleTimeHandler+4506
 2: 00007FF7C7BD7416 node::MakeCallback+4534
 3: 00007FF7C7BD7D90 node_module_register+2032
 4: 00007FF7C7EF189E v8::internal::FatalProcessOutOfMemory+846
 5: 00007FF7C7EF17CF v8::internal::FatalProcessOutOfMemory+639
 6: 00007FF7C80D7F94 v8::internal::Heap::MaxHeapGrowingFactor+9620
 7: 00007FF7C80CEF76 v8::internal::ScavengeJob::operator=+24550
 8: 00007FF7C80CD5CC v8::internal::ScavengeJob::operator=+17980
 9: 00007FF7C80D6317 v8::internal::Heap::MaxHeapGrowingFactor+2327
10: 00007FF7C80D6396 v8::internal::Heap::MaxHeapGrowingFactor+2454
11: 00007FF7C8200637 v8::internal::Factory::NewFillerObject+55
12: 00007FF7C827D826 v8::internal::operator<<+73494
13: 000002AFCABDC5C1
```

# why

因为业务代码阻塞住，没有进入timer_handler的循环，所以1虽然进入了timer的红黑树中，但是不可能输出，不像之前for循环会有一个截止条件，后续的定时器还是可以生效的



另外有一个地方记混了，遍历回调的时候，会执行直到回调为空或者最大执行回调数量，而业务代码只会在这里阻塞不会停止，这也是为何出现GC的日志

# what

setimeout是JS前端常用的控件用来延时执行一个函数（回调），当执行业务代码的时候我们会将settimeout，setImmediate，nextTick，setInterval插入timer_handler的不同队列中（详见左侧node分支，且文章也在更新中），当JS单线程执行完业务代码后，才开始eventloop查找观察者来进行回调，当然也存在延时不精确的可能
