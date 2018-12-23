import React, { Component } from 'react'
import BlogItem from './BlogItem'
import PageList from './PageList'
import $ from 'jquery'
export default class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blog0: {},
      blog1: {},
      blog2: {},
      blog3: {},
      pageNo: 1,
      blogCount: 0
    }
  }
  componentDidMount() {
    // console.log('blog componentWillMount')
    const _that = this
    $.ajax({
      url: '/api/getAllBlogs',
      type: 'get',
      success(responseData) {
        // console.log('api/getAllBlogs', responseData)
        const blog0 = {}
        const blog1 = {}
        const blog2 = {}
        const blog3 = {}
        for(let key in responseData) {
          if(key.includes('0')) {
            blog0[key] = responseData[key]
          } else if(key.includes('1')) {
            blog1[key] = responseData[key]
          } else if(key.includes('2')) {
            blog2[key] = responseData[key]
          } else if(key.includes('3')) {
            blog3[key] = responseData[key]
          }
        }
        _that.setState({
          blog0, blog1, blog2, blog3, blogCount: responseData.blogCount
        })
      }
    })
  }
  changePageNo(pageNo) {
    const _that = this
    $.ajax({
      url: `/api/getOtherBlogs/${pageNo}`,
      type: 'get',
      success(responseData) {
        const blog0 = {}
        const blog1 = {}
        const blog2 = {}
        const blog3 = {}
        for(let key in responseData) {
          if(key.includes('0')) {
            blog0[key] = responseData[key]
          } else if(key.includes('1')) {
            blog1[key] = responseData[key]
          } else if(key.includes('2')) {
            blog2[key] = responseData[key]
          } else if(key.includes('3')) {
            blog3[key] = responseData[key]
          }
        }
        _that.setState({
          blog0, blog1, blog2, blog3, blogCount: responseData.blogCount, pageNo
        })
      }
    })
  }
  render() {
    // console.log('blog render')
    const {pageNo, blogCount} = this.state
    return(
      <div>
        <ul id="blogsList">
          {this.state.blog0.blog0Title ? <BlogItem blogData={this.state.blog0} index={0} pageNo={pageNo}/> : <li><h3>已经到尾了</h3></li>}
          {this.state.blog1.blog1Title ? <BlogItem blogData={this.state.blog1} index={1} pageNo={pageNo}/> : <li><h3>已经到尾了</h3></li>}
          {this.state.blog2.blog2Title ? <BlogItem blogData={this.state.blog2} index={2} pageNo={pageNo}/> : <li><h3>已经到尾了</h3></li>}
          {this.state.blog3.blog3Title ? <BlogItem blogData={this.state.blog3} index={3} pageNo={pageNo}/> : <li><h3>已经到尾了</h3></li>}
        </ul>
        <PageList pageNo={pageNo} pageCount={Math.ceil(blogCount / 4)} changePageNo={this.changePageNo.bind(this)}/>
      </div>
    )
  }
}