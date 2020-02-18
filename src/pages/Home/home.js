import React, { Component } from 'react';
import ListItems from '../SessionPage/listItems'
import AppNavBar from '../SessionPage/appNavBar'
import GetAllSessions from '../../components/Session/GetAllSessions'

class Home extends Component {
  render() {
    return (
     <div>
      <AppNavBar />
      <GetAllSessions />
    </div>
    );
  }
}

export default Home;
