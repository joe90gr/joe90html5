define([
    'backbone',
    'marionette',
    'tweetsCollection',
    'tweetsView'
],function (
    Backbone,
    Marionette,
    TweetList,
    TweetsView ){

    var TweetController = function(){
        this.tweetList = new TweetList();
        this.tweetView = new TweetsView({collection: this.tweetList});
        this.initialize();
    };
    TweetController.prototype.initialize = function(){
    };

    return TweetController;
});
