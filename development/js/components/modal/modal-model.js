define(['backbone'], function(Backbone){
    var ModalModel = Backbone.Model.extend({
        defaults: {
            trigger: false,
            title: 'Title bar',
            content: "You must enter something into the fields"
        }
    });

    return ModalModel;
});
