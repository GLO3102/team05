
$(document).ready(function() {
    /*
    var movie = new Movie({'id':265727087});
    var movieView = new MovieView({el : $('#app-content'), model:movie});
    movie.fetch({success:function(){
        //$('#app-content').empty();
        console.log('fetched');
        //movieView.render();
    }});*/

    var actor = new Actor({'id':253584821});
    var actorView = new ActorView({el : $('#app-content'), model:actor});
    actor.fetch({});

});