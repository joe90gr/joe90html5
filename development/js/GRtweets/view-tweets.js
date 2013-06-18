define(['backbone',
    '../GRtweets/model-tweets',
    '../GRtweets/collections-tweets'],
    function (Backbone,
              Tweet,
              tweetsCollection) {

    var TweetView = Backbone.View.extend({
        model: new Tweet(),
        tagName: 'li',
        events:{
            'click .edit': 'edit',
            'click .delete': 'delete',
            'blur .status': 'close',
            'keypress .status': 'onEnterUpdate'
        },
        initialize: function(){
            this.template = _.template($('#tweet-template').html());
        },
        edit: function(e){
            e.preventDefault();
            this.$('.status').attr('contenteditable', true).focus();
        },
        close: function(){
            var status = this.$('.status').text();
            this.model.set('status', status);
            this.$('.status').removeAttr('contenteditable');
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
            tweetsCollection.remove(this.model);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var TweetsView = Backbone.View.extend({
        model: tweetsCollection,
        el: $('#tweets-container'),
        initialize: function(){
            this.model.on('add', this.render, this);
            this.model.on('remove', this.render, this);
        },
        render: function(){
            var self = this;
            self.$el.html('');
            _.each(this.model.toArray(), function(tweet, i){
                self.$el.append((new TweetView({model: tweet})).render().$el );
            });

            return this;
        }
    });
    return TweetsView;
});
