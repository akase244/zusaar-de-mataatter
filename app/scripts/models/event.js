/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var EventModel = Backbone.Model.extend({
        defaults: {
        },
    });

    return EventModel;
});
