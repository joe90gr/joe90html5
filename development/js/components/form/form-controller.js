define(['formModel', 'tweetsController', 'formView'], function(FormModel, TweetController, FormView){
    var FormController = function(){
        this.tweetModule = new TweetController();
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
            tweetCollection: this.tweetModule.tweetList
        });
    };

    return FormController;
});
