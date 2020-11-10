import React from 'react';
import {FaFacebook, FaTwitter, FaInstagram, FaGoogle} from 'react-icons/fa';
import classes from './Footer.module.css';

const footer = () => {
  return (
    <footer className={classes.footer}>
			<div className={classes.container}>
				<div >
					<ul >
						<li><a href="#">About us</a></li>
						<li><a href="#">Blog</a></li>
						<li><a href="#">Press</a></li>
						<li><a href="#">Android App</a></li>
						<li><a href="#">IOS App</a></li>
					</ul>
				</div>
				<div >
					<ul >
						<li><a href="#"><FaFacebook/></a></li>
						<li><a href="#"><FaTwitter/></a></li>
						<li><a href="#"><FaInstagram/></a></li>
						<li><a href="#"><FaGoogle/></a></li>
					</ul>
				</div>
			</div>
      <div style={{float: "left", paddingLeft: '50px'}}>
        <p>
          Copyright 2020 by MyTTAPP. All rights reserved.
        </p>
			</div>
		</footer>
  )
}

export default footer;