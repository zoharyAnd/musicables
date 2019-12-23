// This is the main application module 
'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', ['ngRoute','myApp.version', 'mainModule'])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]);

// creation of a module named mainModule with dependencies for each page-controller
angular.module("mainModule",['homepageModule', 'aboutModule']);

//attach the module with a new controller : mainController 
angular.module("mainModule").controller("mainController",['$scope', function($scope){

}]);

