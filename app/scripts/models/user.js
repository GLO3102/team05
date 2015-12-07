/**
 * Created by mohamed on 2015-11-30.
 */
define(['underscore', 'backbone'], function(_, Backbone) {

    UserModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users/',

        idAttribute: 'id',
        parse: function(response){
            return response;
        },
    });

    return UserModel;
});
