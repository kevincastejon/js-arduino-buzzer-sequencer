import React from 'react';
import NoteMap from './NoteMap';
class ArduinoCodeHolder extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    let arduinoCode=
    "#define NOTE_F4  349\n"+
    "#define NOTE_FS4 370\n"+
    "#define NOTE_G4  392\n"+
    "#define NOTE_GS4 415\n"+
    "#define NOTE_A4  440\n"+
    "#define NOTE_AS4 466\n"+
    "#define NOTE_B4  494\n"+
    "#define NOTE_C5  523\n"+
    "#define NOTE_CS5 554\n"+
    "#define NOTE_D5  587\n"+
    "#define NOTE_DS5 622\n"+
    "#define NOTE_E5  659\n"+
    "#define NOTE_F5  698\n"+
    "#define NOTE_FS5 740\n"+
    "#define NOTE_G5  784\n"+
    "#define NOTE_GS5 831\n"+
    "#define NOTE_A5  880\n"+
    "#define NOTE_AS5 932\n"+
    "#define NOTE_B5  988\n"+
    "#define NOTE_C6  1047\n"+
    "#define NOTE_CS6 1109\n"+
    "#define NOTE_D6  1175\n"+
    "#define NOTE_DS6 1245\n"+
    "#define NOTE_E6  1319\n"+
    "#define NOTE_F6  1397\n"+
    "#define NOTE_FS6 1480\n"+
    "#define NOTE_G6  1568\n"+
    "#define NOTE_GS6 1661\n"+
    "#define NOTE_A6  1760\n"+
    "#define NOTE_AS6 1865\n"+
    "#define NOTE_B6  1976\n"+
    "#define NOTE_C7  2093\n"+
    "#define NOTE_CS7 2217\n"+
    "#define NOTE_D7  2349\n"+
    "#define NOTE_DS7 2489\n"+
    "#define NOTE_E7  2637\n"+
    "#define NOTE_F7  2794\n"+
    "#define NOTE_FS7 2960\n"+
    "#define NOTE_G7  3136\n"+
    "#define NOTE_GS7 3322\n"+
    "#define NOTE_A7  3520\n"+
    "#define NOTE_AS7 3729\n"+
    "#define NOTE_B7  3951\n"+
    "#define NOTE_C8  4186\n"+
    "#define NOTE_CS8 4435\n"+
    "#define NOTE_D8  4699\n"+
    "#define NOTE_DS8 4978\n"+
    "#define buzzerPin "+this.props.pin+"\n"+
    "int tempo = "+this.props.tempo+";\n";
    let melod="int melody[] = {";
    let links="int noteLinks[] = {";
    for (let i = 0; i < this.props.notes.length; i++) {
      if(this.props.notes[i].note==="0")
        melod+="0,";
      else
        melod+=NoteMap[this.props.notes[i].note]+",";
      links+=this.props.notes[i].linkedToNext+",";
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
