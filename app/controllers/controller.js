
  'use strict';
angular.module('myApp')
  .controller('Controller', ['$scope','ShapeData', function($scope,ShapeData) {
	$scope.draw = function(){
		
		$scope.jsonRectangles=ShapeData.getjsonRectangles();
		
	}  
    
	
  }
  
  ])
