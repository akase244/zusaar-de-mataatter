/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/user-item'
], function ($, _, Backbone, JST, UserItemView) {
    'use strict';

    var UserListView = Backbone.View.extend({
        template: JST['app/scripts/templates/user-list.ejs'],

        tagName: 'table',

        className: 'user-list',

        initialize: function() {
            Backbone.View.prototype.initialize.apply(this, arguments);
            this.collection.on('reset', this.reset, this);
        },

        reset: function() {
            this.$el.find('tbody').empty();
        },

        render: function() {
            this.$el.html(this.template());
            this.$el.attr('border', '1');
            this.collection.each(function(model) {
                var userItem = new UserItemView({model: model});
                this.$el.find('tbody').append(userItem.render().el);
            }, this);
            return this;
        }
    });

    return UserListView;
});
