define(['marionette', 'modalModel', 'modalView'], function(Marionette, ModalModel, ModalView){
    var ModalController = Marionette.Controller.extend({
        initialize: function(){
            _.bindAll(this,'show','dismiss');
            this.modalmodel = new ModalModel();
            this.modalview = new ModalView({model: this.modalmodel});
        },

        show: function(title, content){
            this.modalmodel.openModal(title, content);
        },
        dismiss: function(){
            this.modalview.closeModal();
        }
    });

    return ModalController;
});
