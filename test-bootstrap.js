
$(document).ready(function() {
    //showMovie(265727087);
    //showActor(272994458);
    a = new WatchListCollection();
    a.fetch();
    b = new WatchListsView({collection:a});
    b.render();
});
