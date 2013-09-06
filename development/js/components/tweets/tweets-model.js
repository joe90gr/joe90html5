define(['backbone'], function (Backbone) {
    var Tweet = Backbone.Model.extend({
        urlRoot: '/api.php/rest',

        defaults: {
            author: '',
            status: ''
        },

        destroyRecord: function(){
            this.destroy({
                success: function(model, response){
                    console.log('DESTROYED',model.id , response );
                },
                error: function(){
                    console.log('Destroy failed', response);
                }
            });
        }
    });
    return Tweet;
});
