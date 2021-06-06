function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

 router.get('/',function (req, res) {
   res.sendFile( __dirname + "/public/" + "main.html" );
});



router.post('/watch',function(req, res, next){


var fs = require('fs');
var flag=0;

fs.watch('./json', {encoding: 'buffer'}, function(eventType, filename){

var path = './json/' + filename;

try{
var response = require(path);
}catch(e){
  console.log('malformed request', path);
        return res.status(400).send('malformed request: ' + path);
}

//var response = JSON.parse(content);

var query = connection.query('insert into users values (NULL,?,?,?,?,?)', [response.userid,response.username,response.pass,response.dob,response.email], function(err, result) {
if(err){
  return console.error(err);
}
else{

}

});

});

return console.log("success");

});




router.post('/process_get', function(req, res, next){ 
 

var response = {

      userid:req.body.userid,
      username:req.body.username,
      pass:req.body.pass,
      dob:req.body.dob,
      email:req.body.email
   };
   
   var fs=require('fs');

   var data2=JSON.stringify(response);
   var name="json/"+response.username+".json";
   fs.writeFile(name,data2);

return res.send(name);




});

router.post('/process_log/:table', function(req, res, next){ 

var response = {
      username:req.body.username,
      pass:req.body.password
   };
   var tablename=req.params.table;
   console.log(response);

   var query = connection.query('select * from ?? where username=? and pass=?',  [tablename,response.username,response.pass], function(err, result) {
     if (err) {
       console.error(err);
       return res.send(err);
     } else {
      
      var fs = require('fs');
      console.log(result[0].username);
      var name="jsonsubmit/"+result[0].username+".json";
      fs.writeFile(name,"hello");
       return res.send(result);
     }
}


);
   return console.log("in log");

});


router.post('/watchsubmit',function(req,res,next){

var fs = require('fs');



fs.watch('./jsonsubmit', {encoding: 'buffer'}, function(eventType, filename){

var response = {
      username:req.body.username,
      pass:req.body.password
   };

var path = './jsonsubmit/'+response.username;
if(path==filename)
  return console.log("success b");

});


});




router.post('/sendmsg',function(req,res,next){


var response = {
  userid: req.body.userid,
  message: req.body.message
}


   var fs=require('fs');

   var data2=JSON.stringify(response);
   var name="jsonsendmsg/"+response.userid+".json";
   fs.writeFile(name,data2);

return res.send(name);




});




router.post('/watchsendmsg',function(req,res,next){


var fs = require('fs');

fs.watch('/jsonsendmsg',encoding:"buffer",function(eventType,filename){

var path = './jsonsendmsg/' + filename;

try{
var response = require(path);
}catch(e){
  console.log('malformed request', path);
        return res.status(400).send('malformed request: ' + path);
}

var querysource = connection.query('insert into msgSourceStore values (?,NULL,?,NULL,?,?)', [response.userid,response.message,"ok"], function(err, result) {
if(err){
  return res.send(err);
}

});



var querysink = connection.query('insert into msgSinkStore values (?,?,?,NULL)', [response.userid,response.senderid,response.message], function(err, result) {
if(err){
  return res.send(err);
}

});



return res.send("success in msg send");

});

return res.send("success in send msg");

});































}


module.exports = REST_ROUTER;