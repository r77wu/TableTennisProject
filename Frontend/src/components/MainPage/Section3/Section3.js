import React from  'react';
import Aux from '../../../hoc/Auxiliary';
import classes from './Section3.module.css';
import customer1 from '../../../assets/images/customer-1.jpg';
import customer2 from '../../../assets/images/customer-2.jpg';

const section3 = (props) => {

  return (
    <Aux>
      <div className={classes.title}>
          <h1>Our customers' reviews</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.review}>
          <blockquote>
            " My TT App is just awesome! It is easy to make local friends and set up schedule to meet and play. I play with friends every weekend, learn new skills and improve my game a lot. "
          </blockquote>
          <cite><img src={customer1} alt="customer1"/>Alberto Duncan</cite>
        </div>
        <div className={classes.review}>
          <blockquote>
            " Great app for people who are interested in table tennis. Get the latest news about table tennis everyday. I love to talk with people in the My TT App coummity and has learned a lot from them. "
          </blockquote>
          <cite><img src={customer2} alt="customer2"/>Milton Chapman</cite>
        </div>
      </div>
    </Aux>
  );
}

export default section3;