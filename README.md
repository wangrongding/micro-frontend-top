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

<!-- ### 改造开始! -->

### 改造子应用

子应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。

**\*\*\*** **主要需要做如下配置(这里以 vue 应用为例):** 👈

-   在 子应用的 src 目录新增 public-path.js 文件

通过`__webpack_public_path__`设置 webpack publicPath，防止资源加载出错

```javascript
if (window.__POWERED_BY_QIANKUN__) {
	__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

-   修改子应用中的 router 文件

将 src 下的 router/index.js 中的蓝色区域注释调,直接通过 `export default` 导出定义的路由数组

<img src="https://gitee.com/wangrongding/image-house/raw/master/images/202110261647660.png"/>
-   在子应用 src 下的 main.js 中

引入上面新增的`public-path.js`,然后新建一个`render`函数,并创建 VueRouter,然后挂载到应用上。
导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。

完整代码如下:

```javascript
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

//-------------------------挂载应用------------------------------
import "./public-path";
import routes from "./router";
import VueRouter from "vue-router";
let Router = null;
let instance = null;

function render(props = {}) {
	const { container, routerBase } = props;
	//在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
	Router = new VueRouter({
		base: window.__POWERED_BY_QIANKUN__ ? routerBase : "/",
		mode: "history",
		routes: routes,
	});
	// 挂载应用
	instance = new Vue({
		router: Router,
		store,
		render: (h) => h(App),
	}).$mount(container ? container.querySelector("#app") : "#app"); //为了避免根 id #app 与其他的 DOM 冲突，需要限制查找范围
}

//---------------------------独立运行时-------------------------
//
if (!window.__POWERED_BY_QIANKUN__) {
	render();
}

//------------------------导出相应的生命周期钩子------------------
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
	console.log("react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
	console.log("VueMicroApp mount", props);
	render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
	console.log("VueMicroApp unmount");
	instance.$destroy();
	instance.$el.innerHTML = "";
	instance = null;
	Router = null;
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
	console.log("update props", props);
}
```

qiankun 是基于 single-spa 实现的，所以你可以在[Registered application lifecycle](https://single-spa.js.org/docs/building-applications/#registered-application-lifecycle)找到更多关于微应用生命周期相关的文档说明。

-   子应用的`vue.config.js`中必须添加如下配置

```js
const appName = require("./package.json").name;
module.exports = {
	devServer: {
		headers: {
			"Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
		},
	},
	configureWebpack: {
		//为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置
		output: {
			library: `${appName}-[name]`, // 微应用的包名，必须与主应用中注册的微应用名称一样!
			libraryTarget: "umd", // 把微应用打包成 umd 库格式
			jsonpFunction: `webpackJsonp_${appName}`, //按需加载
		},
	},
};
```

### 基座应用需要做的事

-   在基座应用中安装 qiankun,`yarn add qiankun`/`xxx install qiankun`

-   在基座应用的 src 中新建一个 subApp.js 的文件,用于存放子应用的配置

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

在 基座应用的 App.vue 中设置好子应用挂载的节点

```html
<div id="app">
	<div id="nav">
		<router-link to="/">Home</router-link>
		|
		<router-link to="/about">About</router-link>
		|
		<router-link to="/sub-app-vue">微应用1</router-link>
		|
		<router-link to="/sub-app-vue2">微应用2</router-link>
	</div>
	<router-view v-show="$route.name" />
	<div id="subapp-container" v-show="!$route.name"></div>
</div>
```

在基座应用 main.js 中配置如下

```js
import { registerMicroApps, start } from "qiankun";
import subApps from "./subApp";
//注册子应用
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

## 开袋即食(食用说明)

下载本项目后,首先配置好自己的子应用 git remote 仓库地址
