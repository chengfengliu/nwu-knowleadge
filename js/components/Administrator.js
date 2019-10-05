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
      users: [],
      fileAmount: 0,
      downloadAmount: 0,
    }
  }
  componentDidMount () {
    const _that = this
    $.ajax({
      url: '/api/getAuditFiles',
      type: 'get',
      success(responseData) {
        $.ajax({
          url: '/api/getUsers',
          type: 'get',
          success(responseUserData) {
            $.ajax({
              url: '/api/getFileAmountAndDownloadAmount',
              type: 'get',
              success(responseAmountData) {
                _that.setState({
                  files: responseData.auditFiles,
                  users: responseUserData.users,
                  fileAmount: responseAmountData.fileAmount,
                  downloadAmount: responseAmountData.downloadAmount,
                })
              },
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
        <div>
          文件总数：{this.state.fileAmount}
          下载总数: {this.state.downloadAmount}
        </div>
        <Footer />
      </div>
    )
  }
}