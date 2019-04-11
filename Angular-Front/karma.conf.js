// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
  for(var i in modules) {
    if(Object.prototype.hasOwnProperty.call(modules, i)) {
        switch(typeof modules[i]) {
        case "function": break;
        case "object":
            // Module can be created from a template
            modules[i] = (function(_m) {
                var args = _m.slice(1), fn = modules[_m[0]];
                return function (a,b,c) {
                    fn.apply(this, [a,b,c].concat(args)); // Breaks here
                };
            }(modules[i]));
            break;
        default:
            // Module is a copy of another module
            modules[i] = modules[modules[i]];
            break;
        }
    }
}
return modules;
};
