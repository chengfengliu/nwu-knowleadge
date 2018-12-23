import React, { Component } from 'react';
import '../../assets/css/myBlogItem.css'
import $ from 'jquery'
export default class MyBlogItem extends Component {
  constructor(props) {
    super(props)
  }
  clickEditButton() {
    this.props.receiveBlog({
      title: this.props.myBlogData.title,
      content: this.props.myBlogData.content,
      _id: this.props.myBlogData._id
    })
  }
  clickRemoveButton(e) {
    e.preventDefault()
    const _that = this
    $.ajax({
      url: '/api/removeBlog',
      type: 'post',
      // dataType预期服务器返回的数据类型
      data: {
        _id: _that.props.myBlogData._id
      },
      success(responseData) {
        console.log('/api/removeBlog', responseData)
        alert('删除成功')
        _that.props.removeBlog(responseData)
      }
    }) 
  }
  render() {
    return(
      <li>
        <h3>{this.props.myBlogData.title}</h3>
        <p dangerouslySetInnerHTML={{__html: this.props.myBlogData.content}}></p>
        <p>{this.props.myBlogData.time}</p>
        <button className="modifyButton" onClick={this.clickEditButton.bind(this)}>编辑</button>
        <button className="modifyButton" onClick={this.clickRemoveButton.bind(this)}>删除</button>
      </li>
    )
  }
}
