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
        },

        getCollection: function(){
            return this.tweetList;
        },

        getView: function(){
            return this.tweetView;
        }

    });
    return TweetController;
});
