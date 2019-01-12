import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Note from './Note';
import Main from './Main';

let notes=[];
for (let i = 0; i < 16; i++) {
  notes[i]=new Note();
}
ReactDOM.render( < Main tempo="90" notes={notes} tool="link" pin="2"/ > ,
  document.getElementById('root')
);
