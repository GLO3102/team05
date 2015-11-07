define(['jquery', 'underscore', 'backbone','models/watchList'], function($, _,  Backbone, WatchList) {

    WatchListCollection = Backbone.Collection.extend({
        url: 'https://umovie.herokuapp.com/unsecure/watchlists',
        model: WatchList,

        filterByOwner: function (owner) {
            var watchListCollection = new Array();
            this.each(function (watchList) {
                var myOwner = watchList.get("owner");
                if (myOwner.id == owner.id) {
                    watchListCollection.push(watchList);
                }
            })
            this.reset(watchListCollection);
            return this;
        },
        getWatchListById: function (id) {
            return this.findWhere({id: id});
        },

    });

    return WatchListCollection;
});
