import React from 'react';
import NoteMap from './NoteMap';
import * as Tone from 'tone';

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.timer=null;
    this.oscillator = new Tone.Oscillator({
      "type" : "sine",
      "frequency" : 440,
      "volume" : -16
    }).toMaster();
  }
  render() {
    return (
      <div id="previewer">
        <button type="button" id="previewBtn" onClick={this.onPreview}>Preview</button>
        <button type="button" id="stopBtn" onClick={this.onStop}>Stop</button>
      </div>
    );
  }
  onPreview=(e)=>{
    if(this.timer==null){
      let tem=0;
      let lastNoteLink=true;
      this.timer=setInterval(() => {

        if(!lastNoteLink || this.props.notes[tem].note==0){
          this.oscillator.stop();
        }
        lastNoteLink=true;
        if(this.props.notes[tem].note!=0){
          this.oscillator.frequency.value=this.props.notes[tem].note;
          this.oscillator.start();
          lastNoteLink=this.props.notes[tem].linkedToNext;
        }
        tem++;
        if(tem===this.props.notes.length)
        tem=0;
      },60/this.props.tempo*1000/4);
    }
  }
  onStop=(e)=>{
    if(this.timer!=null){
    clearInterval(this.timer);
    this.timer=null;
    this.oscillator.stop();
    }
  }
}
export default Previewer
