import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Input from '../../InputForm/InputFrom';
import * as actions from '../../../store/actions/index';
import classes from './PersonalInfo.module.css';

const PersonalInfo = (props) => {
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
    age: {
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Please enter your age'
      }
    },
    country: {
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Please enter your country'
      }
    },
    city: {
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Please enter your city'
      }
    },
    style: {
      value: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Please enter Penhold or Shakehand'
      }
    }
  }
  const [userState, setUserState] = useState(initalUserState);

  const fetchUser = () => {
    axios.get('/api/v1/users/getMe').then(response => {
      for(let key in userState) {
        if (response.data.data[key] !== null){
          setUserState(prevUserState => ({
            ...prevUserState,
            [key]: {
              ...prevUserState[key],
              value: response.data.data[key]
            }
          }))
        }
      }
    })
  }

  useEffect(() => {
    fetchUser();
  }, []);

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

  const submitHandler = (event) => {
    event.preventDefault();
    const submitForm = {};
    for(let key in userState) {
      submitForm[key] =  userState[key].value;
    }

    axios.patch('/api/v1/users/updateUser', submitForm).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  let userElements = [];
  for(let key in userState) {
    userElements.push({
      id: key,
      config: userState[key]
    })
  }
  
  let userForm = (
    <form onSubmit={submitHandler}>
      <h1>Public profile</h1>
      <p>Add information about yourself</p>
      {userElements.map(el => {
        return (
        <Input key={el.id} config={el.config.elementConfig} name={el.id} value={el.config.value} changed={event => inputChangeHandler(event, el.id)}/>
        )
      })}
      <button>Save</button>
      
    </form>
  )
  console.log(userState);
  return (
    <div className={classes.form}>
      {userForm}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetMe: () => {
      dispatch(actions.getMe());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);