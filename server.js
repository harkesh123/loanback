var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://harkesh:a1a2a3a4a5@loan-wdtrt.mongodb.net/test?retryWrites=true";
const cors = require("cors")
const assert = require('assert');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}))
app.use(cors())
const dbName = 'Project01';



app.post('/s', function (req, res) {
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
  if(err){ throw err;}
    console.log("Connected correctly to server",req.body);
    const datab=db.db(dbName).collection("LoginList");
    datab.find(req.body).toArray(function(err, result) {
    assert.equal(null,err);
    console.log(result);
    res.send(result)
    db.close();
  });
})
})

app.post('/Rl', function (req, res) {
MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
  if(err){ throw err;}
    console.log("Connected correctly to server",req.body);
    const datab=db.db(dbName).collection("Req_list");
    datab.find(req.body).toArray(function(err, result) {
    assert.equal(null,err);
    console.log(result);
    res.send(result)
    db.close();
  });
})
})

app.post("/reg",function(req,res){
  console.log(req.body)
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if(err){ throw err}
  const datab=db.db(dbName).collection("LoginList");
  var myobj = req.body;
  datab.insertOne(myobj, function(err, result) {
    if (err) {res.send({"status":false});}
    else{
    res.send({"status":true})
  }
   db.close();
  });
});
})

app.post("/req",function(req,res){
  console.log(req.body)
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if(err){ throw err}
  const datab=db.db(dbName).collection("Req_list");
  var myobj = req.body;
  datab.insertOne(myobj, function(err, result) {
    if (err) {res.send({"status":"ERROR"});}
    else{
    res.send({"status":"Added"})
  }
   db.close();
  });
});
})

app.post("/update",function(req,res){
  console.log(req.body.Selection,req.body.Change)
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if(err){ throw err}
  const datab=db.db(dbName).collection("Req_list");
  var myobj = req.body;
  datab.updateOne(myobj.Selection,{$set: myobj.Change},function(err, result) {
    if (err) {res.send({"status":"ERROR"});}
    else{
    res.send({"status":"Added"})
  }
   db.close();
  });
});
})


 
app.delete("/",function(req,res){
  console.log(req.body)
MongoClient.connect(url,{ useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  const datab=db.db(dbName).collection("Req_list");
  var myobj = req.body;
  datab.deleteOne(myobj, function(err, result) {
    res.send(result)
    db.close();
  });
});
})


 
app.listen(3005)