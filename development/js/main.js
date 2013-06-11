define([ 'modernizr' , 'backbone'], function (mod, Backbone) {


// THE MODEL___________________________________________________________
    var Tweet = Backbone.Model.extend({
        defaults: function(){
            return{
                author: '',
                status: ''
            }
        }
    });
//______________________________________________________________________

// THE COLLECTION_______________________________________________________		
    var TweetList = Backbone.Collection.extend({
        model: Tweet
    });
    var tweetsCollection = new TweetList();
//______________________________________________________________________

// THE VIEWS_____________________________________________________________
    var TweetView = Backbone.View.extend({
        model: new Tweet(),
        tagName: 'div',
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
            console.log('testing edit', this.model.get('author'));
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
            console.log('testing delete');
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
            })
            return this;
        }
    });
    var appview = new TweetsView();
//_______________________________________________________________________


//    var tweet1 = new Tweet({author:'joe', status: 'developer'});
//    var tweet2 = new Tweet({author:'sylwia', status: 'teacher'});
//    var tweet3 = new Tweet({author:'joe90', status: 'agent'});
//    var tweets = new TweetList([tweet1,tweet2,tweet3]);


    $('#new-tweet').submit(function(e){
        var tweet = new Tweet({
            author:$('#author-name').val(),
            status: $('#status-update').val()
        });
        tweetsCollection.add(tweet);
        console.log(tweetsCollection.toJSON());
        return false;
    });


});
