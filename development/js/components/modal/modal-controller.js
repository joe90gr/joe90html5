define(['modalModel', 'modalView'], function(ModalModel, ModalView){
    appConsole = appConsole || {};

    var modal = new ModalModel();
    var modalview = new ModalView({model: modal});

    appConsole.modalOpen = function(title, content){
        modal.set({trigger: !modal.get('trigger'),title: title, content: content});
    };
    appConsole.modalClose = function(){
        modalview.closeModal();
    };
});