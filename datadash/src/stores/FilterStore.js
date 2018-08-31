import Reflux from 'reflux'

import FilterActions from './FilterActions'

class FilterStore extends Reflux.Store{
  constructor(){
    super()
    this.state = {filter:{}}
    this.listenTo(FilterActions.filterChange, this.onFilterChange);
  }
  onFilterChange(filter){
    this.filter = filter;
    this.setState(filter:filter)
  }
}

export default FilterStore
