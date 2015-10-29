WatchListsView = Backbone.View.extend(
    {

        template: _.template($('#watchLists-template').html()),

        el: '#accordion',

        events: {
            "click .glyphicon-remove": "deleteWatchList"
        },

        initialize: function () {
            var self = this;
            this.collection.bind("sync add remove", function () {
                self.render();
            });
        },
        render: function () {
            this.$el.html(this.template({watchLists: this.collection}));
            return this;
        },
        addWatchList: function () {
            new WatchList({name: "New watchList"});
            this.collection.create({'watchList': 'this'});
        },

        deleteWatchList: function (event) {
            var watchListId = $(event.target).parent().attr("watchList-id");
            var watchList = this.collection.get(watchListId);
            watchList.destroy();
        }
    }
);

