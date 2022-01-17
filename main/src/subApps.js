export const subApps = [
    /**
     * name: 微应用名称 - 具有唯一性
     * entry: 微应用入口 - 通过该地址加载微应用
     * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
     * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
     */
    {
        name: "admin",
        // entry: "http://192.168.1.126:9421",
        entry: "http://192.168.1.126:33112",
        container: "#subapp-container",
        activeRule: "/admin",
        props: {
            routerBase: "/admin",
        },
    },
    {
        name: "student",
        // entry: "http://192.168.1.126:9554",
        entry: "http://192.168.1.126:33111",
        container: "#subapp-container",
        activeRule: "/student",
        props: {
            routerBase: "/student",
        },
    },
];
