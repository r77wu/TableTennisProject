import React from 'react';
import classes from './InputForm.module.css';

const inputForm  = (props) => {
  const name = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  return (
    <div>
      <label>{name}</label>
      <input {...props.config} value={props.value} onChange={props.changed}/>
    </div>
  )
}

export default inputForm;