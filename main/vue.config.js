const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
    devServer: {
        port: 9420,
        hot: true,
        open: true,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias.set("@", resolve("src"));
        // 配置网页title;
        config.plugin("html").tap((args) => {
            args[0].title = "心积木成长学校";
            return args;
        });
    },
};
