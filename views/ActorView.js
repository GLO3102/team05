var ActorView = Backbone.View.extend({
    tagName:'div',
    template: _.template($('#actor-template').html(), {}),

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