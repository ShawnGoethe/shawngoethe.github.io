---
title: LineageOS16.0-RELEASE
date: 2019-03-02 20:12:52
tags:
categories: 
- phones
---
## 16.0正式发布

我们从去年八月开始，努力将我们LineageOs的新特性移植到新版本的安卓上，非常感谢之前版本中的工作者们，我们才能够在这次的版本新特性中投入更多的精力，尤其是，隐私守护（Privacy Guard）和插件（su addon）上收到了了大量的提升建议。
通过对Styles API的一些细微更改，他现在可以兼容安卓暗黑模式的默认实现，在未来，越来越多的三方应用将遵循系统风格，这意味着Styles API将允许在跨应用程序时获得更一致的体验。
正如我们发布夏季第二次调研结果那样，我们将介绍Trust的新特性，首先是设备锁定时阻止新USB设备连接。请注意，由于基于底层，所以这个特性必须在每个设备底层中启用。Trebuchet现在还可以隐藏app以及在打开app前进行身份验证。该限制也仅在Trebuchet中，并非系统范围。
我们认为16.0的分支已经达到了15.1版本的特性测试并做好了发布准备。随着16.0分支成为最新最活跃的分支，在2019.3.1，它将开始日更新构建，并且15.1将会移动到周更新。
16.0版本将会从小部分机器开始运行，一些其他的机子如果准备好了，我们也会做一些小改动，开始构建，并通过改动构建脚本来更好地处理我们最新手机的，独特feature，以及由此产生的复杂问题

## 支持更新名单

- Asus
- BQ
- Fairphone
- Google
- HTC
- Huawei
- LeEco
- Lenovo
- LG
- Moto
- Nextbit
- Nubia
- Nvdia
- OnePlus(my oneplus 5T receive 16.0)
- Oppo
- Samsung
- Sony
- Wileyfox
- Wingtech
- Xiaomi
- YU
- ZTE
- Zuk
- more

## 其他热门的ROM

- [MoKee](https://www.mokeedev.com/)]
- [crDroid](https://crdroid.net/)
- [MIUI](http://www.miui.com/)
- [Flyme](https://www.flyme.cn/)
- [PixelExperience](<https://pixelexperience.org/>)


## 原文

> ## Hello LineageOS 16.0
>
> We’ve been working hard since August to port our unique features to this new version of Android. Thanks to the major cleanup and refactoring done in the previous version, we were able to focus more on features and reliability this time; in particular, both Privacy Guard and the su addon received a sizeable amount of improvements.
>
> With some minor changes made to the [Styles API](https://wiki.lineageos.org/sdk/api/styles.html), it is now compatible with what will eventually become the default implementation of dark mode in Android. In the future, more and more third party apps will follow the system style, meaning our Styles API will allow you to have a more coherent experience across apps.
>
> As we announced when the [Summer Survey 2 results](https://lineageos.org/Summer-Survey-2-Results/) were posted, we will be introducing new features to [Trust](https://lineageos.org/Trust-me/), beginning with the ability to block new USB device connections when device is locked. Please note that this feature has to be enabled on a per-device basis due to the layer at which this was implemented. Trebuchet is also now able to hide apps and require authentication before opening them. Please note that this restriction is limited to Trebuchet and is not system-wide.
>
> We feel that the 16.0 branch has reached feature parity with 15.1 and is ready for initial release. With 16.0 being the most recent and most actively-developed branch, on March 1st, 2019 it will begin receiving builds nightly and 15.1 will be moved to weekly builds.
>
> LineageOS 16.0 will be launching with a small selection of devices. Additional devices will begin receiving builds as they are ready and after we make minor change to our build scripts to better handle the unique features, and resulting complications, of the most modern devices.
>
> ### Upgrading to LineageOS 16.0
>
> 1. (Optional) Make a backup of your important data
>
> 2. Download the build either from
>
>     
>
>    download portal
>
>     
>
>    or built in Updater app
>
>    - You can export the downloaded package from the Updater app to the sdcard by long-pressing it and then selecting *“Export”* in the popup menu
>
> 3. Download proper addons packages ([GApps](https://wiki.lineageos.org/gapps.html), [su](https://download.lineageos.org/extras)…) for Android 9.0/Lineage OS 16.0
>
> 4. Make sure your recovery and firmware are up to date
>
> 5. Format your system partition
>
> 6. Follow the “Installing LineageOS from recovery” section [on your device’s installation page](https://wiki.lineageos.org/install_guides.html)
>
> Please note that if you’re currently on an official build, you *DO NOT* need to wipe your device.
>
> If you are installing from an unofficial build, you *MUST* wipe data from recovery before installing.