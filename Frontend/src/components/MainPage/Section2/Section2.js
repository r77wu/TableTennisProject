import React from  'react';
import {FaUserFriends, FaRegNewspaper} from 'react-icons/fa';
import {GiPingPongBat} from 'react-icons/gi';
import classes from './Section2.module.css';

const section2 = (props) => {
  return (
    <div className={classes.container} id='section2'>
      <div className={classes.infobox}>
        <h3><FaUserFriends className={classes.icon}/>Make New Friends</h3>
        <p>
          Table tennis is not only yourself. Meet your Local friends and friends around the world. Find your local table tennis club and set up your meeting schedule!
        </p>
      </div>
      <div className={classes.infobox}>
        <h3><GiPingPongBat className={classes.icon}/>Improve Your Skills</h3>
        <p>
          Learn the morden table tennis skills from the top players around the world. Share your ideas with friend all around the world.
        </p>
      </div>
      <div className={classes.infobox}>
        <h3><FaRegNewspaper className={classes.icon}/>Get Latest News</h3>
        <p>
          Watch and discuss table tennis tournaments online. Get the latest update on equiments and players.
        </p>
      </div>
    </div>
  );
}

export default section2;