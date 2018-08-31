import objToParamStr from './objToParamStr'
// get items from the api, based on V1.0
class Store {
    constructor(urlBase, dataset) {
        this.urlBase = urlBase
        this.dataset = dataset
    }
    datasets() {
        let url = this.urlBase + "/v1/datasets"
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    summary(filter) {
        let query = {}
        query.dataset = this.dataset
        query.filter = JSON.stringify(filter) || JSON.stringify({})
        let url = this.urlBase + "/v1/summary?" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    tabular(start, len, filter) {
        let query = {}
        query.dataset = this.dataset
        query.filter = JSON.stringify(filter) || JSON.stringify({})
        if(len){
          query.len = len
        }
        if (start){
          query.start = start
        }
        let url = this.urlBase + "/v1/tabular?" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    matrix(cols, filter, missing) {
        let query = {}
        query.dataset = this.dataset
        query.filter = JSON.stringify(filter) || JSON.stringify({})
        query.cols = JSON.stringify(cols)
        if (missing){
          query.missing = JSON.stringify(missing)
        }
        let url = this.urlBase + "/v1/matrix?" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    countEach(col, filter) {
        let query = {}
        query.dataset = this.dataset
        query.filter = JSON.stringify(filter) || JSON.stringify({})
        query.col = col
        let url = this.urlBase + "/v1/counteach?" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
}

export default Store
