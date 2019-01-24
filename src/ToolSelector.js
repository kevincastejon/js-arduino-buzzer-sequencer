import React from 'react';
import './ToolSelector.css';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
class ToolSelector extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div id="toolSelector">
      <RadioGroup onChange={ this.onToolChange } horizontal className="radioTool">
        <RadioButton value="link" checked={this.props.tool==="link"}>
          <span title="Will play the next note without any interuption (on your Arduino)"><img src="link.png" alt=""/> Link</span>
        </RadioButton>
        <RadioButton value="unlink" checked={this.props.tool==="unlink"}>
          <span title="Will make a brief interuption before playing the next note"><img src="unlink.png" alt=""/> Unlink</span>
        </RadioButton>
        <RadioButton value="erase" checked={this.props.tool==="erase"}>
          <span title="Erase the note"><img src="erase.png" alt=""/> Erase</span>
        </RadioButton>
      </RadioGroup>
      </div>
    );
  }
  onToolChange=(e)=>{
    this.props.onToolChange(e);
  }
}
export default ToolSelector
