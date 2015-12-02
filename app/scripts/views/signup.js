define(['jquery', 'underscore', 'backbone', 'libraries/authentification', 'views/errorview', 'jquery.blockUI'], function($, _,  Backbone, Authentication, errorView) {


    var SignupView = Backbone.View.extend({
        tagName: 'div',
        template: _.template($("#signup-page-template").html()),

        events: {
            'submit #signup-form': 'signup',
            'click .go-to-login': 'goToLogin'
        },

        initialize: function() {
            $('#signup-success-modal').on('hidden.bs.modal', function (e) {
               self.trigger('signup-successs');
            });
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            $('#signup-success-modal').on('hidden.bs.modal', function (e) {
                self.trigger('signup-successs');
            });
        },

        signup: function(e) {
            e.preventDefault();
            var self = this;
            var signupAttributes = {
                name  : self.$el.find('input[name=email]').val(),
                email : self.$el.find('input[name=name]').val(),
                password : self.$el.find('input[name=password]').val()
            };
            self.$el.block({message:null});
            Authentication.signup(signupAttributes,
                function() {
                    self.$el.unblock();
                    $("#signup-success-modal").modal('show');
                },
                function(error){
                    self.$el.unblock();
                    errorView.showError(error);
                }
            );

        },

        goToLogin: function() {
            this.trigger('goto-login');
        }
    });

    return SignupView;
})
