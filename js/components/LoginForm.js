import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/login.css'
class LoginFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }
  componentWillMount() {
    // console.log('componentwillMount')
    this.setState({
      account: this.props.returnData
    })
  }
  updateField(field, e) {
    const state = {}
    state[field] = e.target.value
    this.setState(state)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.onPost({
      account: this.state.account,
      password: this.state.password
    })
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
            <div style={{display:this.props.returnData?'block':'none'}}>注册成功！请登录</div>
            <legend>登录</legend>
            <p>
                <label className="name">账号</label>
                <input id="account" name="account" type="text" className="text" onChange={this.updateField.bind(this, 'account')} value={this.state.account}/>
            </p>
            <p>
                <label className="name">密码</label>
                <input name="password" type="password" className="text" onChange={this.updateField.bind(this, 'password')}/>
            </p>
            <p className="input">
                {/* <input id="t1" type="text" className="text" placeholder="验证码" onblur="but()" style={{width:'35%',marginLeft:'0'}} /> */}
                <span id="discode"></span>
                {/* <input type="button" value="换一换" class="c" style="height:25px;background-color: blue;color: #fff;border-radius: 5px;"onClick="createCode()"/> */}
            </p>
            <button>登录</button>
            <Link to="/" className='button'>返回首页</Link>
        </fieldset>
    </form>
    )
  }
}
LoginFrom.propTypes = {
  onPost: PropTypes.func.isRequired,
  returnData: PropTypes.string.isRequired
}

export default LoginFrom