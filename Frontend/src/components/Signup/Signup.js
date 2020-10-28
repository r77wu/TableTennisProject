import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import classes from './Signup.module.css';
import Input from '../InputForm/InputFrom';

const SignUp = (props) => {
  const initalUserState = {
    name: {
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Please enter your name'
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
    
    axios.post('/api/v1/users/signup', submitForm).then(response => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
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
  
  return (
    <div>
      {signUpForm}
      
    </div>
    
  );
}

export default SignUp;