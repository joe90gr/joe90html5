define(['marionette', 'modalModel', 'modalView'], function(Marionette, ModalModel, ModalView){
    var ModalController = Marionette.Controller.extend({
        initialize: function(){
            _.bindAll(this,'modalOpen','modalClose');
            this.modalmodel = new ModalModel();
            this.modalview = new ModalView({model: this.modalmodel});
        },

        modalOpen: function(title, content){
            var trigger = this.modalmodel.get('trigger');
            this.modalmodel.set({trigger: !trigger, title: title, content: content});
        },
        modalClose: function(){
            this.modalview.closeModal();
        }
    });

    return ModalController;
});
