// Karma configuration
'use strict';

var path = require('path');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to l/oad in the browser
        files: [
            {pattern: 'test/index.js', included: true, watched: false},
        ],

        // list of files to exclude
        exclude: [
            'test/coverage/**',
            'js/**',
            'node_modules/'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/index.js': ['webpack', 'sourcemap'],
        },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                noParse: [
                    /node_modules\/sinon\//,
                ],
                loaders: [{
                    test: /\.js$/,
                    include: [
                        /js|test/,
                    ],
                    exclude: /node_modules/,
                    loader: 'babel',
                }, {
                    test: /\.scss$/,
                    loader: 'style!css!sass?sourceMap=true&sourceMapContents=true',
                }, {
                    test: /\.json$/,
                    loader: 'json',
                }],
                postLoaders: [{
                    test: /\.js$/,
                    include: /src/,
                    exclude: /node_modules/,
                    loader: 'istanbul-instrumenter',
                }]
            },
            externals: {
                'jsdom': 'window',
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': 'window',
                'text-encoding': 'window',
            },
            resolve: {
                alias: {
                    'sinon': 'sinon/pkg/sinon',
                }
            },
            stats: {
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            },
            debug: false,
        },

        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-coverage',
            'karma-chai',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'istanbul-instrumenter-loader',
            'karma-coveralls'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'coveralls'],

        coverageReporter: {
            dir: 'test',
            reporters: [{
                type: 'html',
                subdir: 'coverage'
            }, {
                type: 'text',
            }, {
                type: 'lcov',
                subdir: 'coverage'
            }]
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        browserNoActivityTimeout: 60000,
    });
};
