/**
 * Created by didia on 15-10-27.
 */

define(['jquery', 'underscore', 'backbone'], function($, _,  Backbone) {

    var AppView = Backbone.View.extend({
        el: '#container',
        template: _.template($("#container-template").html()),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
        }
    })

    return AppView;
})
