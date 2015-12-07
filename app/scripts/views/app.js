define(['jquery', 'underscore', 'backbone', 'views/welcome', 'views/home', 'views/signup', 'views/login',  'libraries/authentification'], function($, _,  Backbone, WelcomeView, HomeView, SignupView, LoginView, Authentication) {

    var AppView = Backbone.View.extend({
        el: '#container',
        userLoggedIn: false,


        initialize: function() {

            this.render();
        },

        render: function() {
            if(Authentication.isLoggedIn()) {
                this.showHomeView();
            }
            else {
                this.showWelcomeView();
            }

        },

        showWelcomeView: function() {
            var welcomeView = new WelcomeView();
            this.listenTo(welcomeView, 'goto-login', this.showLoginView);
            this.listenTo(welcomeView, 'goto-signup', this.showSignupView);
            this.$el.html(welcomeView.$el);
        },

        showHomeView: function() {
            var homeView = new HomeView();
            this.listenTo(homeView, 'logout-success', this.showLoginView);
            this.$el.html(homeView.$el);
        },

        showLoginView: function() {
            var loginView = new LoginView(this.showHomeView);
            this.listenTo(loginView, 'goto-signup', this.showSignupView);
            this.listenTo(loginView, 'login-success', this.showHomeView);
            this.$el.html(loginView.$el);
        },

        showSignupView: function() {
            var signupView = new SignupView();
            this.listenTo(signupView, 'goto-login', this.showLoginView);
            this.listenTo(signupView, 'signup-success', this.showLoginView);
            this.$el.html(signupView.$el);
        },

        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }

    });

    return AppView;
})
