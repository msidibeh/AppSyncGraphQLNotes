import React, { useEffect, useState } from "react";
import { Hub } from "@aws-amplify/core";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Amplify from "@aws-amplify/core";
import { withAuthenticator } from "aws-amplify-react";
import aws_exports from "./aws-exports";
import { Auth } from 'aws-amplify';
import Dashboard from './pages/Home/Dashboard'
// specify the location of aws-exports.js file on your project


Amplify.configure(aws_exports);
function loadUser(setUser) {
  Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => setUser(user.username))
  .catch(err => console.log(err));
}

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    loadUser(setUser);
  }, []);

  return (
      <Dashboard userName={user}/>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
