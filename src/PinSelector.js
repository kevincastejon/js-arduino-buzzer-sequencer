import React from 'react';

class PinSelector extends React.Component {
  render() {
    return (
      <div id="pinSelector">
        <label>Arduino buzzer pin : </label><input onChange={this.onPinChange} type="number" value={this.props.pin} min="1"/>
      </div>
    );
  }
  onPinChange=(e)=>{
    this.props.onPinChange(e.target.value);
  }
}
export default PinSelector
