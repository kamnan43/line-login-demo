import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Auth from './pages/Auth';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h3 className="app-title">LINE Login Demo</h3>
        </header>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
