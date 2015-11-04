WatchListsView = Backbone.View.extend(
    {

        template: _.template($('#watchLists-template').html()),

        el: '#accordion',

        token: null,

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
            auth.GetUserAndTokenInfoWithCallback(function(token){
                self.token = token ;
                self.trigger("sync", this);});
        },


        render: function () {
            if(this.token != null){
            var owner = {email: this.token.get("email"), name: this.token.get("name"),  id: this.token.id};
                this.$el.html(this.template({watchLists: this.collection.filterByOwner(owner)}));
                alert(this.collection.filterByOwner(owner).length);
            }
            return this;
        },
        addWatchList: function () {
            var watchList = new WatchList({name:"MoonMoonCollection",movies:[]});
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
