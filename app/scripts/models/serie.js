define(['underscore', 'backbone', 'libraries/youtube'], function(_, Backbone, Youtube) {

    var SerieEpisode = Backbone.Model.extend({
        defaults: {}
    });

    var SerieEpisodes = Backbone.Collection.extend({
        model: SerieEpisode,
        parse: function (response) {
            return response.results;
        },

        findEpisode: function(trackId){
        this.get(trackId);
        }
    });

    var Serie = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/tvshows/season/',
        defaults: {
            youtubeUrl: '',
            episodes: []
        },
        idAttribute: "collectionId",
        parse: function (response) {
            if (response.resultCount != 1) {
                alert("Season not found");
                return;
            }
            response = response.results[0];
            response.releaseDate = new Date(response.releaseDate);
            this.getSerieTrailer(response.collectionName);
            this.getSerieEpisodes();
            return response;
        },
        getSerieEpisodes: function () {
            var self = this;
            var episodes = new SerieEpisodes();
            episodes.url = this.urlRoot + this.get(this.idAttribute) + '/episodes';
            episodes.fetch({
                success: function (data) {
                    self.setSerieEpisodes(data)
                }
            });
        },
        getSerieTrailer: function (serieName) {
            var self = this;
            var query = serieName + " trailer";
            Youtube.findFirstVideoUrl(query, function(url) {
               self.setYoutubeUrl(url);
            });
        },
        setYoutubeUrl: function (trailerUrl) {
            this.set("youtubeUrl", trailerUrl);
            this.trigger("sync", this);
        },
        setSerieEpisodes: function (episodes) {
            this.set("episodes", episodes);
            console.log(this);
            this.trigger("sync", this);
        },
        getEpisodeDetail(trackId){
            var myEpisodes = this.get("episodes");
            var myEpisodesModels = myEpisodes.models;
            for( var i = 0; i < myEpisodesModels.length; i++){
                if (myEpisodesModels[i].get("trackId") == trackId){
                    return myEpisodesModels[i];
                }
            }
        }
    });

    return Serie
});
