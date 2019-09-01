import React, { Component, PropTypes } from 'react'
import '../../assets/css/signup.css'
import $ from 'jquery'
import SignupForm from './SignupForm'
import Header from './Header'
import Footer from './Footer'
class Signup extends Component { 
  constructor(props) {
    super(props)
  }
  handlePost(data) {
    // 一定要bind(this)和_that = this
    const _that = this
    $.ajax({
      url: '/api/signup',
      type: 'post',
      // 不能乱加dataType
      data,
      success(responseData) {
        if(responseData.success) {
          alert('注册成功')
          _that.props.history.push( '/login', responseData.account)
        } else {
          alert(responseData.type)
        }
      }
    })
    
  }
  render() {
    return (
      <div id="signupBackground">
        <Header />
        <div id="signup">
          <SignupForm onPost={this.handlePost.bind(this)} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Signup