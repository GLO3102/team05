/**
 * Created by didia on 15-11-03.
 */

define(['underscore', 'backbone'], function(_, Backbone) {

    var SerieEpisode = Backbone.Model.extend({
        defaults: {}
    });

    var SerieEpisodes = Backbone.Collection.extend({
        model: SerieEpisode,
        parse: function (response) {
            return response.results;
        }
    });

    var Serie = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/tvshows/season/',
        defaults: {
            trailerUrl: '',
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
            var self = this;//to do plug youtube API
            /*$.ajax({
             data: 'imgsz=medium&v=1.0&q=' + encodeURI((serieName) + " actor"),
             url: 'https://ajax.googleapis.com/ajax/services/search/images',
             dataType: 'jsonp',
             success: function (response) {
             self.setActorPicture(response.responseData.results[0].unescapedUrl);
             }
             });*/
        },
        setActorPicture: function (trailerUrl) {
            this.set("trailerUrl", trailerUrl);
            this.trigger("sync", this);
        },
        setSerieEpisodes: function (episodes) {
            this.set("episodes", episodes);
            console.log(this);
            this.trigger("sync", this);
        }
    });

    return Serie
});
