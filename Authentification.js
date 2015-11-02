/**
 * Created by Nate on 15-10-27.
 */

Token = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/tokenInfo',
    defaults: {
        email: '',
        token: '',
        name: '',
        id: ''
    }
});

function Authentication() {
    this.GetTokenId = function () {
        return localStorage.getItem("token");
    }

    this.GetUserAndTokenInfoWithCallback = function (callback) {
        var token = new Token();
        if (typeof(callback) == "function")
            return token.fetch({
                success: function(){callback(token)}
            });
        else
            return token.fetch();
    }
    this.IsLoggedIn = function () {
        return this.GetTokenId() != null;
    }

    this.Login = function (token) {
        localStorage.setItem("token", token);
        return this;
    }

    this.Logout = function () {
        localStorage.removeItem("token")
        return this;
    }

    this.SetHeaders = function () {
        if (this.IsLoggedIn())
            $.ajaxSetup({
                headers: {'Authorization': this.GetTokenId()}
            });
        return this;
    }
}

// Hard Coded Authentication
auth = new Authentication()
    .Login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjJmZjdhODJiYmRmNTAzMDA2OGViOTIiLCJleHAiOjE0NDY1ODY3NDg5Mjh9.7qZTPuzrTtkIrALJeSZ4wgeM2J56ItQlFw_M3AmUPFM").SetHeaders();
