import React, {useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import * as actions from './store/actions/index';

function App(props) {
  const checkAuth = () => props.onAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div style={{backgroundColor: '#EAE7DC', paddingBottom:'13vh', position: 'relative', minHeight: '87vh'}}>
        <Header/>
        <Body/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: () => {
      dispatch(actions.isAuth());
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
