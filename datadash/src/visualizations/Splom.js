class Splom extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    this.state = {id: id}
  }

  render(){
    return(
      <div className="table graph" id={this.props.id}>
      </div>
    )
  }
}
