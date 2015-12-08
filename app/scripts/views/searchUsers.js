define(['jquery', 'underscore', 'backbone','collections/searchUser','libraries/authentification'], function($, _,  Backbone, SearchUsers, auth) {
    var SearchUsersView = Backbone.View.extend({
        tagName:'div',

        template: _.template($('#search-user-template').html()),
        events: {
            "click  #btn-search-user": "searchUser",
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
        searchUser:function(){
            var self = this;
            this.model.Search($('#in-search-user').val());
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return SearchUsersView;
});
