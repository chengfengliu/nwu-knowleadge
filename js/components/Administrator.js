import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import AuditFileList from './AuditFileList'
import UserList from './UserList'
import $ from 'jquery'
// import {Link} from 'react-router-dom'
// import '../../assets/css/grade.css'
export default class Administrator extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      users: []
    }
  }
  componentDidMount() {
    const _that = this
    $.ajax({
      url: '/api/getAuditFiles',
      type: 'get',
      success(responseData) {
        $.ajax({
          url: '/api/getUsers',
          type: 'get',
          success(responseUserData) {
            _that.setState({
              files: responseData.auditFiles,
              users: responseUserData.users
            })
          }
        })
      }
    })
  }
  render() {
    return (
      <div id="administrator">
        <Header />
        <AuditFileList files={this.state.files} />
        <UserList users={this.state.users}/>
        <Footer />
      </div>
    )
  }
}