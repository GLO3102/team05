/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../lib/jquery/dist/jquery',
        backbone: '../lib/backbone/backbone',
        underscore: '../lib/lodash/dist/lodash',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone', 'views/app'
], function (Backbone, AppView) {
    Backbone.history.start();
    new AppView();
});

