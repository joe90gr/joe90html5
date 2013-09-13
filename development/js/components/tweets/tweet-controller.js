define(['backbone',
    'marionette',
    'tweetsModel',
    'tweetsCollection',
    'tweetsView' ],
    function (Backbone,
              Marionette,
              Tweet,
              TweetList,
              TweetsView ){

    var TweetController = function(){
        this.initialize();
    };
    TweetController.prototype = {
        initialize: function(){
            this.tweetList = new TweetList();
            this.tweetView = new TweetsView({collection: this.tweetList});
        }
    };

    return TweetController;
});
