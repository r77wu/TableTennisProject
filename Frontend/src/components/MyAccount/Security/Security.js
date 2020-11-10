import React, {useState} from 'react';
import axios from 'axios';
import Input from '../../InputForm/InputFrom';
import classes from './Security.module.css';

const Security = () => {
  const initalInputState = {
    currentPassword: {
      value: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Please enter your current password'
      }
    },
    newPassword: {
      value: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Please enter your new password'
      }
    },
    newPasswordConfirm: {
      value: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Please confirm your new password'
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

  const submitFormHandler = (event) => {
    event.preventDefault();
    const submitData = {
      passwordCurrent: inputState.currentPassword.value,
      password: inputState.newPassword.value,
      passwordConfirm: inputState.newPasswordConfirm.value
    }
    axios.patch('/api/v1/users/changePassword', submitData).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  let inputElements = [];
  for(let key in inputState) {
    inputElements.push({
      id: key,
      config: inputState[key]
    })
  }

  let form = (
    <div >
      <form onSubmit={submitFormHandler}>
        <h1>Update Password</h1>
        {inputElements.map(el => {
          return <Input key={el.id} config={el.config.elementConfig} name={el.id} value={el.config.value} changed={event => inputChangeHandler(event, el.id)}/>
        })}
        
        <button>Save</button>
      </form>
    </div>
  )

  return (
    <div className={classes.form}>
      {form}
    </div>
  );
};

export default Security;