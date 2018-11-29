const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const static = require('koa-static')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')

const mongoose = require('mongoose')
const User = require('./models/User.js')
const Blog = require('./models/Blog.js')
const File = require('./models/File.js')

const db = 'mongodb://localhost:27017/koa'

const port = 3030
const app = new Koa()
const router = new Router()
app.keys = ['some secret hurr']
app.use(bodyParser({enableTypes:['json', 'form', 'text'],formLimit: '1mb'}))
app.use(views(path.join(__dirname, 'views'), {
  map: {html: 'ejs'}
}))
app.use(static(path.join(__dirname, 'assets')))
// app.use(static(path.join(__dirname, 'assets')))
// app.use(static(path.join(__dirname, 'assets')))
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

router.get('/', Blog.allBlogs)
router.get('/index/:pageNo', Blog.otherBlogs)
router.get('/signup', async(ctx, next) => {
  await ctx.render('signup')
  await next()
})
router.post('/signup', User.saveUser)
router.get('/login',  async(ctx, next) => {
  await ctx.render('login', {signupAccount: ''})
  await next()
})
router.post('/login', User.findUser)
router.get('/logout', async(ctx, next) => {
  ctx.session.loggedIn = null
  ctx.response.redirect('/')
  await next()
})
router.get('/blogs', Blog.userBlogs)
router.post('/api/submitBlog', Blog.add)
router.post('/api/thumbsUp', Blog.thumbsUp)
router.post('/api/submitComment', Blog.comment)

router.get('/moments', User.allMoments)
router.get('/moments/:pageNo', User.otherMoments)
router.get('/api/downloadVideo', User.downloadVideo)
router.post('/api/updateMoments', User.addMoment)

router.get('/download', File.allFiles)
router.post('/api/upload', upload.single('myfile'), File.add)
router.get('/api/download/:_id', File.download)
router.get('/api/getDownloadTimes', User.getDownloadTimes)

router.get('/search',  async(ctx, next) => {
  await ctx.render('search')
  await next()
})
router.get('/searchgrade', async(ctx, next) => {
  ctx.response.body = '<p>目前暂停服务<a href="/">返回首页</a></p>'
  await next()
})

app.use(router.routes()).use(router.allowedMethods())

mongoose.connect(db)
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to ${db}`)
  app.listen(port, () => {
    console.log(`app listening on *:${port}`)
  })
})
