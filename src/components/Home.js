import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/game">Play</Link>
      </div>
    );
  }
}

export default Home;
