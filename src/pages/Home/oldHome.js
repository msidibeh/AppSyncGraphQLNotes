import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteService from "../../services/NoteService/NoteService";

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      sessions: []
    };

    this.noteService = new NoteService();
  }

  componentDidMount(){
    console.log('Home Page');
    this.noteService.getAllUsers().then(response => {
      this.setState({ sessions: response});
    })
  }

  renderUsers = () => {
    return this.state.sessions.map((user, key) => {
      return (
        <li key={key}>
          <Link className='link' to={`/session/${user.id}`}>{user.name}</Link>
        </li>
      );
    });
  };

  render(){
    return(
      <div>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }

}

export default Home;
