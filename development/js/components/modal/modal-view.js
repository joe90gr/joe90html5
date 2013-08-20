define(['backbone',
        'marionette',
        'mustache',
        'text!modalTemplate'],
        function (Backbone,
                  Marionette,
                  Mustache,
                  modaltemplate ) {

    var ModalModel = Backbone.Model.extend({
        defaults: {
            title: 'Title bar',
            content: "You must enter something into the fields"
        }
    });

    var ModalView = Marionette.ItemView.extend({
        model: new ModalModel,
        el: '.modal-container',
        template: function(data){

            return Mustache.render(modaltemplate,data);
        },
        events: {
            'click .close': 'close',
            'click': 'close', // the root element .modal-container set by el
            'click .box' : 'box'
        },
        initialize: function(){
            this.bindEventListeners();
        },
        bindEventListeners: function(){
            this.on('click:open',this.open,this);
            this.on('click:close',this.close,this);
        },
        open: function(content){
            var self = this;
            var refresh = _(function(){self.calcBoxPosition(this); }).debounce(50);

            this.render();
            $(window).on('resize', refresh);
            $('.modal-overlay, .modal-container').fadeIn('fast');
            self.calcBoxPosition(window);
        },
        close: function(){
            this.$el.fadeOut('fast');
            this.$el.parent().children('.modal-overlay').fadeOut('fast');
            $(window).unbind('resize');
        },
        box: function(e){
            e.stopPropagation();
        },
        calcBoxPosition: function(thisWindow){
            var box = this.$el.children('.box'),
                boxWidth = box.width(),
                boxHeight = box.height(),
                windowWidth = $(thisWindow).width(),
                windowHeight = $(thisWindow).height();

            box.css({left : (windowWidth - boxWidth) / 2 });
            box.css({top : (windowHeight - boxHeight) / 2 -100});
        }
    });

    return ModalView;
});