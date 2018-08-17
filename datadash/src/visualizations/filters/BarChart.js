class BarChart extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let bins = props.bins || 5
    let cols = props.col
    this.state = {id: id, bins:bins, col:col}
  }

  componentDidMount() {
    let chart = barChart()
    let container = d3Selection.select(this.props.id+"-chart")
    container.html(chart.loadingState())
    // TODO need a way to trabslate in store
    store.matrix(this.state.col).then((data)=>{
      // translate
      container.load(data).call(chart)
    }, (error)=>{
      console.warn(error)
    })
  }

  render(){
    return(
      <div className="barchart graph filter" id={this.props.id+"-chart"}>
      </div>
    )
  }
}
