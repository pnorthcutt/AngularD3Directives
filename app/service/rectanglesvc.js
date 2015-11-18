
  'use strict';
angular.module('myApp',[])
.factory('ShapeData',function(){
	function getjsonRectangles(){
		return [
		  { "x_axis": 10, "y_axis": 10, "height": 20, "width":20, "color" : "green" },
		  { "x_axis": 16000000000, "y_axis": 40, "height": 20, "width":20, "color" : "purple" },
		  { "x_axis": 70, "y_axis": 70000000000000, "height": 20, "width":20, "color" : "red" }
		]
	}
	
	return{getjsonRectangles:getjsonRectangles}
});
