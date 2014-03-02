/*global define*/

define([
    'underscore',
    'backbone',
    'models/user'
], function (_, Backbone, UserModel) {
    'use strict';

    var UserCollection = Backbone.Collection.extend({
        model: UserModel,

        comparator: function(userModel) {
            // [-] : descending sort
            return - userModel.get('events').length;
        }

    });

    return UserCollection;
});
