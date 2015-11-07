define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

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
            if (this.IsLoggedIn()) {
                var token = new Token();
                if (typeof(callback) == "function")
                    return token.fetch({
                        success: function () {
                            callback(token)
                        }
                    });
                else
                    return token.fetch();
            }
            else {
                var token = new Token({
                    email: 'bill@gates.com',
                    name: 'Bill',
                    id: '123'
                });
                if (typeof(callback) == "function")
                    callback(token);
                else return token
            }
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

    return new Authentication();
})
;