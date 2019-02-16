import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomeContainer from '../home/HomeContainer';
import GameContainer from '../game/GameContainer';
import GameOverContainer from '../gameOver/GameOverContainer';

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
