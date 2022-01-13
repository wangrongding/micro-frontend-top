<template>
    <div id="app">
        <div id="nav">
            <router-link to="/student">客户端</router-link>
            |
            <router-link to="/admin">管理端</router-link>
        </div>
        <router-view v-show="$route.name" />
        <div id="subapp-container" v-show="!$route.name"></div>
    </div>
</template>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}
#nav {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9999999;
    border: 2px dashed #037af0;
    display: none;
}
#subapp-container {
    height: 100vh;
}
#subapp-container {
    height: 100vh;
}
</style>
