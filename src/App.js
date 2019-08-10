import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import './App.scss';
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout className="Layout" />
      </BrowserRouter>
    );
  }
}

export default App;
