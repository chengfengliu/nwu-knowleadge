import React, { Component } from 'react';
import '../../assets/css/description.css'
export default class Description extends Component {
  render() {
    return(
        <div id="introduction">
          <div id="sharePart" className="part">
            <img src='images/sharePart.svg'/>
            <div className="text">
              <h1>学习资料共享</h1>
              <p>下载中心可以下载大学四年的各种学习资料，也可上传学习资料。目前保存近五年的考试卷，上机作业，课后题答案等资料。和别人分享你的知识，那才是永恒之道。截止到2019/10/5前，本中心已有176份文件资料成功上传以及999次下载量。</p>
            </div>
          </div>
          <div id="blogPart" className="part">
            <img src='images/blogPart.svg'/>
            <div className="text">
              <h1>生活学习心得</h1>
              <p>分享在西北大学生活和学习过程中的个人体会。学会理解才懂得分享，其实，我们每一个人都是幸福的。只是，你的幸福，常常是在别人眼里。幸福这座山，原本就没有顶、没有头。你要学会走走停停，看看山岚、赏赏虹霓、吹吹清风，心灵在放松中得到生活的满足。</p>
            </div>
          </div>
          <div id="searchPart" className="part">
            <img src='images/searchPart.svg'/>
            <div className="text">
              <h1>成绩查询系统</h1>
              <p>可以提前查询期末成绩，本专业各科挂科率，在期末周做好最充分的准备。</p>
            </div>
          </div>
        </div>
    )
  }
}
