define(['jquery', 'underscore', 'backbone','collections/searchSeries','libraries/Authentification', 'models/serie', 'views/serie'], function($, _,  Backbone, SearchSeries, auth, Serie, SerieView) {
    var SearchSeriesView = Backbone.View.extend({
        tagName:'div',

        template: _.template($('#search-serie-template').html()),
        watchLists: new WatchListCollection(),
        events: {
            "click  #btn-search-serie": "searchSerie",
            "click  .serie-link": "showSerie"
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
        showSerie:function(ev){
            var ctrl = $(ev.currentTarget);

            var serie_id = parseInt(ctrl.parent().attr('serieid'));


            var serie = new Serie({'collectionId': serie_id});
            if(typeof serieView != 'undefined') serieView.cleanup();
            serieView = new SerieView({model: serie, el:$('#app-content')});
            serie.fetch();

        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return SearchSeriesView;
});

