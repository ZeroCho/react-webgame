import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import TicTacToe from './TicTacToe';

const Hot = hot(TicTacToe);

ReactDOM.render(<Hot />, document.querySelector('#root'));
