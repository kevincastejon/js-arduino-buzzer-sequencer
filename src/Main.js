// TODO
// -systeme de lecture

import React from 'react';
import NumericSelector from './NumericSelector';
import PianoRoll from './PianoRoll';
import Note from './Note';
import ToolSelector from './ToolSelector';
import Button from 'react-bootstrap/lib/Button';
import Previewer from './Previewer';
import ArduinoCodeHolder from './ArduinoCodeHolder';
import NoteMap from './NoteMap';
import Cloner from './Cloner';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.savables = ["notes", "pin", "tempo"];
    this.state = {
      tempo: props.tempo,
      tool: "link",
      notes: props.notes,
      pin: props.pin,
      history: [
        {
          tempo: props.tempo,
          notes: props.notes,
          pin: props.pin
        }
      ],
      currentHistory: 0
    };
  }
  render() {
    return (<div id="realMainCont">
      <h2>Arduino buzzer melody sequencer</h2>
      <br/>
      <Button disabled={this.state.currentHistory === 0} type="button" onClick={this.onUndo}>Undo</Button>
      <Button disabled={this.state.currentHistory === this.state.history.length - 1} type="button" onClick={this.onRedo}>Redo</Button>
      <br/><br/>

      <ToolSelector onToolChange={this.onToolChange} tool={this.state.tool}/>
      <br/>
      <Button disabled={!this.isPitchDownAllowed()} id="pitchDown" onClick={this.onPitchChange}> - </Button>
      <label> pitch </label>
      <Button disabled={!this.isPitchUpAllowed()} id="pitchUp" onClick={this.onPitchChange}> + </Button>
      <NumericSelector className="pianoNumSel" number={this.state.notes.length} labelRight="beats" onChange={this.onDurationChange}/>
      <div id="mainCont">
        <PianoRoll notes={this.state.notes} duration={this.state.notes.length} tool={this.state.tool} onNoteChange={this.onNoteChange}/>
      </div>
      <NumericSelector className="pianoNumSel" number={this.state.tempo} labelRight="BPM" onChange={this.onTempoChange}/>
      <Previewer className="pianoNumSel" notes={this.state.notes} tempo={this.state.tempo}/>
      <br/>

      <br/>
      <label>Arduino sketch (copy or paste to save or load) :</label>
      <NumericSelector number={this.state.pin} labelLeft="Arduino pin" onChange={this.onPinChange}/><ArduinoCodeHolder tempo={this.state.tempo} tool={this.state.tool} notes={this.state.notes} pin={this.state.pin} onCodeChange={this.onCodeChange}/>
      <div id="footer">Developped by <a target="blank" href="http://www.kevincastejon.fr/">Kevin Castejon (LePioo)</a>. <a href="https://github.com/lePioo/ArduinoBuzzerSequencer">Github sources</a>. Powered by Reactjs and Tonejs.</div>
    </div>);
  }
  onUndo = (e) => {
    this.setState((prev) => {
      let prevState = Cloner.clone(prev.history[prev.currentHistory - 1]);
      prevState.currentHistory = prev.currentHistory - 1;
      return (prevState);
    });
  }
  onRedo = (e) => {
    this.setState((prev) => {
      let nextState = Cloner.clone( prev.history[prev.currentHistory + 1]);
      nextState.currentHistory = prev.currentHistory + 1;
      return (nextState);
    });
  }
  isPitchDownAllowed(){
    let notEmpty=false;
    let notAtEdge=true;
    this.state.notes.forEach((elt,i) => {
      if(elt.note!=0){
        notEmpty=true;
      }
      if(elt.note==NoteMap.notesMap[0]){
        notAtEdge=false;
      }
    })

    return (notEmpty && notAtEdge);
  }
  isPitchUpAllowed(){
    let notEmpty=false;
    let notAtEdge=true;
    this.state.notes.forEach((elt,i) => {
      if(elt.note!=0){
        notEmpty=true;
      }
      if(elt.note==NoteMap.notesMap[NoteMap.notesMap.length-1]){
        notAtEdge=false;
      }
    })

    return (notEmpty && notAtEdge);
  }
  setAndSaveState(state) {
    let isSavable = false;
    let same = false;
    let ks = Object.keys(state);
    for (let i = 0; i < ks.length; i++) {
      if (this.savables.includes(ks[i])) {
        isSavable = true;
        if (ks[i] === "notes") {
          if (state.notes.length === this.state.notes.length) {
            same = state.notes.every((elt, index, array) => {
              return (elt.note === this.state.notes[index].note && elt.linkedToNext === this.state.notes[index].linkedToNext);
            });
          }
        } else {
          same = (state[ks[i]] === this.state[ks[i]]);
        }
      }
    }
    if (!same && isSavable) {
      let newHisto = this.state.history.concat();
      let savedStates=Cloner.clone( state);
      for(let i=0;i<this.savables.length;i++){
        if(!savedStates.hasOwnProperty(this.savables[i])){
          savedStates[this.savables[i]]=Cloner.clone(this.state[this.savables[i]]);
        }
      }
      newHisto.splice(this.state.currentHistory + 1);
      newHisto.push(savedStates);
      state.history = newHisto;
      state.currentHistory = this.state.currentHistory + 1;
    }
    this.setState(state);
  }
  onPitchChange = (e) => {
    let newNotes=Cloner.clone(this.state.notes);
    let op=e.target.id==="pitchDown"?-1:1;
    newNotes=newNotes.map((elt,i) => {
      let note=0;
      if(elt.note>0){
        note=NoteMap.notesMap[NoteMap.notesMap.indexOf(elt.note)+op];
      }
      return(new Note(note,elt.linkedToNext))
    });
    this.setAndSaveState({notes: newNotes});
  }
  onTempoChange = (newTempo) => {
    this.setAndSaveState({tempo: newTempo});
  }
  onCodeChange = (newState) => {
    this.setAndSaveState({tempo: newState.tempo, notes: newState.notes, pin: newState.pin, tool: newState.tool});
  }
  onDurationChange = (newDuration) => {
    let ar = [];
    for (let i = 0; i < newDuration; i++) {
      if (this.state.notes.length > i) {
        ar[i] = this.state.notes[i];
      } else {
        ar[i] = new Note();
      }
    }
    this.setAndSaveState({notes: ar});
  }
  onToolChange = (newTool) => {
    this.setState({tool: newTool});
  }
  onPinChange = (newPin) => {
    this.setAndSaveState({pin: newPin});
  }
  onNoteChange = (newNotes) => {
    this.setAndSaveState({notes: newNotes});
  }
}
export default Main
