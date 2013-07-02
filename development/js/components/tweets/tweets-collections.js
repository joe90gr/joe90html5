define(['backbone',
    'components/tweets/tweets-model'],
    function (Backbone,
              Tweet) {

    var TweetList = Backbone.Collection.extend({
        model: Tweet,
        url:'http://local-html5.com/api.php?action=get_app_list'
    });
    var tweetsCollection = new TweetList();
    tweetsCollection.fetch();
    return tweetsCollection;
});
//http://local-html5.com/api.php?action=get_app&id=2 **change id for another entry **
//'http://local-html5.com/api.php?action=get_app_list'