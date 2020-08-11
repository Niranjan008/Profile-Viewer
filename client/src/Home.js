import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
class Home extends React.Component {
    render() {
       return (
          <div>
             <center><h1>Home Page</h1></center>
             <br/><br/><br/>
             <center><h2>Add and View Profiles</h2></center>
          </div>
       )
    }
  }
  export default Home;