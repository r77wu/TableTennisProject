import React from 'react';
import axios from 'axios';
import styles from './DataTable.module.css';

const DataTable = (props) => {
  const data = props.data;
  
  const friends = Object.keys(props.data[0]).filter(key => key !== '_id');
  const colums = friends.map(el => {
    return el.charAt(0).toUpperCase() + el.slice(1);
  })
  colums.push('Add friend');

  const addFriendHandler = (event, index) => {
    event.preventDefault();
    const newFriend = data[index]._id;
    console.log(typeof newFriend);
    axios.patch('/api/v1/users/addFriends', {friends: newFriend}).then(response => {
      console.log(response);
    }).catch (error => {
      console.log(error);
    })
    console.log(newFriend)
  }

  return (
    <div>
      <h1>Results</h1>
      <table className={styles.table}>
        <thead className={styles.colum}>
          <tr>{colums.map((heading, index) => <th key={index}>{heading}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, index) => <tr key={index}>
            {
              friends.map((colums,index) => <td key={index}>{row[colums]}</td>)
            }
            <td className={styles.addFriend} onClick={event => addFriendHandler(event,index)}>add</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    
  )
} 

export default DataTable;