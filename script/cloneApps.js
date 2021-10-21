const gitClone = require("git-clone/promise");
const loading = require("loading-cli");

/* 
    repoUrl:git仓库地址
    targetPath:下载的目标目录
    cloneOptions:git clone的可选参数
                git:git二进制路径；默认：（git预计在你的$PATH）
                shallow: when true，克隆深度为 1
                checkout: 克隆后要检出的修订版/分支/标签
                args: 要传递给的额外参数数组 git clone
    eg: clone(repo, targetPath, [options]
*/

async function clone(repoUrl, targetPath, cloneOptions = { shallow: 1 }) {
	if (!(repoUrl && targetPath)) {
		console.log("repoUrl,targetPath为必传项!");
		return;
	}
	const load = loading("请耐心等待,各应用正在clone...").start();
	await gitClone(repoUrl, targetPath, cloneOptions)
		.then(() => {
			// console.clear();
			console.log(`成功! clone ${targetPath}完成~ ✔💚`);
		})
		.catch((err) => {
			console.log(
				`clone ：${targetPath} 出错! ,❌${err}，请检查该文件夹是否已存在,或立即重试!`
			);
		})
		.finally(() => {
			load.stop();
		});
}

let repos = [
	{
		repoUrl: "https://gitee.com/wangrongding/test22222.git",
		repoName: "test22222",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/test-repo1.git",
		repoName: "test-repo1",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/jellyfish.git",
		repoName: "jellyfish",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/frontend-park.git#main",
		repoName: "frontend-park",
	},
];

repos.forEach(async (item) => {
	await clone(item.repoUrl, "./packages/" + item.repoName);
});
