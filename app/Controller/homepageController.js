'use strict';


angular.module('homepageModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './View/homepage.html',
    controller: 'homepageController'
  });
}])

angular.module('homepageModule').controller('homepageController', ['$scope', function($scope) {
  //console.log($scope);
  $scope.current_page = "HOME PAGE ";



}]);