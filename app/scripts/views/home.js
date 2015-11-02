define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

    var HomeView = Backbone.View.extend({
        tagName: 'div',
        menuEl: '#menu-content',
        bodyEl: '#app-content',
        template: _.template($("#home-page-template").html()),

        initialize: function() {
            this.render();

        },

        render: function() {
            this.$el.html(this.template());
            this.$(this.menuEl).html(_.template($("#menu-template").html()));
        },
    });

    return HomeView;
})
