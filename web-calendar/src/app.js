var mylogin = angular.module("Login");

mylogin.controller('loginctrl', function($scope){
     $scope.login = function(){
          console.log($scope.email);
          console.log($scope.password);
     }
});
