import TextPlot from './filters/TextPlot'

import React from 'react';

import FilterStore from '../stores/FilterStore'

const visTypes={
  'text': TextPlot
};

class VisContainer extends Reflux.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    this.state = {type:props.type, id: id, cols:cols, db:props.db}
    this.store = FilterStore;
  }

  render(){
      if( visTypes.hasOwnProperty(this.state.type)){
        const VisType = visTypes[this.state.type]
        return (<VisType cols={this.state.cols} id={this.state.id} db={this.state.db}></VisType>)
      }
      else {
        return(<div id={this.props.id} class="vis vis-missing error"></div>)
      }
    }
}

export default VisContainer
