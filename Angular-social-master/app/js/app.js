'use strict';
  
// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute','myApp.login','myApp.home','myApp.version']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login/login.html',
        controller: 'loginCtrl'
    })
    .when('/home', {
        templateUrl: 'partials/home/home.html',
        controller: 'homeCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);

/* Factories */

app.factory('sessionService', ['$http', function($http){
    return{
        set:function(key,value){
            return sessionStorage.setItem(key,value);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        },
        destroy:function(key){
            $http.post('data/destroy_session.php');
            return sessionStorage.removeItem(key);
        }
    };
}]);

app.factory('Data', ['$http',function ($http, toaster) { 
// This service connects to our REST API
        var serviceBase = 'api/v1/';

        var obj = {};
         obj.toast = function (data) {
            toastr.success(data.status, data.message);
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);

 app.run(function ($rootScope, $location, Data, $window) {

        window.fbAsyncInit = function() {
            FB.init({
              appId      : '401788873326306',
              xfbml      : true,
              version    : 'v2.2'
            });

        /*    FB.getLoginStatus(function(response) {
                $rootScope.statusChangeCallback(response);
            });     */
        };

        (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "//connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                    if (results.uid) {
                        $rootScope.authenticated = true;
                        $rootScope.uid = results.uid;
                        $rootScope.name = results.name;
                        $rootScope.email = results.email;
                        $location.path('/home');
                    } else {
                        $location.path('/login');
                    }    
            });
        });

});

/*
app.factory('loginService',function ($http, $location, sessionService){
    return{
        login:function(data,scope){
            
            var $promise=$http.post('data/login.php',data); //send data to user.php

            $promise.then(function(msg){
                var uid = msg.data;

                if(uid){
                  
                    scope.msgtxt='Correct information';
                    console.log(scope.msgtxt);
                    sessionService.set('uid',uid);
                    $location.path('/home');
                    toastr.success('Welcome','Login successful');
                }          
                else  {
                    scope.msgtxt='incorrect information';
                    console.log(scope.msgtxt);
                    toastr.error('Did you forget?', 'Incorrect user information');
                    $location.path('/login');
                }                  
            });
        },
        logout:function(){
            sessionService.destroy('uid');
            $location.path('/login');
            toastr.info('','Logout successful');
        },
        islogged:function(){
            var $checkSessionServer=$http.post('data/check_session.php');
            return $checkSessionServer;
            
            //if(sessionService.get('user')) return true;
            //else return false;
            
        }
    }

});

app.factory('signupService',function($http, $location, sessionService){
    return{
        signup:function(data,scope){
            var $promise=$http.post('data/adduser.php',data); //send data to adduser.php

            $promise.then(function(msg){
                var uid = msg.data;
                console.log(uid);
                if(uid){
                    scope.msgtxt='Done';
                    console.log(scope.msgtxt);
                    sessionService.set('uid',uid);
                    $location.path('/home');
                    toastr.success('Welcome','Success');
                }          
                else  {
                    scope.msgtxt='Already exists';
                    console.log(scope.msgtxt);
                    toastr.error('Error', 'User already exists');
                    $location.path('/login');
                }                  
            });
        }
    }

});*/

/*app.run(function ($rootScope, $location, loginService){
    var routelogin=['/home'];  //route that require login
    var routelogged=['/login'];  //route that require logged out

    $rootScope.$on('$routeChangeStart', function(){
        if( routelogin.indexOf($location.path()) !=-1)
        {
            var connected=loginService.islogged();
            connected.then(function(msg){
                if(!msg.data) $location.path('/login');
            });
        }

        if( routelogged.indexOf($location.path()) !=-1)
        {
            var connected=loginService.islogged();
            connected.then(function(msg){
                if(msg.data) $location.path('/home');
            });
        }
    });

});*/