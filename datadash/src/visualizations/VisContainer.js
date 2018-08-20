import TextPlot from './filters/TextPlot'

import React from 'react';

const visTypes={
  'text': TextPlot
};

class VisContainer extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    this.state = {type:props.type, id: id, cols:cols, filter:{}, store:props.store}
  }

  render(){
      if( visTypes.hasOwnProperty(this.state.type)){
        const VisType = visTypes[this.state.type]
        return (<VisType cols={this.state.cols} id={this.state.id} store={this.state.store}></VisType>)
      }
      else {
        return(<div id={this.props.id} class="vis vis-missing error"></div>)
      }
    }
}

export default VisContainer
