import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import classes from './Nav.module.css'; 

const nav = (props) => {
  const logoutHandler = (event) => {
    event.preventDefault();
    props.onLogout();
  }

  const unAuthNav = (
    <nav>
      <ul>
        <li>
          <NavLink to='/signup'>Sign up</NavLink>
        </li>
        <li>
          <NavLink to='/login'>Log in</NavLink>
        </li>
      </ul>
    </nav>
  )

  const authNav = (
    <nav>
      <ul>
        <li>
          <NavLink to='/myaccount'>My Account</NavLink>
        </li>
        <li>
          <a onClick={logoutHandler}>Log out</a>
        </li>
      </ul>
    </nav>
  )


  return (
    <div>
      {props.isAuth ? authNav : unAuthNav}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.user._id !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actions.logout());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(nav);