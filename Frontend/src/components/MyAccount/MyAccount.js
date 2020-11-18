import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {BsFillPersonFill, BsFillShieldFill} from 'react-icons/bs';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import Security from './Security/Security';
import classes from './MyAccount.module.css';


const myAccount = (props) => {

  // const ProtectRoute = ({isLogged, component: Component, ...rest}) => (
  //   <Route {...rest} component={(props) => (
  //     isLogged === true ? <Component {...props} /> : <Redirect to='/login'/>
  //   )}/>
  // )

  console.log(props.isLogged);
  return (
    <div className={classes.myAccount}>
      <div className={classes.sidebar}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
          <Link to='/myaccount/profile'><BsFillPersonFill className={classes.icon}/>Personal Info</Link>
          </li>
          <li>
          <Link to='/myaccount/security'><BsFillShieldFill className={classes.icon}/>Security</Link>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <Switch>
          <Route path='/myaccount/security'  exact component={Security}/>
          <Route path='/myaccount/profile' exact component={PersonalInfo}/>
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLogged: state.auth.user._id !== null
  }
}

export default connect(mapStateToProps)(myAccount);