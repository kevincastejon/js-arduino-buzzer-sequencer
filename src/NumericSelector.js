import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import NumericInput from './NumericInput';
import './NumericSelector.css';
class NumericSelector extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
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

    return (
      <div id="numericSelector" className={this.props.className?this.props.className:""}>
        <Button disabled={(parseInt(this.props.number) || 0)<=1} onClick={this.onRemove}> - </Button> <label>{this.props.labelLeft?this.props.labelLeft:""} <NumericInput {...rangeProps} value={(parseInt(this.props.number) || 0)} disableArrows onValid={this.onChange} /> {this.props.labelRight?this.props.labelRight:""}</label> <Button onClick={this.onAdd}> + </Button>
      </div>
    );
  }
  onChange=(e)=>{
    if(this.props.onChange)
    this.props.onChange(parseInt(e.target.value));
  }
  onAdd=(e)=>{
    if(this.props.onChange)
    this.props.onChange((parseInt(this.props.number) || 0)+1);
  }
  onRemove=(e)=>{
    if(this.props.onChange)
    this.props.onChange((parseInt(this.props.number) || 0)-1);
  }
}
export default NumericSelector
