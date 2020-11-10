import React, {useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './Signup.module.css';
import Input from '../InputForm/InputFrom';
import Spinner from '../../UI/Spinner';
import * as actions from '../../store/actions/index';

const SignUp = (props) => {
  const initalUserState = {
    firstName: {
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Please enter your first name'
      }
    },
    lastName: {
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Please enter your last name'
      }
    },
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
    },
    passwordConfirm: {
      value: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Please confirm your password'
      }
    }
  }
  const [userState, setUserState] = useState(initalUserState);

  const inputChangeHandler = (event, inputField) => {
    const updatedInfo = event.target.value;
    setUserState(prevUserState => ({
      ...prevUserState,
      [inputField]: {
        ...prevUserState[inputField],
        value: updatedInfo
      }
    }))
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    const submitForm = {};
    for(let key in userState) {
      submitForm[key] = userState[key].value;
    };
    
    props.onSignup(submitForm);
  }

  let userElements = [];
  for(let key in userState) {
    userElements.push({
      id: key,
      config: userState[key]
    })
  }
  
  let signUpForm = (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <h1>Create New Account</h1>
      {userElements.map(el => {
        return (
        <Input key={el.id} config={el.config.elementConfig} name={el.id} value={el.config.value} changed={event => inputChangeHandler(event, el.id)}/>
        )
      })}
      <button>Create Account</button>
      <p>Already have an account? <NavLink to='/login'>log in</NavLink></p>
    </form>
  ) 

  if(props.loading) {
    signUpForm = <Spinner/>
  }


  let errmessage = null;

  if(props.error) {
    errmessage = <p>{props.error}</p>
  }

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  
  return (
    <div>
      {signUpForm}
      {errmessage}
      {authRedirect}
    </div>
    
  );
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
    onSignup: (submitForm) => {dispatch(actions.signup(submitForm))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);