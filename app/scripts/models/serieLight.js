define(['underscore', 'backbone'], function(_, Backbone) {

    var Serie = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/tvshows/season/',

        idAttribute: "collectionId",
        parse: function (response) {
            if (response.hasOwnProperty("results"))
                response = response.results[0];
            return response;
        }
    });

    return Serie
});
