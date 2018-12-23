import React, { Component } from 'react'
import '../../assets/css/comment.css'
import $ from 'jquery'
export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentData: [],
      commentInput: ''
    }
  }
  componentWillMount() {
    this.setState({
      commentData: this.props.commentData
    })
  }
  updateField(field, e) {
    const state = {}
    state[field] = e.target.value
    this.setState(state)
  }
  clickSubmitButton() {
    if(this.state.commentInput === '') {
      alert("评论不能为空")
      return
    }
    const _that = this
    console.log(this.state)
    $.ajax({
      url: '/api/submitComment',
      type: 'post',
      dataType: 'json',
      data: {
        pageNo: _that.props.pageNo,
        blogid: _that.props.index,
        comment: _that.state.commentInput
      },
      success(responseData) {
        console.log('responseData',responseData,JSON.parse(_that.state.commentData))
        const commentDataCopy = JSON.parse(_that.state.commentData)
        commentDataCopy.push(responseData)
        console.log('commentDataCopy',commentDataCopy)
        _that.setState({
          commentData: JSON.stringify(commentDataCopy),
          commentInput: ''
        })
      }
    }) 
  }
  render() {
    const commentData = JSON.parse(this.state.commentData)
    const commentList = commentData.length 
                        ? commentData.map((item, index) => ( 
                            <li key={index}>{`${item.user}：`}
                              <span>{item.time.slice(0, 10)}</span>
                              <p>{item.comment}</p>
                            </li>
                          ))
                        : '此博客尚无评论'
    return(
      <div className="commentBox">
        <ul>
          {commentList}
        </ul>
        <form>
          <button id="submitCommentButton" type="button" onClick={this.clickSubmitButton.bind(this)}>评论</button>
          <input type="text" placeholder="请写下你的评论" onChange={this.updateField.bind(this, 'commentInput')} value={this.state.commentInput}></input>
        </form>     
      </div>
    )
  }
}