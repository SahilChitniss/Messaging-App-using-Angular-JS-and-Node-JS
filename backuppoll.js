function REST_ROUTER(router,connection,session) {
    var self = this;
    self.handleRoutes(router,connection,session);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,session) {


router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },saveUninitialized: true,resave: true}));

 router.get('/',function (req, res) {
   res.sendFile( __dirname + "/public/" + "main.html" );

var sess = req.session
  if (sess.views) {
    sess.views++
    
  } else {
    sess.views = 1
    
  }

    

});





router.post('/watch',function(req, res, next){

/*
var fs = require('fs');


fs.watchFile('./files1', {persistent:'true',encoding: 'buffer'}, function(eventType, filename){

var path = './files1/' + filename;
console.log(path);

try{
var response = require(path);
}catch(e){
  console.log('malformed request', path);
        return res.status(400).send('malformed request: ' + path);
}






console.log(eventType);



});*/


var chokidar = require('chokidar');

var watcher = chokidar.watch('./files1/', {
  persistent: true
});

// Something to use when events are;
// Add event listeners.
watcher.on('add', function(path){
  console.log("hello "+path);

 var fs = require('fs');
var response = JSON.parse(fs.readFileSync(path, 'utf8'));


  var query = connection.query('insert into users values (?,?,?,?,?)', [response.userid,response.username,response.email,response.dob,response.pass], function(err, result) {
if(err){
  //return console.error(err);
}
else{

}

});




  });


/*
*/
 
  
return res.send("watch");

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
   var name="files1/"+response.username+".json";
   fs.writeFile(name,data2);


 
   
return res.send(name);




});






router.post('/process_log', function(req, res, next){ 

var stat;
var response = {
      username:req.body.username,
      pass:req.body.password
   };
    var fs=require('fs');
      var name="./files2/"+response.username+".json";
      var data2=JSON.stringify(response);
      fs.writeFile(name,data2);
      
      return res.send("pok");
});



router.post('/watchsubmit',function(req,res,next){
/*
var fs = require('fs');



fs.watch('./json1', {encoding: 'buffer'}, function(eventType, filename){

var response = {
      username:req.body.username,
      pass:req.body.password
   };

var path = './json1/'+response.username;
if(path==filename)
  return console.log("success b");

});*/



var chokidar = require('chokidar');

var watcher = chokidar.watch('./files2/',{
  persistent: true,

  ignored: '*.txt',
  ignoreInitial: false,
  followSymlinks: true,
  cwd: '.',

  usePolling: true,
  interval: 0,
  binaryInterval: 0,
  alwaysStat: false,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },

  ignorePermissionErrors: false,
  atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
});

// Something to use when events are;
// Add event listeners.
watcher.on('add', function(path){
  

var fs = require('fs');
var response = JSON.parse(fs.readFileSync(path, 'utf8'));

   var query = connection.query('select username,password from users where username=? and password=? limit 1',  [response.username,response.pass], function(err, result) {
     if (err) {
         console.error(err);
       return res.send(err);
     }else{

      if(result.length>0){
        //res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("ok");
      }
      else{
             //  res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("nok");
        //return res.write("nok");
      }
      
     }


});

fs.unlink(path);

});

});


router.post('/sendmsg',function(req,res,next){


var response = {
  username: req.body.username,
  message: req.body.message,
  senderid:req.body.senderid
}

   var fs=require('fs');

   var data2=JSON.stringify(response);
   var name="./files3/"+response.username+".json";
   fs.writeFile(name,data2);

return res.send("name");




});

router.post('/wat',function(req,res,next){

var fs = require('fs');


var chokidar = require('chokidar');

var watcher = chokidar.watch('./files3/', {
  persistent: true,

  ignored: '*.txt',
  ignoreInitial: false,
  followSymlinks: true,
  cwd: '.',

  usePolling: true,
  interval: 0,
  binaryInterval: 0,
  alwaysStat: false,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },

  ignorePermissionErrors: false,
  atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
});

// Something to use when events are;
// Add event listeners.
watcher.on('add', function(path){
  

var fs = require('fs');
var response = JSON.parse(fs.readFileSync(path, 'utf8'));


var querysource0 = connection.query('select userid from users where username = ? ', [response.username], function(err, result) {
if(err){
  return res.send(err);
}else{

getid(result[0].userid);
}

});


function getid(userid){
var querysource1 = connection.query('insert into msgSourceStore values (NULL,?,?)', [userid,response.message], function(err, result) {
if(err){
  return res.send(err);
}else{
  getmsgid(userid);
}

});
}

function getmsgid(userid){
var querysource2 = connection.query('select msgid from msgSourceStore where message = ? and userid= ? ',[response.message,userid], function(err, result) {
if(err){
  return ;
}else{

fs.unlink(path);
      
       findid(response.senderid,result[0].msgid);
   
}

});

}

function findid(b,c){


var querysource3 = connection.query('select userid from users where username = ? limit 1',[b], function(err, result) {
if(err){
  return ;
}else{
  insSource(c,result[0].userid);
}

});


}




function insSource(id,b){
var querysink = connection.query('insert into msgSinkStore values (?,?)', [id,b], function(err, result) {
if(err){
  return res.send(err);
}

});

}


})


return res.send("ok");

});





router.post('/getmessage',function(req,res,next){

var response = {
  senderid:req.body.senderid
}

console.log(response);





function getmess(senderid,callback){
var queryget = connection.query('select username,message from users u ,(select senderid,message from msgSourceStore m ,msgSinkStore n,users u where m.msgid=n.msgid and u.userid=m.userid and u.username= ?) r where u.userid=r.senderid', [response.senderid], function(err, result) {
if(err){
  return res.send(err);
}else{
  callback(result);
}


});

}


getmess(response.senderid,function(data){
console.log(data);
return res.send(data);
});




});




router.post('/logout',function(req,res){

req.session.destroy(function(err){
  res.send("done");
  });

});


}




module.exports = REST_ROUTER;






















































