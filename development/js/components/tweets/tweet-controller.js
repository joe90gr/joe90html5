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

    var TweetController = Marionette.Controller.extend({

        initialize: function(){
            this.tweetList = new TweetList();
            this.tweetView = new TweetsView({collection: this.tweetList});
            //appConsole.twoColumnLayout.content.show(this.tweetView);
        },

        onClose: function(){
            this.tweetView.close();
            appConsole.twoColumnLayout.content.close();
        },

        openView: function(){
            appConsole.twoColumnLayout.content.show(this.tweetView);
        },

        getTweetCollection: function(){
            return this.tweetList;
        },
        getTweetView: function(){
            return this.tweetView;
        }


    });
    return TweetController;
});
