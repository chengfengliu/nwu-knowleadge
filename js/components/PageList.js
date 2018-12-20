import React, { Component } from 'react'
import '../../assets/css/pageList.css'
export default class PageList extends Component {
  constructor(props) {
    super(props)
  }
  handleClick(e) {
    this.props.changePageNo(parseInt(e.target.innerHTML))
  }
  render() {
    const content = []
    for(let i = 1; i <= this.props.pageCount; i++) {
      content.push(<li className={this.props.pageNo === i ? 'active' : ''} key={i}><a href="#"onClick={this.handleClick.bind(this)}>{i}</a></li>)
    }
    return(
      <ul id="pagesList">
        {content}
      </ul>
    )
  }
}