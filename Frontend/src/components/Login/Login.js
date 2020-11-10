import React, {useState} from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import {FaUserFriends, FaRegNewspaper} from 'react-icons/fa';
import {GiPingPongBat} from 'react-icons/gi';
import * as actions from '../../store/actions/index';
import classes from './Login.module.css';
import Input from '../InputForm/InputFrom';
import Spinner from '../../UI/Spinner';

const Login = (props) => {
  const initalInputState = {
    email: {
      value: '',
      elementConfig: {
        type: 'email',
        placeholder: 'Please enter your email'
      }
    },
    password: {
      value: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Please enter your password'
      }
    }
  }
  const [inputState, setInputState] = useState(initalInputState);

  const inputChangeHandler = (event, inputField) => {
    const updatedInfo = event.target.value;
    setInputState(prevInputState => ({
      ...prevInputState,
      [inputField]: {
        ...prevInputState[inputField],
        value: updatedInfo
      }
    }))
  }

  const sumbitFormHandler = (event) => {
    event.preventDefault();
    props.onAuth(inputState.email.value, inputState.password.value);
  }

  let inputElements = [];
  for(let key in inputState) {
    inputElements.push({
      id: key,
      config: inputState[key]
    })
  }

  let errmessage = null;

  if(props.error) {
    errmessage = (<p>{props.error}</p>)
  }

  let loginForm = (
    <div className={classes.leftbox}>
      <form className={classes.form} onSubmit={sumbitFormHandler}>
        <h1>Sign In</h1>
        {inputElements.map(el => {
          return <Input key={el.id} config={el.config.elementConfig} name={el.id} value={el.config.value} changed={event => inputChangeHandler(event, el.id)}/>
        })}
        <p className={classes.forgotPassword}>Forgot password?</p>
        <button>SIGN IN</button>
        {errmessage}
      </form>
    </div>
  )

  

  let newUserForm = (
    <div className={classes.rightbox}>
      <h1>I'm New Here</h1>
      <h3 style={{textAlign: 'center'}}>Benefits of creating an account</h3>
      <div className={classes.promo}>
        <div>
          <FaUserFriends className={classes.icon}/>
          <p className={classes.promotext}>Make Friends</p>
        </div>
        <div>
          <GiPingPongBat className={classes.icon}/>
          <p className={classes.promotext}>Improve Skills</p>
        </div>
        <div>
          <FaRegNewspaper className={classes.icon}/>
          <p className={classes.promotext}>Latest News</p>
        </div>
      </div>
      <NavLink to='/signup' className={classes.Button}>CREATE ACCOUNT</NavLink>
    </div>
  )

  if(props.loading) {
    loginForm = <Spinner/>
    newUserForm = null
  }

  

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.container}>
      {loginForm}
      {newUserForm}
      {authRedirect}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.user._id !== null,
    loading: state.auth.loading,
    error: state.auth.error,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => {
      dispatch(actions.auth(email, password));
    }
    // onSetRedirectPath: (path) => {
    //   dispatch(actions.setRedirectPath(path));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);