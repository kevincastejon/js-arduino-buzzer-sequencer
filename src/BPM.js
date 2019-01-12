import React from 'react';

class BPM extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div id="bpm">
        <label>Tempo : </label><input onChange={this.onTempoChange} type="number" value={this.props.tempo} min="1" max="240" />
      </div>
    );
  }
  onTempoChange=(e)=>{
    // this.setState({tempo:e.target.value})
    this.props.onTempoChange(e.target.value);
  }
}
export default BPM
