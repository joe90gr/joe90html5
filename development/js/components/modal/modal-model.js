define(['backbone'], function(Backbone){
    var ModalModel = Backbone.Model.extend({
        defaults: {
            trigger: false,
            title: 'Title bar',
            content: "You must enter something into the fields"
        },
        openModal: function(title, content){
            var trigger = this.get('trigger');
            this.set({trigger: !trigger, title: title, content: content});
        }
    });

    return ModalModel;
});
