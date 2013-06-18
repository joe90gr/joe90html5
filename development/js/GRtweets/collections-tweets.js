define(['backbone',
    '../GRtweets/model-tweets'],
    function (Backbone,
              Tweet) {

    var TweetList = Backbone.Collection.extend({
        model: Tweet,
        url:'http://local-html5.com/api.php?action=get_app_list'
    });
    tweetsCollection = new TweetList();
    tweetsCollection.fetch();
    return tweetsCollection;
});
//http://local-html5.com/api.php?action=get_app&id=2 **change id for another entry **
//'http://local-html5.com/api.php?action=get_app_list'