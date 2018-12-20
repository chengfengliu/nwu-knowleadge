import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/Index'
import Signup from './components/Signup'
import Login from './components/Login'
import MyBlog from './components/MyBlog'
import MyMoment from './components/MyMoment'
import Download from './components/Download'
import Grade from './components/Grade'
import Subject from './components/Subject'
import {BrowserRouter, Route} from 'react-router-dom'

export default class Root extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Index}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/blog" component={MyBlog}></Route>
          <Route path="/moment" component={MyMoment}></Route>
          <Route path="/download" component={Download}></Route>
          <Route path="/searchgrade" component={Grade}></Route>
          <Route path="/searchsubject" component={Subject}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
