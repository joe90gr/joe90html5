define(['backbone',
    'components/tweets/tweets-model'],
    function (Backbone,
              Tweet) {

    var TweetList = Backbone.Collection.extend({
        model: Tweet,
        url:'/api.php/rest'
    });

    return TweetList;
});
