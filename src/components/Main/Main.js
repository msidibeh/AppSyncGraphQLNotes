import React, { useEffect, useState } from "react";
import {Switch, Route} from "react-router-dom";
import Home from "../../pages/Home/Home";
import SessionPage from "../../pages/SessionPage/SessionPage";

import './Main.css';

function Main() {
  return(
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/session/:id" component={SessionPage} />
      </Switch>
    </main>
  );
}

export default Main;
