import React from 'react'
import ReactDOM from 'react-dom'
// 同步引入
// import Index from './components/Index'
// import Signup from './components/Signup'
// import Login from './components/Login'
// import MyBlog from './components/MyBlog'
// import MyMoment from './components/MyMoment'
// import Download from './components/Download'
// import Grade from './components/Grade'
// import Subject from './components/Subject'

// 异步引入
import IndexContainer from 'bundle-loader?lazy&name=[name]!./components/Index'
import SignupContainer from 'bundle-loader?lazy&name=[name]!./components/Signup'
import LoginContainer from 'bundle-loader?lazy&name=[name]!./components/Login'
import MyBlogContainer from 'bundle-loader?lazy&name=[name]!./components/MyBlog'
import MyMomentContainer from 'bundle-loader?lazy&name=[name]!./components/MyMoment'
import DownloadContainer from 'bundle-loader?lazy&name=[name]!./components/Download'
import GradeContainer from 'bundle-loader?lazy&name=[name]!./components/Grade'
import SubjectContainer from 'bundle-loader?lazy&name=[name]!./components/Subject'
import AdministratorContainer from 'bundle-loader?lazy&name=[name]!./components/Administrator'

import Bundle from './bundle.js';
import {BrowserRouter, Route} from 'react-router-dom'

export default class Root extends React.Component {
  render() {
    const Index = () => (
      <Bundle load={IndexContainer}>
          {(Index) => <Index />}
      </Bundle>
    )
    const Signup = (props) => (
      <Bundle load={SignupContainer}>
          {(Signup) => <Signup {...props}/>}
      </Bundle>
    )
    const Login = (props) => (
      <Bundle load={LoginContainer}>
          {(Login) => <Login {...props}/>}
      </Bundle>
    )
    const MyBlog = () => (
      <Bundle load={MyBlogContainer}>
          {(MyBlog) => <MyBlog />}
      </Bundle>
    )
    const MyMoment = () => (
      <Bundle load={MyMomentContainer}>
          {(MyMoment) => <MyMoment />}
      </Bundle>
    )
    const Download = () => (
      <Bundle load={DownloadContainer}>
          {(Download) => <Download />}
      </Bundle>
    )
    const Grade = () => (
      <Bundle load={GradeContainer}>
          {(Grade) => <Grade />}
      </Bundle>
    )
    const Subject = () => (
      <Bundle load={SubjectContainer}>
          {(Subject) => <Subject />}
      </Bundle>
    )
    const Administrator = () => (
      <Bundle load={AdministratorContainer}>
          {(Administrator) => <Administrator />}
      </Bundle>
    )
  
    return(
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Index}></Route>
          <Route path="/signup" render={props => {
            return Signup(props)
          }}></Route>
          <Route path="/login" render={props => {
            return Login(props)
          }}></Route>
          <Route path="/blog" component={MyBlog}></Route>
          <Route path="/moment" component={MyMoment}></Route>
          <Route path="/download" component={Download}></Route>
          <Route path="/searchgrade" component={Grade}></Route>
          <Route path="/searchsubject" component={Subject}></Route>
          <Route path="/administrator" component={Administrator}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
