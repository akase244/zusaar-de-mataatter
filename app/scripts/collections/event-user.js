/*global define*/

define([
    'underscore',
    'backbone',
    'models/event-user'
], function (_, Backbone, EventUserModel) {
    'use strict';

    var EventUserCollection = Backbone.Collection.extend({
        model: EventUserModel,

        url: 'http://www.zusaar.com/api/event/user/',

        initialize: function(params) {
            Backbone.Collection.prototype.initialize.apply(this, arguments);

            // API parameters
            var param = '';
            for (var key in params) {
                param += key + '=' + params[key] + '&';
            }
            if (param) {
                this.url += '?' + param;
            }
        },

        parse: function(response) {
            var users = [];
            _.each(response.event[0].users, function(user) {
                users.push({
                    user_id: user.user_id,
                    profile_url: user.profile_url,
                    name: user.nickname
                });
            });
            return users;
        },
    });

    return EventUserCollection;
});
