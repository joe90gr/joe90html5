define([
    'app-console',
    'backbone',
    'marionette',
    'tweetsCollection',
    'tweetsView'
],function (
    appConsole,
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
        appConsole.twoColumnLayout.content.show(this.tweetView);
    };

    return TweetController;
});
