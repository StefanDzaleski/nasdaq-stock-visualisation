import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import './App.scss';
import 'antd/dist/antd.css'
import { BrowserRouter, Route } from 'react-router-dom';
import Info from './components/Info/Info';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Header} />
        <Route exact path="/" component={Layout} />
        <Route path="/nasdaq-info" component={Info} />
      </BrowserRouter>
    );
  }
}

export default App;
