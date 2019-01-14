import React, { Component } from 'react'
import $ from 'jquery'
export default class UploadForm extends Component {
  // constructor(props) {
  //   super(props)
  // }
  uploadFile() {
    const isConfirm = confirm(`你确定要上传此文件吗？`);
    if(isConfirm) {
      const data = new FormData(this.refs.upload)
      const _that = this
      $.ajax({
        url: '/api/upload',
        method: 'post',
        data,
        processData:false,
        contentType:false,
        success(responseData) {
          // console.log('/api/upload',responseData,typeof responseData)
          if(responseData.name === '') {
            alert('请选择文件')
          } else {
            alert('上传成功，正在审核中')
            _that.refs.uploadInput.value = ''
            _that.refs.gradeInput.value = 'one'
            // console.log('/api/upload', responseData)
            _that.props.updateFileList(responseData)
          }
        }
      })
    }
  }
  render() {
    return(
      <form method="post" encType="multipart/form-data" ref="upload" id="uploadForm">
        <span>文件</span>
        <input type="file" ref="uploadInput" name="myfile"/>
        <span>专业</span>
        <select name="major">
          <option value="cs">计算机科学与技术</option>
        </select>
        <span>年级</span>
        <select name="fileBelong" id="grade" ref="gradeInput">
          <option value="one">大一上</option>
          <option value="two">大一下</option>
          <option value="three">大二上</option>
          <option value="four">大二下</option>
          <option value="five">大三上</option>
          <option value="six">大三下</option>
          <option value="seven">大四上</option>
          <option value="eight">大四下</option>
          <option value="other">其他</option>
        </select>
        <input type="button" id="submitButton" value="上传" onClick={this.uploadFile.bind(this)}/>
      </form>
    )
  }
}