define(['jquery', 'underscore', 'backbone','models/user', 'libraries/authentification'], function($, _,  Backbone, UserModel,auth) {

    SearchUsers = Backbone.Collection.extend({
        baseUrl: 'https://umovie.herokuapp.com/search/users',
        model: UserModel,

        parse: function(data){
            return data;
        },
        Search: function (searchQuery, options, onSuccess) {
            this.url = this.baseUrl+'?q='+encodeURI(searchQuery);
            if(typeof options != 'undefined') {
                if (typeof options.limit == 'number')
                    this.url += '&limit=' + Math.floor(options.limit);
            }
            if(typeof onSuccess !='function') onSuccess = function(){};

            this.fetch({success:onSuccess});
        }
    });

    return SearchUsers;
});
