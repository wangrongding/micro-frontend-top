const subApps = [
    {
        name: "sub-a",
        entry: "//localhost:9425/",
        activeRule: "/sub-a",
        container: "#subapp-container", // 子应用挂载的div
        props: {
            routerBase: "/sub-a", // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
        },
    },
    /* {
        name: "sub-b",
        entry: "//localhost:9426/",
        activeRule: "/sub-b",
        container: "#subapp-container",
        props: {
            routerBase: "/sub-b",
        },
    }, */
];

export default subApps;
