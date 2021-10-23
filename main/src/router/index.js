import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;


// // micro-app-main/src/routes/index.ts
// import Home from "@/pages/home/index.vue";

// const routes = [
//     {
//         /**
//          * path: 路径为 / 时触发该路由规则
//          * name: 路由的 name 为 Home
//          * component: 触发路由时加载 `Home` 组件
//          */
//         path: "/",
//         name: "Home",
//         component: Home,
//     },
// ];

// export default routes;
