class TextPlot extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let cols = props.cols
    this.state = {id: id, cols:cols, data: []}
  }

  componentDidMount() {
    let chart = scatterChart()
    let container = d3Selection.select(this.props.id+"-chart")
    container.html(chart.loadingState())
    store.matrix(this.state.cols).then((data)=>{
      this.setState({data:data})
    }, (error)=>{
      console.warn(error)
      this.setState({data:error})
    })
  }

  render(){
    if(this.state.data.length){
      return(
        <div className="textplot graph filter" id={this.props.id}>
        this.state.data
        </div>
      )

    } else {
      return(
        <div className="textplot graph filter" id={this.props.id}>
        Loading
        </div>
      )
    }
  }
}

export default TextPlot
