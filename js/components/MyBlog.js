import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/myBlog.css'
import $ from 'jquery'
import Header from './Header'
import Footer from './Footer'
import BlogForm from './BlogForm'
import MyBlogItem from './MyBlogItem'
export default class MyBlog extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      myBlogInput: {},
      // myBlogList存储对象数组
      myBlogList: []
    }
  }
  componentDidMount() {
    const _that = this
    $.ajax({
      url: '/api/myBlog',
      type: 'get',
      success(responseData) {
        // console.log('/api/myBlog',responseData.blogs, typeof responseData.blogs)
        // +?重复1次或更多次，但尽可能少重复,只有+会有{},{}  ->  {...}
        if(responseData.blogs.length > 0) {
          _that.setState({myBlogList: responseData.blogs})
        }
      }
    }) 
    $.ajax({
      url: '/api/addPageViewLog',
      type: 'post',
      data: {
        pageName: '我的博客'
      },
    })
  }
  receiveBlog(receiveData) {
    // console.log('title',receiveData.title,'content',receiveData.content)
    this.setState({myBlogInput: {
      title: receiveData.title,
      content: receiveData.content,
      _id: receiveData._id
    }})
  }
  editBlog(receiveData) {
    // console.log('editBlog',receiveData._id,typeof receiveData._id)
    const myBlogListCopy = this.state.myBlogList.map(item => {
      if(item._id === receiveData._id) {
        item.title = receiveData.title
        item.content = receiveData.content
      }
      return item
    })
    this.setState({
      myBlogList: myBlogListCopy,
      myBlogInput: {},
    })
  }
  removeBlog(receiveData) {
    // console.log('editBlog',receiveData,typeof receiveData)
    const myBlogListCopy = this.state.myBlogList.filter(item => {
      return item._id !== receiveData
    })
    this.setState({
      myBlogList: myBlogListCopy
    })
  }
  submitBlog(receiveData) {
    const myBlogListCopy = this.state.myBlogList
    myBlogListCopy.push(receiveData)
    this.setState({
      myBlogList: myBlogListCopy
    })
  }
  render() {
    const myBlogList = this.state.myBlogList.length 
    ? this.state.myBlogList.map((item,index) => <MyBlogItem myBlogData={item} key={index} receiveBlog={this.receiveBlog.bind(this)} removeBlog={this.removeBlog.bind(this)}/>)
    : '您暂时还未发布博客'
    return (
      <div id="myBlog">
        <Header/>
          <BlogForm myBlogInput={this.state.myBlogInput} submitBlog={this.submitBlog.bind(this)} editBlog={this.editBlog.bind(this)}/>
          <ul id="blogsList">
            {myBlogList}
          </ul>
          <Link to="/" className='button'>返回首页</Link>
        <Footer />
      </div>
    )
  }
}