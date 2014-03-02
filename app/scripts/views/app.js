/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/event',
    'collections/user',
    'models/user',
    'views/user-list'
], function ($, _, Backbone, JST, EventCollection, UserCollection, UserModel, UserListView) {
    'use strict';

    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/app.ejs'],
        eventCollection: null,
        users: [],
        myId: 'Zusaar user_id',

        initialize: function() {
            var params = {
                user_id: this.myId,
                count: 100
            };
            this.eventCollection = new EventCollection(params);
            this.eventCollection.fetch({
                success: $.proxy(this.render, this)
            });
        },

        render: function() {
            this.$el.html(this.template());

            var users = [];
            this.eventCollection.each(function(eventModel) {
                var eventUsers = eventModel.get('users');
                for (var key in eventUsers) {
                    if (eventUsers[key].user_id == this.myId) {
                        continue;
                    }
                    if (!users[eventUsers[key].user_id]) {
                        users[eventUsers[key].user_id] = {
                            profile_url: eventUsers[key].profile_url,
                            name: eventUsers[key].name,
                            events: []
                        };
                    }
                    users[eventUsers[key].user_id].events.push({
                        event_id: eventModel.get('event_id'),
                        event_url: eventModel.get('event_url'),
                        title: eventModel.get('title'),
                    });
                }
            }, this);
            var userCollection = new UserCollection();
            userCollection.reset();
            var userList = new UserListView({collection: userCollection});
            for (var key in users) {
                var userModel = new UserModel({
                    user_id: key,
                    name: users[key].name,
                    profile_url: users[key].profile_url,
                    events: users[key].events
                });
                userCollection.add(userModel);
            }
            userCollection.sort();
            this.$el.append(userList.render().el);

            return this;
        }
    });

    return AppView;
});
