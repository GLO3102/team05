WatchListCollection = Backbone.Collection.extend({
    url: 'https://umovie.herokuapp.com/watchlists',
    model: WatchList,
});