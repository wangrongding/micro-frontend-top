import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from "qiankun";
import { subApps } from "./subApps";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/index.scss";
Vue.config.productionTip = false;
import "@/assets/index.scss";

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

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

start({
    prefetch: "all", // 开启预加载
    sandbox: {
        experimentalStyleIsolation: true, //   开启沙箱模式,实验性方案
    },
});

// 添加全局异常捕获
addGlobalUncaughtErrorHandler((handler) => {
    console.log("异常捕获", handler);
});
