define(['backbone'],function(Backbone){

    var FormModel = Backbone.Model.extend({
        defaults:{
            authorFieldName: 'Author',
            statusFieldName: 'Status',
            errorMsg: 'The fields are empty, please enter valid data'
        }
    });

    return FormModel;
});