define(['jquery', 'underscore', 'backbone','collections/searchMovies','libraries/authentification', 'models/movie', 'views/movie'], function($, _,  Backbone, SearchMovies, auth, Movie, MovieView) {
    var SearchMoviesView = Backbone.View.extend({
        tagName:'div',

        userEmail: null,
        userName: null,
        userId: null,
        watchLists: new WatchListCollection(),


        template: _.template($('#search-movie-template').html()),
        watchLists: new WatchListCollection(),
        events: {
           "click  #btn-search-movie": "searchMovie",
           "click  .movie-link": "showMovie",
           "click  #SaveMovie-from-search": "addMovieToWatchList",
           "click .add-to-watchlist":"loadWatchLists"
        },
        initialize: function () {
            var self = this;
            this.model.bind("sync", function () {
                self.render();
            });

            this.userEmail = auth.GetEmail();
            this.userName = auth.GetName();
            this.userId = auth.GetId();
        },
        render: function(){
            var data = this.model;
            this.$el.html(this.template(data));

        },
        searchMovie:function(){
            this.model.Search($('#in-search-movie').val());
        },
        showMovie:function(ev){
            var ctrl = $(ev.currentTarget);

            var movie_id = parseInt(ctrl.parent().attr('movieid'));
            console.log(movie_id);
            var movie = new Movie({'trackId': movie_id});
            if(typeof movieView !='undefined') movieView.cleanup();
            movieView = new MovieView({model: movie, el:$('#app-content')});
            movie.fetch();
        },
        loadWatchLists:function(ev){
            $('#WatchListSelector-from-search').empty();

            $('.add-to-watchlist').removeClass('selected');
            $(ev.currentTarget).addClass('selected');

            var owner = {
                email: this.userEmail,
                name: this.userName,
                id: this.userId
            };
            var self = this;
            this.watchLists.fetch().done(function (){
                self.watchLists.filterByOwner(owner);
                self.watchLists.each(function(watchList){
                    $('#WatchListSelector-from-search').append($('<option>', { value : watchList.id }).text(watchList.get("name")));
                })
            });
            setTimeout(function(){$('#myModal').modal();},50);
        },
        addMovieToWatchList: function(){
            var id = $('#WatchListSelector-from-search :selected').attr("value");
            var watchList = this.watchLists.getWatchListById(id);
            poyo = this.watchLists;
            watchList.addMovie(this.model.models.find(function(a){return a.get('trackId') == $('.selected').parent().attr('movieid');}));
            $('#myModal').modal('hide');
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return SearchMoviesView;
});

