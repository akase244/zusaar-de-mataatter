/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var EventUserModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return EventUserModel;
});
