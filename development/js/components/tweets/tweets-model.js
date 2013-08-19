define(['backbone'], function (Backbone) {
    var Tweet = Backbone.Model.extend({
        urlRoot: '/api.php/rest',
        defaults: {
            author: '',
            status: ''
        }
    });
    return Tweet;
});
