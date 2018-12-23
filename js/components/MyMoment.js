import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/moments.css'
import $ from 'jquery'
import Header from './Header'
import Footer from './Footer'
import MyMomentForm from './MyMomentForm'
import MomentItem from './MomentItem'
import PageList from './PageList'

export default class MyMoment extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      moment0: {},
      moment1: {},
      moment2: {},
      moment3: {},
      pageNo: 1,
      momentsPagesCount: 1
    }
  }
  componentDidMount() {
    // console.log('myMoment did Mount')
    const _that = this
    $.ajax({
      url: '/api/getAllmoments',
      type: 'get',
      success(responseData) {
        // console.log('/api/getAllmoments',responseData)
        const moment0 = {}
        const moment1 = {}
        const moment2 = {}
        const moment3 = {}
        for(let key in responseData) {
          if(key.includes('0')) {
            moment0[key] = responseData[key]
          } else if(key.includes('1')) {
            moment1[key] = responseData[key]
          } else if(key.includes('2')) {
            moment2[key] = responseData[key]
          } else if(key.includes('3')) {
            moment3[key] = responseData[key]
          }
        }
        _that.setState({
          moment0, moment1, moment2, moment3, momentsPagesCount: responseData.momentsPagesCount
        })
      }
    }) 
  }
  changePageNo(pageNo) {
    const _that = this
    $.ajax({
      url: `/api/getOtherMoments/${pageNo}`,
      type: 'get',
      success(responseData) {
        const moment0 = {}
        const moment1 = {}
        const moment2 = {}
        const moment3 = {}
        for(let key in responseData) {
          if(key.includes('0')) {
            moment0[key] = responseData[key]
          } else if(key.includes('1')) {
            moment1[key] = responseData[key]
          } else if(key.includes('2')) {
            moment2[key] = responseData[key]
          } else if(key.includes('3')) {
            moment3[key] = responseData[key]
          }
        }
        _that.setState({
          moment0, moment1, moment2, moment3, momentsPagesCount: responseData.momentsPagesCount, pageNo
        })
      }
    })
  }
  render() {
    return (
      <div id="myMoment">
        <Header hasLoggedIn={true}/>
          <MyMomentForm />
          <ul id="momentsList">
            {this.state.moment0.date0 ? <MomentItem momentData={this.state.moment0} index={0} pageNo={this.state.pageNo}/> : <li><h3>已经到尾了</h3></li>}
            {this.state.moment1.date1 ? <MomentItem momentData={this.state.moment1} index={1} pageNo={this.state.pageNo}/> : <li><h3>已经到尾了</h3></li>}
            {this.state.moment2.date2 ? <MomentItem momentData={this.state.moment2} index={2} pageNo={this.state.pageNo}/> : <li><h3>已经到尾了</h3></li>}
            {this.state.moment3.date3 ? <MomentItem momentData={this.state.moment3} index={3} pageNo={this.state.pageNo}/> : <li><h3>已经到尾了</h3></li>}
          </ul>
          <PageList pageNo={this.state.pageNo} pageCount={this.state.momentsPagesCount} changePageNo={this.changePageNo.bind(this)}/>
          <a id="downloadVideo" className="button" download="video.flv" href="/api/downloadVideo">下载视频</a>
          <Link to="/" className='button'>返回首页</Link>
        <Footer />
      </div>
    )
  }
}