import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import GameContainer from '../containers/GameContainer';
import GameOverContainer from '../containers/GameOverContainer';

import './App.css';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/game" component={GameContainer} />
        <Route path="/gameOver" component={GameOverContainer} />
      </Switch>
    </HashRouter>
  );
}

export default App;
