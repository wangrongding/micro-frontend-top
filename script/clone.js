const download = require("download-git-repo");
const util = require("util");
const downloadGitRepo = util.promisify(download);
//loading
const loading = require("loading-cli");
const appList = require("./appList");

//==============================================================

async function clone(repoUrl, repoName) {
	const load = loading("请耐心等待,各应用正在clone...").start();
	await downloadGitRepo(
		repoUrl,
		// "./packages/" + (new Date() - 0),
		"./packages/" + repoName,
		{ clone: true },
		(err) => {
			load.stop();
			console.log(
				err
					? `Error ! clone${repoName} 出错! ,请检查是否已有该仓库或选择重新尝试!${err}`
					: `Success ~ clone ${repoName}完成!`
			);
		}
	);
}

appList.forEach(async (item) => {
	await clone(item.repoUrl, "../packages/" + item.repoName);
});