define(['jquery', 'underscore', 'backbone','collections/searchActors','collections/searchMovies','collections/searchSeries', 'collections/searchUser', 'libraries/authentification'], function($, _,  Backbone, SearchActors, SearchMovies, SearchSeries, SearchUser, auth) {





    SearchGlobal = Backbone.Model.extend({

        actors: new SearchActors(),
        movies: new SearchMovies(),
        series: new SearchSeries(),
        users:  new SearchUser(),

        genres: [],
        parse: function(data){
            return data.results;
        },
        Search: function (searchQuery, options) {
            var self = this;

            if(typeof options == 'undefined') options = {};
            var onSuccess = function(type){
                self.getListOfGenres(type);
                self.trigger('sync', self);
            }
            this.movies = new SearchMovies();
            this.series = new SearchSeries();
            this.genres = [];
            this.actors.Search(searchQuery, options, function(){onSuccess("actors")});
            this.movies.Search(searchQuery, options, function(){onSuccess("movies")});
            this.series.Search(searchQuery, options,  function(){onSuccess("series")});
            this.users.Search(searchQuery, options, onSuccess);


        },

        getListOfGenres: function(type){
            if(type == "movies"){
                var moviesGenres = this.movies.map(function(model){
                    return model.get('primaryGenreName');
                });
                this.genres = this.genres.concat(moviesGenres);
                this.filteredMovies = this.movies.models;
            }
            if(type == "series"){
                var seriesGenres = this.series.map(function(model){
                    return model.get('primaryGenreName');
                });
                this.genres = this.genres.concat(seriesGenres);
                this.filteredSeries = this.series.models;
            }

            this.getGenresWithoutDuplicates();

        },

        getGenresWithoutDuplicates: function(){
            var uniqueGenres = [];
            $.each(this.genres, function(i, el){
                if($.inArray(el, uniqueGenres) === -1) uniqueGenres.push(el);
            });
            this.genres = uniqueGenres;
        }
    });

    return SearchGlobal;
});
