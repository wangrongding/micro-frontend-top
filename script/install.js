const fs = require("fs");
const path = require("path");
const util = require("util");

const exec = util.promisify(require("child_process").exec);

async function install(targetPath, installMethod) {
	console.log(`${targetPath} 开始下载，请耐心等待...`);
	const { stdout, stderr } = await exec(installMethod, {
		cwd: path.resolve(process.cwd(), "packages/" + targetPath),
	});
	console.log(targetPath, stdout);
	stderr && console.error(targetPath, "失败❌", stderr);
}

// console.log(`即将进入所有模块并下载依赖：${JSON.stringify(subApps)} ing...`);

/* subApps.forEach(async (item) => {
	await install("test-repo1", "yarn");
});
 */
console.log("subApps", fs.readdirSync("../packages"));

process.on("unhandledRejection", (reason, p) => {
	console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
	// application specific logging, throwing an error, or other logic here
});
