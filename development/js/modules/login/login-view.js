define(['marionette'], function(Marionette){
    var LoginView = Marionette.View.extend({

        className: 'login-module',
        initialize: function(){
            console.log('testing login view');
        }

    });
    return LoginView;
})