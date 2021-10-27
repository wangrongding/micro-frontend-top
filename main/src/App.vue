<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">主应用测试页</router-link>
            |
            <router-link to="/mipac-test/home">测试题</router-link>
            |
            <router-link to="/mipac-admin/data-panel">管理后台</router-link>
            <router-link to="/mipac-admin">管理</router-link>
            |
            <router-link to="/sub-app-vue">微应用1</router-link>
        </div>
        <router-view v-show="$route.name" />
        <div id="subapp-container" v-show="!$route.name"></div>
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
