import React, { Component } from 'react';
import './App.css';
import Main from './Routes/Main'
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      foof : ''
    }
  }
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}
export default App;