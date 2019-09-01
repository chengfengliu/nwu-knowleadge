import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'
import '../../assets/css/search.css'
export default class Subject extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      marjorList: {
        // information:[["计算机科学与技术",100, ],["软件工程",50],["信息与通信工程",100],["物联网",100],["电子科学与技术",100]],
        information: {
          '计算机科学与技术': {
            studentNumber2017: 80,
            studentNumber2016: 100,
            studentNumber2015: 98,
            studentNumber2014: 95
          },
          '软件工程': {
            studentNumber2017: 80,
            studentNumber2016: 100,
            studentNumber2015: 98,
          }
        },
        // culture:[["汉语言文学",100],["中国语言文学",101],["广播电视编导",102],["戏剧影视文学",103],["对外汉语教育",104]]
      },
      courseList: {
        "计算机科学与技术": {
          "程序设计基础": {
            failNumber2017: 3
          },
          "离散数学": {
            failNumber2017: 13,
            failNumber2016: 9
          },
          "程序设计基础二": {
            failNumber2017: 2,
          },
          "面向对象程序设计": {
            failNumber2017: 12,
            failNumber2016: 26
          },
          "数据结构": {
            failNumber2017: 1,
            failNumber2016: 12
          },
          "数字逻辑": {
            failNumber2017: 5,
            failNumber2016: 10
          },
          "电子技术基础": {
            failNumber2017: 7,
            failNumber2016: 22
          },
          "工程数学": {
            failNumber2017: 13
          },
          "概率论": {
            failNumber2016: 1,
            failNumber2015: 7
          },
          "操作系统": {
            failNumber2016: 4,
            failNumber2015: 2
          },
          "计算机组成原理": {
            failNumber2017: 10,
            failNumber2016: 11,
            failNumber2015: 2
          },
          "数据库": {
            failNumber2017: 4,
            failNumber2016: 3,
            failNumber2015: 5
          },
          "微机原理": {
            failNumber2017: 10,
            failNumber2016: 7,
            failNumber2015: 3
          },
          "单片机原理": {
            failNumber2016: 5,
            failNumber2015: 3
          },
          "计算机网络": {
            failNumber2016: 3,
            failNumber2015: 16
          },
          "软件工程": {
            failNumber2016: 7,
            failNumber2015: 1
          },
          "Linux程序设计": {
            failNumber2016: 10,
            failNumber2015: 4
          },
          "JAVA": {
            failNumber2016: 9,
            failNumber2015: 11
          },
          "图形学": {
            failNumber2015: 7
          },
          "体系结构": {
            failNumber2016: 10,
            failNumber2015: 10
          },
          "人机交互": {
            failNumber2016: 3,
            failNumber2015: 4,
            failNumber2014: 4
          },
          "编译技术": {
            failNumber2016: 12,
            failNumber2015: 21,
            failNumber2014: 24
          },
          "人工智能": {
            failNumber2016: 4,
            failNumber2015: 5,
            failNumber2014: 3
          },
          "数字图像处理": {
            failNumber2016: 8,
            failNumber2015: 11,
            failNumber2014: 7
          },
          "嵌入式系统": {
            failNumber2016: 2,
            failNumber2015: 3,
            failNumber2014: 1
          },
          "多媒体技术": {
            failNumber2015: 3,
            failNumber2014: 2
          },
          "项目管理": {
            failNumber2016: 2,
            failNumber2015: 11,
            failNumber2014: 5
          },
          "人群与网络": {
            failNumber2016: 12,
          },
          "互联网络程序设计": {
            failNumber2015: 11,
            failNumber2014: 8
          },
          "网络安全": {
            failNumber2015: 35,
            failNumber2014: 47
          },
        },

        "软件工程": {
          "多媒体技术": {
            failNumber2015: 3,
            failNumber2014: 2
          },
          "项目管理": {
            failNumber2015: 11,
            failNumber2014: 5
          },
        }
        // [["程序设计基础",17],["离散数学",9],["数据结构",16],["数字逻辑",10],
        //                   ["电子技术基础",22],["概率论",7],["操作系统",2],["计算机组成原理",2],["数据库",5],["微机原理",3],["单片机原理",3],
        //                   ["计算机网络",16],["软件工程",1],["Linux程序设计",4],["JAVA",11],["图形学",7],["体系结构",10],["人机交互",4],
        //                   ["编译技术",24],["人工智能",3],["数字图像处理",7],["嵌入式系统",1],["多媒体技术",2],["项目管理",5],
        //                   ["互联网络程序设计",8],["网络安全",47]],
        // "软件工程":[["C语言",10],["C++语言",20],["JAVA语言",10]]
      }
    }
  }
  selectDistrict(e) {
    const selected = e.target.value
    console.log(selected)
    this.refs.course.innerHTML = "";
    for(var item in this.state.courseList[selected]){
        const opt = document.createElement("option")
        opt.value = item
        opt.innerHTML = item
        this.refs.course.appendChild(opt);
    }
  }
  clickSearchButton() {
    document.getElementById("result").innerHTML = ''
    const courseSelected = this.refs.course.options[this.refs.course.selectedIndex].value
    const marjorSelected = this.refs.marjor.options[this.refs.marjor.selectedIndex].value
    const instituteSelected = this.refs.institute.options[this.refs.institute.selectedIndex].value
    // console.log('courseSelected',courseSelected,this.state.courseList[marjorSelected][courseSelected],'marjorSelected',marjorSelected,this.state.marjorList['information'][marjorSelected])
    for(let item in this.state.courseList[marjorSelected][courseSelected]) {
      // console.log(item,this.state.courseList[marjorSelected][courseSelected][item])
      document.getElementById("result").innerHTML += `${item.slice(-4)}级挂科率为${Math.floor((this.state.courseList[marjorSelected][courseSelected][item] / this.state.marjorList[instituteSelected][marjorSelected]['studentNumber' + item.slice(-4)]) * 100)}%&nbsp;&nbsp;&nbsp;`;
    }
  }
  render() {
    return (
      <div id="subject">
        <Header/>
          <img src="/images/search.png" id="searchIcon"></img>
          <div className="container">
            <h2>南校区部分专业课近三年挂科率查询系统</h2>
            <h5>院系</h5>
            <select id="institute" ref="institute">
              <option value="information">信息科学与技术学院</option>
              <option value="culture">文学院</option>
              <option value="economic">经济管理学院</option>
              <option>公共管理学院</option>
              <option>外国语学院</option>
              <option>法学院</option>
              <option>马克思主义学院</option>
              <option>新闻传播学院</option>
              <option>数学学院</option>
              <option>物理学院</option>
              <option>化学与材料科学学院</option>
              <option>城市与环境学院</option>
            </select>
            <h5>专业</h5>
            <select id="marjor" onChange={this.selectDistrict.bind(this)} ref="marjor">
              <option value="计算机科学与技术">计算机科学与技术</option>
              <option value="软件工程">软件工程</option>
              <option>信息与通信工程</option>
              <option>物联网</option>
              <option>电子科学与技术</option>
            </select>
            <h5>课程</h5>
            <select id="course" ref="course">
              <option value="程序设计基础">程序设计基础</option>
              <option value="离散数学">离散数学</option>
              <option value="数据结构">数据结构</option>
              <option value="数字逻辑">数字逻辑</option>
              <option value="电子技术基础">电子技术基础</option>
              <option value="概率论">概率论</option>
              <option value="操作系统">操作系统</option>
              <option value="计算机组成原理">计算机组成原理</option>
              <option value="数据库">数据库</option>
              <option value="微机原理">微机原理</option>
              <option value="单片机原理">单片机原理</option>
              <option value="计算机网络">计算机网络</option>
              <option value="软件工程">软件工程</option>
              <option value="Linux程序设计">Linux程序设计</option>
              <option value="JAVA">JAVA</option>
              <option value="图形学">图形学</option>
              <option value="体系结构">体系结构</option>
              <option value="人机交互">人机交互</option>
              <option value="编译技术">编译技术</option>
              <option value="人工智能">人工智能</option>
              <option value="数字图像处理">数字图像处理</option>
              <option value="嵌入式系统">嵌入式系统</option>
              <option value="多媒体技术">多媒体技术</option>
              <option value="项目管理">项目管理</option>
              <option value="互联网络程序设计">互联网络程序设计</option>
              <option value="网络安全">网络安全</option>
            </select>
            <input type="button" value="查询" id="search" style={{display:'block',marginTop:'50px'}} onClick={this.clickSearchButton.bind(this)}/>
            <p id="result">
            </p>
          </div> 
          <Link to="/" className='button'>返回首页</Link>
        <Footer />
      </div>
    )
  }
}