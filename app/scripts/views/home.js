define(['jquery', 'underscore', 'backbone', 'models/movie', 'views/movie', 'models/serie', 'views/serie', 'models/actor', 'views/actor', 'collections/watchLists', 'views/watchListsView'], function ($, _, Backbone, Movie, MovieView, Serie, SerieView, Actor, ActorView, WatchLists, WatchListsView) {

    var HomeView = Backbone.View.extend({
        tagName: 'div',
        menuEl: '#menu-content',
        bodyEl: '#app-content',
        template: _.template($("#home-page-template").html()),

        events: {
            'click a.movie-page-link': 'goToMovie',
            'click a.actor-page-link': 'goToActor',
            'click a.serie-page-link': 'goToSerie',
            'click a.home-page-link': 'goToHome',
            'click a.watchlist-page-link': 'goToWatchList'
        },

        initialize: function () {
            this.render();

        },

        render: function () {
            this.$el.html(this.template());
            this.$(this.menuEl).html(_.template($("#menu-template").html()));
        },

        goToMovie: function (event) {
            var movie_id = $(event.target).closest('a').data('movie-id');
            var movie = new Movie({'trackId': movie_id});
            var movieView = new MovieView({model: movie});
            movie.fetch();
            this.$(this.bodyEl).html(movieView.$el);
        },

        goToActor: function (event) {
            var actor_id = $(event.target).closest('a').data('actor-id');
            var actor = new Actor({'artistId': actor_id});
            var actorView = new ActorView({model: actor});
            actor.fetch();
            this.$(this.bodyEl).html(actorView.$el);
        },

        goToSerie: function (event) {
            var serie_id = $(event.target).closest('a').data('serie-id');
            var serie = new Serie({'collectionId': serie_id});
            var serieView = new SerieView({model: serie});
            serie.fetch();
            this.$(this.bodyEl).html(serieView.$el);
        },

        goToHome: function () {
            this.render();
        },

        goToWatchList: function () {
            var watchLists = new WatchLists();
            var watchListsView = new WatchListsView({collection: watchLists});
            watchLists.fetch();
            this.$(this.bodyEl).html(watchListsView.$el);
        }
    });

    return HomeView;
})
