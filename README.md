# nwu-knowleadge
## 西北大学资料共享中心，域名www.nwulcf.club
### 资料上传下载，博客，查询成绩及挂科率，图片保存并转换为视频
#### 环境node，mongoDB，python（npm安装java需要），Java（npm安装java需要）
#### npm install
#### node server.js 或者 npm start
<br/>
##### 若需要使用想法模块中的下载视频功能
##### 1.windows ~/models/User.js downloadVideo函数中相关代码改为
###### java.classpath.push(path.resolve('lib', 'opencv-windows-x86_64.jar'))
###### java.classpath.push(path.resolve('lib', 'ffmpeg-windows-x86_64.jar'))
<br/>
##### linux ~/models/User.js   downloadVideo函数中相关代码改为
###### java.classpath.push(path.resolve('lib', 'opencv-linux-x86_64.jar'))
###### java.classpath.push(path.resolve('lib', 'ffmpeg-linux-x86_64.jar'))
<br/>
##### 2.将~/lib/javacv-bin/相关操作系统jar文件移动到~/lib中
<br/>
##### 3.重新在~/lib/javacvTest/中编译TestRecorder2.java文件
###### javac -cp ../javacv.jar; TestRecorder2.java
<br/>
##### 上传功能需要在根目录下新建一个uploads
<br/>
##### 更新图片功能需要在~/assets下新建一个uploads
