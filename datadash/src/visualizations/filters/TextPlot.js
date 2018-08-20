import React from 'react';

class TextPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    this.state = {id: id, cols:cols, data: false}
    this.store = props.store
  }

  componentDidMount() {
    this.store.matrix(this.state.cols).then((data)=>{
      this.setState({data:data})
    }, (error)=>{
      console.warn(error)
      this.setState({data:error.toString()})
    })
  }

  render(){
    if(this.state.data){
      return(
        <div className="textplot graph filter" id={this.props.id}>
        {this.state.data}
        </div>
      )
    } else {
      return(
        <div className="textplot graph filter" id={this.props.id}>
        Loading
        </div>
      )
    }
  }
}

export default TextPlot
