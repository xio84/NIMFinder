import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../LoginPage/Login'
import Register from '../LoginPage/Register'
import Dashboard from '../SearchPage/Dashboard'

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' render={() => (<Redirect to="/Login"/>)}/>
        <Route exact path='/Login' component={Login}/>
        <Route exact path='/Register' component={Register}/>
        <Route exact path='/:usr/search' name="search" component={Dashboard}/>
      </Switch>
    </main>
  );
}

export default Main