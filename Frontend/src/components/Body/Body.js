import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import SignupForm from '../Signup/Signup';
import LoginForm from '../Login/Login';
import MyAccount from '../MyAccount/MyAccount';
import MainPage from '../MainPage/MainPage';


const body = (props) => {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/signup' exact component={SignupForm}/>
        <Route path='/login' exact component={LoginForm}/>
        <Route path='/myaccount' component={MyAccount}/>
      </Switch>
      
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLogged: state.auth.user._id !== null
  }
}

export default connect(mapStateToProps)(body);