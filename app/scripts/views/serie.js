/**
 * Created by didia on 15-11-03.
 */

define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

    var SerieView = Backbone.View.extend({
        tagName:'div',
        template: _.template($('#serie-page-template').html()),

        initialize: function () {
            var self = this;
            this.model.bind("sync", function () {
                self.render();
            });
        },
        render: function() {
            var data = this.model.toJSON();
            this.$el.append(this.template(data));
        }
    });

    return SerieView;
});
