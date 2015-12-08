/**
 * Created by mohamed on 2015-11-30.
 */
define(['underscore', 'backbone', 'libraries/authentification'], function(_, Backbone, auth) {

    UserModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users/',

        idAttribute: 'id',
        parse: function(response){
            return response;
        },
    });

    return UserModel;
});
