define(['backbone',
        'components/modal/modal-model',
        'components/modal/modal-collections'
], function (Backbone,
             ModalModel,
             modalCollection) {


     console.log(modalCollection);
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
            modalview.trigger('click:open')
        }
    });

    var ModalView = Backbone.View.extend({
        collection : modalCollection,
        el: $('.modal-container'),

        events: {
            'click .close': 'close',
            'click': 'close', // the root element .modal-container set by el
            'click .box' : 'box'
        },

        initialize: function(){
            var buttonview = new ModalOpenView();
            this.on('click:open',this.open,this);
            this.listenTo(this.collection, "add", this.render);
            this.collection.add(new ModalModel({
                'title':'This is a text title',
                'text':'this is the content'
            }));
            this.render();
        },

        render: function(){
            var modalTitle = this.$el.find('.title span');
            var modalText = this.$el.find('.content');
            modalTitle.html(this.collection.models[0].attributes.title);
            modalText.html(this.collection.models[0].attributes.text);
            return this;
        },

        open: function(){
            var self = this;
            var refresh = _(function(){self.calcBoxPosition(this); }).debounce(50) ;
            $(window).on('resize', refresh);

            $('.modal-overlay').show();
            $('.modal-container').show();
            self.calcBoxPosition(window);
        },

        close: function(){
            this.$el.hide();
            this.$el.parent().children('.modal-overlay').hide();
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

    var modalview = new ModalView();

    return ModalView;
});