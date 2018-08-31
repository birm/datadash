import React from 'react';

class TextPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    let db = props.db
    this.state = {id: id, cols:cols, data: false, errored: false, db:db}
  }

  componentDidMount() {
    this.state.db.matrix(this.state.cols, this.state.filter).then((data)=>{
      this.setState({data:data})
    }, (error)=>{
      console.warn(error)
      this.setState({data:error.toString(), errored:true})
    })
  }

  render(){
    if(this.state.errored){
      return(
        <div className="textplot graph filter error" id={this.props.id}>
        {this.state.data}
        </div>
      )
    }
    if(this.state.data){
      return(
        <div className="textplot graph filter" id={this.props.id}>
        {this.state.data}
        </div>
      )
    } else {
      return(
        <div className="textplot graph filter loading" id={this.props.id}>
        Loading
        </div>
      )
    }
  }
}

export default TextPlot
