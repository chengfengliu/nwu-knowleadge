import React, { Component } from 'react'

export default class FileList extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      files: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('filelist componentWillReceiveProps')
    this.refs.one.innerHTML = '<li>大一上<span>下载次数</span><span>提供者</span></li>'
    this.refs.two.innerHTML = '<li>大一下</li>'
    this.refs.three.innerHTML = '<li>大二上</li>'
    this.refs.four.innerHTML = '<li>大二下</li>'
    this.refs.five.innerHTML = '<li>大三上</li>'
    this.refs.six.innerHTML = '<li>大三下</li>'
    this.refs.seven.innerHTML = '<li>大四上</li>'
    this.refs.eight.innerHTML = '<li>大四下</li>'
    this.refs.other.innerHTML = '<li>其他</li>'
    if(nextProps.files.length) {
      nextProps.files.forEach((item) => {
        // console.log(item.downloadedTimes, typeof item)
        const fileItem = document.createElement('li')
        fileItem.innerHTML =  `<a class='downloadLink' href='/api/download/${item._id}.${item.name.split('.')[1]}' download='${item.name}'>${item.name}</a><span class='downloadedTimes'>${item.downloadedTimes}</span><span class='provider'>${item.provider}</span>`
        this.refs[item.fileBelong].appendChild(fileItem)
      })
    }
    const _that = this
    document.querySelectorAll('.downloadLink').forEach(item => {
      item.addEventListener('click', e =>{
        const splitArray = e.target.href.split('/')
        // console.log(splitArray[splitArray.length - 1].split('.')[0])
        // 无次数点击无效
        if(nextProps.userDownloadTimes === 0 || nextProps.userDownloadTimes < 0) {
          return
        }
        _that.props.updateUserDownloadTimes(splitArray[splitArray.length - 1].split('.')[0])
      })
    })
    if(nextProps.userDownloadTimes === 0 || nextProps.userDownloadTimes < 0) {
      _that.refs['filesList'].querySelectorAll('a').forEach(item => {
        console.log(item)
        item.style.pointerEvents = 'none';
        item.style.color = 'grey';
      })
    }
  }

  render() {
    return(
      <div ref="filesList">
        <ul id="oneList" ref="one"></ul>
        <ul id="twoList" ref="two"></ul>
        <ul id="threeList" ref="three"></ul>
        <ul id="fourList" ref="four"></ul>
        <ul id="fiveList" ref="five"></ul>
        <ul id="sixList" ref="six"></ul>
        <ul id="sevenList" ref="seven"></ul>
        <ul id="eightList" ref="eight"></ul>
        <ul id="otherList" ref="other"></ul>
      </div>
    )
  }
}