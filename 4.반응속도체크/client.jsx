import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import ResponseCheck from './ResponseCheck.jsx';

const Hot = hot(ResponseCheck);

ReactDOM.render(<Hot />, document.querySelector('#root'));
