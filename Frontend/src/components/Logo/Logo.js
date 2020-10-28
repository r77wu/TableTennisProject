import React from 'react';
import logoImg from '../../assets/images/logo.jpg';

const logo = () => {
  return (
    <img src={logoImg} alt="logo" style={{width: '72px',
      height: '46px'}}/>
  );
}

export default logo;