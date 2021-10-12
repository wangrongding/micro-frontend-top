const download = require("download-git-repo");
const util = require("util");
const downloadGitRepo = util.promisify(download);
//loading
const loading = require("loading-cli");

//==============================================================

let repos = [
	{
		repoUrl: "direct:https://gitee.com/wangrongding/test22222#master",
		repoName: "test22222",
	},
	{
		repoUrl: "direct:https://gitee.com/wangrongding/test-repo1#master",
		repoName: "test-repo1",
	},
];

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

repos.forEach(async (item) => {
	await clone(item.repoUrl, "../packages/" + item.repoName);
});
//====================================================================
// downloadGitRepo(item.repoUrl, "../packages/" + item.repoName);

//====================================================================
/* download(
	"direct:https://gitee.com/wangrongding/test22222#master",
	"../packages/test1",
	{ clone: true },
	(err) => {
		console.log(err ? "Error!clone出错,请重新尝试!" + err : "Success~");
	}
); */
