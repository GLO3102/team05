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
        bootstrap: '../lib/bootstrap/dist/js/bootstrap',
        async: '../lib/requirejs-plugins/src/async'
    }
});

(function () {
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = 'http://umovie-team05.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

define('gapi', ['async!https://apis.google.com/js/client.js!onload'], function() {
    return gapi.client;
});

require([
    'backbone', 'views/app', 'bootstrap','collections/searchMovies', 'collections/searchActors'
], function (Backbone, AppView, Bootstrap, SearchMovies, SearchActors) {
    Backbone.history.start();
    new AppView();
});

