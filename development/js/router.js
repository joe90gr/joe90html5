define(['backbone','app-console'],function(Backbone, AppConsole){
    var router = Backbone.Router.extend({
        initialize: function(){},
        routes: {
            '': 'home',
            'about': 'showAbout',
            'myid/:id': 'getId'
        },
        home: function(){
            console.log('im home');
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
