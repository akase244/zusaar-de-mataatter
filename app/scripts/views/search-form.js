/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SearchFormView = Backbone.View.extend({
        className: 'search-form',

        userId: null,

        sanitize: {},

        initialize: function(params) {
            Backbone.View.prototype.initialize.apply(this, arguments);

            this.userId = params.user_id;

            this.sanitize.encode = function(str) {
                return str.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot').replace(/'/g, '&#39');
            };

            this.sanitize.decode = function(str) {
                return str.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot/g, '"').replace(/&#39/g, '\'');
            };

        },

        template: JST['app/scripts/templates/search-form.ejs'],

        events: {
            'click [name="exec_btn"]': 'execBtnClicked'
        },

        render: function() {
            var assigns = {
                user_id: this.userId,
            };
            this.$el.html(this.template(assigns));
            return this;
        },

        execBtnClicked: function(evt) {
            this.trigger('userIdChanged', this.getUserId());
        },

        getUserId: function() {
            var userId = this.sanitize.encode(this.$el.find('[name="user_id"]').val());
            return userId;
        }

    });

    return SearchFormView;
});
