define(['underscore', 'backbone', 'libraries/youtube'], function(_, Backbone, Youtube) {

    var Movie = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/unsecure/movies/',
        idAttribute: 'trackId',
        defaults: {
            youtubeUrl: ''
        },
        parse: function (response) {
            if (response.hasOwnProperty("results"))
                response = response.results[0];
            this.getMovieVideoURL(response.trackName);
            response.releaseDate = new Date(response.releaseDate);
            return response;
        },
        getMovieVideoURL: function (trackName) {
            var self = this;
            var query = trackName + " " + "trailer";
            Youtube.findFirstVideoUrl(query, function(url) {
               self.setMovieVideoURL(url);
            });
        },
        setMovieVideoURL: function (trailer) {
            this.set("youtubeUrl", trailer);
            this.trigger("sync", this);
        },
    });


    return Movie;
});
