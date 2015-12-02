define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

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

        goToLogin: function() {
            this.trigger('goto-login');
        },

        goToSignup: function() {
            this.trigger('goto-signup');
        },

        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();
        }
    });

    return WelcomeView;
})
