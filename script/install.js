const fs = require("fs");
const path = require("path");
const util = require("util");
const loading = require("loading-cli");
const appList = require("./appList");

const exec = util.promisify(require("child_process").exec);

/* 
	targetPath:packages中的项目名称
	installMethod:项目依赖安装方式
*/
async function install(targetPath, installMethod) {
	let command = "";
	switch (installMethod) {
		case "yarn":
			command = "yarn";
			break;
		case "npm":
			command = "npm i";
			break;
		case "cnpm":
			command = "cnpm i";
			break;
		case "pnpm":
			command = "pnpm i";
			break;

		default:
			command = "npm i";
			break;
	}
	console.log(`${targetPath} 开始下载，请耐心等待...`);
	const { stdout, stderr } = await exec(command, {
		cwd: path.resolve(process.cwd(), "packages/" + targetPath),
	});
	console.log(targetPath, stdout, "✅");
	stderr && console.error(targetPath, "❓❓", stderr);
}

console.log(`即将进入所有模块并下载依赖：${JSON.stringify(appList)}`);

appList.forEach(async (item) => {
	const load = loading(`请耐心等待,${item.repoName}>正在安装依赖...`).start();
	await install(item.repoName, item.installMethod);
	load.stop();
});

process.on("unhandledRejection", (reason, p) => {
	console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
	// application specific logging, throwing an error, or other logic here
});
