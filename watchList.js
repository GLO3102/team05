WatchList = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/watchlists',
    defaults: {
        "name": "",
        "movies": [],
        "owner": {
            "email": "",
            "name": "",
            "id": ""
        },
    }
});
