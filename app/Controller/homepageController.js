'use strict';


angular.module('homepageModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './View/homepage.html',
    controller: 'homepageController'
  });
}])

angular.module('homepageModule').controller('homepageController', ['$scope', '$http', function($scope, $http) {
  $scope.current_page = "HOME PAGE ";

  //TOP TRACKS
  $scope.songs = []; 
  
  $http({
    method: 'get', 
    url: 'http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    
  }).then(function (response) {
      
      var data = response.data.tracks;
      for(var i=0; i < data.length; i++){
        var allSongs = {
          id: data[i].id,
          name: data[i].name.toLowerCase(),
          artist: data[i].artistName.toLowerCase(),
          image: 'https://api.napster.com/imageserver/v2/albums/'+data[i].albumId.toLowerCase()+'/images/500x500.jpg',
          album: data[i].albumName.toLowerCase(),
          audioUrl: data[i].previewURL
        };
        $scope.songs.push(allSongs);
      }
    },function (error){
      console.log(error, 'can not get data.');
  }); //end request

  // GENRES
  $scope.genres = []; 
  $http({
    method: 'get', 
    url: 'http://api.napster.com/v2.2/genres?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    
  }).then(function (response) {
      
      var data = response.data.genres;
      for(var i=0; i < data.length; i++){
        var allGenres = {
          id: data[i].id,
          name: data[i].name.toLowerCase(),
        };
        $scope.genres.push(allGenres);
      }
    },function (error){
      console.log(error, 'can not get data.');
  }); //end request

  
  $scope.playSound = function(audioUrl, audioId) {
    createjs.Sound.registerSound(audioUrl, audioId);
    createjs.Sound.play(audioId);
  };
  
  $scope.pauseSound = function(audioId) {
    createjs.Sound.stop(audioId);
  };

  
  
}]);//end scope

