define(['backbone',
    'text!components/tweets/tweets.template',
    'components/tweets/tweets-model',
    'components/tweets/tweets-collections'],
    function (Backbone,
              template,
              Tweet,
              tweetsCollection) {

    var TweetView = Backbone.View.extend({
        model: new Tweet(),
        tagName: 'li',
        template: _.template(template),
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
            console.log('is this new before',this.model.isNew());
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
            console.log(this.model.isNew());
            this.model.destroy({
                success: function(){
                    console.log('DESTROYED' );
                },
                error: function(){
                    console.log('Destroy failed');
                }
            });
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
