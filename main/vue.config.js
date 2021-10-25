const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
    devServer: {
        port: 9420,
        hot: true,
        open: true,
    },
    chainWebpack: (config) => {
        config.resolve.alias.set("@", resolve("src"));
        // 配置网页title;
        config.plugin("html").tap((args) => {
            args[0].title = "主应用";
            return args;
        });
    },
};
