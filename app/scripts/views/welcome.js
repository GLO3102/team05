define(['jquery', 'underscore', 'backbone', 'libraries/Authentification'], function($, _,  Backbone, Authentification) {

    var WelcomeView = Backbone.View.extend({
        tagName: 'div',
        id: '#welcome-carousel',
        template: _.template($("#welcome-page-template").html()),

        events: {
            'click #sign-in-button': 'Login',
            'click #go-to-login': 'goToLogin'
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            var isLoggedIn = Authentification.IsLoggedIn();
            this.$el.html(this.template({isLoggedIn:isLoggedIn}));
        },
        Login: function() {
            var self=this;
            var email = $("#email-input").val();
            var password = $("#password-input").val();
            Authentification.LoginUser(email,password, function() {
                self.goToLogin();
            });
        },
        goToLogin: function() {
            this.trigger('goto-login');
        }
    });

    return WelcomeView;
})
