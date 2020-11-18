import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import classes from './Friends.module.css';
import Aux from '../../hoc/Auxiliary';
import DataTable from './DataTable/DataTable';

const Friends = (props) => {
  const [searchCity, setSearchCity] = useState('');

  const [localPlayers, setLocalPlayers] = useState([]);

  const InputChangeHandler = (event) => {
    event.preventDefault();
    const city = event.target.value
    setSearchCity(city);
  }

  const SubmitHandler = (event) => {
    event.preventDefault();
    const city = searchCity.charAt(0).toUpperCase() + searchCity.slice(1);
    axios.get(`/api/v1/users/search?city=${city}`).then(response => response.data.data).then(users => {
      const result = users.filter(user => user._id !== props.userId);
      setLocalPlayers(result);
    })
  }
  
  const localFriendHandler = () => {
    axios.get(`/api/v1/users/search?city=${props.userCity}`).then(response => response.data.data).then(users => {
      const result = users.filter(user => user._id !== props.userId);
      setLocalPlayers(result);
    })
  }

  
  return (
    <Aux>
      <div className={classes.title}>
        <h1>Find Your Table Tennis Partners</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.friendsList}>
          <p> your friend list</p>
        </div>
        <div className={classes.searchFriends}>
          <form className={classes.form} onSubmit={SubmitHandler}>
            <input type='text' placeholder='Please enter a city name' value={searchCity} onChange={InputChangeHandler}/>
            <button>Meet players</button>
          </form>
          <p>or</p>
          <button onClick={localFriendHandler}>Find local players</button>
          
          
          <div>
            {localPlayers.length !== 0 ? <DataTable data={localPlayers}/> : null}
          </div>
        </div>
      </div>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user._id,
    userCity: state.auth.user.city
  }
}

export default connect(mapStateToProps)(Friends);