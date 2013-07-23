define(['backbone',
    'components/tweets/tweets-model'],
    function (Backbone,
              Tweet) {

    var TweetList = Backbone.Collection.extend({
        model: Tweet,
        url:'http://local-html5.com/api.php/rest'
    });
    var tweetsCollection = new TweetList();
    tweetsCollection.fetch();
    return tweetsCollection;
});
