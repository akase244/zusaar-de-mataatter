/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        intro: '../bower_components/intro.js/intro'
    }
});

require([
    'underscore',
    'backbone',
    'views/app',
], function (_, Backbone, AppView) {
    Backbone.history.start();
    var appView = new AppView({el: '.container'});
});
