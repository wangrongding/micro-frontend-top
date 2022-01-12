/**
 * @Description description
 * @Param {ObjectType} repoUrl : 仓库地址
 * @Param {ObjectType} repoName : 仓库名称
 * @Param {ObjectType} installMethod : 项目依赖安装方式[yarn,npm,cnpm,pnpm...]
 */
const appList = [
  {
    repoUrl:
      "https://codeup.aliyun.com/606d41ff7470561e6a716285/uicode/youth-assessment/youth-assessment-intervention.git",
    repoName: "student",
    installMethod: "cnpm",
    serveMethod: "serve",
  },
  {
    repoUrl:
      "https://codeup.aliyun.com/606d41ff7470561e6a716285/uicode/youth-assessment/youth-assessment-mipac-admin.git",
    repoName: "admin",
    installMethod: "yarn",
    serveMethod: "dev",
  },
];

module.exports = appList;
