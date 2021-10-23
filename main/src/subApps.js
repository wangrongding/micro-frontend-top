export const subApps = [
    /**
    * name: 微应用名称 - 具有唯一性
    * entry: 微应用入口 - 通过该地址加载微应用
    * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
    * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
    */
    {
        name: 'sub-app-vue',
        entry: '//localhost:9427',
        container: '#subapp-container',
        activeRule: '/sub-app-vue',
        props: {
            routerBase: '/sub-app-vue'
        }
    },
    {
        name: 'sub-app-vue2',
        entry: '//localhost:9428',
        container: '#subapp-container',
        activeRule: '/sub-app-vue2',
        props: {
            routerBase: '/sub-app-vue2'
        }
    },
];

