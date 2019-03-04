import React, { Component } from 'react'
import '../../assets/css/blogItem.css'
import Comment from './Comment'
import $ from 'jquery'
export default class BlogItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentIsShowing: false,
      thumbsUpStatus: 'thumbsUp',
      thumbsUpCount: 0,
      needSpread: false,
      allDontNeedSpread: false
    }
  }
  componentWillMount() {
    // console.log('componentWillMount',this.props.blogData[`blog${this.props.index}Content`].length)
    this.setState({
      thumbsUpStatus: this.props.blogData[`blog${this.props.index}ThumbsUpStatus`],
      thumbsUpCount: this.props.blogData[`blog${this.props.index}ThumbsUpCount`],
      needSpread: this.props.blogData[`blog${this.props.index}Content`].length > 230,
      allDontNeedSpread: !(this.props.blogData[`blog${this.props.index}Content`].length > 230),
      commentAmount: this.props.blogData[`blog${this.props.index}Comments`].length
    })
  }
  // 换页时状态要重新初始化
  componentWillReceiveProps(nextProps) {
    // console.log('component will receive props')
    this.setState({
      thumbsUpStatus: nextProps.blogData[`blog${this.props.index}ThumbsUpStatus`],
      thumbsUpCount: nextProps.blogData[`blog${this.props.index}ThumbsUpCount`],
      needSpread: nextProps.blogData[`blog${this.props.index}Content`].length > 230,
      allDontNeedSpread: !(nextProps.blogData[`blog${this.props.index}Content`].length > 230),
      commentAmount: nextProps.blogData[`blog${this.props.index}Comments`].length
    })
  }
  clickCommentButton(e) {
    this.setState({commentIsShowing: true})
  }
  clickHideCommentButton(e) {
    this.setState({commentIsShowing: false})
  }
  clickThumbsUpButton(e) {
    const _that = this
    $.ajax({
      url: '/api/thumbsUp',
      type: 'post',
      dataType: 'json',
      data: {
        pageNo: _that.props.pageNo,
        blogid: _that.props.index
      },
      success(responseData) {
        _that.setState({
          thumbsUpStatus: responseData.classStatus,
          thumbsUpCount: responseData.thumbsUpcount
        })
      }
    }) 
  }
  spread(e) {
    e.preventDefault()
    const needSpreadCopy = this.state.needSpread
    this.setState({
      needSpread: !needSpreadCopy
    })
  }
  render() {
    return (
      <li>
        <h3>{this.props.blogData[`blog${this.props.index}Title`]}</h3>
        {this.state.needSpread 
          ? <div><p className="content" dangerouslySetInnerHTML={{__html: this.props.blogData[`blog${this.props.index}Content`].slice(0, 200) + '...'}}></p><button id="spread" onClick={this.spread.bind(this)}>展开全文<span><img className="spreadIcon" src="/images/spread.png"></img></span></button></div>
          : <div><p className="content" dangerouslySetInnerHTML={{__html: this.props.blogData[`blog${this.props.index}Content`]}}></p>{this.state.allDontNeedSpread ? null : <button id="spread" onClick={this.spread.bind(this)}>收起全文<span><img className="spreadIcon" src="/images/pullup.png"></img></span></button>}</div>
        }
        <p>{`编辑于 ${this.props.blogData[`blog${this.props.index}Time`]}`}</p>
        <p>{this.props.blogData[`blog${this.props.index}Auther`]}</p>
        <p>{!this.state.commentIsShowing ? <button className="comments" onClick={this.clickCommentButton.bind(this)}><img src="/images/comments-solid.svg"/><span>{this.state.commentAmount}条评论</span></button> : <button className="hideComments"onClick={this.clickHideCommentButton.bind(this)}><img src="/images/comments-solid.svg"/><span>收起评论</span></button>}</p>
        <p><button className={`thumbsUpButton ${this.state.thumbsUpStatus}`} onClick={this.clickThumbsUpButton.bind(this)}><img src={`/images/thumbs-up-${this.state.thumbsUpStatus}.svg`}/><span>{this.state.thumbsUpCount}</span></button></p>
        {this.state.commentIsShowing ? <Comment commentData={this.props.blogData[`blog${this.props.index}Comments`]} index={this.props.index} pageNo={this.props.pageNo}/> : ''}
      </li>
    )
  }
}