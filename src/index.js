import React from 'react';
import ReactDOM from 'react-dom';
import * as Screens from './screens';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path= '/' component = {Screens.Home} />
      <Route exact path= '/profile' component = {Screens.Profile} />
      <Route exact path= '/profile/:post' component = {Screens.Post} />
    </Switch>
  </Router>

), document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
