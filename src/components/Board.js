import React from 'react';
import Square from './Square';

import './Board.css';

class Board extends React.Component {
  static handleClick() {
    // alert(`Square ${i}`);
  }

  constructor(props) {
    super(props);

    this.state = {
      squares: Array(100).fill(''),
      title: 'Titulo',
    };
  }

  createTable() {
    const table = [];

    for (let i = 0; i < 10; i += 1) {
      const children = [];

      for (let j = 0; j < 10; j += 1) {
        const index = (i * 10) + j;
        children.push(this.renderSquare(index));
      }

      table.push(<div key={i} className="board-row">{children}</div>);
    }
    return table;
  }

  renderSquare(i) {
    const { squares } = this.state;

    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => Board.handleClick(i)}
      />
    );
  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <div className="status">{ title }</div>
        {this.createTable()}
      </div>
    );
  }
}

export default Board;
