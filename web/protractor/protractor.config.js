const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['specs/**.spec.js'],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true, 
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'none' } }));
        by.addLocator('linkText', (linkTextSample) => {
            var links = document.querySelectorAll('a');
            return Array.prototype.filter.call(links, (a) => {
                return a.textContent === linkTextSample;
              });
        });
    }
}