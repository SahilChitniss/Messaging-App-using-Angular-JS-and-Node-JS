var app = angular.module("feedback",['ngRoute']);


app.config(function($routeProvider){

$routeProvider


.when('/',{


templateUrl : 'home.html'


})

.when('/login',{

	templateUrl: 'login.html',
	controller: 'logincntrl'

})

.when('/signup',{


	templateUrl: 'signup.html'
})

.when('/welcome',{


  templateUrl: 'welcome.html'
})

.otherwise({

	redirectTo: '/'
});

});


app.controller('logincntrl',function($scope,$location,$http){

$scope.pathtologin = function(){

$location.path('/login');

};

//$scope.message= "Login Page Scope";

$scope.pathtoregister = function(){

//$scope.msg="Feedback Site signup Page";

$location.path('/signup');


};

//$scope.message= "Register Page Scope"; 
$scope.backaction = function(){


$location.path('/');


};


$scope.Msgsend = function(){

 
var data = { 
  userid:$scope.userid,
  message:$scope.message
}


      const urls= [ "http://localhost:8080/api/msgsend","http://localhost:8080/api/watchsendmsg"];


    for(i in urls){
     $http.post(urls[i], data).success(function(data, status) {
        console.log('Data posted successfully'+data);
 
      
      });


}






   $scope.submit= function(){
//   	console.log("yes");
 
       var data = {
       //book: JSON.stringify({
           username: $scope.username,
           userid:$scope.userid,           
            pass : Base64.encode($scope.username + ':' + $scope.password),
            dob:$scope.dob,
            email:$scope.email 
          };
      //})
      //});


console.log(data);
      const urls= [ "http://localhost:8080/api/process_get","http://localhost:8080/api/watch"];


    for(i in urls){
     $http.post(urls[i], data).success(function(data, status) {
        console.log('Data posted successfully'+data);

        //$location.path('/login');
       /* $http.get("api/watch").success(function(data, status){
          console.log(data);*/
  $location.path('/login'); 
      
      });
     // })

      
}
   }

   $scope.login= function(){


       var data = {
       //book: JSON.stringify({
           username: $scope.username,
            password : Base64.encode($scope.username + ':' + $scope.password)
          };

          const urls=["http://localhost:8080/api/process_log/users","http://localhost:8080/api/watchsubmit"];
    for(i in urls){          
      $http.post(urls[i], data).success(function(data, status) {
        //console.log(data[0].firstname);
        
        /*if(data[0]!=null) 
        {
        $scope.message= data[0];       
        $location.path('/welcome');
        
      }*/


      })
      $location.path('/welcome');
  }



   }


   


});

var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };



