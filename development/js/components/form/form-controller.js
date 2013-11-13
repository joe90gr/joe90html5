define(['app-console',
    'marionette',
    'formView'],
function(AppConsole, Marionette, FormView){

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
