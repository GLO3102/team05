define(['jquery', 'underscore', 'backbone','models/actor', 'libraries/Authentification'], function($, _,  Backbone, Actor) {

    SearchActors = Backbone.Collection.extend({
        baseUrl: 'https://umovie.herokuapp.com/unsecure/search/actors',
        model: Actor,

        parse: function(data){
            return data.results;
        },
        Search: function (searchQuery, options) {
            this.url = this.baseUrl+'?q='+encodeURI(searchQuery);
            if(typeof options != 'undefined') {
                if (typeof options.limit == 'number')
                    this.url += '&limit=' + Math.floor(options.limit);
            }

            this.fetch();
        }
    });

    return SearchActors;
});
