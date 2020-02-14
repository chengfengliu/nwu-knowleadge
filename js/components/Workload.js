import React, { Component } from 'react'
import $ from 'jquery'

export default class Workload extends Component{
  constructor(props) {
    super(props)
    this.state = {
      tableList: [],
      result: ""
    }
  }
  uploadFile() {
    const isConfirm = confirm(`你确定要上传此文件吗？`)
    const that = this
    if(isConfirm) {
      const data = new FormData(this.refs.upload)
      $.ajax({
        url: '/api/uploadTable',
        method: 'post',
        data,
        processData:false,
        contentType:false,
        success(responseData) {
          if(responseData.name === '') {
            alert('请选择文件')
          } else {
            alert('上传成功')
            that.setState({
              tableList: that.state.tableList.concat(responseData.name)
            })
          }
        }
      })
    }
  }

  handle() {
    window.open(`/api/handleTable`)
  }

  excelToTxt() {
    const that = this
    $.ajax({
      url: '/api/excelToTxt',
      method: 'get',
      success(responseData) {
        that.setState({
          result: responseData.result
        })
      }
    })
  }
  clear() {
    const that = this
    $.ajax({
      url: '/api/clearTable',
      method: 'get',
      success() {
        that.setState({
          tableList: [],
          result: ""
        })
        alert('清除成功')
      }
    })
  }

  render() {
    console.log('this.state.tableList', this.state.tableList)
    const tableList = this.state.tableList.map((item, index) => {
      return (
        <li key={index}>{item}</li>
      )
    })
    return(
      <div>
        <form method="post" encType="multipart/form-data" ref="upload" id="uploadForm">
          <input type="file" name="table"/>
          <input type="button" value="上传" onClick={this.uploadFile.bind(this)}/>
        </form>
        <ul>
          {tableList}
        </ul>
        <input type="button" value="处理" onClick={this.handle.bind(this)}/>
        <input type="button" value="清除" onClick={this.clear.bind(this)} />
        <input type="button" value="转文本" onClick={this.excelToTxt.bind(this)}/>
        <div>结果</div>
        <div>{this.state.result}</div>
      </div>
    )
  }
}