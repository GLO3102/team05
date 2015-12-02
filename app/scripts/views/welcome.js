define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone, Authentification) {

    var WelcomeView = Backbone.View.extend({
        tagName: 'div',
        id: '#welcome-carousel',
        template: _.template($("#welcome-page-template").html()),

        events: {
            'click #sign-in-button': 'Login',
            'click #go-to-login': 'goToLogin',
            'click #go-to-signup': 'goToSignup'
        },

        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
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
        },

        goToSignup: function() {
            this.trigger('goto-signup');
        }
    });

    return WelcomeView;
})
