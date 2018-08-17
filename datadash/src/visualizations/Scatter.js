class ScatterPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    this.state = {id: id}
  }

  render(){
    return(
      <div className="scatterplot graph" id={this.props.id}>
      </div>
    )
  }
}
