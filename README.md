# qiankun 微前端架构从 0-1

## 项目说明

### 目录结构

-   main 所有应用的基座,vue 构建
-   packages 存放所有子应用
-   script 项目需要的一些 Node 脚本

### 启动步骤

1.  `yarn clone`clone 所有的子应用到 packages 目录中
2.  `yarn ins`安装所有项目的依赖
3.  `yarn start`启动所有服务

## 实现方法记录

### clone 子应用

本来是想通过`download-git-repo`来实现的,但是发现 clone 下来的仓库都没有.git 文件夹了,通过查看`download-git-repo`的源码发现里面有一行代码通过`rimraf`把.git 文件给删除了,并且没有可选项控制不删除,这样就不满足子应用需要独立的版本管理需求了.

![](https://gitee.com/wangrongding/image-house/raw/master/images/202110212057802.png)

所以我自己通过`download-git-repo`也在用的`git-clone`依赖,实现了一个符合当前需求的小工具

```js
const gitClone = require("git-clone/promise");
const loading = require("loading-cli");

/* 
    repoUrl:git仓库地址
    targetPath:下载的目标目录
    cloneOptions:git clone的可选参数
                git:git二进制路径；默认：（git预计在你的$PATH）
                shallow: when true，克隆深度为 1
                checkout: 克隆后要检出的修订版/分支/标签
                args: 要传递给的额外参数数组 git clone
    eg: clone(repo, targetPath, [options]
*/

async function clone(repoUrl, targetPath, cloneOptions = { shallow: 1 }) {
	if (!(repoUrl && targetPath)) {
		console.log("repoUrl,targetPath为必传项!");
		return;
	}
	const load = loading("请耐心等待,各应用正在clone...").start();
	await gitClone(repoUrl, targetPath, cloneOptions)
		.then(() => {
			// console.clear();
			console.log(`成功! clone ${targetPath}完成~ ✔💚`);
		})
		.catch((err) => {
			console.log(
				`clone ：${targetPath} 出错! ,❌${err}，请检查该文件夹是否已存在,或立即重试!`
			);
		})
		.finally(() => {
			load.stop();
		});
}
```

可以看到有加载的状态

并且成功与失败的报错还是很友好的~

![](https://gitee.com/wangrongding/image-house/raw/master/images/202110212103950.gif)

### npm 运行多命令

通过`npm-run-all`来实现

### 改造开始!

#### 改造子应用

子应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。

**主要需要做如下配置(这里以 vue 应用为例):**

-   导出相应的生命周期钩子

在所有子应用的`vue.config.js`的 devServer 中配置跨域 headers

```js
devServer: {
    headers: {
        "Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
    }
},
```

App.vue 中设置好子应用挂载的节点

```html
<template>
	<div id="app">
		<!-- <router-view /> -->
		<div class="nav"></div>
		<div class="side-bar"></div>
		<div id="#subapp-container"></div>
	</div>
</template>
```

在基座应用中安装 qiankun

`yarn add qiankun`

新建一个 subApp.js 的文件,用于存放子应用的配置

具体如下

```js
const subApps = [
	{
		name: "sub-a",
		entry: "//localhost:9425/",
		activeRule: "/sub-a",
		container: "#subapp-container", // 子应用挂载的 div
		props: {
			routerBase: "/sub-a", // 下发路由给子应用，子应用根据该值去定义 qiankun 环境下的路由
		},
	},
	{
		name: "sub-b",
		entry: "//localhost:9426/",
		activeRule: "/sub-b",
		container: "#subapp-container",
		props: {
			routerBase: "/sub-b",
		},
	},
];
export default subApps;
```

在基座应用 main.js 中配置如下

```js
import { registerMicroApps, start } from "qiankun";
import subApps from "./subApp";
registerMicroApps(subApps, {
	beforeLoad: (app) => {
		console.log("beforeLoad", app.name);
	},
	beforeMount: [
		(app) => {
			console.log("beforeMount", app.name);
		},
	],
	afterMount: [
		(app) => {
			console.log("afterMount", app.name);
		},
	],
	afterUnmount: [
		(app) => {
			console.log("afterUnmount", app.name);
		},
	],
});
start();
```

### 注册子应用

## 开袋即食(食用说明)

下载本项目后,首先配置好自己的子应用 git remote 仓库地址
