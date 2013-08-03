define(['backbone',
    'components/tweets/tweets-model'],
    function (Backbone,
              Tweet) {

    var TweetList = Backbone.Collection.extend({
        model: Tweet,
        url:'/api.php/rest'
    });
    var tweetsCollection = new TweetList();
    tweetsCollection.fetch({
        success:function(model, response){
            console.log('fetch was a success', response);
        },
        fail: function(){
            console.log('fetch has failed', response);
        }
    });
    return tweetsCollection;
});
