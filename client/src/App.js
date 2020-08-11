import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import Home from './Home.js';
import Add from './Add.js';
import View from './View.js';
import { createBrowserHistory } from 'history';

class App extends React.Component{
  render(){
    return (
      <div>
         <ul>
         <a href="/home"><li>Home</li></a>
         <a href="/add"><li>Add Profile</li></a>
         <a href="/remove"><li>View Profiles</li></a>
         </ul>
         {this.props.children}
      </div>
   )
  }
}
export default App;
