define(['backbone'], function (Backbone) {

    ModalModel = Backbone.Model.extend({
        defaults: function(){
            return{
                title: 'default title',
                text: 'default text'
            }
        }
    });
    return ModalModel;
});