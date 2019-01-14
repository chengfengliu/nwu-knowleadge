import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import AuditFileList from './AuditFileList'
import $ from 'jquery'
// import {Link} from 'react-router-dom'
// import '../../assets/css/grade.css'
export default class Administrator extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }
  componentDidMount() {
    const _that = this
    $.ajax({
      url: '/api/getAuditFiles',
      type: 'get',
      success(responseData) {
        console.log(responseData)
        _that.setState({
          files: responseData.auditFiles.match(/\{(.+?)\}/g).map(item => JSON.parse(item))
        })
      }
    })
  }
  render() {
    return (
      <div id="administrator">
        <AuditFileList files={this.state.files} />
        <Footer />
      </div>
    )
  }
}