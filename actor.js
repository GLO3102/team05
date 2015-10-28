/**
 * Created by Nate on 15-10-28.
 */



Actor = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/actors/',
    parse: function (response) {
        if (response.resultCount != 1) {
            alert("Actor not found");
            return;
        }
        response = response.results[0];
        response.id = response.artistId;
        response.artworkUrl = this.getActorPicture(response.artistName);
        return response;
    },
    getActorPicture: function (actorName) {
        var self = this;
        $.ajax({
            data: 'imgsz=medium&v=1.0&q=' + encodeURI(actorName + " actor"),
            url: 'https://ajax.googleapis.com/ajax/services/search/images',
            dataType: 'jsonp',
            success: function (response) {
                self.setActorPicture(response.responseData.results[0].unescapedUrl)
            }
        });
    },
    setActorPicture: function (picture) {
        this.set("artworkUrl", picture);
        $(document).trigger("artworkUrlLoad", picture);
        // event listener :
        //$( document ).on( "artworkUrlLoad",function(event,picture){alert(picture)});
    }
});