
  'use strict';
angular.module('myApp')
.factory('CollisionData',function(){
	
	function getCollision(){
		return{count:1}
	}
	return{
	getCollision:getCollision
	}
});
