var express = require('express');
var router = express.Router();
var Task=require('../models/Task');
/* GET home page. */
router.get('/',function(req,res,next){
  console.log("pasooooo");
/* 
Task.getId(req.params.id,function(err,rows){
 
if(err)
  {
  res.json(err);
  }
  else{
  res.json(rows);
  }


});
 
function get with id */

Task.getAll(function(err,rows){
 console.log("pasa?");  
  if(err){res.status(500).json({"success":false,"message":err});

  }else{res.status(200).json({"success":true,"message":rows});}
 
});
 
 });

/*
//HTTP POST
router.post('/',function(req,res,next){
 
Task.addTask(req.body,function(err,count){
  if(err)
  {
  res.json(err);
  }
  else{
  res.json(req.body);//or return count for 1 &amp;amp;amp; 0
  }
  });
});
*/

/*
//HTTP DELETE
 router.delete('/:id',function(req,res,next){
 
Task.deleteTask(req.params.id,function(err,count){
 
if(err)
  {
  res.json(err);
  }
  else
  {
  res.json(count);
  }
 
});
 });
*/
 /* HTTP PUT
router.put('/:id',function(req,res,next){
 
Task.updateTask(req.params.id,req.body,function(err,rows){
 
if(err)
  {
  res.json(err);
  }
  else
  {
  res.json(rows);
  }
  });
 });
*/
module.exports = router;
