import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignupForm from '../Signup/Signup';
import LoginForm from '../Login/Login';
import MyAccount from '../MyAccount/MyAccount';

const body = (props) => {
  return (
    <section>
      <Switch>
        <Route path='/' exact render={() => <div>I am main page</div> }/>
        <Route path='/signup' exact component={SignupForm}/>
        <Route path='/login' exact component={LoginForm}/>
        <Route path='/myaccount' exact component={MyAccount}/>
      </Switch>
      
    </section>
  )
}

export default body;