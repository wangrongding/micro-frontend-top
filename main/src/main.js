import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

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
