const express = require('express')
const csv = require('csvtojson');
const app = express()

class csvData{
  constructor(filelist){
    this.filelist = filelist
    this._datasets = {}
  }

  getData(key, reload=false){
    let data = this._datasets[key]
    if (!reload && data){
        return data
    } else {
      let fn = this.filelist[key]
      if (fn){
        csv().fromFile(this.filelist[key]).then(x=>{
            this._datasets[key]=x
            return x
        })
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
      let oprs = Object.keys(rules[rule]);
      if (oprs.includes("match")){
        broken = broken || y[rule] != rules[rule]["match"]
      }
      if (oprs.includes("regex")){
        let re = new RegExp(rules[rule]["regex"])
        broken = broken || !re.test(y[rule])
      }
      if (oprs.includes("less")){
        broken = broken || y[rule] >= rules[rule]["less"]
      }
      if (oprs.includes("greater")){
        broken = broken || y[rule] <= rules[rule]["greater"]
      }
      if (broken){
        return false
      }

    }
    // all rules met
    return true
  })
}

demolist = {fruit:"demo_data.csv"};

const demoData = new csvData(demolist);
console.log(demoData.getData('fruit'))
app.get("/v1/datasets", (req, res) => res.send(Object.keys(demoData.filelist)))

app.get("/v1/summary", (req, res) => res.send(Object.keys(demoData.getData(req.query.dataset)[0])))


app.get("/v1/tabular", (req, res) =>{
        let data = demoData.getData(req.query.dataset);
        let d = filterData(data, JSON.parse(req.query.filter))
        if (req.query.len){
          res.send(d.slice(req.query.start || 0 ,req.query.len))
        } else
          res.send(d)
        })

app.get("/v1/matrix", (req, res) =>{
        let data = demoData.getData(req.query.dataset);
        let a = filterData(data, JSON.parse(req.query.filter))
        let cols = JSON.parse(req.query.cols)
        let outdata = []
        for (col in cols){
          let t = []
          for (rec in a){
            t.push(a[rec][cols[col]])
          }
          outdata.push(t)
        }
        res.send(outdata)
        })

app.get("/v1/counteach", (req, res) =>{
        let data = demoData.getData(req.query.dataset);
        data = filterData(data, req.query.filter)
        let counts = {}
        for (record in data){
          let val = data[record][req.query.col]
          if(val in counts){
            counts[val] +=1
          } else {
            counts[val] =1
          }
        }
        res.send(counts)
        })


app.listen(3333, () => console.log('CSV DataDash Engine at Port 3333'))
