define(['jquery', 'underscore', 'backbone','collections/searchActors','collections/searchMovies','collections/searchSeries', 'libraries/authentification'], function($, _,  Backbone, SearchActors, SearchMovies, SearchSeries, auth) {


    SearchGlobal = Backbone.Model.extend({

        actors: new SearchActors(),
        movies: new SearchMovies(),
        series: new SearchSeries(),
        genres: [],


        parse: function(data){
            return data.results;
        },
        Search: function (searchQuery, options) {
            var self = this;

            if(typeof options == 'undefined') options = {};
            var onSuccess = function(type){
                self.trigger('sync', self);
                self.getListOfGenres(type);

            }
            this.actors = new SearchActors();
            this.movies = new SearchMovies();
            this.series = new SearchSeries();
            this.genres = [];
            this.actors.Search(searchQuery, options, function(){onSuccess("actors")});
            this.movies.Search(searchQuery, options, function(){onSuccess("movies")});
            this.series.Search(searchQuery, options,  function(){onSuccess("series")});


        },

        getListOfGenres: function(type){
            if(type == "actors"){
                var actorGenres = this.actors.map(function(model){
                    return model.get('primaryGenreName');
                });
                this.genres = this.genres.concat(actorGenres);
            }
            if(type == "movies"){
                var moviesGenres = this.movies.map(function(model){
                    return model.get('primaryGenreName');
                });
                this.genres = this.genres.concat(moviesGenres);
            }
            if(type == "series"){
                var seriesGenres = this.series.map(function(model){
                    return model.get("primaryGenreName")
                });
                this.genres = this.genres.concat(seriesGenres);
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
