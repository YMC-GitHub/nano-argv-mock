一个类库包，用于将一串文本参数转化为命令行风格

## 文件大小
file | size | gzip | brotli
:---- | :---- | :---- | :----
dist/main.cjs | 3.95kb | 1.20kb | 1.08kb
dist/main.js | 3.45kb | 1.07kb | 0.95kb
dist/main.min.cjs | 2.77kb | 0.97kb | 0.86kb
dist/main.min.js | 2.29kb | 0.84kb | 0.75kb
dist/main.umd.cjs | 4.52kb | 1.34kb | 1.20kb
dist/main.umd.min.cjs | 2.17kb | 0.99kb | 0.86kb

## 项目背景

曾经完成过这样的一个需求：解析命令行风格参数。

曾写过某个命令行工具，我想写一个它的网页版，要求将它的命令行输入直接用在网页版中，即，它可以直接用在其他的类库中。

对于开发者的我而言，我不想再设计它的用户接口了；对于使用者而言，用户可以直接在其他地方使用，并不一定非要在命令行窗口中。

但是对于用户的输入，我是不放心的。因为用户的输入不一定符合程序的入口要求。因此，我需要一个 '它' 来将用户输入转化为“标准化的”命令行风格

## 当前功能

- 将输入转化为“标准化的”命令行风格
- 支持文本输入

## 用户安装

- 您可以通过npm cdn 直接引入
```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/nano-argv-mock@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- 您可以通过类库安装工具安装
```bash
npm i nano-argv-mock
```

```bash
yarn add nano-argv-mock
```

```bash
pnpm add nano-argv-mock
```

```ts
import {LikeArgv} from 'nano-argv-mock'
console.log(LikeArgv(`you say -hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong"`))
// ["you","say","-hi","--name","ye mian cheng","--first-name","ye","--old-name","ye min cong"]
```

## 产品闭环

很小，功能单一，只做一件事——将输入转化为“标准化的”命令行风格

## 产品运维

因为功能简单，决定了它的开发速度，更新速度，问题速度不会很慢

## 产品计划

因为功能单一，功能已经基本完成，后期主要根据命令包或其他类库包的需要，更新小补丁，不会有功能大改的情况出现，架构可能会随着技术的更新而有变化

## 许可证书

您可以使用它做任何事，但是请不要违发您所在地区法律。我不会为您的行为承担任何责任。

## 结束语

> 身为一名程序员我很自豪，虽然足不出户，指尖却有着可以改变世界 (可能有点大了) 自己的力量。即使不能实现，将其作为努力的目标也不错。———— 摘自 lencx

它就是一张白纸，您有什么设想，可以直接编码出来，怎么编，规则怎么定，有您决定。