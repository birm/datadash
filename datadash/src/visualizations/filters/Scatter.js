class ScatterPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let xcol = props.xcol
    let ycol = props.ycol || null
    let zcol = props.zcol || null
    this.state = {id: id, xcol:xcol, ycol:ycol, zcol:zcol}
  }

  componentDidMount() {
    let chart = scatterChart()
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
      <div className="scatterplot graph filter" id={this.props.id}>
      </div>
    )
  }
}
