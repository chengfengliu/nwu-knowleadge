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
        information:[["计算机科学与技术",100],["软件工程",50],["信息与通信工程",100],["物联网",100],["电子科学与技术",100]],
        culture:[["汉语言文学",100],["中国语言文学",101],["广播电视编导",102],["戏剧影视文学",103],["对外汉语教育",104]]
      },
      courseList: {
        "计算机科学与技术":[["程序设计基础",17],["离散数学",9],["数据结构",16],["数字逻辑",10],
                          ["电子技术基础",22],["概率论",7],["操作系统",2],["计算机组成原理",2],["数据库",5],["微机原理",3],["单片机原理",3],
                          ["计算机网络",16],["软件工程",1],["Linux程序设计",4],["JAVA",11],["图形学",7],["体系结构",10],["人机交互",4],
                          ["编译技术",24],["人工智能",3],["数字图像处理",7],["嵌入式系统",1],["多媒体技术",2],["项目管理",5],
                          ["互联网络程序设计",8],["网络安全",47]],
        "软件工程":[["C语言",10],["C++语言",20],["JAVA语言",10]]
      }
    }
  }
  selectDistrict(e) {
    const selected = e.target.value
    console.log(selected)
    this.refs.course.innerHTML = "";
    for(var i = 0; i < this.state.courseList[selected].length; i++){
        const opt = document.createElement("option")
        opt.value = this.state.courseList[selected][i][0]
        opt.innerHTML = this.state.courseList[selected][i][0]
        this.refs.course.appendChild(opt);
    }
  }
  clickSearchButton() {
    var number1,number2;
    var courseSelected = this.refs.course.options[this.refs.course.selectedIndex].value;
    var courseListSelected = this.state.courseList[this.refs.marjor.options[this.refs.marjor.selectedIndex].value];
    var marjorSelected = this.refs.marjor.options[this.refs.marjor.selectedIndex].value;
    var marjorListSelected = this.state.marjorList[this.refs.institute.options[this.refs.institute.selectedIndex].value];
    for(var i = 0;i < courseListSelected.length; i++){
        if(courseListSelected[i][0] == courseSelected)
        {   
            number1 = i;
            break;
        }
    }
    for(var j = 0;j < marjorListSelected.length; j++){
        if(marjorListSelected[j][0] == marjorSelected)
        {
            number2 = j;
            break;
        }
    }
    var rate = 
    courseListSelected[number1][1]
    /marjorListSelected[number2][1];
    document.getElementById("result").innerHTML = "挂科率为" + (rate * 100) + "%";
  }
  render() {
    return (
      <div id="subject">
        <Header hasLoggedIn={true}/>
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
              <option>计算机科学与技术</option>
              <option>软件工程</option>
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