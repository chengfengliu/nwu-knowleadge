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
        <td>{item.nickName}</td>
        <td>{item.name}</td>
        <td>{item.downloadTimes}</td>
      </tr>
    ))
    return (
      <div>UserList
        <table>
          <tbody>
            <tr>
              <th>用户名</th>
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