import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import Lotto from './Lotto.jsx';

const Hot = hot(Lotto);

ReactDOM.render(<Hot />, document.querySelector('#root'));
