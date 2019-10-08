import React, { Component } from 'react'

export default class LogList extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      logs: []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      logs: nextProps.logs
    })
  }
  render() {
    const LogList = this.state.logs.map((item, index) => (
      <tr key={index}>
        <td>{item.operator}</td>
        <td>{item.operation}</td>
        <td>{item.time}</td>
      </tr>
    ))
    return (
      <div>日志
        <table>
          <tbody>
            <tr>
              <th>用户名</th>
              <th>操作</th>
              <th>时间</th>
            </tr>
            {LogList}
          </tbody>
        </table>
      </div>
    )
  }
}