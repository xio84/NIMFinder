import React, { Component } from 'react';
import './App.css';
import Loginscreen from './LoginPage/LoginScreen'
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
const style = {
  margin: 15,
};
export default App;