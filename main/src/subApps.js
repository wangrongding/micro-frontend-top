export const subApps = [
    /**
     * name: 微应用名称 - 具有唯一性
     * entry: 微应用入口 - 通过该地址加载微应用
     * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
     * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
     */
    /*  {
        name: "frontend-park",
        entry: "//localhost:9425",
        container: "#subapp-container",
        activeRule: "/frontend-park",
        props: {
            routerBase: "/frontend-park",
        },
    }, */
    /* {
        name: "sub-app-vue",
        entry: "//localhost:9427",
        container: "#subapp-container",
        activeRule: "/sub-app-vue",
        props: {
            routerBase: "/sub-app-vue",
        },
    }, */
    {
        name: "mipac-test",
        entry: "//localhost:9550",
        container: "#subapp-container",
        activeRule: "/mipac-test",
        props: {
            routerBase: "/mipac-test",
        },
    },
    {
        name: "mipac-admin",
        entry: "//localhost:9552",
        container: "#subapp-container",
        activeRule: "/mipac-admin",
        props: {
            routerBase: "/mipac-admin",
        },
    },
];
