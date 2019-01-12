import React from 'react';

class ToolSelector extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div id="toolSelector">
      <label title="Will play the next note without any interuption (on your Arduino)">Link : <input type="radio" className="radioTool" id="link" name="tool" value="link" checked={this.props.tool==="link"} onChange={this.onToolChange}/></label>
      <label title="Will make a brief interuption before playing the next note">Unlink : <input type="radio" className="radioTool" id="unlink" name="tool" value="unlink" checked={this.props.tool==="unlink"} onChange={this.onToolChange}/></label>
      <label title="Erase the note">Erase : <input type="radio" className="radioTool" id="erase" name="tool" value="erase" checked={this.props.tool==="erase"} onChange={this.onToolChange}/></label>
      </div>
    );
  }
  onToolChange=(e)=>{
    this.props.onToolChange(e.target.value);
  }
}
export default ToolSelector
