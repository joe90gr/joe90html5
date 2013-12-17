define(['marionette',
    'app-console',
    'formModel',
    'formController',
    'tweetsModel',
    'tweetsController',
    'tweeterLayout'],
    function(Marionette,
             AppConsole,
             FormModel,
             FormController,
             Tweet,
             TweetController,
             TweeterLayout){
    var TweeterController = Marionette.Controller.extend({

        initialize: function(region){
            this.registerRegion(region);
            this.tweeterLayout = new TweeterLayout();

            this.tweetController = new TweetController();
            this.tweetView = this.tweetController.getView();
            this.tweetCollection = this.tweetController.getCollection();

            this.formController = this.setUpForm();
        },

        registerRegion: function(region){
            this.registeredRegion = region;
        },

        showModule: function(region){
            if(region){
                region.show(this.tweeterLayout);
            }
            else{
                this.registeredRegion.show(this.tweeterLayout);
            }
            this.tweeterLayout.head.show(this.formController.formview);
            this.tweeterLayout.subcontent.show(this.tweetView);
        },

        closeModule: function(){
            this.tweeterLayout.head.close();
            this.tweeterLayout.subcontent.close();
            this.registeredRegion.close();
        },

        setUpForm: function(){
            return new FormController({
                model: new FormModel({
                    input: [
                        {
                            id: 'author-name',
                            title: 'Author',
                            name: 'author-name',
                            value: 'the value',
                            type: 'text'
                        },
                        {
                            id: 'status-update',
                            title: 'Status',
                            name: 'status-update',
                            value: 'the value1',
                            type: 'text'
                        }
                    ],
                    'form-class': 'button-panel',
                    'button-title': 'Post Message'
                }),

                onSubmitCallback: function(el){
                    var authorName = el.find('#author-name').val();
                    var statusUpdate = el.find('#status-update').val();
                    if(authorName !=='' && statusUpdate !==''){
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
                }.bind(this)
            });
        }
    });

    return TweeterController;
});