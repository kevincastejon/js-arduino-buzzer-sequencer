import React from 'react';
class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  render() {
    return (<input onKeyDown={this.onKeyDown} onChange={this.onChange} onBlur={this.onBlur} value={this.state.value}/>);
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value && this.props.value !== this.state.value) {
      this.setState({value: this.props.value});
    }
  }
  onKeyDown = (e) => {
    if (this.props.onKeyDown)
      this.props.onKeyDown(e);
    if (e.key === "Enter" && this.props.onValid)
      this.props.onValid(e);
    }
  onChange = (e) => {
    this.setState({value: e.target.value});
    if (this.props.onChange)
      this.props.onChange(e);
    }
  onBlur = (e) => {
    if (this.props.onBlur)
      this.props.onBlur(e);
    if (this.props.onValid)
      this.props.onValid(e);
    }
  }
export default NumericInput
