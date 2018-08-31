import Reflux from 'reflux'

import FilterActions from './FilterActions'

class FilterStore extends Reflux.Store{
  constructor(){
    super()
    this.state = {filter:{}}
    this.listenTo(FilterActions.filterChange, this.onFilterChange);
  }
  onFilterChange(filter){
    // TODO handle more complicated filter set
    this.filter = filter;
    this.setState({"filter":filter})
    console.log(this.state)
  }
}

export default FilterStore
