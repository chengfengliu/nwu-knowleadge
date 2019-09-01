import React, { Component } from 'react'
import store from '../redux/store.js'
import {login} from '../redux/action.js'
import $ from 'jquery'
import LoginForm from './LoginForm'
import Header from './Header'
import Footer from './Footer'
class Login extends Component { 
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
      data,
      success(responseData) {
        // console.log(responseData, typeof responseData)
        if(responseData.type === 'user') {
          // 用户登录成功
          $.ajax({
            url: '/api/signUpStatus',
            type: 'get',
            success(responceAnotherData) {
              store.dispatch(login(responceAnotherData.userNickName))
              _that.props.history.push('/')
            }
          })
        } else if(responseData.type === 'administrator') {
          // 管理员登录成功
          console.log('admin succ')
          _that.props.history.push('/administrator')
        } else {
          // 密码错误
          _that.setState({
            warning: true
          })
        }
      }
    })
    
  }
  render() {
    const warning = this.state.warning ? <div className="warning">你输入的邮箱或密码不正确，请重新输入</div> : null
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

export default Login