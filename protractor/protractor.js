var index={
	rectangleButton:element(by.id('drawRecButton')),
	svgContainer:element(by.css('.svgContainer')),
	rectangles:element.all(by.css('.rectangle')),
	get : function() {
		browser.get('http://localhost:8888/index.html');
	  },
	clickRectangleButton: function(){
		this.rectangleButton.click(); 
	}
	
};
describe('index',function(){
	it('should draw a container', function() {
		index.get();
		index.clickRectangleButton();
		expect(index.svgContainer).not.toBe(null)	
	})
	it('should draw the first rectangle', function() {
		index.get();
		index.clickRectangleButton();
		expect(index.rectangles.get(0)).not.toBe(null)
		expect(index.rectangles.get(0).getAttribute('width')).toBe('20')
	})
	it('should draw the second rectangle', function() {
		index.get();
		index.clickRectangleButton();
		expect(index.rectangles.get(1)).not.toBe(null)
		expect(index.rectangles.get(1).getAttribute('width')).toBe('20')
	})
	it('should draw the third rectangle', function() {
		index.get();
		index.clickRectangleButton();
		expect(index.rectangles.get(2)).not.toBe(null)
		expect(index.rectangles.get(2).getAttribute('width')).toBe('20')
	})
})