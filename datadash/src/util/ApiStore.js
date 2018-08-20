import objToParamStr from './objToParamStr'
// get items from the api, based on V1.0
class Store {
    constructor(urlBase, dataset) {
        this.urlBase = urlBase
        this.dataset = dataset
        this.filterState = {}
    }
    setFilter(col, rule, val) {
        // if the rule exists, take the appropriate action
        // if the rule does not exist, add it
        return this.filterState
    }
    datasets() {
        let url = this.urlBase + "/v1/datasets"
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    summary() {
        let query = {}
        query.dataset = this.dataset
        query.filter = this.filterState
        let url = this.urlBase + "/v1/summary?" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    tabular(start, len) {
        let query = {}
        query.dataset = this.dataset
        query.filter = this.filterState
        if(len){
          query.len = len
        }
        if (start){
          query.start = start
        }
        let url = this.urlBase + "/v1/tabular?" + objToParamStr(query)
        return new Promise((res,rej)=>res(url))
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    matrix(cols, missing) {
        let query = {}
        query.dataset = this.dataset
        query.filter = JSON.stringify(this.filterState)
        query.cols = JSON.stringify(cols)
        if (missing){
          query.missing = missing
        }
        let url = this.urlBase + "/v1/matrix?" + objToParamStr(query)
        //return new Promise((res,rej)=>res(url))
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    countEach(col) {
        let query = {}
        query.dataset = this.dataset
        query.filter = this.filterState
        query.col = col
        let url = this.urlBase + "/v1/counteach?" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
}

export default Store
