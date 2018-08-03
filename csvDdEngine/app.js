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

function filterData(data, rules){
  return data.filter(y=>{
    for (rule in rules){
      let broken = false
      let opr = Object.keys(rules[rule])[0];
      if (opr == "match"){
        broken = y[rule] != rules[rule][opr] 
      } else if (opr == "regex"){
        let re = new RegExp(rules[rule][opr])
        broken = !re.test(y[rule])
      } else if (opr == "less"){
        broken = y[rule] >= rules[rule][opr]
      } else if (opr == "greater"){
        broken = y[rule] <= rules[rule][opr]
      }
      if (broken){
        return false
      }
      
    }
    // all rules met
    return true
  })
}

demolist = {};

const demoData = new csvData(demolist);

app.get("/data/datasets", (req, res) => res.send(Object.keys(demoData.filelist)))

app.get("/data/summary", (req, res) => res.send(Object.keys(demoData.getData(req.query.dataset))))


app.get("/data/tabular", (req, res) =>{
        let data = demoData.getData(req.query.dataset);
        res.send(filterData(data, req.query.filter).slice(req.query.start,req.query.len))
        })

app.get("/data/counteach", (req, res) =>{
        let data = demoData.getData(req.query.dataset);
        data = filterData(data, req.query.filter)
        let counts = {}
        for (record in data){
          let val = record[req.query.col]
          if(val in counts){
            counts[val] +=1
          } else {
            counts[val] =1
          }
        }
        res.send(counts)
        })

app.get("/data/stats", (req, res) =>{
        let data = demoData.getData(req.query.dataset);
        data = filterData(data, req.query.filter).map(x=>x[req.query.col])
        let stats = {}
        stats.max = Math.max(data)
        stats.min = Math.min(data)
        stats.count = data.length
        let s = new Set(data)
        stats.distinct = s.size
        res.send(stats)
        })


app.listen(3000, () => console.log('Example app listening on port 3000!'))
