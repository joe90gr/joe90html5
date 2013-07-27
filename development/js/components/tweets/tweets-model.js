define(['backbone'], function (Backbone) {
    var Tweet = Backbone.Model.extend({
        initialize: function(){
            console.log('model id',this.isNew(),' the model ', this.id);
        },
        urlRoot: '/api.php/rest',
        defaults: {
            author: '',
            status: ''
        }
    });
    return Tweet;
});
