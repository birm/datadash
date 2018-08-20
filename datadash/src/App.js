import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './util/ApiStore'
import VisContainer from './visualizations/VisContainer'

const urlBase="http://localhost:3333"
const dataset="fruit"
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
        <VisContainer type="text" cols={["size"]} id={"alpha-1"} store={store}></VisContainer>
      </div>
    );
  }
}

export default App;
