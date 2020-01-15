'use strict';


angular.module('artistModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/artist', {
    templateUrl: './View/artist.html',
    controller: 'artistController'
  });
}])

angular.module('artistModule').controller('artistController', ['$scope', '$http', function($scope, $http) {
  
    //ARTISTS
  $scope.artists = []; 
  $http({
    method: 'get', 
    url: 'http://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    
  }).then(function (response) {
      
      var data = response.data.artists;
      for(var i=0; i < data.length; i++){
        var allArtists = {
            index: i,
            id: data[i].id,
            name: data[i].name.toLowerCase(),
            image: 'https://api.napster.com/imageserver/v2/artists/'+data[i].id+'/images/500x500.jpg',
            nbAlbums: data[i].albumGroups.main.length,
            bio: data[i].bios[0].bio
        };
        $scope.artists.push(allArtists);
      }
    },function (error){
      console.log(error, 'can not get data.');
  }); //end request

  //onclick of show modal 
  $scope.showDetails = function(artistIndex){
    var artistId = $scope.artists[artistIndex].id;
    var artistImage = $scope.artists[artistIndex].image;
    var artistName = $scope.artists[artistIndex].name;
    var artistBio = $scope.artists[artistIndex].bio;
    
    showArtistDetails(artistId, artistImage, artistName, artistBio);
  }; // end show details

}]); //end scope

