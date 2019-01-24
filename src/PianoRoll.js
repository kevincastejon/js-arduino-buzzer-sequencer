import React from 'react';
import NoteMap from './NoteMap';
import Note from './Note';
import Cloner from './Cloner';
import MatrixSelector from './MatrixSelector';
import ResizeObserver from 'react-resize-observer';
import './PianoRoll.css';
import * as Tone from 'tone';

class PianoRoll extends React.Component {
  constructor(props){
    super(props);
    this.oscillator = new Tone.Oscillator({
      "type" : "sine",
      "frequency" : 440,
      "volume" : -16
    }).toMaster();
    this.measureHeadersRef = React.createRef();
    this.noteHeadersRef = React.createRef();
    this.matrixContRef = React.createRef();
  }
  render() {
    return (
      <div id="pianoRoll">
        <div id="measureHeadersCont">
          <div id="measureHeaders" onWheel={(e) => { e.preventDefault(); }} ref={this.measureHeadersRef} onScroll={this.onNoteHeadersScroll}>{this.props.notes.map((elt,i) => {return(<div key={"measure_"+i} className="measureHeader">{i}</div>)})}</div>
        </div>
        <div id="botCont">
          <div id="noteHeadersCont">
            <div id="noteHeaders" onWheel={(e) => { e.preventDefault(); }} ref={this.noteHeadersRef} onScroll={this.onMeasureHeadersScroll}>{NoteMap.notesNames.concat().map((elt,i) => {return(<div onMouseDown={this.onHeaderNoteDown} onMouseUp={this.onHeaderNoteUp} key={"note_"+i} id={"note_"+i} className="noteHeader">{elt}</div>)})}</div>
          </div>
          <div id="matrixCont" ref={this.matrixContRef} onScroll={this.onMatrixScroll}>
            <MatrixSelector numCol={this.props.notes.length} leftHeaders={NoteMap.notesNames.concat()} topHeaders={Array.apply(null, Array(this.props.notes.length)).map((x, i) => { return i })} numLine={NoteMap.notesNames.length} onSelection={this.onTileSelection} idleStyle={this.getStyleMatrix()} disableSelectAcrossLine={this.props.tool!=="erase"} />
            </div>
        </div>
      </div>
    );
  }
  getStyleMatrix(){
    let matrix=[];
    for (let i = 0; i < NoteMap.notesNames.length; i++) {
      let line=[];
        for (let j = 0; j < this.props.notes.length; j++) {
          if(this.props.notes[j].note===NoteMap.notesMap[i]){
            if (this.props.notes[j].linkedToNext) {
              line.push({backgroundColor:"rgb(88, 133, 222)",borderRight:0});
            } else {
              line.push({backgroundColor:"rgb(88, 133, 222)"});
            }
          } else {
            line.push({backgroundColor:"rgb(255, 255, 255)"});
          }
        }
      matrix.push(line);
    }
    return(matrix)
  }
  onMatrixScroll=(e)=>{
    this.noteHeadersRef.current.scrollTo(0,e.target.scrollTop);
    this.measureHeadersRef.current.scrollTo(e.target.scrollLeft,0);
  }
  onTileSelection=(selectedTiles, matrix)=>{
    let newNotes=Cloner.clone(this.props.notes);
    if(this.props.tool==="erase"){
      selectedTiles.forEach((elt,i) => {
        if(newNotes[elt.col].note===NoteMap.notesMap[elt.line]){
          newNotes[elt.col]=new Note();
        }
      });
    } else {
      selectedTiles.forEach((elt,i) => {
        newNotes[elt.col]=new Note(NoteMap.notesMap[elt.line], this.props.tool==="link");
      });
    }
    this.props.onNoteChange(newNotes);
  }
  onNoteClick=(e)=>{
    this.props.onNoteChange(e.target.id);
  }
  onHeaderNoteDown=(e)=>{
    this.oscillator.frequency.value=NoteMap.notesMap[e.target.id.split("_")[1]];
    this.oscillator.start();
  }
  onHeaderNoteUp=(e)=>{
    console.log(e.target.id.split("_")[1]);
    this.oscillator.stop();
  }

}
export default PianoRoll
