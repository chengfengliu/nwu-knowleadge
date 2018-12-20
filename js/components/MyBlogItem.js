import React, { Component } from 'react';
import '../../assets/css/myBlogItem.css'
import $ from 'jquery'
export default class MyBlogItem extends Component {
  constructor(props) {
    super(props)
  }
  clickEditButton() {
    const myBlogData = JSON.parse(this.props.myBlogData)
    this.props.receiveBlog({
      title: myBlogData.title,
      content: myBlogData.content,
      _id: myBlogData._id
    })
  }
  clickRemoveButton(e) {
    e.preventDefault()
    console.log('click remove',JSON.parse(this.props.myBlogData))
    const myBlogData = JSON.parse(this.props.myBlogData)
    const _that = this
    $.ajax({
      url: '/api/removeBlog',
      type: 'post',
      // dataType预期服务器返回的数据类型
      data: {
        _id: myBlogData._id
      },
      success(responseData) {
        console.log('/api/removeBlog', responseData)
        alert('删除成功')
        _that.props.removeBlog(responseData)
      }
    }) 
  }
  render() {
    const myBlogData = JSON.parse(this.props.myBlogData)
    return(
      <li>
        <h3>{myBlogData.title}</h3>
        <p dangerouslySetInnerHTML={{__html: myBlogData.content}}></p>
        <p>{myBlogData.time}</p>
        <button className="modifyButton" onClick={this.clickEditButton.bind(this)}>编辑</button>
        <button className="modifyButton" onClick={this.clickRemoveButton.bind(this)}>删除</button>
      </li>
    )
  }
}
