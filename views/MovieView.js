/**
 * Created by marvin on 2015-10-28.
 */

var MovieView = Backbone.View.extend({
    tagName:'div',
    template: _.template($('#movie-template').html(), {}),

    token: null,

    watchLists: new WatchListCollection(),


    events: {
        "click  #addToWatchListButton": "loadWatchLists",
        "click  #SaveMovie": "addMovieToWatchList"
    },

    initialize: function () {
        var self = this;
        this.model.bind("sync", function () {
            self.render();
        });
        auth.GetUserAndTokenInfoWithCallback(function(token){
            self.token = token ;
            self.trigger("sync", this);});

    },
    render: function(){
        this.$el.empty();
        var data = this.model.toJSON();
        this.$el.append(this.template(data));

    },
    loadWatchLists:function(){
        $('#WatchListSelector').empty();
        if(this.token != null){
            var owner = {email: this.token.get("email"), name: this.token.get("name"),  id: this.token.id};
        }
        var self = this;
        this.watchLists.fetch().done(function (){
            self.watchLists.filterByOwner(owner);
            self.watchLists.each(function(watchList){
                $('#WatchListSelector').append($('<option>', { value : watchList.id }).text(watchList.get("name")));
            })
        });
    },
    addMovieToWatchList: function(){
        var id = $('#WatchListSelector :selected').attr("value");
        var watchList = this.watchLists.getWatchListById(id);
        watchList.save();

    }
});

function showMovie(id){
    var movie = new Movie({'trackId':id});
    var movieView = new MovieView({el : $('#app-content'), model:movie});
    movie.fetch({});
}
