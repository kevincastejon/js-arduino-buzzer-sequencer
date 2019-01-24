import React from 'react';
class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  render() {
    let rangeProps={};
    if(!this.props.min)
    {
      rangeProps.min=this.props.min;
    }
    if(!this.props.max)
    {
      rangeProps.max=this.props.max;
    }
    return (<input type={this.props.disableArrows ? "text" : "number"} onKeyDown={this.onKeyDown} onChange={this.onChange} onBlur={this.onBlur} value={this.state.value} {...rangeProps}/>);
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value && this.props.value !== this.state.value) {
      this.setState({value: this.props.value});
    }
  }
  onKeyDown = (e) => {
    if(this.props.onKeyDown)
    this.props.onKeyDown(e);
    if(e.key==="Enter" && this.props.onValid)
    this.props.onValid(e);
  }
  onChange = (e) => {
    let val = e.target.value;
    if (val === "")
      val = 0;
    if (!Number.isNaN(parseInt(val))) {
      this.setState({value: parseInt(val)});
    }
    if(this.props.onChange)
    this.props.onChange(e);
  }
  onBlur = (e) => {
    if(this.props.onBlur)
    this.props.onBlur(e);
    if(this.props.onValid)
    this.props.onValid(e);
  }
}
export default NumericInput
