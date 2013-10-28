define(['marionette',
    'app-console',
    'formController',
    'tweetsModel',
    'tweetsController',
    'tweeterLayout'],
    function(Marionette,
             AppConsole,
             FormController,
             Tweet,
             TweetController,
             TweeterLayout){
    var TweeterController = Marionette.Controller.extend({

        initialize: function(fn){
            this.tweeterLayout = new TweeterLayout();

            fn(this.tweeterLayout);

            this.tweetController = new TweetController();
            this.tweetView = this.tweetController.tweetView;
            this.tweetCollection = this.tweetController.tweetList;

            this.formController = new FormController(function(el){
                var authorName = el.find('#author-name').val();
                var statusUpdate = el.find('#status-update').val();
                if(this.validate(authorName, statusUpdate)){
                    el.find('.error').hide();
                    this.tweetCollection.addRecord(new Tweet({
                        author: authorName,
                        status: statusUpdate
                    }));
                }
                else{
                    el.find('.error').html('at least enter something').show();
                    AppConsole.requestResponse.request("show-modal", 'Notice','Please enter something');
                }
            }.bind(this));
            this.tweeterLayout.head.show(this.formController.formview);
            this.tweeterLayout.subcontent.show(this.tweetView);
        },

        validate: function(var1, var2){
            return var1 !=='' && var2 !=='';
        }

    });

    return TweeterController;
});