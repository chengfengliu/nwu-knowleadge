import React, { Component } from 'react'
import $ from 'jquery'
import LoginForm from './LoginForm'
import Header from './Header'
import Footer from './Footer'
export default class Login extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      warning: false
    }
  }
  handlePost(data) {
    const _that = this
    $.ajax({
      url: '/api/login',
      type: 'post',
      dataType: 'json',
      data,
      success(responseData) {
        console.log(responseData, typeof responseData)
        if(responseData.type === 'user') {
          // 用户登录成功
          _that.props.history.push('/',responseData)
        } else if(responseData.type === 'administrator') {
          // 管理员登录成功
          console.log('admin succ')
          _that.props.history.push('/administrator',responseData)
        } else {
          _that.setState({
            warning: true
          })
        }
      }
    })
    
  }
  render() {
    const warning = this.state.warning ? <div className="warning">你输入的帐号或密码不正确，请重新输入</div> : null
    return (
      <div id="loginBackground">
        <Header />
        <div id="login">
          {warning}
          <LoginForm returnData={this.props.history.location.state ? this.props.history.location.state.toString() : ''} onPost={this.handlePost.bind(this)} />
        </div>
        <Footer />
      </div>
    )
  }
}