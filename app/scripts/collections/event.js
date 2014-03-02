/*global define*/

define([
    'underscore',
    'backbone',
    'models/event',
    'collections/event-user'
], function (_, Backbone, EventModel, EventUserCollection) {
    'use strict';

    var EventCollection = Backbone.Collection.extend({
        model: EventModel,

        url: 'http://www.zusaar.com/api/event/',

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
            var events = [];
            _.each(response.event, function(event) {
                var users = [];
                var params = {
                    event_id: event.event_id,
                    status: 1
                };
                var eventUserCollection = new EventUserCollection(params);
                eventUserCollection.fetch({async: false});
                eventUserCollection.each(function(eventUserModel) {
                    users.push(eventUserModel.attributes);
                });
                events.push({
                    event_id: event.event_id,
                    event_url: event.event_url,
                    title: event.title,
                    users: users
                });
            });
            return events;
        }
    });

    return EventCollection;
});
