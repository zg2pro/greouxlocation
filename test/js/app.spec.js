describe('app.js spec', function () {

    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    describe('when app is deployed', function () {
        it('should be able to check whats installed', function () {
            browser.get('http://greouxlocation.free.fr');
            browser.wait(function () {
                expect(browser.getTitle()).toEqual('Apartment Renting');
            }, 50000);
        });
    });

});