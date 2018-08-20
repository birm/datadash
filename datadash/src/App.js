import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './util/ApiStore'

const store = new Store(urlBase, dataset)

import TextPlot from './visualizations/filters/TextPlot'

d3Selection = require('d3-selection');

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DataDash</h1>
        </header>
        <TextPlot cols=[] id="alpha-1"></TextPlot>
      </div>
    );
  }
}

export default App;
