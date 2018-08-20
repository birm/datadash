import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './util/ApiStore'
import TextPlot from './visualizations/filters/TextPlot'

const urlBase="localhost:3333"
const dataset="test"
const store = new Store(urlBase, dataset)

class App extends Component {
  componentDidMount(){
    document.title = "DataDash"
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DataDash</h1>
        </header>
        <TextPlot cols={[]} id={"alpha-1"} store={store}></TextPlot>
      </div>
    );
  }
}

export default App;
