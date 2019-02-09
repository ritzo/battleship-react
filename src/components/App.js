import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import GameOver from './GameOver';

import './App.css';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/gameOver" component={GameOver} />
      </Switch>
    </HashRouter>
  );
}

export default App;
