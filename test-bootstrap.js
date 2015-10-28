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

$(document).ready(function() {
    var movieView = new MovieView({el : $('#app-content')});
    var movie = new Movie({'id':265727087});

    movie.fetch({success:function(){
        $('#app-content').empty();
        movieView = new MovieView({el : $('#app-content'), model:movie});
        movieView.render();
    }});
});