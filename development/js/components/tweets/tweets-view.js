define(['backbone',
    'mustache',
    'text!components/tweets/tweets.template',
    'components/tweets/tweets-model',
    'components/tweets/tweets-collections'],
    function (Backbone,
              mustache,
              template,
              Tweet,
              tweetsCollection) {

    var TweetView = Backbone.View.extend({
        model: new Tweet(),
        tagName: 'li',
        template: template,
        events:{
            'click .edit': 'edit',
            'click .delete': 'delete',
            'blur .status': 'close',
            'keypress .status': 'onEnterUpdate'
        },
        initialize: function(){
        },
        edit: function(e){
            e.preventDefault();
            this.$('.status').attr('contenteditable', true).focus();
        },
        close: function(){
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
            this.model.destroy({
                success: function(model, response){
                    console.log('DESTROYED',model.id , response );
                },
                error: function(){
                    console.log('Destroy failed', response);
                }
            });
        },
        render: function(){
            this.$el.html(mustache.render(this.template,this.model.toJSON()));
            return this;
        }
    });

    var TweetsView = Backbone.View.extend({
        collection: tweetsCollection,
        el: $('#tweets-container'),
        initialize: function(){
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
