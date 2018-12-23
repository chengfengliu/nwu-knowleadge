import React, { Component } from 'react';
import '../../assets/css/blogForm.css'
import $ from 'jquery'
export default class BlogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      isEditing: false,
      editBlogId: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps',nextProps)
    if(nextProps.myBlogInput.title) {
      // console.log('nextProps.myBlogInput.title',nextProps.myBlogInput.title)
      // 异步函数
      this.setState({
        title: nextProps.myBlogInput.title,
        content: nextProps.myBlogInput.content,
        isEditing: true,
        editBlogId: nextProps.myBlogInput._id
      }, () => {
        // console.log(this.state)
        this.refs.title.value = this.state.title
        this.refs.content.value = this.state.content
      })
    }
    // console.log('thisstate',this.state)
  }
  updateField(field, e) {
    const state = {}
    state[field] = e.target.value.replace(/\n/g,'</br>')
    this.setState(state)
  }
  handlePost(e) {
    e.preventDefault()
    if(this.refs.title.value.length === 0 || this.refs.content.value.length === 0) {
      alert("标题或正文不能为空！")
      return
    }
    const _that = this
    $.ajax({
      url: '/api/submitBlog',
      type: 'post',
      data: {
        title: _that.state.title,
        content: _that.state.content,
        time: new Date().toString().slice(0,15)
      },
      success(responseData) {
        _that.setState({
          title: '',
          content: ''
        })
        alert('成功发布')
        _that.props.submitBlog(responseData)
      }
    }) 
  }
  clickCompleteEditButton(e) {
    e.preventDefault()
    const _that = this
    $.ajax({
      url: '/api/editBlog',
      type: 'post',
      data: {
        title: _that.state.title,
        content: _that.state.content,
        time: new Date().toString().slice(0,15),
        _id: _that.state.editBlogId
      },
      success(responseData) {
        console.log('/api/editBlog',responseData)
        _that.setState({
          title: '',
          content: '',
          isEditing: false,
          editBlogId: '',
        })
        alert('成功编辑')
        _that.props.editBlog(responseData)
      }
    }) 
  }
  clickCancelButton() {
    this.setState({
      isEditing: false,
      title: '',
      content: '',
      editBlogId: ''
    })
  }
  clickBoldButton() {
    if(this.refs.content.selectionEnd - this.refs.content.selectionStart > 0) {
      this.refs.content.value = `${this.refs.content.value.substring(0, this.refs.content.selectionStart)}<strong>${this.refs.content.value.substring(this.refs.content.selectionStart, this.refs.content.selectionEnd)}</strong>${this.refs.content.value.substring(this.refs.content.selectionEnd)}`
    }
    this.setState({
      content: this.refs.content.value
    })
  }
  clickItalicButton() {
    if(this.refs.content.selectionEnd - this.refs.content.selectionStart > 0) {
      this.refs.content.value = `${this.refs.content.value.substring(0, this.refs.content.selectionStart)}<i>${this.refs.content.value.substring(this.refs.content.selectionStart, this.refs.content.selectionEnd)}</i>${this.refs.content.value.substring(this.refs.content.selectionEnd)}`
    }
    this.setState({
      content: this.refs.content.value
    })
  }
  render() {
    return(
      <div id="blogInput">
        <div id='header'>
          <img src="images/write.png"/>
          <p>写博客</p>
          {this.state.isEditing 
            ? <div><button className="submit" onClick={this.clickCancelButton.bind(this)}>取消</button><button className="submit" onClick={this.clickCompleteEditButton.bind(this)}>完成编辑</button></div> 
            : <button className="submit" onClick={this.handlePost.bind(this)}>发布</button>
          }
        </div>
        <form>
          <div className="formItem"><input type="text" placeholder="请输入标题（不能为空）" id="title" ref="title" onChange={this.updateField.bind(this, 'title')} value={this.state.title}/></div>
          <div id="editItem">
              <div id="bold" className="editButton" onClick={this.clickBoldButton.bind(this)}>B</div>
              <div id="italic" className="editButton" onClick={this.clickItalicButton.bind(this)}>I</div>
          </div>
          <div className="formItem"><textarea placeholder="请输入正文（不能为空）"rows="10" id="content" ref="content" wrap="hard" onChange={this.updateField.bind(this, 'content')} value={this.state.content}></textarea></div>
        </form>
      </div>
    )
  }
}
