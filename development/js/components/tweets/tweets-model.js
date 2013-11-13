define(['backbone'], function (Backbone) {
    var Tweet = Backbone.Model.extend({
        urlRoot: '/server/api.php/rest',

        defaults: {
            author: '',
            status: ''
        },

        destroyRecord: function(){
            this.destroy({
                success: function(model, response){
                    console.log('DESTROYED',model.id , response );
                },
                error: function(model, response){
                    console.log('Destroy failed', response);
                }
            });
        }
    });
    return Tweet;
});
