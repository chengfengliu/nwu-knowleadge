import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/header.css'

export default class Header extends Component {
  constructor(porps) {
    super(porps)
    this.state = {
      hasLoggedIn: false,
      userNickName: ''
    }
  }
  componentWillMount() {
    // console.log('head componentWillMount')
    this.setState({
      hasLoggedIn: this.props.hasLoggedIn,
      userNickName: this.props.userNickName
    })
  }
  componentWillReceiveProps(nextProps) {
    // console.log('head componentWillReceiveProps nextProps',nextProps)
    this.setState({
      hasLoggedIn: nextProps.hasLoggedIn,
      userNickName: nextProps.userNickName
    })
  }
  render() {
    return(
      <header id="newVistor">
        <Link to='/'>
          <img id='icon' src='images/schoolBadge.png' alt='西北大学'/>
          <p>西北大学资料共享中心</p>
        </Link>
        <ul>
          {this.state.hasLoggedIn ? null : <li><Link to='/login'>登录</Link></li>}
          {this.state.hasLoggedIn ? null : <li><Link to='/signup'>注册</Link></li>}
          {this.state.hasLoggedIn ? <li><a href="#"><span><img src='/images/head.png' id="head"/></span>{this.state.userNickName}</a></li> : null}
          {this.state.hasLoggedIn && this.props.exit ? <li><Link to='#' onClick={this.props.exit}>退出</Link></li> : null}
          {this.state.hasLoggedIn ? <li><Link to='/blog'>我的博客</Link></li> : null}
          {this.state.hasLoggedIn ? <li><Link to='/moment'>我的想法</Link></li> : null}
          {this.state.hasLoggedIn ? <li><Link to='/download'>下载中心</Link></li> : null}
          {this.state.hasLoggedIn ? <li><Link to='/searchsubject'>挂科率查询</Link></li> : null}
          {this.state.hasLoggedIn ? <li><Link to='/searchgrade'>成绩查询</Link></li> : null}
        </ul>
      </header>
    )
  }
}
