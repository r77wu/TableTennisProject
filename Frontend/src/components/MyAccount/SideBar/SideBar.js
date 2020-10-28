import React from 'react';
import classes from './SideBar.module.css';

const sideBar = (props) => {

  return (
    <div className={classes.sidebar}>
      <a>Personal Info</a>
      <a>Security</a>
    </div>     
  );
}

export default sideBar;