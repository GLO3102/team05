define(['jquery', 'underscore', 'backbone','models/movie', 'libraries/authentification'], function($, _,  Backbone, Movie, auth) {

    SearchMovies = Backbone.Collection.extend({
        baseUrl: 'https://umovie.herokuapp.com/search/movies',
        model: Movie,

        parse: function(data){
            return data.results;
        },
        Search: function (searchQuery, options) {
            this.url = this.baseUrl+'?q='+encodeURI(searchQuery);
            if(typeof options != 'undefined') {
                if (typeof options.limit == 'number')
                    this.url += '&limit=' + Math.floor(options.limit);
                if (typeof options.genre == 'number')
                    this.url += '&genre=' + Math.floor(options.genre);
            }

            this.fetch();
        }
    });

    return SearchMovies;
});
