const express = require('express')
const app = express()

class csvData{
  constructor(filelist){
    this.filelist = filelist
    this._datasets = {}
  }

  async getData(key, reload=false){
    let data = this._datasets[key]
    if (!reload && data){
      return data
    } else {
      let fn = this.filelist[key]
      if (fn){
        this._datasets[key]=await csv().fromFile(csvFilePath)
        return this._datasets[key]
      }
      else {
        return -1
      }
    }
  }
}

demolist = {};

const demoData = new csvData(demolist);

app.get("/data/datasets", (req, res) => res.send(Object.keys(demodata.filelist)))

app.get("/data/summary", (req, res) => res.send(Object.keys(demodata.getData(req.query.dataset))))


app.get("/data/tabular", x=>x)
req.query.dataset
req.query.filter
req.query.cols
req.query.start
req.query.len

app.get("/data/counteach", x=>x)
req.query.dataset
req.query.filter
req.query.cols

app.get("/data/stats", x=>x)
req.query.dataset
req.query.filter
req.query.cols


app.listen(3000, () => console.log('Example app listening on port 3000!'))
