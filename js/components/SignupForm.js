import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery'
const regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
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
      verificationCode: '',
      allCorrect: false,
      canGetCode: true,
      time: 60,
      inputMap: {
        nickName: false,
        account: false,
        password: false,
        passwordConfirm: false,
        verificationCode: false,
        name: false,
        number: false,
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
          e.target.parentNode.querySelector('span').innerHTML = "必填，长度为3~16个字符"
          const Modifieddata = Object.assign({}, this.state.inputMap, {nickName: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(e.target.value.length <= 16 &&e.target.value.length >= 3) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "名称格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {nickName: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入长度为3~16个字符的名称"
          const Modifieddata = Object.assign({}, this.state.inputMap, {nickName: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
      case 'account': 
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填"
          const Modifieddata = Object.assign({}, this.state.inputMap, {account: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(regemail.test(e.target.value)) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "邮箱格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {account: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入正确邮箱"
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
      case 'verificationCode': 
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填，长度为4个字符"
          const Modifieddata = Object.assign({}, this.state.inputMap, {verificationCode: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(e.target.value.length === 4) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "验证码格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {verificationCode: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入4位验证码"
          const Modifieddata = Object.assign({}, this.state.inputMap, {verificationCode: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
      case 'name': 
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填，长度为3~5个字符"
          const Modifieddata = Object.assign({}, this.state.inputMap, {name: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(3 <= e.target.value.length && e.target.value.length <= 5) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "真实姓名格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {name: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入3~5位真实姓名"
          const Modifieddata = Object.assign({}, this.state.inputMap, {name: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
      case 'number': 
        if(e.target.value === '') {
          e.target.parentNode.querySelector('span').className = 'information'
          e.target.parentNode.querySelector('span').innerHTML = "必填，长度为10个字符"
          const Modifieddata = Object.assign({}, this.state.inputMap, {number: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else if(e.target.value.length === 10) {
          e.target.parentNode.querySelector('span').className = 'correct'
          e.target.parentNode.querySelector('span').innerHTML = "学号格式正确"
          const Modifieddata = Object.assign({}, this.state.inputMap, {number: true})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        } else {
          e.target.parentNode.querySelector('span').className = 'error'
          e.target.parentNode.querySelector('span').innerHTML = "请输入10位学号"
          const Modifieddata = Object.assign({}, this.state.inputMap, {number: false})
          this.setState({
            inputMap: Modifieddata
          }, setButton)
        }
        break
    }
    function setButton() {
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
      passwordConfirm: this.state.passwordConfirm,
      verificationCode: this.state.verificationCode
    })
  }
  getCode(e) {
    if(!regemail.test(this.state.account)) {
      alert('请输入正确邮箱')
    }
    const that = this
    that.setState({
      canGetCode: false
    })
    e.preventDefault()
    $.ajax({
      url: '/api/getCode',
      type: 'post',
      data: {
        mailAddress: this.state.account
      },
      success(responseData) {
        if(responseData.success) {
          const intervalId = that.timeStart.call(that)
          setTimeout(() => {
            that.setState({
              canGetCode: true,
              time: 60
            })
            clearInterval(intervalId)
          }, 60000)
        } else {
          that.setState({
            canGetCode: true,
            time: 60
          })
          alert(responseData.type)
        }
      }
    })
  }
  timeStart() {
    const that = this
    const intervalId = setInterval(() => {
      that.setState(preState => ({
        time: preState.time - 1
      }))
    }, 1000)
    return intervalId
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
        <legend>注册</legend>
        <p>
          <label className="name">昵名</label>
          <input name="nickName" type="text" className="text" id="nameText" value={this.state.nickName} onChange={this.updateField.bind(this, 'nickName')} onFocus={this.updateField.bind(this, 'nickName')}/>
          <span id="information" className="hideSpan">必填，长度为3~16个字符</span>
        </p>
        <p>
          <label className="name" >真实姓名</label>
          <input name="name" type="text" className="text" style={{marginLeft:'9px'}} value={this.state.name} onChange={this.updateField.bind(this, 'name')} onFocus={this.updateField.bind(this, 'name')}/>
          <span id="information" className="hideSpan">必填，长度为3~5个字符</span>
        </p>
        <p>
          <label className="name">学号</label>
          <input name="number" type="text" className="text" value={this.state.number} onChange={this.updateField.bind(this, 'number')} onFocus={this.updateField.bind(this, 'number')}/>
          <span id="information" className="hideSpan">必填，长度为10个字符</span>
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
          <label className="name">邮箱</label>
          <input name="account" type="text" className="text" id="accountText" value={this.state.account} onChange={this.updateField.bind(this, 'account')} onFocus={this.updateField.bind(this, 'account')}/>
          <span id="information4" className="hideSpan">必填，长度为6~14个数字或字母</span>
        </p>
        <p>
          <label className="name">验证码</label>
          <input name="verificationCode" style={{marginLeft:'24px', width: '100px'}} type="text" className="text" value={this.state.verificationCode} onChange={this.updateField.bind(this, 'verificationCode')} onFocus={this.updateField.bind(this, 'verificationCode')}/>
          <button disabled={!this.state.canGetCode} className={this.state.canGetCode ? 'abled' : 'notAbled'} onClick={this.getCode.bind(this)} style={{display: 'inline', marginLeft: '10px', margin: '0px 10px'}}>{this.state.canGetCode ? '获取验证码' : `${this.state.time}后再获取`}</button>
          <span id="information5" className="hideSpan" style={{display: 'block'}}></span>
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