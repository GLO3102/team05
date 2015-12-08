define(['jquery', 'underscore', 'backbone','collections/searchActors','collections/searchMovies','collections/searchSeries', 'collections/searchUser', 'libraries/authentification'], function($, _,  Backbone, SearchActors, SearchMovies, SearchSeries, SearchUser, auth) {

    SearchGlobal = Backbone.Model.extend({

        actors: new SearchActors(),
        movies: new SearchMovies(),
        series: new SearchSeries(),
        users:  new SearchUser(),

        parse: function(data){
            return data.results;
        },
        Search: function (searchQuery, options) {
            var self = this;

            if(typeof options == 'undefined') options = {};
            var onSuccess = function(){self.trigger('sync', self);}

            this.actors.Search(searchQuery, options, onSuccess);
            this.movies.Search(searchQuery, options, onSuccess);
            this.series.Search(searchQuery, options, onSuccess);
            this.users.Search(searchQuery, options, onSuccess);

        }
    });

    return SearchGlobal;
});
