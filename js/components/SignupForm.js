import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom'

class SignupFrom extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      nickName: '',
      name: '',
      number: '',
      school: '',
      account: '',
      password: '',
      passwordConfirm: '',
      allCorrect: false,
      inputMap: {
        nickName: false,
        account: false,
        password: false,
        passwordConfirm: false
      }
    }
  }
  updateField(field, e) {
    const state = {}
    state[field] = e.target.value
    this.setState(state)
    switch(field) {
      case 'nickName':
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填，长度为4~16个字符"
          const Modifieddata = Object.assign({}, this.state.inputMap, {nickName: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(e.target.value.length <= 16 &&e.target.value.length >= 4) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "名称格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {nickName: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入长度为4~16个字符的名称"
          const Modifieddata = Object.assign({}, this.state.inputMap, {nickName: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
      case 'account': 
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填，长度为6~14个数字或字母"
          const Modifieddata = Object.assign({}, this.state.inputMap, {account: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(e.target.value.length <= 16 &&e.target.value.length >= 6) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "账号格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {account: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入长度为6~16个字符的账号"
          const Modifieddata = Object.assign({}, this.state.inputMap, {account: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
      case 'password': 
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填，长度为6~14个数字或字母"
          const Modifieddata = Object.assign({}, this.state.inputMap, {password: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(e.target.value.length <= 16 &&e.target.value.length >= 6) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "密码格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {password: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入长度为6~16个字符的密码"
          const Modifieddata = Object.assign({}, this.state.inputMap, {password: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
      case 'passwordConfirm': 
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填，请与密码一致"
          const Modifieddata = Object.assign({}, this.state.inputMap, {passwordConfirm: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(e.target.value === this.state.password) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "密码一致"
          const Modifieddata = Object.assign({}, this.state.inputMap, {passwordConfirm: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "密码不一致，请重新输入"
          const Modifieddata = Object.assign({}, this.state.inputMap, {passwordConfirm: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
    }
    function setButton() {
      // console.log('Object.values(this.state.inputMap)',Object.values(this.state.inputMap),Object.values(this.state.inputMap).every(item => item))
      if(Object.values(this.state.inputMap).every(item => item)) {
        this.setState({
          allCorrect: true
        })
      } else {
        this.setState({
          allCorrect: false
        })
      }
    }

  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.onPost({
      nickName: this.state.nickName,
      name: this.state.name,
      number: this.state.number,
      school: this.state.school,
      account: this.state.account,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    })
    // this.setState({
    //   nickName: '',
    //   name: '',
    //   number: '',
    //   school: '',
    //   account: '',
    //   password: '',
    //   passwordConfirm: ''
    // })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
        <legend>注册</legend>
        <p>
          <label className="name">昵名</label>
          <input name="nickName" type="text" className="text" id="nameText" value={this.state.nickName} onChange={this.updateField.bind(this, 'nickName')} onFocus={this.updateField.bind(this, 'nickName')}/>
          <span id="information" className="hideSpan">必填，长度为4~16个字符</span>
        </p>
        <p>
          <label className="name" >真实姓名</label>
          <input name="name" type="text" className="text" style={{marginLeft:'9px'}} value={this.state.name} onChange={this.updateField.bind(this, 'name')}/>
        </p>
        <p>
          <label className="name">学号</label>
          <input name="number" type="text" className="text" value={this.state.number} onChange={this.updateField.bind(this, 'number')}/>
        </p>
        <p>
          <label className="name">学校</label>
          <select name="school" style={{marginLeft: '40px'}} value={this.state.school} onChange={this.updateField.bind(this, 'school')}>
              <option value="nwu">西北大学</option>
              <option value="xisu">西安外国语大学</option>
              <option value="snu">陕西师范大学</option>
          </select>
        </p>
        <p>
          <label className="name">账号</label>
          <input name="account" type="text" className="text" id="accountText" value={this.state.account} onChange={this.updateField.bind(this, 'account')} onFocus={this.updateField.bind(this, 'account')}/>
          <span id="information4" className="hideSpan">必填，长度为6~14个数字或字母</span>
        </p>
        <p>
          <label className="name">密码</label>
          <input name="password" type="password" className="text" id="passwordText" value={this.state.password} onChange={this.updateField.bind(this, 'password')} onFocus={this.updateField.bind(this, 'password')}/>
          <span id="information2" className="hideSpan">必填，长度为6~14个数字或字母</span>
        </p>
        <p>
          <label className="name">密码确认</label>
          <input type="password" className="text" style={{marginLeft: '9px'}} id="passwordText2" value={this.state.passwordConfirm} onChange={this.updateField.bind(this, 'passwordConfirm')} onFocus={this.updateField.bind(this, 'passwordConfirm')}/>
          <span id="information3" className="hideSpan">再次输入相同密码</span>
        </p>
        <div className="warn">
          <p>注意事项</p>
          <p>1.注册后不能修改密码</p>
          <p>2.真实姓名与学号用于查询期末成绩</p>
        </div>
        <button id="confirmButton" disabled={!this.state.allCorrect} className={this.state.allCorrect ? 'abled' : 'notAbled'}>提交</button>
        <Link to="/" className='button'>返回首页</Link>
        </fieldset>
      </form>
    )
  }
}

export default SignupFrom