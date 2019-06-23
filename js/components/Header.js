import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import '../../assets/css/header.css'
import store from '../redux/store.js'
class VHeader extends Component {
  constructor(porps) {
    super(porps)
    this.state = {
      showMenu: false,
    }
  }
  componentDidUpdate() {
    // console.log('did update', this.refs)
    if(this.refs.canvas) {
      const ctx = this.refs.canvas.getContext('2d')
      ctx.strokeStyle = '#FFF'
      ctx.lineWidth = '2'
      ctx.beginPath()
      ctx.moveTo(0, 3)
      ctx.lineTo(25, 3)
      ctx.moveTo(0, 10)
      ctx.lineTo(25, 10)
      ctx.moveTo(0, 17)
      ctx.lineTo(25, 17)
      ctx.closePath()
      ctx.stroke()
    }
  }
  clickMenu() {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }))
  }
  render() {
    // console.log('header render',store.getState().hasLoggedIn)
    let hasLoggedIn = this.props.hasLoggedIn
    let menu;
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      menu = (
        <ul>
          {hasLoggedIn ? null : <li><Link to='/login'>登录</Link></li>}
          {hasLoggedIn ? null : <li><Link to='/signup'>注册</Link></li>}
          {hasLoggedIn ? <canvas ref="canvas" id="canvas" width="30px" height="30px" onClick={this.clickMenu.bind(this)}></canvas> : null}
        </ul>
      )
    } else {
      menu = (
        <ul>
          {hasLoggedIn ? null : <li><Link to='/login'>登录</Link></li>}
          {hasLoggedIn ? null : <li><Link to='/signup'>注册</Link></li>}
          {hasLoggedIn ? <li><a href="#"><span><img src='/images/head.png' id="head"/></span>{store.getState() ? store.getState().userNickName : ''}</a></li> : null}
          {hasLoggedIn && this.props.exit ? <li><Link to='#' onClick={this.props.exit}>退出</Link></li> : null}
          {hasLoggedIn ? <li><Link to='/blog'>我的博客</Link></li> : null}
          {hasLoggedIn ? <li><Link to='/moment'>我的想法</Link></li> : null}
          {hasLoggedIn ? <li><Link to='/download'>下载中心</Link></li> : null}
          {hasLoggedIn ? <li><Link to='/searchsubject'>挂科率查询</Link></li> : null}
          {hasLoggedIn ? <li><Link to='/searchgrade'>成绩查询</Link></li> : null}
        </ul>
      )
    }
    return(
      <header id="newVistor">
        <Link to='/'>
          <img ref='img'id='icon' src='images/schoolBadge.png' alt='西北大学'/>
          <p>西北大学资料共享中心</p>
        </Link>
        {menu}
        {this.state.showMenu ? (<ul id='menu'>
                                  <li><Link to='/searchgrade'>成绩查询</Link></li>
                                  <li><Link to='/searchsubject'>挂科率查询</Link></li>
                                  <li><Link to='/download'>下载中心</Link></li>
                                  <li><Link to='/moment'>我的想法</Link></li>
                                  <li><Link to='/blog'>我的博客</Link></li>
                                  <li onClick={this.clickMenu.bind(this)}><Link to='#' onClick={this.props.exit}>退出</Link></li>
                                </ul>)
                               : null}
      </header>
    )
  }
}

const mapStateToProps = state => {
  let {hasLoggedIn, userNickName} = state
  return {hasLoggedIn, userNickName}
}
const Header = connect(
  mapStateToProps,
)(VHeader)

export default Header