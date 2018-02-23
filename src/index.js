import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Draggable from './draggable/Draggable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Draggable />, document.getElementById('root'));
registerServiceWorker();
