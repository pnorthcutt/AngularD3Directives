  'use strict';
angular.module('myApp')
  .directive('brushtt',['d3Service',  function(d3Service) {
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
					scope.startDemo();
				}
				
			});
			scope.startDemo=function(){
				
			   d3.helper = {};

				d3.helper.tooltip = function(){
					var tooltipDiv;
					var bodyNode = d3.select('body').node();

					function tooltip(selection){

						selection.on('mouseover.tooltip', function(pD, pI){
							// Clean up lost tooltips
							d3.select('body').selectAll('div.tooltip').remove();
							// Append tooltip
							tooltipDiv = d3.select('body')
										   .append('div')
										   .attr('class', 'tooltip')
							var absoluteMousePos = d3.mouse(bodyNode);
							tooltipDiv.style({
								left: (absoluteMousePos[0] + 10)+'px',
								top: (absoluteMousePos[1] - 40)+'px',
								'background-color': '#d8d5e4',
								width: '65px',
								height: '30px',
								padding: '5px',
								position: 'absolute',
								'z-index': 1001,
								'box-shadow': '0 1px 2px 0 #656565'
							});

							var first_line = '<p>X-Value: ' + pD.index + '</p>'
							var second_line = '<p>Y-Value: ' + pD.value + '</p>'

							tooltipDiv.html(first_line + second_line)
						})
						.on('mousemove.tooltip', function(pD, pI){
							// Move tooltip
							var absoluteMousePos = d3.mouse(bodyNode);
							tooltipDiv.style({
								left: (absoluteMousePos[0] + 10)+'px',
								top: (absoluteMousePos[1] - 40)+'px'
							});
						})
						.on('mouseout.tooltip', function(pD, pI){
							// Remove tooltip
							tooltipDiv.remove();
						});

					}

					tooltip.attr = function(_x){
						if (!arguments.length) return attrs;
						attrs = _x;
						return this;
					};

					tooltip.style = function(_x){
						if (!arguments.length) return styles;
						styles = _x;
						return this;
					};

					return tooltip;
				};

				var data = [];
				var values = [];
				for (var i = 2; i <= 10; i++) {
					var val = Math.floor(Math.random() * (50 - 5 + 1) + 5);
					data.push({index: i, value: val});
					values.push(val);
				}

				var margin = {top: 20, right: 20, bottom: 60, left: 40},
					width = 960 - margin.left - margin.right,
					height = 500 - margin.top - margin.bottom;

				var x = d3.scale.linear()
					.range([0, width])
					.domain([0, 50]);

				var y = d3.scale.linear()
					.range([height, 0])
					.domain([0, d3.max(values) + 5]);

				var brush = d3.svg.brush()
					.x(x)
					.on("brush", brushmove)
					.on("brushend", brushend);

				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom");

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.ticks(11);

				var svg = d3.select("body").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				  .append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				svg.append("g")
					.attr("class", "x axis")
					.attr("clip-path", "url(#clip)")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "y axis")
					.call(yAxis);

				svg.append("g")
					.attr("class", "brush")
					.call(brush)
				  .selectAll('rect')
					.attr('height', height);

				svg.append("defs").append("clipPath")
					.attr("id", "clip")
				  .append("rect")
					.attr("width", width)
					.attr("height", height + 20);

				var points = svg.selectAll(".point")
					.data(data)
				  .enter().append("circle")
					.attr("class", "point")
					.attr("clip-path", "url(#clip)")
					.attr("r", function(d){return Math.floor(Math.random() * (20 - 5 + 1) + 5);})
					.attr("cx", function(d) { return x(d.index); })
					.attr("cy", function(d) { return y(d.value); })
					.call(d3.helper.tooltip());

				points.on('mousedown', function(){
				  var brush_elm = svg.select(".brush").node(),
				  new_click_event = new Event('mousedown');
				  new_click_event.pageX = d3.event.pageX;
				  new_click_event.clientX = d3.event.clientX;
				  new_click_event.pageY = d3.event.pageY;
				  new_click_event.clientY = d3.event.clientY;
				  brush_elm.dispatchEvent(new_click_event);
				});

				function brushmove() {
				  var extent = brush.extent();
				  points.classed("selected", function(d) {
					var is_brushed = extent[0] <= d.index && d.index <= extent[1];
					return is_brushed;
				  });
				}

				function brushend() {
				  var get_button = d3.select(".clear-button");
				  if(get_button.empty() === true) {
					var clear_button = svg.append('text')
					  .attr("y", 460)
					  .attr("x", 825)
					  .attr("class", "clear-button")
					  .text("Clear Brush");
				  }

				  x.domain(brush.extent());

				  transition_data();
				  reset_axis();

				  points.classed("selected", false);
				  d3.select(".brush").call(brush.clear());

				  clear_button.on('click', function(){
					x.domain([0, 50]);
					transition_data();
					reset_axis();
					clear_button.remove();
				  });
				}

				function transition_data() {
				  svg.selectAll(".point")
					.data(data)
					
				  .transition()
					.duration(500)
					.attr("cx", function(d) { return x(d.index); });
				}

				function reset_axis() {
				  svg.transition().duration(500)
				   .select(".x.axis")
				   .call(xAxis);
				}


			   
			   
			   
			
			};

		}

	}
	
  }])