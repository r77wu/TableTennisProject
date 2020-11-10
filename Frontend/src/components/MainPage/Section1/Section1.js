import React from  'react';
import classes from './Section1.module.css';
import {Link} from 'react-scroll';

const section1 = (props) => {
  return (
    <div className={classes.container}>
      <h1>Table Tennis Is Fun!<br/> My TT App makes your table tennis more than fun!</h1>
      <Link className={classes.but} to='section2' smooth={true} duration={1000}>Learn More</Link>
    </div>
  );
}

export default section1;