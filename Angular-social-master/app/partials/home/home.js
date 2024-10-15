'use strict';

var app = angular.module('myApp.home', ['ngRoute','myApp.home.newsfeed','ngAnimate']);


app.controller('homeCtrl', ['$scope','$location','Data',function ($scope,$location,Data) {

	$scope.items = ['trend', 'news', 'ecommerce','quora','debate','other'];
	$scope.selection = $scope.items[0];
	
	$scope.setfeed = function(val){
		$scope.selection = $scope.items[val];
		$scope.hidemenu();
	};

	$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    };

    $scope.menutoggle = function () {
       
	        $('#content').toggleClass('cbp-spmenu-push-toright' );
	        $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open');
    };

    $scope.hidemenu =function(){
    		$('#content').removeClass('cbp-spmenu-push-toright' );
	        $('#cbp-spmenu-s1').removeClass('cbp-spmenu-open');
    };
}]);

/* Directives */

app.directive('homeSidebar',function(){
	return{
		templateUrl: 'partials/home/sidebar.html'
	}
});

app.directive('homeNavbar',function(){
	return{
		templateUrl: 'partials/home/navbar.html'
	}
});

app.directive('newsFeed',function(){
	return{
		templateUrl: 'partials/newsfeed/newsfeed.html',
		controller: 'newsfeedCtrl'
	}
});