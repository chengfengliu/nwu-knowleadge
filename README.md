# 西北大学资料共享中心
域名[www.nwulcf.club](http://www.nwulcf.club)，支持资料上传下载，博客，查询成绩及挂科率，朋友圈图片保存并转换为视频

# 开发
## 环境
node，mongoDB，python（npm安装Java需要），Java（npm安装Java需要）

## 启动
安装依赖
```bash
npm install
```
启动（开发模式）
```bash
// Windows http://127.0.0.1:3000/
npm start

// Linux
npm run linux-start
```
启动（生产模式）
```bash
// Windows http://127.0.0.1:3001/
npm run windows-build

// Linux
npm run build
```
发布外网
```bash
// Linux
sh restart.sh
```
以上端口（NODE_PORT）以及数据库（NODE_DB）均可在package.json的script属性中更改

## 额外功能
若需要使用想法模块中的下载视频功能
1.windows ~/models/User.js downloadVideo函数中相关代码改为
`java.classpath.push(path.resolve('lib', 'opencv-windows-x86_64.jar'))`
`java.classpath.push(path.resolve('lib', 'ffmpeg-windows-x86_64.jar'))`

linux ~/models/User.js   downloadVideo函数中相关代码改为
`java.classpath.push(path.resolve('lib', 'opencv-linux-x86_64.jar'))`
`java.classpath.push(path.resolve('lib', 'ffmpeg-linux-x86_64.jar'))`
2.将~/lib/javacv-bin/相关操作系统jar文件移动到~/lib中
3.重新在~/lib/javacvTest/中编译TestRecorder2.java文件
`javac -cp ../javacv.jar; TestRecorder2.java`

上传功能需要在项目目录上一级新建一个uploads文件夹
想法功能需要在项目目录上一级新建一个userImages文件夹

