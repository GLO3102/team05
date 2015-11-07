define(['gapi'], function(gapi) {

        var API_KEY = "AIzaSyCcpnMFLYcKVv2tIceMlUWX-1MD6UxQdeM";
        var YOUTUBE_URL_PRE = "https://www.youtube.com/watch?v=";
        gapi.setApiKey(API_KEY);

        function buildRequest(query) {
            var request = gapi.youtube.search.list({
                    q: query,
                    part: 'snippet',
                    type: 'video',
                    maxValue: 1
                });

            return request;
        }

        function executeRequest(request, callback) {
            request.execute(function(response) {
                var url = extractVideoUrl(response.result);
                callback(url);
            });
        }

        function extractVideoUrl(response) {
            var item = response.items[0];
            return YOUTUBE_URL_PRE + item.id.videoId;

        }

        function findFirstVideoUrl(query, callback) {
            gapi.load('youtube', 'v3').then(function(){
                request = buildRequest(query);
                executeRequest(request, callback);
            })

        }


        return {
            findFirstVideoUrl: findFirstVideoUrl
        };
});
