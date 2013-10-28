define(['app-console',
    'marionette',
    'formModel',
    'tweetsController',
    'formView'],
function(AppConsole, Marionette, FormModel, TweetController, FormView){

    var FormController = Marionette.Controller.extend({
        initialize: function(callback){
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
                callback: callback
            });
        }
    });

    return FormController;
});
