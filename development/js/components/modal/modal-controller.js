define(['marionette', 'modalModel', 'modalView'], function(Marionette, ModalModel, ModalView){

    var ModalController = Marionette.Controller.extend({
        initialize: function(){
            var modal = new ModalModel();
            var modalview = new ModalView({model: modal});

            appConsole.modalOpen = function(title, content){
                modal.set({trigger: !modal.get('trigger'),title: title, content: content});
            };
            appConsole.modalClose = function(){
                modalview.closeModal();
            };
        }
    });

    return ModalController;
});
