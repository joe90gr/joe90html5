define(['backbone'], function(Backbone){
    var ModalModel = Backbone.Model.extend({
        defaults: {
            title: 'Title bar',
            content: "You must enter something into the fields"
        }
    });

    return ModalModel;
});
