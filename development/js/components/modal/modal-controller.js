define(['marionette',
    'app-console',
    'modalModel',
    'modalView'], function(
    Marionette,
    AppConsole,
    ModalModel,
    ModalView){
    var ModalController = Marionette.Controller.extend({
        initialize: function(){
            _.bindAll(this,'setRequestResponseHandlers');
            this.modalmodel = new ModalModel();
            this.modalview = new ModalView({model: this.modalmodel});
            this.setRequestResponseHandlers();
        },

        setRequestResponseHandlers: function(){
            AppConsole.requestResponse.setHandlers({
                "show-modal": function(title, content){
                    this.modalmodel.openModal(title, content);
                }.bind(this),

                "dismiss-modal": function(){
                    this.modalview.closeModal();
                }.bind(this)
            });
        }
    });

    return ModalController;
});
