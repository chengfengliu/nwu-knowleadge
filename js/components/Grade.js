import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'
import '../../assets/css/grade.css'
export default class Grade extends Component { 
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="grade">
        <Header hasLoggedIn={true}/>
        <div style={{width:"50%",margin: "400px auto", textAlign:"center",color:'red'}}>此功能受到老师批评而暂时停止</div>
        <Link to="/" className='button'>返回首页</Link>
        <Footer />
      </div>
    )
  }
}