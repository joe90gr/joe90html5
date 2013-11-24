define(['marionette', 'mustache', 'text!loginTemplate'],
    function(Marionette, Mustache, LoginTemplate){
    var LoginLayout = Marionette.Layout.extend({

        template: function(data){
            return Mustache.render(LoginTemplate,data);
        },
        tagName: 'section',
        regions: {
             authModule: '.login-module'
        },
        initialize: function(){
            console.log('testing login view');
        }

    });
    return LoginLayout;
})