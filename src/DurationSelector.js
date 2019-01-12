import React from 'react';

class DurationSelector extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div id="durationSelector">
        <label>Duration : </label><input onChange={this.onDurationChange} type="number" value={this.props.duration} min="1" max="1000" />
      </div>
    );
  }
  onDurationChange=(e)=>{
    this.props.onDurationChange(e.target.value);
  }
}
export default DurationSelector
