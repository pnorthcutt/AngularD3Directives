
  'use strict';
angular.module('myApp')
  .controller('Controller', ['$scope','ShapeData','TimelineData', function($scope,ShapeData,TimelineData) {
	$scope.draw = function(){
		
		$scope.jsonRectangles=ShapeData.getjsonRectangles();
		
	}  
        $scope.drawTimeline= function(){
		
		$scope.time=TimelineData.getDayTimeline();
	}
	
  }
  
  ])
