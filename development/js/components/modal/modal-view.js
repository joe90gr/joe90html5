define(['backbone',
        'marionette',
        'mustache',
        'text!modalTemplate'],
function (Backbone,
          Marionette,
          Mustache,
          modaltemplate ) {

    var ModalView = Marionette.ItemView.extend({
        el: '.modal-container',
        template: function(data){
            return Mustache.render(modaltemplate,data);
        },
        events: {
            'click .modal-close': 'closeModal',
            'click': 'closeModal', // the root element .modal-container set by el
            'click .box' : 'box'
        },
        isModalOpen: false,
        refresh: _(function(){
            if(this.isModalOpen){
                this.calcBoxPosition();
            }
        }).debounce(50),

        initialize: function(){
            this.modalOverlay = this.$el.parent().children('.modal-overlay');
            this.listenToEvents();
        },
        listenToEvents: function(){
            this.listenTo(this.model ,'change', this.openModal, this);
        },
        openModal: function(){
            if(!this.isModalOpen){
                this.isModalOpen = true ;
                this.render();
                this.modalOverlay.fadeIn('fast');
                this.$el.fadeIn('fast');
                this.calcBoxPosition();
            }
        },
        closeModal: function(){
            this.isModalOpen = false ;
            this.$el.fadeOut('fast');
            this.modalOverlay.fadeOut('fast');
        },
        box: function(e){
            e.stopPropagation();
        },
        calcBoxPosition: function(){
            var box = this.$el.children('.box'),
                boxWidth = box.width(),
                boxHeight = box.height(),
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                actualXposition = (windowWidth - boxWidth) / 2 ,
                actualYposition = (windowHeight - boxHeight) / 2 - 100 ,
                xPosition = actualXposition > 0 ? actualXposition : 0 ,
                yPosition = actualYposition > 0 ? actualYposition : 0 ;
            box.css({left : xPosition });
            box.css({top :  yPosition});
        }
    });

    return ModalView;
});