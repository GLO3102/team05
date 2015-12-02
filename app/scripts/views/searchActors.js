define(['jquery', 'underscore', 'backbone','collections/searchActors','libraries/Authentification', 'models/actor', 'views/actor'], function($, _,  Backbone, SearchActors, auth, Actor, ActorView) {
    var SearchActorsView = Backbone.View.extend({
        tagName:'div',

        template: _.template($('#search-actor-template').html()),
        watchLists: new WatchListCollection(),
        events: {
            "click  #btn-search-actor": "searchActor",
            "click  .actor-link": "showActor"
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
        showActor:function(ev){
            var ctrl = $(ev.currentTarget);

            var actor_id = parseInt(ctrl.parent().attr('actorid'));

            var actor = new Actor({'artistId': actor_id});
            if(typeof actorView != 'undefined') actorView.cleanup();
            actorView = new ActorView({model: actor, el:$('#app-content')});
            actor.fetch();
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return SearchActorsView;
});

