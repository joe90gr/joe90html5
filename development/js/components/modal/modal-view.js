define(['backbone',
        'marionette',
        'mustache',
        'text!modalTemplate'],
function (Backbone,
          Marionette,
          Mustache,
          modaltemplate ) {

    var ModalView = Marionette.ItemView.extend({
        el: '.modal-parent',
        template: function(data){
            return Mustache.render(modaltemplate,data);
        },
        events: {
            'click .modal-close': 'closeModal',
            'click': 'closeModal', // the root element .modal-container set by el
            'click .box' : function(e){
                e.stopPropagation();
            }
        },
        initialize: function(){
            this.listenTo(this.model ,'change', this.openModal, this);
        },
        openModal: function(){
            this.render();
            this.$el.fadeIn('fast');
        },
        closeModal: function(){
            this.$el.fadeOut('fast');
        }
    });

    return ModalView;
});