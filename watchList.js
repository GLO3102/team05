WatchList = Backbone.Model.extend({
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
