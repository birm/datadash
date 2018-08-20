import React from 'react';

class TextPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    this.state = {id: id, cols:cols, data: false, filter:{}, errored: false, store:props.store}
  }

  componentDidMount() {
    this.state.store.matrix(this.state.cols).then((data)=>{
      this.setState({data:data})
      console.warn(this.state.store)
    }, (error)=>{
      console.warn(error)
      this.setState({data:error.toString(), errored:true})
    })
  }
  // componentDidMount(){
  //   return fetch('http://localhost:3333/v1/matrix?dataset=fruit&filter={%22rating%22:{%22greater%22:0}}&cols=[%22size%22]', {
  //       credentials: "same-origin",
  //       mode: "cors"
  //   }).then((x) => x.json()).then((data)=>{
  //     this.setState({data:data})
  //   })
  // }


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
