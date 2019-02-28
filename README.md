# nwu-knowleadge
## 西北大学资料共享中心，域名www.nwulcf.club，[进入链接](http://www.nwulcf.club)
### 资料上传下载，博客，查询成绩及挂科率，图片保存并转换为视频
#### 环境node，mongoDB，python（npm安装Java需要），Java（npm安装Java需要）
#### `npm install`
#### linux:package.json中的scripts start
#### `set NODE_ENV=development&&set NODE_PORT=3000&&set NODE_DB=koa-react&&node server.js`
#### 改为`NODE_ENV=development NODE_PORT=3000 NODE_DB=koa-react node server.js`
#### windows:package.json中的scripts build
#### `NODE_ENV=production NODE_PORT=80 NODE_DB=koa node server.js`
#### 改为`"build": "set NODE_ENV=production&&set NODE_PORT=80&&set NODE_DB=koa&&node server.js`
##### 以上端口（NODE_PORT）以及数据库（NODE_DB）均可根据情况改变
### 开发模式`npm start`  
### 生产模式`npm run build`
##### 若需要使用想法模块中的下载视频功能
##### 1.windows ~/models/User.js downloadVideo函数中相关代码改为
###### `java.classpath.push(path.resolve('lib', 'opencv-windows-x86_64.jar'))`
###### `java.classpath.push(path.resolve('lib', 'ffmpeg-windows-x86_64.jar'))`

##### linux ~/models/User.js   downloadVideo函数中相关代码改为
###### `java.classpath.push(path.resolve('lib', 'opencv-linux-x86_64.jar'))`
###### `java.classpath.push(path.resolve('lib', 'ffmpeg-linux-x86_64.jar'))`
##### 2.将~/lib/javacv-bin/相关操作系统jar文件移动到~/lib中
##### 3.重新在~/lib/javacvTest/中编译TestRecorder2.java文件
###### `javac -cp ../javacv.jar; TestRecorder2.java`

##### 上传功能需要在根目录下新建一个uploads

##### 更新图片功能需要在~/assets下新建一个uploads
