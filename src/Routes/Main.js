import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../LoginPage/Login'
import Register from '../LoginPage/Register'
function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' render={() => (<Redirect to="/Login"/>)}/>
        <Route exact path='/Login' component={Login}/>
        <Route exact path='/Register' component={Register}/>
      </Switch>
    </main>
  );
}

export default Main