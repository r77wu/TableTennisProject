import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
//import Aux from './hoc/Auxiliary';
import Header from './components/Header/Header';
import Body from './components/Body/Body';

function App() {
  return (
    <BrowserRouter>
      <div style={{backgroundColor: '#EAE7DC'}}>
        <Header/>
        <Body/>
      </div>
    </BrowserRouter>
  );
}

export default App;
