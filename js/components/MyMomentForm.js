import React, { Component } from 'react'
import $ from 'jquery'
export default class MyMomentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moment: '',
      hasTookImage: false,
      mediaStreamTrack: {},
      isOpeningCamera: false,
      isBlockingCamera: true
    }
  }
  componentDidMount() {
    // 遮挡摄像头的画布
    // console.log('componentDidMount',this.refs.videoCanvas)
    const videoCtx = this.refs.videoCanvas.getContext('2d')
    videoCtx.fillStyle = '#000';
    videoCtx.fillRect(0, 0, 160, 160);
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate',this.refs.videoCanvas)
    if(this.refs.videoCanvas) {
      const videoCtx = this.refs.videoCanvas.getContext('2d')
      videoCtx.fillStyle = '#000';
      videoCtx.fillRect(0, 0, 160, 160);
    }
  }
  updateField(field, e) {
    const state = {}
    state[field] = e.target.value.replace(/\n/g,'</br>')
    this.setState(state)
  }
  clickUpdateButton(e) {
    e.preventDefault()
    if(!this.refs.moment.value) {
      alert('想法不能为空！');
      return;
    } else if (!this.state.hasTookImage) {
        alert('图片不能为空！');
        return;
    }
    const _that = this
    $.ajax({
      url: '/api/updateMoments',
      type: 'post',
      data: {
        moment: _that.state.moment,
        image: this.refs.canvas.toDataURL() 
      },
      success(responseData) {
        if(responseData) {
          alert('上传成功')
          _that.setState({
            moment: '',
            hasTookImage: false,
            isBlockingCamera: true
          })
          _that.refs.moment.value = ''
        }
      }
    })
  }
  clickLiveButton() {
    // videoCanvas.style.display = 'none'
    this.liveVideo.call(this)
    this.setState({
      isOpeningCamera: true,
      isBlockingCamera: false
    })
  }
  liveVideo() {
    // console.log(this.refs.canvas)
    const _that = this
    const video = this.refs.video
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        // console.log(stream.getTracks())
        _that.setState({
          mediaStreamTrack: stream.getTracks()[0]
        })
        video.srcObject = stream
        video.play()
    }).catch(err => {
        console.log(err);
    })
  }
  clickSnapButton() {
    const width = 160
    const height = 160
    const ctx = this.refs.canvas.getContext('2d')
    const video = this.refs.video
    ctx.drawImage(video, 0, 0, width, height)
    video.pause()
    // haveTakedPhoto = true
    this.setState({
      hasTookImage: true,
      isOpeningCamera: false
    })
    this.state.mediaStreamTrack.stop()
  }
  render() {
    return(
      <div id="myMomentForm">
        <div className="box">
          
          { 
            this.state.isBlockingCamera
              ? <canvas id="videoCanvas" width="160" height="160" ref="videoCanvas"></canvas>
              : null
          }   
          <video id="video" width="100%" height="100%" ref="video"></video>     
          {
            this.state.isOpeningCamera
              ? <button className="cameraButton" onClick={this.clickSnapButton.bind(this)}>拍摄</button>
              : <div><button className="cameraButton" onClick={this.clickLiveButton.bind(this)}>打开摄像头</button><button className="cameraButton" onClick={this.clickUpdateButton.bind(this)}>更新</button></div>
          }         
        </div>
        <textarea ref="moment"id="moment" name="moment" type="text" rows="5" placeholder="记录今天~" onChange={this.updateField.bind(this, 'moment')}></textarea>
        <canvas id="canvas" width="160" height="160" ref="canvas"></canvas>
        
      </div>
    )
  }
}