/**
 * Created by didia on 15-11-03.
 */

define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

    var SerieView = Backbone.View.extend({
        tagName:'div',
        template: _.template($('#serie-page-template').html()),
        events:{
            "click .link": "showEpisodeDetails"
        },

        initialize: function () {
            var self = this;
            this.model.bind("sync", function () {
                self.render();
            });
        },
        render: function() {
            var data = this.model.toJSON();
            this.$el.html(this.template(data));
        },

        showEpisodeDetails: function(event){
            var trackid = $(event.target).attr("episode-id");
            var episode = this.model.getEpisodeDetail(trackid);
            var episodeSeason = episode.get("collectionName");
            var episodeName = episode.get("trackName");
            var episodeReview = episode.get("previewUrl")
            var episodeDescription = episode.get("longDescription");
            var episodeDuration = episode.get("trackTimeMillis");
            $("#EpisodeCollectionName").html(episodeSeason);
            $("#EpisodeName").html(episodeName);
            $("#episodeposter").attr("src", episode.get("artworkUrl100"));
            $("#episodeReview").attr("src", episode.get("episodeReview"));
            $("#EpisodeDescription").html(episodeDescription);
            $("#EpisodeDuration").html(Math.floor((episodeDuration/1000/60) << 0)+ " Minutes");

        }
    });

    return SerieView;
});
