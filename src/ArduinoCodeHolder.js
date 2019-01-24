import React from 'react';
import NoteMap from './NoteMap';
class ArduinoCodeHolder extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    let arduinoCode=
    "#define buzzerPin "+this.props.pin+"\n"+
    "int tempo = "+this.props.tempo+";\n";
    let melod="int melody[] = {";
    let links="int noteLinks[] = {";
    for (let i = 0; i < this.props.notes.length; i++) {
      if(this.props.notes[i].note==="0")
        melod+="0,";
      else
        melod+=this.props.notes[i].note+",";
      links+=(this.props.notes[i].linkedToNext?1:0)+",";
    }
    melod=melod.substring(0,melod.length-1)+"};\n";
    links=links.substring(0,links.length-1)+"};\n";
    arduinoCode+=melod;
    arduinoCode+=links;
    arduinoCode=arduinoCode+
    "void setup() {\n"+
    "pinMode(buzzerPin, OUTPUT);\n"+
    "}\n"+
    "void loop() {\n"+
    "int size = sizeof(melody) / sizeof(int);\n"+
    "for (int thisNote = 0; thisNote < size; thisNote++) {\n"+
    "if(melody[thisNote]>0){\n"+
    "tone(buzzerPin, melody[thisNote]);\n"+
    "} else {\n"+
    "noTone(buzzerPin);\n"+
    "}\n"+
    "delay(60.0/tempo*1000/4);\n"+
    "if(noteLinks[thisNote]==0){\n"+
    "noTone(buzzerPin);\n"+
    "}\n"+
    "}\n"+
    "}\n"+
    "//ArduinoComposerJSONMarkupBegin"+JSON.stringify(this.props)+"//ArduinoComposerJSONMarkupEnd";

    return (
      <div id="arduinoCodeHolder">
      <textarea onChange={this.onCodeChange} id="arduinoCode" value={arduinoCode}></textarea><br/>
      </div>
    );
  }
  onCodeChange=(e)=>{
    let str=e.target.value;
    let indStart=str.indexOf("//ArduinoComposerJSONMarkupBegin")+"//ArduinoComposerJSONMarkupBegin".length;
    let indEnd=str.indexOf("//ArduinoComposerJSONMarkupEnd");
    this.props.onCodeChange(JSON.parse(str.substring(indStart,indEnd)));
  }
}
export default ArduinoCodeHolder
