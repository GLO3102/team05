
var SerieView = Backbone.View.extend({
    tagName:'div',
    template: _.template($('#serie-template').html(), {}),

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

function showSerie(id){
    var serie = new Serie({'id':id});
    var serieView = new SerieView({el : $('#app-content'), model:serie});
    serie.fetch({});
}