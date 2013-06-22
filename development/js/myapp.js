var deps = [
    'modernizr',
    'backbone',
    'GRtweets/model-tweets',
    'GRtweets/collections-tweets',
    'GRtweets/view-tweets',
    'GRmodal/model-modal',
    'GRmodal/collections-modal',
    'GRmodal/view-modal',
    'GRform/model-form',
    'GRform/view-form'
];

define(deps, function (mod,
                       Backbone,
                       Tweet,
                       TweetList,
                       TweetsView,
                       ModalModel,
                       ModalCollection,
                       ModalView,
                       FormModel,
                       FormView
                       ) {
    var formview = new FormView();
    //modalview = new ModalView()
    var tweetii = new TweetsView();
;


////THE MODEL___________________________________________________________
//    var Tweet = Backbone.Model.extend({
//        defaults: function(){
//            return{
//                author: '',
//                status: ''
//            }
//        }
//    });
//
//
//    ModalModel = Backbone.Model.extend({
//        defaults: function(){
//            return{
//               title: 'default title',
//               text: 'default text'
//            }
//        }
//    });
////______________________________________________________________________
//
////THE COLLECTION_______________________________________________________
//    var TweetList = Backbone.Collection.extend({
//        model: Tweet
//    });
//
//    var ModalCollection = Backbone.Collection.extend({
//        model: ModalModel
//    });
//
//    var tweetsCollection = new TweetList();
//    var modalCollection = new ModalCollection();
////______________________________________________________________________
//
////THE VIEWS_____________________________________________________________
//    var TweetView = Backbone.View.extend({
//        model: new Tweet(),
//        tagName: 'li',
//        events:{
//            'click .edit': 'edit',
//            'click .delete': 'delete',
//            'blur .status': 'close',
//            'keypress .status': 'onEnterUpdate'
//        },
//        initialize: function(){
//            this.template = _.template($('#tweet-template').html());
//        },
//        edit: function(e){
//            e.preventDefault();
//            this.$('.status').attr('contenteditable', true).focus();
//        },
//        close: function(){
//            var status = this.$('.status').text();
//            this.model.set('status', status);
//            this.$('.status').removeAttr('contenteditable');
//        },
//        onEnterUpdate: function(e){
//          var self = this;
//          if(e.keyCode === 13){
//              _.delay(function(){
//                  self.$('.status').blur();
//              },100);
//          }
//        },
//        delete: function(e){
//            e.preventDefault();
//            tweetsCollection.remove(this.model);
//        },
//        render: function(){
//            this.$el.html(this.template(this.model.toJSON()));
//            return this;
//        }
//    });
//
//    var TweetsView = Backbone.View.extend({
//        model: tweetsCollection,
//        el: $('#tweets-container'),
//        initialize: function(){
//            this.model.on('add', this.render, this);
//            this.model.on('remove', this.render, this);
//        },
//        render: function(){
//            var self = this;
//            self.$el.html('');
//            _.each(this.model.toArray(), function(tweet, i){
//                self.$el.append((new TweetView({model: tweet})).render().$el );
//            })
//            return this;
//        }
//    });
//
//    var FormView = Backbone.View.extend({
//        el: $('.button-panel'),
//        events: {
//            'submit #new-tweet': 'submit'
//        },
//        initialize: function(){
//            this.render();
//        },
//        render: function(){
//
//        },
//        submit: function(){
//            var authorName = this.$el.find('#author-name').val();
//            var statusUpdate = this.$el.find('#status-update').val();
//            if(this.validate(authorName, statusUpdate)){
//                this.$el.find('.error').html('error').hide();
//                var tweet = new Tweet({
//                    author: authorName,
//                    status: statusUpdate
//                });
//                tweetsCollection.add(tweet);
//            }
//            else{
//                this.$el.find('.error').html('error').show();
//            }
//
//            return false
//        },
//        validate: function(var1, var2){
//            return var1 !='' && var2 !=''
//        }
//    });
//
//    var ModalOpenView = Backbone.View.extend({
//        el: $('.open-modal'),
//        events: {
//            'click': 'open'
//        },
//        initialize: function(){
//            this.render();
//        },
//        render: function(){
//            this.$el.text('test modal');
//        },
//        open: function(){
//            modalview.open();
//        }
//    });
//
//    var ModalView = Backbone.View.extend({
//        model: new ModalModel({
//            title: 'This is a text title',
//            text: 'this is the content'
//        }),
//
//        el: $('.modal-container'),
//
//        events: {
//            'click .close': 'close',
//            'click': 'close', // the root element .modal-container set by el
//            'click .box' : 'box'
//        },
//
//        initialize: function(){
//            var formview = new FormView();
//            var buttonview = new ModalOpenView();
//            this.listenTo(this.model, "change", this.render);
//            this.render();
//        },
//
//        render: function(){
//            var modalTitle = this.$el.find('.title span');
//            var modalText = this.$el.find('.content');
//            modalTitle.html(this.model.get('title'));
//            modalText.html(this.model.get('text'));
//            return this;
//        },
//
//        open: function(){
//            var self = this;
//            var refresh = _(function(){self.calcBoxPosition(this); }).debounce(50) ;
//            $(window).on('resize', refresh);
//
//            $('.modal-overlay').show();
//            $('.modal-container').show();
//            self.calcBoxPosition(window);
//        },
//
//        close: function(){
//            this.$el.hide();
//            this.$el.parent().children('.modal-overlay').hide();
//            $(window).unbind('resize');
//        },
//
//        box: function(e){
//            e.stopPropagation();
//        },
//
//        calcBoxPosition: function(thisWindow){
//            var box = this.$el.children('.box');
//            var boxWidth = box.width();
//            var boxHeight = box.height();
//            var windowWidth = $(thisWindow).width();
//            var windowHeight = $(thisWindow).height();
//
//            box.css({left : (windowWidth - boxWidth) / 2 });
//            box.css({top : (windowHeight - boxHeight) / 2 });
//        }
//    });
//
//    var appview = new TweetsView();
//
//    var modalview = new ModalView();
////_______________________________________________________________________
//
//
//    var tweet1 = new Tweet({author:'joe', status: 'developer'});
//    var tweet2 = new Tweet({author:'sylwia', status: 'teacher'});
//    var tweet3 = new Tweet({author:'joe90', status: 'agent'});
//    var tweets = new TweetList([tweet1,tweet2,tweet3]);
//
//
//    $('#new-tweet').submit(function(e){
//        var tweet = new Tweet({
//            author:$('#author-name').val(),
//            status: $('#status-update').val()
//        });
//        tweetsCollection.add(tweet);
//        return false;
//    });
//
//    tweetsCollection.on('change:status',function(){
//        console.log('the status change event is triggered through onchange');
//    });
});
