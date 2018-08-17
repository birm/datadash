class QqPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    this.state = {id: id}
  }

  render(){
    return(
      <div className="qq graph filter" id={this.props.id}>
      </div>
    )
  }
}
