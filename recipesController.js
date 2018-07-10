var app = angular.module('RecipesApp', []);

app.controller('RecipesController', function($scope, $http) {
	var urlBase = "http://127.0.0.1:8080/api/";
	$http.defaults.headers.post["Content-Type"] = "application/json";

	function findAllRecipes() {
		$http.get(urlBase + 'recipes').then(function(response) {
			var recipesList = [];
			if (response.data != undefined) {
				if($scope.isVegetarian){
					for(i=0;i<response.data.length;i++){
						if(response.data[i].isVegetarian){
							recipesList.push(response.data[i]);
						}
					}
				} else {
					recipesList = response.data;
				}
			}
			$scope.recipes = recipesList;
		});
	}

	findAllRecipes();

	$scope.setOnlyVegetarian = function setOnlyVegetarian() {
		findAllRecipes();
	}

	$scope.addRecipe = function addRecipe() {
		$scope.name;
		$scope.description;	
		$scope.dateCreation;
		$scope.dishImage;
		$scope.isVegetarian;
		$scope.dishSuitableQty;
		$scope.ingredients;
		$scope.cookingInstructions;
		
		if ($scope.taskName == "" || $scope.taskDesc == "" || $scope.taskPriority == "" || $scope.taskStatus == "") {

			alert("Insufficient Data! Please provide values for task name, description, priortiy and status");

		} else {

			$http.post(urlBase + '/recipe', {
				name : name,
				description :			$scope.description,
				dishImage :				$scope.dishImage,
				isVegetarian :			$scope.isVegetarian,
				dishSuitableQty :		$scope.dishSuitableQty,
				ingredients :			$scope.ingredients,
				cookingInstructions : 	$scope.cookingInstructions,
			}).success(function(data, status, headers) {
				alert(data);
				var newRecipeUri = headers()["location"];
				console.log("Might be good to GET " + newRecipeUri + " and append the task.");
				findAllRecipes();
			});
		}
	};

	$scope.toggleSelection = function toggleSelection(taskUri) {
		var idx = $scope.selection.indexOf(taskUri);
		if (idx > -1) {
			$http.patch(taskUri, {
				taskStatus : 'ACTIVE'
			}).success(function(data) {
				alert("Recipe unmarked");
				findAllRecipes();
			});
			$scope.selection.splice(idx, 1);
		} else {
			$http.patch(taskUri, {
				taskStatus : 'COMPLETED'
			}).success(function(data) {
				alert("Recipe marked completed");
				findAllRecipes();
			});
			$scope.selection.push(taskUri);

		}

	};

	$scope.archiveRecipes = function archiveRecipes() {
		$scope.selection.forEach(function(taskUri) {
			if (taskUri != undefined) {
				$http.patch(taskUri, {
					taskArchived : 1
				});

			}

		});

		alert("Successfully Archived");

		console.log("It's risky to run this without confirming all the patches are done. when.js is great for that");

		findAllRecipes();

	};

});

app.directive('ngConfirmClick', [
	function() {
		return {
			link : function(scope, element, attr) {
				var msg = attr.ngConfirmClick || "Are you sure?";
				var clickAction = attr.confirmedClick;
				element.bind('click', function(event) {
					if (window.confirm(msg)) {
						scope.$eval(clickAction);
					}
				});
			}
		};
	}
]);