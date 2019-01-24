import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Note from './Note';
import Main from './Main';
import MatrixSelector from './MatrixSelector';

let notes=[];
for (let i = 0; i < 16; i++) {
  notes[i]=new Note();
}
// let styles = [];
// for (let i = 0; i < 10; i++) {
//   let styline = [];
//   for (let j = 0; j < 10; j++) {
//     styline[j] = {
//       backgroundColor: "yellow"
//     };
//   }
//   styles.push(styline);
// }

// ReactDOM.render( < MatrixSelector onSelection={(selectedTiles, matrix)=>{console.log(selectedTiles, matrix)}} idleStyle = { styles } / > ,
ReactDOM.render( < Main tempo="90" notes={notes} pin="2" /> ,
  document.getElementById('root')
);
