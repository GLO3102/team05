/**
 * Created by didia on 15-11-03.
 */
define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

    var ActorView = Backbone.View.extend({
        tagName:'div',
        template: _.template($('#actor-page-template').html()),

        initialize: function () {
            var self = this;
            this.model.bind("sync", function () {
                self.render();
            });
        },
        render: function(){
            var data = this.model.toJSON();
            this.$el.html(this.template(data));
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return ActorView;
});
