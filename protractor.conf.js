// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/js/app.spec.js'],
    onPrepare: function () {
        // Override the timeout for webdriver.
        ptor.driver.manage().timeouts().setScriptTimeout(60000);
    }
}
