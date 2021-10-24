const path = require("path");
const util = require("util");
const loading = require("loading-cli");
const appList = require("./appList");
const exec = util.promisify(require("child_process").exec);

//---------------------
var spawn = require("child_process").spawn;

/**
 * @Description  启动所有目标项目的服务
 * @Param {ObjectType} targetPath : packages中的项目名称
 * @Param {ObjectType} serveMethod : 启动项目服务的方式["serve","dev","start"...?]
 */
async function serve(targetPath, serveMethod) {
	console.log(path.resolve(process.cwd(), `packages/${targetPath}`));
	/* const { stdout, stderr } = await spawn("npm", ["run", serveMethod], {
		stdio: "inherit",
		cwd: path.resolve(process.cwd(), `packages/${targetPath}`),
	}); */
	spawn("yarn", ["serve"], {
		cwd: path.resolve(process.cwd(), `packages/${targetPath}`),
	});
	console.log(targetPath, stdout, "✅");
	stderr && console.error(targetPath, "❓❓", stderr);

	// const { stdout, stderr } = await exec(`yarn ${serveMethod}`, {
	// 	cwd: path.resolve(process.cwd(), `packages/${targetPath}`),
	// });
	// console.log(targetPath, stdout, "✅");
	// stderr && console.error(targetPath, "❓❓", stderr);
}

console.log(
	`即将进入所有子应用启动服务：${JSON.stringify(
		appList.map((item) => {
			return item.repoName;
		})
	)}`
);
spawn("ls", [""], {
	cwd: path.resolve(process.cwd(), `packages/sub-app-vue`),
});
/* spawn("yarn", ["run", "serve"], {
	cwd: path.resolve(process.cwd(), `packages/sub-app-vue`),
}); */
/* async function start() {
	const load = loading(`请耐心等待,jellyfish正在启动...`).start();
	await serve("sub-app-vue", "serve");
	load.stop();
}

start(); */
/* appList.forEach(async (item, index) => {
    const load = loading(`请耐心等待,${item.repoName}>正在启动...`).start();
    await serve(item.repoName, item.serveMethod);
    load.stop();
}); */

process.on("unhandledRejection", (reason, p) => {
	console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
	// application specific logging, throwing an error, or other logic here
});
