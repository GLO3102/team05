/**
 * Created by Nate on 15-10-27.
 */

Token = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/tokenInfo',
    defaults: {
        email: '',
        token: '',
        name: ''
    }
});

function Authentication() {
    this.GetTokenId = function () {
        return (new Token().fetch());
    }

    this.GetUserAndTokenInfo = function () {
        return localStorage.getItem("token");
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
                headers: {'Authorization': this.GetToken()}
            });
        return this;
    }
}

// Hard Coded Authentication
new Authentication()
    .Login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjJmZjdhODJiYmRmNTAzMDA2OGViOTIiLCJleHAiOjE0NDYwNzIyOTMyNTZ9.LM2Mzd0ZUP_UAZ45VfEhWgRGzO6Tzg3KPYuQIF2tJbw").SetHeaders();