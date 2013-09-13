define(['backbone'],function(Backbone){
    var router = Backbone.Router.extend({
        routes: {
            'about': 'showAbout',
            'myid/:id': 'getId'
        },

        showAbout: function(){
            console.log('test route to about');
        },
        getId: function(id){
            console.log('the id is',id);
        }
    });
    return router;
});


