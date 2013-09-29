define(['backbone', 'formModel'], function(Backbone, FormModel){

    var formCollection = Backbone.Collection.extend({
        model: FormModel
    });

    return formCollection;
});
