define(['jquery', 'underscore', 'backbone','collections/watchLists','libraries/Authentification'], function($, _,  Backbone, WatchListCollection, auth) {

    var MovieView = Backbone.View.extend({
        tagName:'div',

        userEmail: null,
        userName: null,
        userId: null,

        template: _.template($('#movie-page-template').html()),
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

            this.userEmail = auth.GetEmail();
            this.userName = auth.GetName()
            this.userId = auth.GetId();

        },

        render: function(){
            this.$el.empty();
            var data = this.model.toJSON();
            this.$el.html(this.template(data));

        },

        loadWatchLists:function(){
            $('#WatchListSelector').empty();

            var owner = {
                email: this.userEmail,
                name: this.userName,
                id: this.userId
            };
            var self = this;
            this.watchLists.fetch().done(function (){
                self.watchLists.filterByOwner(owner);
                self.watchLists.each(function(watchList){
                    $('#WatchListSelector').append($('<option>', { value : watchList.id }).text(watchList.get("name")));
                })
            });
            setTimeout(function(){$('#myModal').modal();},50);
        },

        addMovieToWatchList: function(){
            var id = $('#WatchListSelector :selected').attr("value");
            var watchList = this.watchLists.getWatchListById(id);
            watchList.addMovie(this.model);
            $('#myModal').modal('hide');
        }
    });

    return MovieView;
});
