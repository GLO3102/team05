define(['jquery', 'underscore', 'backbone', 'libraries/authentification', 'views/errorview'], function($, _,  Backbone, Authentication, errorView) {

    var UNAUTHORIZED = '401';
    var LoginView = Backbone.View.extend({
        tagName: 'div',
        template: _.template($("#signin-page-template").html()),

        events: {
            'submit #signin-form': 'signin',
            'click .go-to-signup': 'goToSignup'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
        },

        signin: function(e) {
            e.preventDefault();
            var self = this;
            var email = self.$el.find('input[name=email]').val();
            var password = self.$el.find('input[name=password]').val();

            self.$el.block({message:null});
            Authentication.login(email, password,
                function() {
                    self.$el.unblock();
                    self.trigger('login-success');
                },
                function(errorCode, error){
                    self.$el.unblock();
                    if(errorCode == UNAUTHORIZED) {
                        self.$el.find('.sign-in-alert').show();
                    }
                    else {
                        errorView.showError(error);
                    }
            });

        },


        goToSignup: function() {
            this.trigger('goto-signup');
        }
    });

    return LoginView;
})
