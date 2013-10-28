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
        this.setConsoleEventHandlers();
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

    AppConsole.prototype.setConsoleEventHandlers = function(){
        this.requestResponse.setHandlers({
            'set-login': function(){
                //clearThisSession()
            },

            'foo': function(){
                console.log('hey foo');
            },
            'bar': function(){
                console.log('hey bar');
            }
        });

        this.windowResize(function(){
            this.requestResponse.request("on-window-resize");
        }.bind(this));

    };

    return new AppConsole();
});
