define(['jquery', 'underscore', 'backbone', 'libraries/Authentification'], function($, _,  Backbone, auth) {

    function getSelectedWatchList(event, collection) {
        var watchListId = $(event.target).parent().parent().attr("watchList-id");
        return collection.get(watchListId);
    }

    var WatchListsView = Backbone.View.extend({

        template: _.template($('#watchLists-template').html()),

        userEmail: null,
        userName: null,
        userId: null,


        events: {
            "click .glyphicon-remove": "deleteWatchList",
            "click .glyphicon-pencil": "editWatchList",
            "click .watchListSaveButton ": "addWatchList",
            "click  .delete-movie": "deleteMovieFromWatchList"
        },
        initialize: function () {
            var self = this;
            _.bindAll(this, 'render');
            this.collection.bind("sync add remove", function () {
                self.render();
            });
            this.userEmail = auth.GetEmail();
            this.userName = auth.GetName()
            this.userId = auth.GetId();
        },


        render: function () {
            var owner = {
                email: this.userEmail,
                name: this.userName,
                id: this.userId
            };
            this.$el.html(this.template({watchLists: this.collection.filterByOwner(owner)}));
            return this;
        },

        addWatchList: function () {
            var self = this;

            if ($('.watchListName').val().trim().length == 0) {
                $('.add-watchList-alert').show("slow");
                setTimeout(function () {
                    $(".add-watchList-alert").hide("slow");
                }, 5000)
            }
            else {
                var owner = {
                    email: this.userEmail,
                    name: this.userName,
                    id: this.userId
                };
                self.collection.create({name: $('.watchListName').val(), movies: [], owner: owner});
                $('.modal-backdrop').remove();
            }
        },

        deleteWatchList: function (event) {
            var watchList = getSelectedWatchList(event, this.collection);
            watchList.destroy();
        },

        editWatchList: function (event) {
            var watchListId = $(event.target).parent().parent().attr("watchList-id");
            var watchList = $("#Title" + watchListId);
            watchList.attr("contentEditable", true);
            watchList.focus();
            var self = this;
            watchList.one("focusout", function () {
                var myWatchList = self.collection.get(watchListId);
                var newText = ($(this).text()).replace(/(\r\n|\n|\r)/gm, "");
                if (newText.trim().length !== 0) {
                    myWatchList.set('name', newText);
                    myWatchList.save();
                    watchList.attr("contentEditable", false);
                } else {
                    self.render();
                }
            });
        },

        deleteMovieFromWatchList: function (event) {
            var movieId = $(event.target).parent().attr("movie-id");
            var watchListId = $(event.target).parent().attr("watchList-id");
            var watchList = this.collection.getWatchListById(watchListId);
            watchList.deleteMovie(movieId);
        }
    });


    return WatchListsView;
});
