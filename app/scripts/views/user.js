/**
 * Created by mohamed on 2015-11-30.
 */
define(['jquery', 'underscore', 'backbone', 'collections/watchLists' ,'libraries/Authentification', 'libraries/crypto'], function($, _,  Backbone, WatchListCollections, auth, crypto) {

    function deteleUserFromFollowersList(data) {
        var followerId = getUserId(data);

        var request = $.ajax({
            type: "DELETE",
            url: "https://umovie.herokuapp.com/follow/"+followerId,
            dataType: "json"
        });
        request.done(function() {
            $('.alert-unfollow').show("slow");
            setTimeout(function () {
                $(".alert-unfollow").hide("slow");
            }, 5000)
        });
        request.fail(function(){
            $('.alert-unfollow-fail').show("slow");
            setTimeout(function () {
                $(".alert-unfollow-fail").hide("slow");
            }, 5000)
        });
    }

    function getUserId(data){
        var id;
        for(i=0; i<data.length; i++){
            if(data[i].email == self.userEmail && data[i].name == self.userName){
                id = data[i]._id;
            }
        }
        return id;
    }

    UserView = Backbone.View.extend({

        template: _.template($('#user-template').html()),

        userId: null,
        userEmail: null,
        userName: null,
        hashEmail:null,
        followersList: null,
        followedId: null,

        events: {
            "click .follow-user": "addToFollowedUsersList",
            "click .unfollow-user": "deleteFromFollowedUsersList",
        },

        initialize: function () {
            var self = this;

            this.model.bind("sync", function () {
                self.render();
            });
        },

        render: function () {
            var self = this;

            this.userId = self.model.id;
            this.userEmail = self.model.get('email');
            this.userName = self.model.get('name');
            this.hashEmail = crypto.md5(this.userEmail);

            var watchLists = new WatchListCollection();
            watchLists.fetch().done(function(data){
                watchLists.filterByOwner({email: self.model.get('email'), name: self.model.get('name'), id: self.model.id});
                var data = self.model;
                self.$el.html(self.template({user:self.model, watchLists:watchLists, hashEmail: self.hashEmail}));
            })
        },

        addToFollowedUsersList: function(){

            var request = $.ajax({
                type: "POST",
                url: "https://umovie.herokuapp.com/follow",
                data: {id: this.userId},
                dataType: "json"
            });
            request.done(function() {
                $('.alert-added-follower').show("slow");
                setTimeout(function () {
                    $(".alert-added-follower").hide("slow");
                }, 5000)
            });
            request.fail(function(){
                alert(auth.Get);
                $('.alert-not-added-follower').show("slow");
                setTimeout(function () {
                    $(".alert-not-added-follower").hide("slow");
                }, 5000)
            });
        },

        deleteFromFollowedUsersList: function(){
            self = this;
            $.ajax({
                type: "GET",
                url: "https://umovie.herokuapp.com/users/"+auth.GetId(),
            })
                .done(function(data){
                    deteleUserFromFollowersList(data.following);
                });
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }

    });

    return UserView;
});
