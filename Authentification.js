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

    this.GetUserAndTokenInfo = function () {
        return (new Token().fetch());
    }
    this.GetOwner= function(){
        var token = new Token().fetch();
        var ownerName = token.name;
        var ownerEmail = token.email;
        var ownerId = token.id;
        return {name: ownerName, email: ownerEmail, ownerId: ownerId };
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
    .Login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjJmZjdhYzJiYmRmNTAzMDA2OGViOTMiLCJleHAiOjE0NDY0OTA1NjIyMzN9.9QSh246yCJb3Asc5yKGuDmXQsZBdupVr0ekrYBjyT2A").SetHeaders();
