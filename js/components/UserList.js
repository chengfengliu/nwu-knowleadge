import React, { Component } from 'react'

export default class AuditFileList extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      users: []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users
    })
  }
  render() {
    const UserList = this.state.users.map((item, index) => (
      <tr key={index}>
        <td>{item.account}</td>
        <td>{item.nickName}</td>
        <td>{item.number}</td>
        <td>{item.name}</td>
        <td>{item.downloadTimes}</td>
      </tr>
    ))
    return (
      <div>UserList 总数{this.state.users.length}
        <table>
          <tbody>
            <tr>
              <th>账号</th>
              <th>用户名</th>
              <th>学号</th>
              <th>姓名</th>
              <th>下载数</th>
            </tr>
            {UserList}
          </tbody>
        </table>
      </div>
    )
  }
}