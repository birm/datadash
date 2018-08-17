class BarChart extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let bins = props.bins || 5
    let col = props.col
    this.state = {id: id, bins:bins, col:col, loaded:false, data=[]}
  }

  componentDidMount() {
    store.matrix([this.state.col]).then((data)=>{
      // translate
      this.state.loaded=true
      this.state.data = data
    }, (error)=>{
      this.state.loaded = []
      console.warn(error)
    })
  }

  render(){
    if (this.state.loaded){
      return(
        <div className="barchart graph filter" id={this.props.id+"-chart"}>
        </div>
      )
    } else {
      return(<div className="barchart graph filter" id={this.props.id+"-chart"}>Load Failed</div>)
    }
  }
}
