class LinePlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    this.state = {id: id, cols:cols}
  }

  componentDidMount() {
    let chart = lineChart()
    let container = d3Selection.select(this.props.id+"-chart")
    container.html(chart.loadingState())
    // TODO need a way to trabskate in store
    store.matrix(this.state.cols).then((data)=>{
      // translate
      container.load(data).call(chart)
    }, (error)=>{
      console.warn(error)
    })
  }

  render(){
    return(
      <div className="lineplot graph filter" id={this.props.id}>
      </div>
    )
  }
}
