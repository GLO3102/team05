/**
 * Created by Nate on 15-10-28.
 */

Movie = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/movies/',
    idAttribute: 'trackId',
    parse: function (response) {
        if (response.resultCount != 1) {
            alert("Movie not found");
            return;
        }
        response = response.results[0];
        response.releaseDate = new Date(response.releaseDate);
        return response;
    }
});