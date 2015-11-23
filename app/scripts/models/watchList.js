define(['underscore', 'backbone', 'libraries/Authentification'], function(_, Backbone) {
    WatchList = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/watchlists',
        defaults: {
            "name": "",
            "movies": [],
            "owner": {
                "email": "",
                "name": "",
                "id": ""
            },
        },
        addMovie: function (movie) {
            this.get('movies').push(movie);
            this.save();
        },

        deleteMovie: function (movieId) {
            var movies = this.get('movies');
            var indexOfMovieToBeRemoved;
            for (var i = 0; i < movies.length; i++) {
                if (movies[i].trackId == movieId) {
                    indexOfMovieToBeRemoved = i;
                }
            }
            if (indexOfMovieToBeRemoved >= 0) {
                movies.splice(indexOfMovieToBeRemoved, 1);
            }
            this.save();
        }

    });

    return WatchList;
});