class ScatterPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let xcol = props.xcol
    let ycol = props.ycol || null
    let zcol = props.zcol || null
    this.state = {id: id, xcol:xcol, ycol:ycol, zcol:zcol}
  }

  render(){
    return(
      <div className="scatterplot graph filter" id={this.props.id}>
      </div>
    )
  }
}
