define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    function Authentication() {
        this.GetTokenId = function () {
            return localStorage.getItem("token");
        }

        this.GetEmail = function () {
            return localStorage.getItem("email");
        }

        this.GetId = function () {
            return localStorage.getItem("id");
        }

        this.GetName = function () {
            return localStorage.getItem("name");
        }

        this.IsLoggedIn = function () {
            return this.GetTokenId() != null;
        }

        this.Login = function (token, email, name, id) {
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
            localStorage.setItem("id", id);
            return this;
        }

        this.Logout = function () {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("id");
            return this;
        }

        this.LoginUser= function(email,password, callback){
            var self = this;
            $.ajax({
                type: "POST",
                url: 'https://umovie.herokuapp.com/login/',
                data: {
                    email: email,
                    password: password
                },
                success: function(result){
                    self.Login(result.token, result.email, result.name, result.id).SetHeaders();
                    callback();
                },
                dataType: "json"
            }).fail(function(){alert("login failed");});

        }

        this.SetHeaders = function () {
            if (this.IsLoggedIn())
                $.ajaxSetup({
                    headers: {'Authorization': this.GetTokenId()}
                });
            else
                $.ajaxSetup({
                    headers: {}
                });
            return this;
        }

        // constructor

        this.SetHeaders();
    }

    return new Authentication();
})
;