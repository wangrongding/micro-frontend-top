const path = require("path");
const util = require("util");
const appList = require("./appList");
// const spawn = require("child_process").spawn;
const spawn = util.promisify(require("child_process").spawn);
//---------------------
/**
 * @Description  启动所有目标项目的服务
 * @Param {ObjectType} targetPath : packages中的项目名称
 * @Param {ObjectType} serveMethod : 启动项目服务的方式["serve","dev","start"...?]
 */
function serve(targetPath, serveMethod) {
	return new Promise(async (resolve) => {
		await spawn(`npm run ${serveMethod}`, {
			stdio: "inherit",
			shell: true,
			cwd: path.resolve(`packages/${targetPath}`),
		});
		resolve();
	});
}

Promise.all(
	appList.map((item) => {
		return serve(item.repoName, item.serveMethod);
	})
);
spawn(`npm run serve`, {
	stdio: "inherit",
	shell: true,
	cwd: path.resolve(`main`),
});

process.on("unhandledRejection", (reason, p) => {
	console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
	// application specific logging, throwing an error, or other logic here
});
