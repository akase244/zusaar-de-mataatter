/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var UserItemView = Backbone.View.extend({
        template: JST['app/scripts/templates/user-item.ejs'],

        tagName: 'tr',

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return UserItemView;
});
