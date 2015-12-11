define(['jquery', 'underscore', 'backbone', 'models/movie', 'views/movie', 'models/serie', 'views/serie', 'models/actor', 'views/actor', 'collections/watchLists', 'views/watchListsView',  'libraries/authentification',  'libraries/crypto', 'views/searchMovies', 'views/searchActors', 'views/searchSeries', 'views/searchGlobal', 'models/user', 'views/user', 'collections/searchUser', 'views/searchUsers'], function ($, _, Backbone, Movie, MovieView, Serie, SerieView, Actor, ActorView, WatchLists, WatchListsView, Authentification, crypto, SearchMoviesView, SearchActorsView, SearchSeriesView, SearchGlobalView, user, UserView, SearchUser, SearchUsersView) {

    var HomeView = Backbone.View.extend({
        tagName: 'div',
        menuEl: '#menu-content',
        bodyEl: '#app-content',
        lastView : null,
        watchLists: new WatchListCollection(),
        template: _.template($("#home-page-template").html()),
        events: {
            'click a.movie-page-link': 'goToMovie',
            'click a.actor-page-link': 'goToActor',
            'click a.serie-page-link': 'goToSerie',
            'click a.home-page-link': 'goToHome',
            'click a.watchlist-page-link': 'goToWatchList',
            'click a#log-out': 'logOut',
            'click a.user-page-link':'goToUser',
            "click  .actor-link": "showActor",
            "click  .user-link": "showUser",
            "click  .movie-link": "showMovie",
            "click  #SaveMovie-global": "addMovieToWatchList",
            "click .add-to-watchlist-global":"loadWatchLists",
            "click  .serie-link": "showSerie",
            'click a.follow-link':'FollowUser',
            'click #btn-search-global':'searchGlobal',
            'click #profil-current-user':'showCurrentUserProfil'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.$(this.menuEl).html(_.template($("#menu-template").html())({
                name:Authentification.getName(),
                emailHash:crypto.md5(Authentification.getEmail())
            }));
        },
        cleanView: function(){
            if(this.lastView!=null)
                this.lastView.cleanup();
        },
        goToMovie: function (event) {
            searchMovies = new SearchMovies();
            this.cleanView();
            this.lastView = new SearchMoviesView({el:$(this.bodyEl), model:searchMovies});
            this.lastView.render();
        },

        goToActor: function (event) {
            searchActors = new SearchActors();
            this.cleanView();
            this.lastView = new SearchActorsView({el:$(this.bodyEl), model:searchActors});
            this.lastView.render();
        },
        logOut: function (event) {
            Authentification.logout();
            this.cleanup();
            this.trigger('logout-success');
        },

        goToSerie: function (event) {
            searchSeries = new SearchSeries();
            this.cleanView();
            this.lastView = new SearchSeriesView({el:$(this.bodyEl), model:searchSeries});
            this.lastView.render();
        },

        goToUser:function(event){
            searchUsers = new SearchUsers();
            this.cleanView();
            this.LastView = new SearchUsersView({el:$(this.bodyEl), model: searchUsers});
            this.LastView.render();
        },

        goToHome: function () {
            this.render();
        },

        goToWatchList: function () {
            var watchLists = new WatchLists();
            var watchListsView = new WatchListsView({collection: watchLists});
            watchLists.fetch();
            this.$(this.bodyEl).html(watchListsView.$el);
        },

        showCurrentUserProfil:function(){

            var currentUser = new UserModel({'id':Authentification.getId()});
            if(typeof userView != 'undefined') userView.cleanup();
            userView = new UserView({model: currentUser, el:$(this.bodyEl)});
            currentUser.fetch();
        },

        showUser: function(ev) {
            var ctrl = $(ev.currentTarget);

            var user_id = ctrl.parent().attr('userid');
            var user = new UserModel({'id':user_id});
            if(typeof userView != 'undefined') userView.cleanup();
            userView = new UserView({model: user, el:$(this.bodyEl)});
            user.fetch();

        },
        FollowUser: function(ev){
            var ctrl = $(ev.currentTarget);
            var user_id = ctrl.parent().parent().attr('userid');
            var request = $.ajax({
                type: "POST",
                url: "https://umovie.herokuapp.com/follow",
                data: {id: user_id},
                dataType: "json"
            });
            request.done(function() {
                $('.alert-added-follower').show("slow");
                setTimeout(function () {
                    $(".alert-added-follower").hide("slow");
                }, 5000)
            });
            request.fail(function(){
                alert("Impossible d'ajouter "+Authentification.getName()+". L'avez-vous déjà ajouté?");
                $('.alert-not-added-follower').show("slow");
                setTimeout(function () {
                    $(".alert-not-added-follower").hide("slow");
                }, 5000)
            });
        },

        showActor:function(ev){
            var ctrl = $(ev.currentTarget);

            var actor_id = parseInt(ctrl.parent().attr('actorid'));

            var actor = new Actor({'artistId': actor_id});
            if(typeof actorView != 'undefined') actorView.cleanup();
            actorView = new ActorView({model: actor, el:$(this.bodyEl)});
            actor.fetch();
        },
        showMovie:function(ev){
            var ctrl = $(ev.currentTarget);

            var movie_id = parseInt(ctrl.parent().attr('movieid'));
            var movie = new Movie({'trackId': movie_id});
            if(typeof movieView !='undefined') movieView.cleanup();
            movieView = new MovieView({model: movie, el:$(this.bodyEl)});
            movie.fetch();
        },
        showSerie:function(ev){
            var ctrl = $(ev.currentTarget);

            var serie_id = parseInt(ctrl.parent().attr('serieid'));


            var serie = new Serie({'collectionId': serie_id});
            if(typeof serieView != 'undefined') serieView.cleanup();
            serieView = new SerieView({model: serie, el:$(this.bodyEl)});
            serie.fetch();

        },
        searchGlobal:function(){
            if(typeof searchGlobalView != 'undefined') searchGlobalView.cleanup();
            var searchGlobalModel = new SearchGlobal();
            searchGlobalView = new SearchGlobalView({el:$(this.bodyEl),checkbox: $(this.checkbox), model:searchGlobalModel});
            searchGlobalModel.Search($('#input-search-global').val());

        },
        loadWatchLists:function(ev){
            $('#WatchListSelector-global').empty();

            $('.add-to-watchlist-global').removeClass('selected');
            $(ev.currentTarget).addClass('selected');

            var owner = {
                email: Authentification.GetEmail(),
                name: Authentification.GetName(),
                id: Authentification.GetId()
            };
            var self = this;
            this.watchLists.fetch().done(function (){
                self.watchLists.filterByOwner(owner);
                self.watchLists.each(function(watchList){
                    $('#WatchListSelector-global').append($('<option>', { value : watchList.id }).text(watchList.get("name")));
                })
            });
            setTimeout(function(){$('#myModal').modal();},50);
        },
        addMovieToWatchList: function(){
            var id = $('#WatchListSelector-global :selected').attr("value");
            var watchList = this.watchLists.getWatchListById(id);
            watchList.addMovie(searchGlobalView.model.movies.models.find(function(a){return a.get('trackId') == $('.selected').parent().attr('movieid');}));
            $('#myModal').modal('hide');
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return HomeView;
})
