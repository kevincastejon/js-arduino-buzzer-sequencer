import React from 'react';
import BPM from './BPM';
import DurationSelector from './DurationSelector';
import PianoRoll from './PianoRoll';
import Note from './Note';
import ToolSelector from './ToolSelector';
import NoteMap from './NoteMap';
import Previewer from './Previewer';
import PinSelector from './PinSelector';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo:props.tempo,
      tool:props.tool,
      notes:props.notes,
      pin:props.pin
    };
  }
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
    "#define buzzerPin 2\n"+
    "int tempo = "+this.state.tempo+";\n";
    let melod="int melody[] = {";
    let links="int noteLinks[] = {";
    for (let i = 0; i < this.state.notes.length; i++) {
      if(this.state.notes[i].note==="0")
        melod+="0,";
      else
        melod+=NoteMap[this.state.notes[i].note]+",";
      links+=this.state.notes[i].linkedToNext+",";
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
    "int size = sizeof(melody) / sizeof(int);"+
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
    "}\n";
    return (
      <div id="realMainCont">
      <BPM tempo={this.state.tempo} onTempoChange={this.onTempoChange}/>
      <PinSelector pin={this.state.pin} onPinChange={this.onPinChange}/>
      <DurationSelector duration={this.state.notes.length} onDurationChange={this.onDurationChange}/>
      <ToolSelector onToolChange={this.onToolChange} tool={this.state.tool}/>
      <div id="mainCont">
      <PianoRoll notes={this.state.notes} duration={this.state.notes.length} onNoteChange={this.onNoteChange} />
      </div>
      <Previewer notes={this.state.notes} tempo={this.state.tempo}/>
      <label>Arduino code : (copy this sketch on your Arduino)</label><br/>
      <textarea value={arduinoCode}></textarea><br/>
      <label>JSON code : (copy or paste into this area for saving or loading)</label><br/>
      <textarea onChange={this.onJSONChange} value={JSON.stringify({notes:this.state.notes,tempo:this.state.tempo,tool:this.state.tool,pin:this.state.pin})}></textarea>
      </div>
    );
  }
  onTempoChange=(newTempo)=>{
    console.log(newTempo);
    this.setState({tempo:newTempo});
  }
  onDurationChange=(newDuration)=>{
    console.log(newDuration);
    let ar=[];
    for (let i = 0; i < newDuration; i++) {
      if(this.state.notes.length>i){
        ar[i]=this.state.notes[i];
      } else {
        ar[i]=new Note();
      }
    }
    this.setState({notes:ar});
  }
  onToolChange=(newTool)=>{
    this.setState({tool:newTool});
  }
  onJSONChange=(e)=>{
    let json=JSON.parse(e.target.value);
    this.setState({tempo:json.tempo,notes:json.notes,pin:json.pin,tool:json.tool});
  }
  onNoteChange=(noteID)=>{
    let noteAr=noteID.split("_");
    let noteName=noteAr[0];
    let notePosition=noteAr[1];
    let ar=this.state.notes.concat();
    if(this.state.tool==="link"){
      ar[notePosition]=new Note(noteName,1);
    } else if(this.state.tool==="unlink"){
      ar[notePosition]=new Note(noteName,0);
    } else if(this.state.tool==="erase"){
      ar[notePosition]=new Note();
    }
    this.setState({notes:ar});
  }
}
export default Main
