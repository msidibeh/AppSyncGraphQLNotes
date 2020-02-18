import React, { useEffect, useState } from "react";
import NoteService from "../../services/NoteService/NoteService";


class SessionPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      session: []
    };

    this.noteService = new NoteService();
  }

  componentDidMount(){
    console.log('Session Page');
    console.log(this.props.match.params.number);

    const id = this.props.match.params.id;

    this.noteService.getUser(id).then(response => {
      this.setState({ session: response });
    });
  }

  render(){
    const user = this.state.session;
    return(
      <div>
        <h2>Name: {user.name}</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
      </div>
    );
  }

}

export default SessionPage;
