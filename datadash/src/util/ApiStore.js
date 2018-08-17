// ger items from the api, based on V1.0
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
        let url = this.urlBase + "/v1/summary" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
    tabular(start, len) {
        let query = {}
        query.dataset = this.dataset
        query.filter = this.filterState
        query.len = len
        query.start = start
        let url = this.urlBase + "/v1/tabular" + objToParamStr(query)
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
        let url = this.urlBase + "/v1/counteach" + objToParamStr(query)
        return fetch(url, {
            credentials: "same-origin",
            mode: "cors"
        }).then((x) => x.json())
    }
}