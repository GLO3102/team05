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
    .Login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjJmZjdhYzJiYmRmNTAzMDA2OGViOTMiLCJleHAiOjE0NDYyMjI4OTA1NzN9.KE-Bq13AfGW61_y2RWAduMaq_CbwDcEt2eF2B10_6oI").SetHeaders();
