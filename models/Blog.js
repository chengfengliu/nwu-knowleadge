const {Blog} = require('./BlogModel.js')
const {User} = require('./UserModel.js')
const mongoose = require('mongoose')


exports.allBlogs = async(ctx, next) => {
    if (ctx.session.loggedIn) {
        const docs = await Blog.find()
        const blogs = docs.reverse()
        const doc = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
        // 博客的页码数 
        const pageNo = 1
        const blogCountPerPage = pageNo * 4
        await ctx.render('index', {nickName: doc['nickName'], pageNo, blogCount: blogs ? blogs.length : 0,
                    blog0Title: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].title : '', blog0Content: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].content : '', blog0Auther: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].auther : '', blog0Time: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].time : '', 
                    blog0ThumbsUpCount: (blogs && blogs[blogCountPerPage - 4]) ? (blogs[blogCountPerPage - 4].thumbsUpCount ? blogs[blogCountPerPage - 4].thumbsUpCount : '0') : '', blog0ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 4]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 4]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                    blog0Comments: (blogs && blogs[blogCountPerPage - 4]) ? JSON.stringify(blogs[blogCountPerPage - 4].comments) : '',
                    
                    blog1Title: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].title : '', blog1Content: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].content : '', blog1Auther: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].auther : '', blog1Time: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].time : '', 
                    blog1ThumbsUpCount: (blogs && blogs[blogCountPerPage - 3]) ? (blogs[blogCountPerPage - 3].thumbsUpCount ? blogs[blogCountPerPage - 3].thumbsUpCount : '0') : '', blog1ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 3]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 3]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                    blog1Comments: (blogs && blogs[blogCountPerPage - 3]) ? JSON.stringify(blogs[blogCountPerPage - 3].comments) : '',
                    
                    blog2Title: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].title : '', blog2Content: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].content : '', blog2Auther: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].auther : '', blog2Time: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].time : '', 
                    blog2ThumbsUpCount: (blogs && blogs[blogCountPerPage - 2]) ? (blogs[blogCountPerPage - 2].thumbsUpCount ? blogs[blogCountPerPage - 2].thumbsUpCount : '0') : '', blog2ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 2]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 2]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                    blog2Comments: (blogs && blogs[blogCountPerPage - 2]) ? JSON.stringify(blogs[blogCountPerPage - 2].comments) : '',
                    
                    blog3Title: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].title : '', blog3Content: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].content : '', blog3Auther: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].auther : '', blog3Time: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].time : '', 
                    blog3ThumbsUpCount: (blogs && blogs[blogCountPerPage - 1]) ? (blogs[blogCountPerPage - 1].thumbsUpCount ? blogs[blogCountPerPage - 1].thumbsUpCount : '0') : '', blog3ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 1]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 1]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                    blog3Comments: (blogs && blogs[blogCountPerPage - 1]) ? JSON.stringify(blogs[blogCountPerPage - 1].comments) : '',
                })
    } else {
        await ctx.render('firstPage')
    }
    await next()
}
exports.otherBlogs = async(ctx, next) => {
    if (!ctx.session.loggedIn) {
        ctx.response.body = '<p>请先登录<a href="/">返回首页</a></p>'
        return
    }
    const docs = await Blog.find()
    const blogs = docs.reverse()
    const doc = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    // 博客的页码数 
    const pageNo = ctx.params.pageNo
    const blogCountPerPage = pageNo * 4
    await ctx.render('index', {nickName: doc['nickName'], pageNo, blogCount: blogs ? blogs.length : 0,
                blog0Title: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].title : '', blog0Content: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].content : '', blog0Auther: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].auther : '', blog0Time: (blogs && blogs[blogCountPerPage - 4]) ? blogs[blogCountPerPage - 4].time : '', 
                blog0ThumbsUpCount: (blogs && blogs[blogCountPerPage - 4]) ? (blogs[blogCountPerPage - 4].thumbsUpCount ? blogs[blogCountPerPage - 4].thumbsUpCount : '0') : '', blog0ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 4]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 4]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                blog0Comments: (blogs && blogs[blogCountPerPage - 4]) ? JSON.stringify(blogs[blogCountPerPage - 4].comments) : '',
                
                blog1Title: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].title : '', blog1Content: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].content : '', blog1Auther: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].auther : '', blog1Time: (blogs && blogs[blogCountPerPage - 3]) ? blogs[blogCountPerPage - 3].time : '', 
                blog1ThumbsUpCount: (blogs && blogs[blogCountPerPage - 3]) ? (blogs[blogCountPerPage - 3].thumbsUpCount ? blogs[blogCountPerPage - 3].thumbsUpCount : '0') : '', blog1ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 3]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 3]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                blog1Comments: (blogs && blogs[blogCountPerPage - 3]) ? JSON.stringify(blogs[blogCountPerPage - 3].comments) : '',
                
                blog2Title: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].title : '', blog2Content: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].content : '', blog2Auther: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].auther : '', blog2Time: (blogs && blogs[blogCountPerPage - 2]) ? blogs[blogCountPerPage - 2].time : '', 
                blog2ThumbsUpCount: (blogs && blogs[blogCountPerPage - 2]) ? (blogs[blogCountPerPage - 2].thumbsUpCount ? blogs[blogCountPerPage - 2].thumbsUpCount : '0') : '', blog2ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 2]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 2]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                blog2Comments: (blogs && blogs[blogCountPerPage - 2]) ? JSON.stringify(blogs[blogCountPerPage - 2].comments) : '',
                
                blog3Title: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].title : '', blog3Content: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].content : '', blog3Auther: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].auther : '', blog3Time: (blogs && blogs[blogCountPerPage - 1]) ? blogs[blogCountPerPage - 1].time : '', 
                blog3ThumbsUpCount: (blogs && blogs[blogCountPerPage - 1]) ? (blogs[blogCountPerPage - 1].thumbsUpCount ? blogs[blogCountPerPage - 1].thumbsUpCount : '0') : '', blog3ThumbsUpStatus: (blogs && blogs[blogCountPerPage - 1]) ? (((doc['thumbsUpBlogs'] ? doc['thumbsUpBlogs'].toString().split(',') : [""]).indexOf(blogs[blogCountPerPage - 1]._id.toString()) !== -1) ? 'thumbsUping' : 'thumbsUp') : '', 
                blog3Comments: (blogs && blogs[blogCountPerPage - 1]) ? JSON.stringify(blogs[blogCountPerPage - 1].comments) : '',
            })
    await next()
}
exports.userBlogs = async(ctx, next) => {
    if (!ctx.session.loggedIn) {
        ctx.response.body = '<p>请先登录<a href="/">返回首页</a></p>'
        return
    }
    const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    if(user['blogs']) {
        const blogs = await Blog.find()
        let blogsArray = blogs.filter(blog => {
            return user['blogs'].indexOf(blog['_id'].toString()) !== -1
        })
        await ctx.render('blogs', {blogs: JSON.stringify(blogsArray)}) 
    } else {
        // 此用户还未发表过博客
        await ctx.render('blogs',{blogs: ""})
    }
    await next()
}
exports.add = async(ctx, next) => {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    ctx.request.body.auther = user['nickName']
    const blog = await Blog.create(ctx.request.body)
    await User.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(ctx.session.loggedIn)},
        { $push:{blogs: blog['_id'].toString()} },
    )
    await next()
}
exports.thumbsUp = async(ctx, next) => {
    // 前端传来的blogid是此页的第几条博客，转化为_id
    const docs = await Blog.find()
    let userHasThumbsUp = false
    const blogs = docs.reverse()
    const blogid = mongoose.Types.ObjectId(blogs[parseInt(ctx.request.body.pageNo) * 4 + parseInt(ctx.request.body.blogid) - 4]._id)
    const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    const blog = await Blog.findOne({_id: blogid})
    // 一篇博客第一次被赞
    if(blog['thumbsUpUsers'].length === 0) {
        await Blog.findOneAndUpdate(
            {'_id': blogid},
            {
                $inc: {'thumbsUpCount': 1},
                $push: {'thumbsUpUsers': user['_id']}
            }
        )
        await User.findOneAndUpdate(
            {'_id': user['_id']},
            {$push: {'thumbsUpBlogs': blogid}}
        )
        ctx.response.body = {'thumbsUpcount': 1, 'classStatus': 'thumbsUping', 'svgStatus': 'thumbsUping'}
    } else {
        // 此博客非第一次被赞
        // 则检查此用户是否已赞过此博客
        for(let i = 0; i < blog['thumbsUpUsers'].length; i++) {
            // 要吧ObjectId转换成string
            if(blog['thumbsUpUsers'][i].toString() === user['_id'].toString()) {
                userHasThumbsUp = true
                break
            }
        }
        // 加1赞
        if(!userHasThumbsUp) {
            await Blog.findOneAndUpdate(
                {'_id': blogid},
                {
                    $inc: {'thumbsUpCount': 1},
                    $push: {'thumbsUpUsers': user['_id']}
                }
            )
            await User.findOneAndUpdate(
                {'_id': user['_id']},
                {$push: {'thumbsUpBlogs': blogid}}
            )
            ctx.response.body = {'thumbsUpcount': blog['thumbsUpCount'] + 1, 'classStatus': 'thumbsUping', 'svgStatus': 'thumbsUping'}
        } else {
            // 减1赞
            await Blog.findOneAndUpdate(
                {'_id': blogid},
                {
                    $inc: {'thumbsUpCount': -1},
                    $pull: {'thumbsUpUsers': user['_id']}
                }
            )
            await User.findOneAndUpdate(
                {'_id': user['_id']},
                {$pull: {'thumbsUpBlogs': blogid}}
            )
            ctx.response.body = {'thumbsUpcount': blog['thumbsUpCount'] - 1, 'classStatus': 'thumbsUp', 'svgStatus': 'thumbsUp'}
        }
    }
    await next()
}

exports.comment = async(ctx, next) => {
    const docs = await Blog.find()
    const blogs = docs.reverse()
    const user = await User.findOne({_id: mongoose.Types.ObjectId(ctx.session.loggedIn)})
    const time = new Date()
    await Blog.findOneAndUpdate(
        {'_id': mongoose.Types.ObjectId(blogs[parseInt(ctx.request.body.pageNo) * 4 + parseInt(ctx.request.body.blogid) - 4]._id)},
        {$push: {'comments': {'user': user['nickName'], 'comment': ctx.request.body.comment, 'time': time}}},
    )
    ctx.response.body = {'user': user['nickName'], 'comment': ctx.request.body.comment, 'time': time}
    await next()
}
