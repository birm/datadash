class QqPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let xcol = props.xcol
    let ycol = props.ycol || null
    this.state = {id: id, xcol:xcol, ycol:ycol}
  }

  render(){
    return(
      <div className="qq graph filter" id={this.props.id}>
      </div>
    )
  }
}
