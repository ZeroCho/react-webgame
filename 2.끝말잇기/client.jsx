const React = require('react');
const ReactDom = require('react-dom/client');

const WordRelay = require('./WordRelay');

ReactDom.createRoot(document.querySelector('#root')).render(<WordRelay />);
