import React from 'react';
import './MatrixSelector.css';
// import Cloner from './Cloner';
const defaultNumCol = 10;
const defaultNumLine = 10;
const defaultTileWidth = 25;
const defaultTileHeight = 25;
const defaultHoverStyle = {
  borderTop: "3px solid black",
  borderBottom: "3px solid black",
  borderLeft: "3px solid black",
  borderRight: "3px solid black"
};
const defaultSelectedStyle = {
  backgroundColor: "rgb(108, 217, 187)"
};
const defaultIdleStyle = {
  backgroundColor: "white"
};

class MatrixSelector extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoverTile: null,
        selStartTile: null,
        selEndTile: null
      }
    }
    render() {
        let tileWidth = this.props.tileWidth || defaultTileWidth;
        let tileHeight = this.props.tileHeight || defaultTileHeight;
        let numLine = this.props.numLine || defaultNumLine;
        let numCol = this.props.numCol || defaultNumCol;
        let hoverStyle = this.props.hoverStyle || defaultHoverStyle;
        let selectedStyle = this.props.selectedStyle || defaultSelectedStyle;
        let idleStyle = this.props.idleStyle || defaultIdleStyle;
        let jsx = [];
        let tileID = 0;
        for (let i = 0; i < numLine; i++) {
          let children = [];
          for (let j = 0; j < numCol; j++) {
            let style = {
              width: tileWidth,
              height: tileHeight
            };
            if (j === 0) {
              style.borderLeft = "1px solid black";
            }
            if (i === numLine - 1) {
              style.borderBottom = "1px solid black";
            }
            if (!Array.isArray(idleStyle)) {
              style = Object.assign(style, idleStyle);
            } else if (!Array.isArray(idleStyle[0])) {
              style = Object.assign(style, idleStyle[tileID]);
            } else {
              style = Object.assign(style, idleStyle[i][j]);
            }
            if (this.state.hoverTile === tileID) {
              style = Object.assign(style, hoverStyle);
            }
            if (this.state.selStartTile != null) {
              let startPos = this.getTilePositionFromID(this.state.selStartTile);
              let endPos = this.getTilePositionFromID(this.state.selEndTile);
              let wRev=startPos[0]<endPos[0];
              let hRev=startPos[1]<endPos[1];
              let wA=wRev?startPos[0]:endPos[0];
              let wB=wRev?endPos[0]:startPos[0];
              let hA=hRev?startPos[1]:endPos[1];
              let hB=hRev?endPos[1]:startPos[1];
              if (j >= wA && j <= wB && i >= hA && i <= hB) {
                style = Object.assign(style, selectedStyle);
              }
            }
        children.push(<div id={tileID} key={tileID} style={style} className="tile" onMouseDown={this.onTileDown} onMouseUp={this.onTileUp} onMouseEnter={this.onHover} onMouseLeave={this.onOut}></div>);
        tileID++;
      }
      jsx.push(<div key={"line_" + i} className="line">{children}</div>);
    }
    return (<div id="matrixSelector">{jsx}</div>);
  }
  onHover = (e) => {
    let tileID = e.target.id;
    this.setState((prevState) => {
      let newState = {
        hoverTile: parseInt(tileID)
      };
      let startPos=this.getTilePositionFromID(prevState.selStartTile);
      let currentPos=this.getTilePositionFromID(tileID);
      if (prevState.selStartTile != null){
        let realID=tileID;
        if(this.props.disableSelectAcrossCol) {
          realID=currentPos[1]*(this.props.numCol || defaultNumCol)+startPos[0];
        }
        if (this.props.disableSelectAcrossLine) {
          realID=startPos[1]*(this.props.numCol || defaultNumCol)+currentPos[0];
        }
        if(!(this.props.disableSelectAcrossLine && this.props.disableSelectAcrossCol)){
        newState.selEndTile = parseInt(realID);
        }
      }
      return (newState);
    });
  }
  onOut = (e) => {
    this.setState({
      hoverTile: null
    });
  }
  onTileDown = (e) => {
    this.setState({
      selStartTile: parseInt(e.target.id),
      selEndTile: parseInt(e.target.id)
    });
  }
  onTileUp = (e) => {
    let targetID=e.target.id;
    this.setState((prevState) => {
      if (prevState.selStartTile != null && prevState.selEndTile != null && this.props.onSelection && (this.props.allowSelectOutOfTarget || targetID == prevState.selEndTile)) {
        let ar = [];
        let matrix = [];
        let maxJ = this.props.numCol || defaultNumCol;
        let maxI = this.props.numLine || defaultNumLine;
        let id = 0;
        let startPos = this.getTilePositionFromID(this.state.selStartTile);
        let endPos = this.getTilePositionFromID(this.state.selEndTile);
        for (let i = 0; i < maxI; i++) {
          let line=[];
          for (let j = 0; j < maxJ; j++) {
            let wRev=startPos[0]<endPos[0];
            let hRev=startPos[1]<endPos[1];
            let wA=wRev?startPos[0]:endPos[0];
            let wB=wRev?endPos[0]:startPos[0];
            let hA=hRev?startPos[1]:endPos[1];
            let hB=hRev?endPos[1]:startPos[1];
            if (j >= wA && j <= wB && i >= hA && i <= hB) {
              ar.push({id:id, col:j, line:i});
              line.push(true);
            } else {
              line.push(false);
            }
            id++;
          }
          matrix.push(line);
        }
        this.props.onSelection(ar,matrix);
      }
      return ({
        selStartTile: null,
        selEndTile: null
      })
    });
  }
  getTilePositionFromID(tileID) {
    return ([
      tileID % (this.props.numCol || defaultNumCol),
      parseInt(tileID / (this.props.numCol || defaultNumCol))
    ]);
  }
}
export default MatrixSelector
