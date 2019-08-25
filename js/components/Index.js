import React, { Component } from 'react';
import $ from 'jquery'
import Header from './Header'
import Footer from './Footer'
import Description from './Description'
import Blog from './Blog'
import store from '../redux/store.js'
import {logout, login} from '../redux/action.js'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLoggedIn: false
    }
  }
  componentDidMount() {
    const _that = this
    $.ajax({
      url: '/api/signUpStatus',
      type: 'get',
      success(responceData) {
        if(responceData.hasLoggedIn) {
          _that.setState({hasLoggedIn: true})
          store.dispatch(login(responceData.userNickName))
        } else {
          _that.setState({hasLoggedIn: false})
        }
      }
    })
  }
  exit() {
    const _that = this
    store.dispatch(logout())
    $.ajax({
      url: '/api/logout',
      type: 'get',
      success(responceData) {
        _that.setState({
          hasLoggedIn: responceData.hasLoggedIn,
        }) 
      }
    })
  }
  render() {
    return(
      <div id="index">
        <Header exit={this.exit.bind(this)}/>
        {this.state.hasLoggedIn ? <Blog /> : <Description />}
        <Footer />
      </div>
    )
  }
}
