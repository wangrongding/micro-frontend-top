/* 
	repoUrl:仓库地址
	repoName:仓库名称
	installMethod:项目依赖安装方式[yarn,npm,cnpm,pnpm...]
*/
const appList = [
	/* {
		repoUrl: "https://gitee.com/wangrongding/jellyfish.git",
		repoName: "jellyfish",
		installMethod: "yarn",
		serveMethod: "serve",
	}, */
	{
		repoUrl: "https://gitee.com/wangrongding/frontend-park.git",
		repoName: "frontend-park",
		installMethod: "yarn",
		serveMethod: "serve",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/sub-app-vue.git",
		repoName: "sub-app-vue",
		installMethod: "yarn",
		serveMethod: "serve",
	},
	{
		repoUrl: "https://gitee.com/wangrongding/sub-app-vue2.git",
		repoName: "sub-app-vue2",
		installMethod: "yarn",
		serveMethod: "serve",
	},
];

module.exports = appList;
