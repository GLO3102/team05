define(['jquery', 'underscore', 'backbone','collections/searchActors','libraries/authentification', 'models/actor', 'views/actor'], function($, _,  Backbone, SearchActors, auth, Actor, ActorView) {
    var SearchActorsView = Backbone.View.extend({
        tagName:'div',

        template: _.template($('#search-actor-template').html()),
        watchLists: new WatchListCollection(),
        events: {
            "click  #btn-search-actor": "searchActor",
            //"click  .actor-link": "showActor"
        },
        initialize: function () {
            var self = this;
            this.model.bind("sync", function () {
                self.render();
            });

        },
        render: function(){
            var data = this.model;
            this.$el.html(this.template(data));

        },
        searchActor:function(){
            this.model.Search($('#in-search-actor').val());
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return SearchActorsView;
});

