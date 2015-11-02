WatchListsView = Backbone.View.extend(
    {

        template: _.template($('#watchLists-template').html()),

        el: '#accordion',

        events: {
            "click .glyphicon-remove": "deleteWatchList",
            "click .glyphicon-pencil": "editWatchList",
            "click  #AddButton": "addWatchList",

        },
        initialize: function () {
            var self = this;
            this.collection.bind("sync add remove", function () {
                self.render();
            });
        },
        render: function () {
            var owner = auth.GetUserAndTokenInfo().get('name');
            this.$el.html(this.template({watchLists: this.collection}));
            return this;
        },
        addWatchList: function () {
            var watchList = new WatchList({name:"MoonMoonCollection",movies:[], owner: auth.GetOwner()});
            this.collection.create({watchList});
        },
        deleteWatchList: function(event) {
            var watchList = getSelectedWatchList(event, this.collection);
            watchList.destroy();
        },

        editWatchList: function(event) {
            var watchListId = $(event.target).parent().parent().attr("watchList-id");
            var watchList = $("#Title"+watchListId);
            watchList.attr("contentEditable", true);
            watchList.focus();
            var self = this;
            watchList.one("focusout", function () {
                watchList.attr("contentEditable", false);
                var myWatchList = self.collection.get(watchListId);
                var newText = ($(this).text()).replace(/(\r\n|\n|\r)/gm,"");
                myWatchList.set('name',newText);
                myWatchList.save();
            });
        },




    }
);
function getSelectedWatchList(event,collection) {
    var watchListId = $(event.target).parent().parent().attr("watchList-id");
    return  collection.get(watchListId);
}
