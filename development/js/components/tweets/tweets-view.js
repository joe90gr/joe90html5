define(['backbone',
    'marionette',
    'mustache',
    'text!tweetTemplate'],
    function (Backbone,
              Marionette,
              mustache,
              tweetTemplate) {

    var TweetView = Marionette.ItemView.extend({
        tagName: 'li',
        template: function(data){
            return mustache.render(tweetTemplate,data);
        },
        events:{
            'click .edit': 'edit',
            'click .delete': 'deleteRecord',
            'blur .status': 'closeEdit',
            'keypress .status': 'onEnterUpdate'
        },
        initialize: function(){},
        edit: function(e){
            e.preventDefault();
            this.$('.status').attr('contenteditable', true).focus();
        },
        closeEdit: function(){
            var status = this.$('.status').text();
            this.model.set('status', status);
            this.$('.status').removeAttr('contenteditable');
            this.model.save();
        },
        onEnterUpdate: function(e){
            var self = this;
            if(e.keyCode === 13){
                _.delay(function(){
                    self.$('.status').blur();
                },100);
            }
        },
        deleteRecord: function(e){
            e.preventDefault();
            this.model.destroyRecord();
        }
    });

    var emptyView = Marionette.ItemView.extend({
        template: function(data){
            return mustache.render('bollocks',data);
        }
    });

    var TweetsView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'tweets-container',
        itemView: TweetView,
        emptyView: emptyView,
        initialize: function(){
            this.collection.getRecords();
        }
    });
    return TweetsView;
});
