define(['backbone',
    'tweetsModel'],
    function (Backbone,
              Tweet) {

    var TweetList = Backbone.Collection.extend({
        model: Tweet,
        url:'/api.php/rest',

        addRecord: function(tweet){
            this.create(tweet,{
                success: function(model,response){
                    console.log('Create Was Successful',model.id, response);
                },
                error: function(model, response){
                    console.log('Create Was ERROR', response);
                }
            });
        },
        getRecords: function(){
            this.fetch({
                success:function(model, response){
                    console.log('fetch was a success', response);
                },
                error: function(model, response){
                    console.log('fetch has failed', response);
                }
            });
        }
    });
    return TweetList;
});
