import React from 'react';

class TextPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    let db = props.db
    this.trigger = props.trigger
    this.state = {id: id, cols:cols, data: false, errored: false, db:db, filter:props.filter}
    this.onFilter = this.onFilter.bind(this)
  }

  componentDidMount() {
    this.state.db.matrix(this.state.cols, {}).then((data)=>{
      this.setState({initialData:data})
    }, (error)=>{
      console.warn(error)
      this.setState({data:error.toString(), errored:true})
    })
  }

  onFilter(event){
    var filter = {"rating":{"greater":event.target.value}}
    this.trigger(filter)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    alert(JSON.stringify(nextProps))
    this.state.db.matrix(this.state.cols, nextProps.filter).then((data)=>{
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
    if(this.state.initialData){
      return(
        <div className="textplot graph filter" id={this.props.id}>
        <label>Rating at least:</label><input onChange={this.onFilter}></input><br/>
        Filtered: {this.state.data}<br/>
        Initial: {this.state.initialData}<br/>
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
