import React from 'react';
import './App.css';
import Home from './layout/private/components/Home';
import NewPoll from './layout/private/components/NewPoll';
import LoginForm from './layout/public/components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Redirect, Route, Link } from "react-router-dom";
import Order from './layout/private/components/Order';
import Profile from './layout/private/components/Profile';



function App() {
  return (
    <div>
      <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={LoginForm}></Route>      
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/order" component={Order}></Route>
              <Route exact path="/newpoll" component={NewPoll}></Route>
              <Route exact path="/profile" component={Profile}></Route>
              <Redirect from="/" to="/login" />      
            </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
