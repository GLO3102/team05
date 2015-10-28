/**
 * Created by marvin on 2015-10-28.
 */

var MovieView = Backbone.View.extend({
    tagName:'div',
    template: _.template($('#movie-template').html(), {}),
    render: function(){
        var data = this.model.toJSON();
        this.$el.append(this.template(data));
    }
});