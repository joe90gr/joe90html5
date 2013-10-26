define(['backbone',
    'marionette',
    'router',
    'twoColumnLayout'],
    function(Backbone,
             Marionette,
             Router,
             TwoColumnLayout){
    var AppConsole = function(){
        Backbone.history.start();
    };
    AppConsole.prototype.application = new Marionette.Application();
    AppConsole.prototype.requestResponse = new Backbone.Wreqr.RequestResponse();
    AppConsole.prototype.router = new Router();
    AppConsole.prototype.twoColumnLayout = new TwoColumnLayout();

    AppConsole.prototype.windowResize = function(){
        var args = arguments;
        var resize = $(window).on('resize', function(){
            _(args).each(function(i,val){
                args[val]();
            });
        });
    };

    return new AppConsole();
});
