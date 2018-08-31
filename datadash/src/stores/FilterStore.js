var Reflux = require('reflux');

var FilterActions = Reflux.createActions(["filterChange"])

class FilterStore extends Reflux.store{
  constructor(){
    super()
    this.state = {filter:{}}
    this.listenTo(filterChange, this.onFilterChange);
  }
  onFilterChange(filter){
    this.filter = filter;
    this.setState(filter:filter)
  }
}

export default FilterStore
