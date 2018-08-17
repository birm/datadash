class VizContainer extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    this.state = {id: id}
  }

  render(){
    return(
      <div className="visualization container" id={this.props.id}>
      // TODO need top bar, buttons
      </div>
    )
  }
}
