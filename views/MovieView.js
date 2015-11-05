/**
 * Created by marvin on 2015-10-28.
 */

var MovieView = Backbone.View.extend({
    tagName:'div',
    template: _.template($('#movie-template').html(), {}),

    events: {
        "click  #addToWatchListButton": "addMovieToWatchList",
    },

    initialize: function () {
        var self = this;
        this.model.bind("sync", function () {
            self.render();

        });
    },
    render: function(){
        this.$el.empty();
        var data = this.model.toJSON();
        this.$el.append(this.template(data));
    },
    addMovieToWatchList:function(){
        alert("");
        var watchList = new WatchListCollection();
        watchList.fetch().done(function (){
            watchList.each(function(watchList){
                $('#WatchListSelector').append($('<option>', { value : watchList.id }).text(watchList.get("name")));
            })
        });
    }
});

function showMovie(id){
    var movie = new Movie({'trackId':id});
    var movieView = new MovieView({el : $('#app-content'), model:movie});
    movie.fetch({});
}
