/**
 * Created by Nate on 15-10-28.
 */

ActorsMovies = Backbone.Collection.extend({
    url: function () {
        return 'https://umovie.herokuapp.com/actors/' + this.artistId + '/movies';
    },
    model: Movie,
    parse: function (response) {
        return response.results;
    }
});

Actor = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/actors/',
    defaults: {
        artworkUrl: '',
        movies: []
    },
    idAttribute: "artistId",
    parse: function (response) {
        if (response.resultCount != 1) {
            alert("Actor not found");
            return;
        }
        response = response.results[0];
        this.getActorPicture(response.artistName);
        return response;
    },
    getActorMovies: function () {
        var self = this;
        var movies = new ActorsMovies([], {artistId: this.get(idAttribute)});
        movies.fetch().success(function (data) {
            setActorMovies(data.models);
        })
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
        this.trigger("sync", this);
    },
    setActorMovies: function (movies) {
        this.set("movies", movies);
        this.trigger("sync", this);
    }
});