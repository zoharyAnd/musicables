'use strict';


angular.module('albumModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/album', {
    templateUrl: './View/album.html',
    controller: 'albumController'
  });
}])

angular.module('albumModule').controller('albumController', ['$scope', '$http', function($scope, $http) {
  $scope.current_page = "album PAGE ";

  $scope.albums = []; 
  
  $http({
    method: 'get', 
    url: 'http://api.napster.com/v2.2/albums/new?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    
  }).then(function (response) {
      
      var data = response.data.albums;
      
      for(var i=0; i < data.length; i++){
        var allAlbums = {
          index: i,
          id: data[i].id,
          name: data[i].name.toLowerCase(),
          label: data[i].label.toLowerCase(),
          artist: data[i].artistName.toLowerCase(),
          image: 'https://api.napster.com/imageserver/v2/albums/'+data[i].id.toLowerCase()+'/images/500x500.jpg',
          tracks: data[i].trackCount,
          date: formatDate(data[i].released)
        };

        
        $scope.albums.push(allAlbums);
      }//end for
    },function (error){
      console.log(error, 'can not get data.');
  });


  //onclick of show modal 
  $scope.showDetails = function(albumIndex){
    var albumId = $scope.albums[albumIndex].id;
    showAlbumDetails(albumId);
  }; // end show details
}]); //end scope

