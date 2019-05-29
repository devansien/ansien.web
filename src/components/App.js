import React, { Component } from 'react';
import Widget from './Widget';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Widget />
        <Widget />
      </div>
    );
  }
}

export default App;
