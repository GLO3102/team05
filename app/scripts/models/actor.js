define(['underscore', 'backbone', 'models/movie'], function(_, Backbone, Movie) {

    var ActorsMovies = Backbone.Collection.extend({
        model: Movie,
        parse: function (response) {
            return response.results;
        }
    });

    function searchImage(search, callback){
        if (typeof(callback) == "function")
            return $.ajax({
                data: 'imgsz=medium&v=1.0&q=' + encodeURI(search + " actor"),
                url: 'https://ajax.googleapis.com/ajax/services/search/images',
                dataType: 'jsonp',
                success: callback
            })
        else
            return $.ajax({
                data: 'imgsz=medium&v=1.0&q=' + encodeURI(search + " actor"),
                url: 'https://ajax.googleapis.com/ajax/services/search/images',
                dataType: 'jsonp'
            })
    }

    var Actor = Backbone.Model.extend({
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
            this.getActorMovies();
            return response;
        },
        getActorMovies: function () {
            var self = this;
            var movies = new ActorsMovies();
            movies.url = this.urlRoot + this.get(this.idAttribute) + '/movies';
            movies.fetch({
                success: function (data) {
                    self.setActorMovies(data)
                }
            });
        },
        getActorPicture: function (actorName) {
            var self = this;
            searchImage(actorName, function (response) {
                self.setActorPicture(response.responseData.results[0].unescapedUrl)
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


    return Actor;
});
