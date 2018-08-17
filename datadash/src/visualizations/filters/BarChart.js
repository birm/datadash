class BarChart extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    this.state = {id: id}
  }

  render(){
    return(
      <div className="barchart graph filter" id={this.props.id}>
      </div>
    )
  }
}
