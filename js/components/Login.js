import React, { Component } from 'react'
import $ from 'jquery'
import LoginForm from './LoginForm'
import Header from './Header'
import Footer from './Footer'
export default class Login extends Component { 
  constructor(props) {
    super(props)
  }
  handlePost(data) {
    const _that = this
    $.ajax({
      url: '/api/login',
      type: 'post',
      dataType: 'json',
      data,
      success(responseData) {
        // console.log(responseData)
        _that.props.history.push('/',responseData)
      }
    })
    
  }
  render() {
    return (
      <div id="loginBackground">
        <Header />
        <div id="login">
          <LoginForm returnData={this.props.history.location.state ? this.props.history.location.state.toString() : ''} onPost={this.handlePost.bind(this)} />
        </div>
        <Footer />
      </div>
    )
  }
}