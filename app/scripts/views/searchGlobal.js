define(['jquery', 'underscore', 'backbone','models/searchGlobal','libraries/authentification'], function($, _,  Backbone, SearchGlobal, auth) {

    var SearchGlobalView = Backbone.View.extend({
        tagName:'div',

        template: _.template($('#search-global-template').html()),
        watchLists: new WatchListCollection(),
        selectedGenres: [],
        filteredSeries: [],
        filteredMovies: [],

        events: {
            "click .genre":  "filterWithGenre"

        },
        initialize: function () {
            var self = this;
            this.model.bind("sync", function () {
                self.filteredMovies = self.model.movies.models;
                self.filteredSeries = self.model.series.models;
                self.render();
            });
        },
        render: function(){
            var data = this.model;
            this.$el.html(this.template({searchData: data, filteredSeries: this.filteredSeries, filteredMovies: this.filteredMovies}));
        },

        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        },

        filterWithGenre: function(event){
            this.selectedGenres = [];
            var genre = $(event.target).attr("value");

            if($(event.target).is(":checked")){
                this.selectedGenres.push(genre);
            }else {
                var index = this.selectedGenres.indexOf(genre);
                if (index > -1) {
                    this.selectedGenres.splice(index, 1);
                }
            }
            if(this.selectedGenres.length == 0){
                this.filteredMovies = this.model.movies.models;
                this.filteredSeries = this.model.series.models;
            }
            this.filteredMovies = [];
            this.filteredSeries = [];
            for(var i = 0; i < this.selectedGenres.length; i++){

                this.filteredMovies = this.filteredMovies.concat(this.model.movies.where({primaryGenreName: this.selectedGenres[i] }));
                this.filteredSeries = this.filteredSeries.concat(this.model.series.where({primaryGenreName: this.selectedGenres[i] }));
            }

            $(this.el).empty();
            this.render();
        },


    });

    return SearchGlobalView;
});

