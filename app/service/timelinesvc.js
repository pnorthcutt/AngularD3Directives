
  'use strict';
angular.module('myApp')
.factory('TimelineData',function(){
	function getDayTimeline(){
		return [
		  { start: 1,end:5 },
		  { start: 10,end:12 },
		   { start: 18,end:23 }
		]
	}
	
	return{getDayTimeline:getDayTimeline}
});
