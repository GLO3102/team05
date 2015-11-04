define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

    var MovieView = Backbone.View.extend({
        tagName: 'div',
        template: _.template($("#movie-page-template").html()),

        initialize: function () {
            var self = this;
            this.model.bind("sync", function () {
                self.render();
            });
        },

        render: function(){
            var data = this.model.toJSON();
            this.$el.append(this.template(data));
        }
    });

    return MovieView;
});
