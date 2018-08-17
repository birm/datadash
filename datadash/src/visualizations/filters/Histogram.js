class Histogram extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let bins = props.bins || 5
    let col = props.col
    this.state = {id: id, bins:bins, col:col}
  }

  render(){
    return(
      <div className="histogram graph filter" id={this.props.id}>
      </div>
    )
  }
}
