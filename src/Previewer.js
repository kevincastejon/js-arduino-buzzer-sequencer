import React from 'react';
import NoteMap from './NoteMap';
import SignalGenerator from './SignalGenerator';

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.timer=null;
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
      this.timer=setInterval(() => {
        SignalGenerator.playFrequency(NoteMap[this.props.notes[tem].note],60/this.props.tempo*1000/4);
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
    SignalGenerator.stop();
    }
  }
}
export default Previewer
