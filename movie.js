/**
 * Created by Nate on 15-10-28.
 */


function searchTrailer(search, callback){

}

Movie = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/movies/',
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
        searchTrailer(trackName, function (response) {
            self.setMovieVideoURL(response.responseData.results[0].url)
        });
    },
    setMovieVideoURL: function (trailer) {
        this.set("youtubeUrl", trailer);
        this.trigger("sync", this);
    },
});
