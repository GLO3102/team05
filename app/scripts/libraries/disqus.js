define([], function () {
    function disqus() {


        this.load = function (objectType, objectId) {
                DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.url = "http://localhost/#!" + objectType + "/" + objectId;
                        this.page.identifier = objectType + objectId;
                    }
                })
        }
    }

    return new disqus();
})
;