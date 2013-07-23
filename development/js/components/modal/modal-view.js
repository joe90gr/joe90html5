define(['backbone'], function (Backbone) {
    //todo: we may not need this view as its a test button for modal
    var ModalOpenView = Backbone.View.extend({
        el: $('.open-modal'),
        events: {
            'click': 'open'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.text('test modal');
        },
        open: function(){
            var modalTitle = {
                title:'This is a text title',
                html:'this is the content'
            };
            appConsole.modalview.trigger('click:open',modalTitle)
        }
    });

    var ModalView = Backbone.View.extend({
        el: $('.modal-container'),

        events: {
            'click .close': 'close',
            'click': 'close', // the root element .modal-container set by el
            'click .box' : 'box'
        },

        initialize: function(){
            var buttonview = new ModalOpenView();
            this.bindEventListeners();
            //this.listenTo(this.collection, "add", this.render);;
        },

        bindEventListeners: function(){
            this.on('click:open',this.open,this);
            this.on('click:close',this.close,this);
        },

        render: function(modalContent){
            var modalTitle = this.$el.find('.title span');
            var modalHTML = this.$el.find('.content');
            modalTitle.html(modalContent.title);
            modalHTML.html(modalContent.html);
            return this;
        },

        open: function(content){
            console.log('test',content);
            var self = this;
            var refresh = _(function(){self.calcBoxPosition(this); }).debounce(50);

            $(window).on('resize', refresh);
            this.render(content);
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
            var box = this.$el.children('.box');
            var boxWidth = box.width();
            var boxHeight = box.height();
            var windowWidth = $(thisWindow).width();
            var windowHeight = $(thisWindow).height();

            box.css({left : (windowWidth - boxWidth) / 2 });
            box.css({top : (windowHeight - boxHeight) / 2 });
        }
    });

    appConsole.modalview = new ModalView();
    return ModalView;
});