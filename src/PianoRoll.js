import React from 'react';
import NoteMap from './NoteMap';
import SignalGenerator from './SignalGenerator';
class PianoRoll extends React.Component {

  render() {
    let jsx=[];
    for (let i = 0; i < NoteMap.notesMap.length+1; i++) {
      let children=[];
      for (let j = 0; j < this.props.notes.length; j++) {
        if(i===0){
          children.push(<div id={"header_"+j} key={"header_"+j} className="headerNote">{j}</div>);
        } else {
          let classes="note ";
          if(NoteMap.notesNames[i-1]===this.props.notes[j].note){
            classes+="checked ";
            if(this.props.notes[j].linkedToNext)
            classes+="linked";
          }
          children.push(<div id={NoteMap.notesNames[i-1]+"_"+j} key={NoteMap.notesNames[i-1]+"_"+j} className={classes} onClick={this.onNoteClick}></div>);
        }
      }
      if(i===0){
        jsx.push(<div key={"headerLineCont"} className="lineCont"><label key={"label_header"} className="noteLabel"></label><div id="header_line" key="header_line" className="line">{children}</div></div>);
      } else {
        jsx.push(<div key={"contcont_"+i}><div key={"lineCont_"+i} className="lineCont"><label id={NoteMap.notesNames[i-1]} onMouseDown={this.onHeaderNoteDown} onMouseUp={this.onHeaderNoteUp} key={"label_"+i} className="noteLabel">{NoteMap.notesNames[i-1]}</label><div id={NoteMap.notesNames[i-1]+"_line"} key={NoteMap.notesNames[i-1]+"_line"} className="line">{children}</div></div></div>);
      }
    }
    return (
      <div id="pianoRoll">
        {jsx}
      </div>
    );
  }
  onNoteClick=(e)=>{
    this.props.onNoteChange(e.target.id);
  }
  onHeaderNoteDown=(e)=>{
    console.log(e.target.id);
    SignalGenerator.playFrequency(NoteMap[e.target.id],5000);
  }
  onHeaderNoteUp=(e)=>{
    console.log(e.target.id);
    SignalGenerator.stop();
  }

}
export default PianoRoll
