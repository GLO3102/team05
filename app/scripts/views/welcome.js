define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

    var WelcomeView = Backbone.View.extend({
        tagName: 'div',
        id: '#welcome-carousel',
        template: _.template($("#welcome-page-template").html()),

        events: {
            'click #sign-in-button': 'goToLogin'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
        },

        goToLogin: function() {
            this.trigger('goto-login');
        }
    });

    return WelcomeView;
})
