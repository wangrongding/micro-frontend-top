/* 
    repoUrl:仓库地址
    repoName:仓库名称
    installMethod:项目依赖安装方式[yarn,npm,cnpm,pnpm...]
*/
const appList = [
	{
		repoUrl: "https://gitee.com/wangrongding/test22222.git",
		repoName: "test22222",
		installMethod: "yarn",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/test-repo1.git",
		repoName: "test-repo1",
		installMethod: "yarn",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/jellyfish.git",
		repoName: "jellyfish",
		installMethod: "yarn",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/frontend-park.git",
		repoName: "frontend-park",
		installMethod: "yarn",
	},
];

module.exports = appList;
