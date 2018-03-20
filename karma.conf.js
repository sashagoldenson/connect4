// Karma configuration
// Generated on Sat Mar 17 2018 19:02:51 GMT-0700 (PDT)

module.exports = function karmaConfig(config) {
  let customBrowsers = ['Chrome', 'Safari', 'Firefox', 'PhantomJS']
  if (process.env.TRAVIS) {
    customBrowsers = ['PhantomJS']
  }

  config.set({

    client: {
      args: parseTestPattern(process.argv)
    },


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'test/**.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*_test.js': ['browserify']
    },


    // Browserify configuration
    browserify: {
      debug: true,
      transform: [
        [
          'babelify',
          {
            presets: 'es2015'
          }
        ], [
          'browserify-istanbul',
          {
            instrumenterConfig: {
              embedSource: true
            }
          }
        ]
      ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['growl', 'progress', 'mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: customBrowsers,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })

  function parseTestPattern(argv) {
    var found = false;
    var pattern = argv.map(function(v) {
      if (found) {
        return v;
      }
      if (v === '--') {
        found = true;
      }
    }).
    filter(function(a) { return a }).
    join(' ');
    return pattern ? ['--grep', pattern] : [];
  }
}
