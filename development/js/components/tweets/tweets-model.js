define(['backbone'], function (Backbone) {
    var Tweet = Backbone.Model.extend({
        initialize: function(){
        },
        urlRoot: '/api.php/rest',
        defaults: {
            author: '',
            status: ''
        }
    });
    return Tweet;
});
