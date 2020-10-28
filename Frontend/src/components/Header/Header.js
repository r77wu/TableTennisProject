import React from 'react';
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import classes from './Header.module.css';

const header = (props) => {
  return (
    <header className={classes.container}>
      <Logo />
      <Nav />
    </header>
  );
}

export default header;