class ImageGrid extends React.Component{
  constructor(props){
    super(props)
    let id = props.id
    let imgcol = props.imgcol
    let labelcol = props.labelcol || null
    let linkcol = props.linkcol || null
    this.state = {id: id, imgcol:imgcol, labelcol:labelcol, linkcol:linkcol}
  }

  render(){
    return(
      <div className="imagegrid graph" id={this.props.id}>
      </div>
    )
  }
}
