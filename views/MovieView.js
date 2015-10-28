/**
 * Created by marvin on 2015-10-28.
 */

var MovieView = Backbone.View.extend({
    tagName:'div',
    template: _.template($('#movie-template').html(), {}),
    initialize: function () {
        var self = this;
        this.model.bind("sync", function () {
            self.render();
        });
    },
    render: function(){
        this.$el.empty();
        var data = this.model.toJSON();
        this.$el.append(this.template(data));
    }
});