  'use strict';
angular.module('myApp')
  .directive('rectangles',['d3Service',  function(d3Service) {
  return {
	restrict: 'E',
    template: '<div></div>',
	scope:{
		data:'=data'
	},
	  link: function postLink(scope, element, attrs){
		  scope.$watch('data', function(newValue, oldValue) {
			    if(newValue!==oldValue)
				{
					scope.render(scope.data);
				}
				
			});
			scope.render=function(jsonRectangles){
				var max_x = 0; //This will be updated to be the max x-coordinate
				var max_y = 0; //This will be updated to be the max y-coordinate
				d3Service.d3().then(function(d3) {
				 
				  //We loop through our jsonRectangles array
					for (var i = 0; i < jsonRectangles.length; i++) {

					  var temp_x, temp_y;

					  // To get the farthest right hand point, we need to add the x-coordinate and the width
					  var temp_x = jsonRectangles[i].x_axis + jsonRectangles[i].width;

					  // To get the farthest bottom point, we need to add the y-coordinate and the height
					  var temp_y = jsonRectangles[i].y_axis + jsonRectangles[i].height;

					  /**
					  * If the temporary x-coordinate is bigger than the max_x,
					  * make the max_x equal to the temp_x
					  * otherwise, do nothing.
					  */
					  if ( temp_x >= max_x ) {
						max_x = temp_x;
					  }

					  /**
					  * If the temporary y-coordinate is bigger than the max_y,
					  * make the max_y equal to the temp_y
					  * otherwise, do nothing.
					  */
					  if ( temp_y >= max_y ) {
						max_y = temp_y;
					  }

					}//End of the loop
					  var xlinearScale = d3.scale.linear()
								.domain([0,max_x])
								.range([0,100]);
					  var ylinearScale = d3.scale.linear()
                            .domain([0,max_y])
                            .range([0,100]);
				  //to (using the new max_x and max_y variables
				  
				     var rootElement = d3.select(element[0]).select("div")
					 rootElement.selectAll("*").remove();
					 var svgContainer = rootElement.append("svg")
														 .attr("width", xlinearScale(max_x ) + 20)
														 .attr("height", ylinearScale(max_y) + 20)
														 .style("border", "1px solid black")
														 .classed("svgContainer", true);
					//Note - we add 20 units to the max_x and max_y to give the elements some stylistic room
														 
					 
					var rectangles = svgContainer.selectAll("rect")
												 .data(jsonRectangles)
												 .enter()
												 .append("rect");

					var rectangleAttributes = rectangles
											  .attr("x", function (d) { return xlinearScale(d.x_axis); })
											  .attr("y", function (d) { return ylinearScale(d.y_axis); })
											  .attr("height", function (d) { return d.height; })
											  .attr("width", function (d) { return d.width; })
											  .style("fill", function(d) { return d.color; })
											  .classed("rectangle", true);
									  
				  
				});
				
				
				
			}

		}
	}
  }])