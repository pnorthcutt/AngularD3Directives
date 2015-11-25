
  'use strict';
angular.module('myApp')
  .controller('Controller', ['$scope','ShapeData','TimelineData','CollisionData','flosvc', function($scope,ShapeData,TimelineData,CollisionData,flosvc) {
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
		
	}
	$scope.showBrush= function(){
		
		$scope.brushttD=CollisionData.getCollision();
		
	}
	$scope.demoFL1= function(){
		
		$scope.forceLO1D=CollisionData.getCollision();
		
	}
	$scope.demoFL2= function(){
		
		$scope.forceLO2D=flosvc.getBigData();
		
	}
	
  }
  
  ])
