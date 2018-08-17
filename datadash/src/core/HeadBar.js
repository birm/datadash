class HeadBar extends React.Component{
  constructor(props){
    super(props)
    let title = props.title || "DataDash"
    this.state = {title: title}
  }

  render(){
    return(
      <div className="headbar" id="vizgrid">
        <h1>{this.state.title}</h1>
      </div>
    )
  }
}
