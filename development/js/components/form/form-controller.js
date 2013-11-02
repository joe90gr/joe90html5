define(['app-console',
    'marionette',
    'tweetsController',
    'formView'],
function(AppConsole, Marionette, TweetController, FormView){

    var FormController = Marionette.Controller.extend({
        initialize: function(obj){
            this.formview = new FormView({
                model: obj.model,
                onSubmitCallback: obj.onSubmitCallback
            });
        }
    });

    return FormController;
});
