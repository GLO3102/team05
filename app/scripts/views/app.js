define(['jquery', 'underscore', 'backbone', 'views/welcome', 'views/home'], function($, _,  Backbone, WelcomeView, HomeView) {

    var AppView = Backbone.View.extend({
        el: '#container',
        userLoggedIn: false,


        initialize: function() {

            this.render();
        },

        render: function() {
            this.showWelcomeView();
        },

        showWelcomeView: function() {
            var welcomeView = new WelcomeView();
            this.listenTo(welcomeView, 'goto-login', this.showHomeView);
            this.$el.html(welcomeView.$el);
        },

        showHomeView: function() {
            var homeView = new HomeView();
            this.$el.html(homeView.$el);
        },
        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return AppView;
})
