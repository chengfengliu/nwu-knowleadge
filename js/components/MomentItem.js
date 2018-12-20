import React, { Component } from 'react';
export default class MomentItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.momentData)
    return(
      <li>
        <img src={this.props.momentData[`image${this.props.index}`]}></img>
        <p>{this.props.momentData[`moment${this.props.index}`]}</p>
        <span>{this.props.momentData[`date${this.props.index}`]}</span>
      </li>
    )
  }
}
