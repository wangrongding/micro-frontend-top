<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>|
            <router-link to="/sub-app-vue">微应用1 sub-app-vue</router-link>|
            <router-link to="/sub-app-vue2">微应用2 sub-app-vue2</router-link>|
            <router-link to="/frontend-park">微应用3 frontend-park</router-link>|
            <router-link to="/frontend-park/pixel-image/index">微应用3 子页面</router-link>
        </div>
        <router-view v-show="$route.name" />
        <div id="subapp-container" v-show="!$route.name"></div>
        <!-- <div id="subapp-container"></div> -->
    </div>
</template>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#subapp-container {
    height: 100vh;
}
#nav {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99999;
}
</style>
