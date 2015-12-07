define(['jquery', 'underscore', 'backbone','models/searchGlobal','libraries/authentification'], function($, _,  Backbone, SearchGlobal, auth) {
    var SearchGlobalView = Backbone.View.extend({
        tagName:'div',

        template: _.template($('#search-global-template').html()),
        watchLists: new WatchListCollection(),
        events: {

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
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return SearchGlobalView;
});

