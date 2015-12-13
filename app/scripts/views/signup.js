define(['jquery', 'underscore', 'backbone', 'libraries/authentification', 'views/errorview', 'jquery.blockUI'], function($, _,  Backbone, Authentication, errorView) {


    var SignupView = Backbone.View.extend({
        tagName: 'div',
        template: _.template($("#signup-page-template").html()),

        events: {
            'submit #signup-form': 'signup',
            'click .go-to-login': 'goToLogin'
        },

        initialize: function() {
            self = this;
            $('#signup-success-modal').on('hidden.bs.modal', function (e) {
                self.trigger('signup-success');
            });
            this.render();
        },

        render: function() {
            this.$el.html(this.template());

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
                function(errorCode, error){
                    self.$el.unblock();
                    if( errorCode == 500) {
                        self.$el.find('.sign-up-alert').show();
                    }else {
                        errorView.showError(error);
                    }

                }
            );

        },

        goToLogin: function() {
            this.trigger('goto-login');
        },

        cleanup : function(){
            this.undelegateEvents();
            $(this.el).empty();

        }
    });

    return SignupView;
})
