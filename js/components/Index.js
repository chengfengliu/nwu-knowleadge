import React, { Component } from 'react';
import $ from 'jquery'
import Header from './Header'
import Footer from './Footer'
import Description from './Description'
import Blog from './Blog'
import myContext from '../context'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLoggedIn: false,
      userNickName: '',
    }
  }
  componentDidMount() {
    const _that = this
    $.ajax({
      url: '/api/signUpStatus',
      type: 'get',
      success(responceData) {
        responceData.hasLoggedIn ? _that.setState({hasLoggedIn: true, userNickName: responceData.userNickName}) : _that.setState({hasLoggedIn: false})
      }
    })
  }
  exit() {
    const _that = this
    $.ajax({
      url: '/api/logout',
      type: 'get',
      success(responceData) {
        // console.log('/api/logout',responceData)
        _that.setState({
          hasLoggedIn: responceData.hasLoggedIn,
        })
      }
    })
  }
  render() {
    // console.log('index hasLoggedIn',this.state.hasLoggedIn)
    return(
      <div id="index">
        <myContext.Provider value={this.state.userNickName}>
          <Header hasLoggedIn={this.state.hasLoggedIn} exit={this.exit.bind(this)}/>
        </myContext.Provider>
        {this.state.hasLoggedIn ? <Blog /> : <Description />}
        <Footer />
      </div>
    )
  }
}
