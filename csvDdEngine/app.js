const express = require('express')
const csv = require('csvtojson');
const app = express()

// CORS
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

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
      let oprs = Object.keys(rules[rule]);
      if (oprs.includes("match")){
        if(y[rule] != rules[rule]["match"]){
          return false
        }
      }
      if (oprs.includes("regex")){
        let re = new RegExp(rules[rule]["regex"])
        if (!re.test(y[rule])){
          return false
        }
      }
      if (oprs.includes("less")){
        let z = rules[rule]["less"]
        if (!isNaN(z)){
          z = parseFloat(z)
        }
        if (y[rule] >= z){
          return false
        }
      }
      if (oprs.includes("greater")){
        let z = rules[rule]["greater"]
        if (!isNaN(z)){
          z = parseFloat(z)
        }
        if (y[rule] <= z){
          return false
        }
      }

    }
    // all rules met
    return true
  })
}

filterData(x,filter)

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
