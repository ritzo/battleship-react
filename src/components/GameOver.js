import React from 'react';
import { Link } from 'react-router-dom';

import './GameOver.css';

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>GameOver</h1>
        <Link to="/">Play again</Link>
      </div>
    );
  }
}

export default GameOver;
