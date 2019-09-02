import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/download.css'
import $ from 'jquery'
import Header from './Header'
import Footer from './Footer'
import FileList from './FileList'
import UploadForm from './UploadForm'
export default class Download extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      userDownloadTimes: 0
    }
  }
  componentDidMount() {
    const _that = this
    // 如果是两次ajax会分别触发一次FileList的componentWillReceiveProps方法
    $.ajax({
      url: '/api/getDownloadTimes',
      type: 'get',
      success(getDownloadTimesResponseData) {
        $.ajax({
          url: '/api/download',
          type: 'get',
          success(downloadResponseData) {
            _that.setState({
              userDownloadTimes: getDownloadTimesResponseData.nowDownloadTimes,
              files: downloadResponseData.files
            })
          }
        }) 
      }
    })  

  }
  updateFileList(updateFile) {
    const filesCopy = this.state.files
    filesCopy.push(updateFile)
    this.setState({
      files: filesCopy,
    })
  }
  updateUserDownloadTimes(_id) {
    let clickedFileIndex = 0
    this.state.files.forEach((item, index) => {
      if(item._id === _id) {
        clickedFileIndex = index
      }
    })
    const filesCopy = this.state.files
    filesCopy[clickedFileIndex].downloadedTimes++
    this.setState({
      userDownloadTimes: this.state.userDownloadTimes - 1,
      files: filesCopy
    })
  }
  render() {
    return (
      <div>
        <Header/>
        <div id="download">
          <img src="/images/download.png"></img>
          <div id="header">
            <h3>文件列表</h3>
            <div id="times">可下载次数：<span id="downloadTimesFromServer">{this.state.userDownloadTimes}</span></div>
          </div>
          <FileList files={this.state.files} updateUserDownloadTimes={this.updateUserDownloadTimes.bind(this)} userDownloadTimes={this.state.userDownloadTimes}/>
          <h4>上传中心</h4>
          <div className="warn">
            <h5>注意事项</h5>
            <p>1.如果要上传文件最好一系列（整一个学期）一起上传并按<i> 科目全名+年份+资料内容 </i>格式命名；</p>
            <p>2.上传一个文件增加5次下载次数；</p>
            <p>3.上传前请核对文件是否与专业以及年级吻合，并且等待其上传完毕；</p>
            <p>4.请不要上传有关政治以及色情的资料。资料仅用于学习。</p>
          </div>
          <UploadForm updateFileList={this.updateFileList.bind(this)}/>
          <Link to="/" className='button'>返回首页</Link>
        </div>
        <Footer />
      </div>
    )
  }
}