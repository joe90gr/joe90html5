define(['formModel',
    'tweetsController',
    'formView'],
function(FormModel, TweetController, FormView){

    var FormController = function(){
        this.tweetController = new TweetController();
        this.tweetView = this.tweetController.tweetView;
        this.tweetCollection = this.tweetController.tweetList;
        this.initialize();
    };

    FormController.prototype.initialize = function(){
        var self = this;
        this.formview = new FormView({
            model: new FormModel({
                'input': [
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
                ]
            }),
            tweetCollection: self.tweetCollection
        });

        appConsole.main.header.show(this.formview);
    };

    return FormController;
});
