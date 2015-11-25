  'use strict';
angular.module('myApp')
  .directive('forcelo2',['d3Service',  function(d3Service) {
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
			scope.render=function(graph){
				// Define the dimensions of the visualization. We're using
				// a size that's convenient for displaying the graphic on
				// http://jsDataV.is

				var width = 640,
					height = 480;

				// Here's were the code begins. We start off by creating an SVG
				// container to hold the visualization. We only need to specify
				// the dimensions for this container.

				var svg = d3.select('body').append('svg')
					.attr('width', width)
					.attr('height', height);

				// Extract the nodes and links from the data.
				var nodes = graph.nodes,
					links = graph.links;

				// Now we create a force layout object and define its properties.
				// Those include the dimensions of the visualization and the arrays
				// of nodes and links.

				var force = d3.layout.force()
					.size([width, height])
					.nodes(nodes)
					.links(links);

				// There's one more property of the layout we need to define,
				// its `linkDistance`. That's generally a configurable value and,
				// for a simple example, we'd normally leave it at its default.
				// Unfortunately, the default value results in a visualization
				// that's not especially clear. This parameter defines the
				// distance (normally in pixels) that we'd like to have between
				// nodes that are connected. (It is, thus, the length we'd
				// like our links to have.)

				force.linkDistance(width/3.05);

				// Next we'll add the nodes and links to the visualization.
				// Note that we're just sticking them into the SVG container
				// at this point. We start with the links. The order here is
				// important because we want the nodes to appear "on top of"
				// the links. SVG doesn't really have a convenient equivalent
				// to HTML's `z-index`; instead it relies on the order of the
				// elements in the markup. By adding the nodes _after_ the
				// links we ensure that nodes appear on top of links.

				// Links are pretty simple. They're just SVG lines, and
				// we're not even going to specify their coordinates. (We'll
				// let the force layout take care of that.) Without any
				// coordinates, the lines won't even be visible, but the
				// markup will be sitting inside the SVG container ready
				// and waiting for the force layout.

				var link = svg.selectAll('.link')
					.data(links)
					.enter().append('line')
					.attr('class', 'link');

				// Now it's the nodes turn. Each node is drawn as a circle.

				var node = svg.selectAll('.node')
					.data(nodes)
					.enter().append('circle')
					.attr('class', 'node');

				// We're about to tell the force layout to start its
				// calculations. We do, however, want to know when those
				// calculations are complete, so before we kick things off
				// we'll define a function that we want the layout to call
				// once the calculations are done.

				force.on('end', function() {

					// When this function executes, the force layout
					// calculations have concluded. The layout will
					// have set various properties in our nodes and
					// links objects that we can use to position them
					// within the SVG container.

					// First let's reposition the nodes. As the force
					// layout runs it updates the `x` and `y` properties
					// that define where the node should be centered.
					// To move the node, we set the appropriate SVG
					// attributes to their new values. Also give the
					// nodes a non-zero radius so they're visible.

					node.attr('r', width/100)
						.attr('cx', function(d) { return d.x; })
						.attr('cy', function(d) { return d.y; });

					// We also need to update positions of the links.
					// For those elements, the force layout sets the
					// `source` and `target` properties, specifying
					// `x` and `y` values in each case.

					link.attr('x1', function(d) { return d.source.x; })
						.attr('y1', function(d) { return d.source.y; })
						.attr('x2', function(d) { return d.target.x; })
						.attr('y2', function(d) { return d.target.y; });

				});

				// Okay, everything is set up now so it's time to turn
				// things over to the force layout. Here we go.

				force.start();

				// By the time you've read this far in the code, the force
				// layout has probably finished its work.


				
				
				
			}

		}
	}
  }])