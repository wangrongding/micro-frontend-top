<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/mipac-test/home">测试题</router-link>
            |
            <router-link to="/mipac-admin">管理</router-link>
            |
            <router-link to="/intervention">自主干预</router-link>
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
    margin: 0;
    padding: 0;
}
#nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
}
#subapp-container {
    height: 100vh;
}
</style>
