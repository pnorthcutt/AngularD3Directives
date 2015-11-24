
  'use strict';
angular.module('myApp')
  .controller('Controller', ['$scope','ShapeData','TimelineData','CollisionData', function($scope,ShapeData,TimelineData,CollisionData) {
	$scope.draw = function(){
		
		$scope.jsonRectangles=ShapeData.getjsonRectangles();
		
	}  
        $scope.drawTimeline= function(){
		
		$scope.time=TimelineData.getDayTimeline();
	}
	$scope.showCollision= function(){
		
		$scope.collisionD=CollisionData.getCollision();
		
	}
	$scope.showDistance= function(){
		
		$scope.distanceD=CollisionData.getCollision();
		console.log("setting distanceD:",$scope.distanceD)
	}
	
  }
  
  ])
