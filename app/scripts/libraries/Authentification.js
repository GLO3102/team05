define(['jquery', 'underscore'], function ($, _) {
    var SIGNUP_ENDPOINT = "https://umovie.herokuapp.com/signup";
    var SIGNIN_ENDPOINT = "https://umovie.herokuapp.com/login/";

    function Authentication() {
        var currentUser  = null;

        function getCurrentUser() {
            if(currentUser == null) {
                currentUser = localStorage.getItem("current-user");
            }
            return currentUser;
        }
        this.getTokenId = function () {
            var currentUser = getCurrentUser();
            if(currentUser != null) {
                return currentUser.token;
            }
            return null;
        }

        this.getEmail = function () {
            var currentUser = getCurrentUser();
            if(currentUser != null) {
                return currentUser.email;
            }
            return null;
        }

        this.getId = function () {
            var currentUser = getCurrentUser();
            if(currentUser != null) {
                return currentUser.id;
            }
            return null;
        }

        this.getName = function () {
            var currentUser = getCurrentUser();
            if(currentUser != null) {
                return currentUser.name;
            }
            return null;
        }

        this.isLoggedIn = function () {
            return getCurrentUser() != null;
        }


        this.logout = function () {
            localStorage.removeItem("current-user");
            currentUser = null;
            this.setHeaders();
            return this;
        }

        this.login = function(email, password, success, failure) {
            var self = this;
            $.post(SIGNIN_ENDPOINT, {email: email, password: password}).success(function(result){
                currentUser = result;
                localStorage.setItem("current-user", result);
                self.setHeaders();
                success();

            }).fail(function(jqxhr) {
                failure(jqxhr.status, jqxhr.responseText);
            });
        }

        this.signup = function(signUpValues, success, failure) {
            $.post(SIGNUP_ENDPOINT, signUpValues).success(success).fail(function(jqxhr) {
                failure(jqxhr.responseText);
            });
        }

        this.setHeaders = function () {
            if (this.isLoggedIn())
                $.ajaxSetup({
                    headers: {'Authorization': this.getTokenId()}
                });
            else
                $.ajaxSetup({
                    headers: {}
                });
            return this;
        }

        this.setHeaders();
    }

    return new Authentication();
})
;
