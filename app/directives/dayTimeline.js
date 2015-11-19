  'use strict';
angular.module('myApp')
  .directive('daytl',['d3Service',  function(d3Service) {
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
			scope.render=function(data){
				d3Service.d3().then(function(d3) {
					var drag = d3.behavior.drag()
					.on("drag", function(d,i) {
						console.log(d)
						
						d.start += d3.event.dx
						d.end += d3.event.dx
						d3.select(this).attr("transform", function(d,i){
							return "translate(" + [ d.start ] + ")"
						})
					});
				  
					 var xlinearScale = d3.scale.linear()
								.domain([0,10])
								.range([0,240]);
					 
				  
				     var rootElement = d3.select(element[0]).select("div")
					 rootElement.selectAll("*").remove();
					 var svgContainer = rootElement.append("svg")
														 .attr("width", xlinearScale(24 ) + 20)
														 .attr("height", 50)
														 .style("border", "1px solid black")
														 .classed("svgContainer", true);
					
									  
				  
				
					var rectangles = svgContainer.selectAll("rect")
													 .data(data)
													 .enter()
													 .append("rect");
					
					var rectangleAttributes = rectangles
											  .attr("x", function (d) { return xlinearScale(d.start); })
											  .attr("y", 0)
											  .attr("height", 50)
											  .attr("width", function (d) { return xlinearScale(d.end)-xlinearScale(d.start);  })
											  .style("fill", "blue")
											  .classed("rectangle", true)
											  .call(drag);
				})
			}

		}
	}
  }])