/**
 * @Description description
 * @Param {ObjectType} repoUrl : 仓库地址
 * @Param {ObjectType} repoName : 仓库名称
 * @Param {ObjectType} installMethod : 项目依赖安装方式[yarn,npm,cnpm,pnpm...]
 */
const appList = [
	{
		repoUrl:
			"git@codeup.aliyun.com:606d41ff7470561e6a716285/uicode/youth-assessment/youth-assessment-intervention.git",
		repoName: "intervention",
		installMethod: "npm",
		serveMethod: "serve",
	},
	{
		repoUrl:
			"git@codeup.aliyun.com:606d41ff7470561e6a716285/uicode/youth-assessment/youth-assessment-mipac-admin.git",
		repoName: "mipac-admin",
		installMethod: "npm",
		serveMethod: "serve",
	},
	{
		repoUrl:
			"git@codeup.aliyun.com:606d41ff7470561e6a716285/uicode/youth-assessment/youth-assessment-mipac-test.git",
		repoName: "mipac-test",
		installMethod: "npm",
		serveMethod: "serve",
	},
];

module.exports = appList;
