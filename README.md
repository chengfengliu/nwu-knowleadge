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
// Windows 浏览器打开http://127.0.0.1:3000/
npm start

// Linux
npm run linux-start
```
启动（生产模式）
```bash
// Windows 浏览器打开http://127.0.0.1:3001/
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
### 想法模块下载视频功能
* 项目目录上一级新建一个userImages文件夹存放用户照片
* ~/models/User.js downloadVideo函数中相关代码改为
```bash
// Windows
java.classpath.push(path.resolve('lib', 'opencv-windows-x86_64.jar'))
java.classpath.push(path.resolve('lib', 'ffmpeg-windows-x86_64.jar'))

// Linux
java.classpath.push(path.resolve('lib', 'opencv-linux-x86_64.jar'))
java.classpath.push(path.resolve('lib', 'ffmpeg-linux-x86_64.jar'))
```

* 将~/lib/javacv-bin/相关操作系统jar文件移动到~/lib中
* 重新在~/lib/javacvTest/中编译TestRecorder2.java文件
```bash
javac -cp ../javacv.jar; TestRecorder2.java
```
### 上传文件
在项目目录上一级新建一个uploads文件夹

### HTTPS
项目文件夹中新建一个ssl文件夹，存放证书和密钥

### 邮箱注册
项目文件夹中新建一个config.js文件
```bash
// config.js
module.exports.mail = {
  user: '系统账号@qq.com',
  pass: '系统账号QQ邮箱设置中获取token',
  admin: '管理员账号@qq.com'
}
```

