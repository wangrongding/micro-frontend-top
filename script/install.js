const path = require("path");
const util = require("util");
const loading = require("loading-cli");
const appList = require("./appList").concat([
	{ repoName: "", installMethod: "yarn" },
]);
// const exec = util.promisify(require("child_process").exec);
const spawn = require("child_process").spawnSync;

/**
 * @Description 安装所有目标项目的依赖
 * @Param {ObjectType} targetPath : packages中的项目名称
 * @Param {ObjectType} installMethod : 项目依赖安装方式
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
	console.log(targetPath, command);
	const { stdout, stderr } = await spawn(command, {
		shell: true,
		cwd: path.resolve(
			process.cwd(),
			targetPath ? "packages/" + targetPath : "main"
		),
	});
	console.log(stderr.toString());
	console.log(stdout.toString(), "✅");
	/* const { stdout, stderr } = await exec(command, {
		cwd: path.resolve(
			process.cwd(),
			targetPath ? "packages/" + targetPath : "main"
		),
	}); */
	// console.log(targetPath, stdout, "✅");
	// stderr && console.error(targetPath, stderr);
}
console.log("请耐心等待,正在安装依赖...");
Promise.all(
	appList.map((item) => {
		return new Promise(async (resolve) => {
			await install(item.repoName, item.installMethod);
			resolve();
		});
	})
)
	.then(() => {
		console.log("✅✅✅安装完成✅✅✅");
	})
	.catch((err) => {
		console.log("err", err);
	})
	.finally();

// application specific logging, throwing an error, or other logic here
process.on("unhandledRejection", (reason, p) => {
	console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
