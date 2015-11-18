describe('hello world',function(){
it('should show off bindings', function() {
	 browser.get('http://localhost:8888');
  expect(element(by.css('div[ng-controller="Controller"] span[ng-bind]')).getText())
      .toBe('Max Karl Ernst Ludwig Planck (April 23, 1858 – October 4, 1947)');
});
})