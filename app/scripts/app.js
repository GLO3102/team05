/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        "jquery.alpha": ["jquery"],

    },
    paths: {
        jquery: '../lib/jquery/dist/jquery',
        backbone: '../lib/backbone/backbone',
        underscore: '../lib/lodash/dist/lodash',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap',
        async: '../lib/requirejs-plugins/src/async',
        "jquery.blockUI": '//cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.66.0-2013.10.09/jquery.blockUI.min'
    }
});

define('gapi', ['async!https://apis.google.com/js/client.js!onload'], function() {
    return gapi.client;
});

require([
    'backbone', 'views/app', 'bootstrap','collections/searchMovies', 'collections/searchActors'
], function (Backbone, AppView, Bootstrap, SearchMovies, SearchActors) {
    Backbone.history.start();
    new AppView();
});

