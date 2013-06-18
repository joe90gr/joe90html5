define(['backbone'], function (Backbone) {
    var Tweet = Backbone.Model.extend({
        defaults: function(){
            return{
                author: '',
                status: ''
            }
        }
    });
    return Tweet;
});
