define(['jquery', 'underscore', 'backbone','collections/searchSeries','libraries/authentification', 'models/serie', 'views/serie'], function($, _,  Backbone, SearchSeries, auth, Serie, SerieView) {
    var SearchSeriesView = Backbone.View.extend({
        tagName:'div',

        template: _.template($('#search-serie-template').html()),
        watchLists: new WatchListCollection(),
        events: {
            "click  #btn-search-serie": "searchSerie",
            //"click  .serie-link": "showSerie"
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
        searchSerie:function(){
            this.model.Search($('#in-search-serie').val());
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return SearchSeriesView;
});

