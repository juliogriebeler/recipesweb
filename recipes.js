/**
 * 
 */
var app = angular.module("RecipesApp", []);
app.controller("Recipe", function($scope, $http) {
    $http.get('http://127.0.0.1:8080/api/recipe').
        then(function(response) {
            $scope.recipes = response.data;
    });
});