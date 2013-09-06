define(['backbone',
    'marionette',
    'mustache',
    'text!tweetTemplate',
    'text!tweetsTemplate',
    'tweetsModel',
    'tweetsCollection'],
    function (Backbone,
              Marionette,
              mustache,
              tweetTemplate,
              tweetsTemplate,
              Tweet,
              TweetsCollection) {

    var TweetView = Marionette.ItemView.extend({
        tagName: 'li',
        template: function(data){
            return mustache.render(tweetTemplate,data);
        },
        events:{
            'click .edit': 'edit',
            'click .delete': 'delete',
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
        delete: function(e){
            e.preventDefault();
            this.model.destroyRecord();
        }
    });

    var TweetsView = Marionette.ItemView.extend({
        collection: new TweetsCollection,
        initialize: function(){
            this.listenToEvents();
            this.collection.getRecords();
        },
        listenToEvents: function(){
            this.listenTo(this.collection ,'add', this.render, this);
            this.listenTo(this.collection,'remove', this.render, this);
        },
        render: function(){
            var self = this;
            self.$el.html('');
            _.each(this.collection.toArray(), function(tweet, i){
                self.$el.append((new TweetView({model: tweet})).render().$el );
            });

            return this;
        }
    });
    return TweetsView;
});
