/**
 * Created by mohamed on 2015-11-30.
 */
define(['underscore', 'backbone', 'libraries/authentification',  'libraries/crypto'], function(_, Backbone, auth, crypto) {

    UserModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users/',

        idAttribute: 'id',
        parse: function(response){
            response.gravatarUrl = "https://www.gravatar.com/avatar/"+crypto.md5(response.email)+"?d=identicon";
            return response;
        },
    });

    return UserModel;
});
