import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import AuditFileList from './AuditFileList'
import UserList from './UserList'
import LogList from './LogList'
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
      logs: [],
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
                $.ajax({
                  url: '/api/getLog',
                  type: 'get',
                  success(responseLogData) {
                    _that.setState({
                      files: responseData.auditFiles,
                      users: responseUserData.users,
                      fileAmount: responseAmountData.fileAmount,
                      downloadAmount: responseAmountData.downloadAmount,
                      logs: responseLogData.logs,
                    })
                  }
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
        <LogList logs={this.state.logs}/>
        <div>
          文件总数：{this.state.fileAmount}
          下载总数: {this.state.downloadAmount}
        </div>
        <Footer />
      </div>
    )
  }
}