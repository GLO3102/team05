/**
 * Created by didia on 15-11-03.
 */

define(['jquery', 'underscore', 'backbone', 'libraries/youtube', 'libraries/disqus'], function($, _,  Backbone,  Youtube,disqus) {

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
            disqus.load('series', this.model.get("collectionId"));
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
            this.getEpisodeTrailer(episode.get('collectionName'));
            $("#EpisodeDescription").html(episodeDescription);
            $("#EpisodeDuration").html(Math.floor((episodeDuration/1000/60) << 0)+ " Minutes");
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();

        },
        getEpisodeTrailer: function (episodeName) {
            var self = this;
            var query = episodeName + " preview";
            Youtube.findFirstVideoUrl(query, function(url) {
                $("#episodeReview").attr("src", url);
            });
        }
    });

    return SerieView;
});
