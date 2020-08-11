import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import './index.css';
import App from './App';
import Home from './Home.js';
import Add from './Add.js';
import View from './View.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history = {browserHistory}>
     <Route path = "/" component = {App}>
     <Route exact path="/" component={Home}/>
        <Route path = "home" component = {Home} />
        <Route path = "add" component = {Add} />
        <Route path = "remove" component = {View} />
     </Route>
  </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
