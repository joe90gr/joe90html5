define(['backbone',
    'marionette',
    'twoColumnLayout'],
    function(Backbone,
             Marionette,
             TwoColumnLayout){
    var AppConsole = function(){
        this.setApplicationRegions();
        this.setConsoleEventHandlers();
    };
    AppConsole.prototype.application = new Marionette.Application();
    AppConsole.prototype.requestResponse = new Backbone.Wreqr.RequestResponse();
    AppConsole.prototype.twoColumnLayout = new TwoColumnLayout();

    AppConsole.prototype.windowResize = function(){
       var args = _.toArray(arguments);
        var resize = $(window).on('resize', function(){
            _(args).each(function(i,val){
                args[val]();
            });
        });
    };

    AppConsole.prototype.setApplicationRegions = function(){
        this.application.addRegions({
            header: '.header-panel',
            content: '.content-main',
            footer: '.footer-inner'
        });
    };

    AppConsole.prototype.setConsoleEventHandlers = function(){
        this.requestResponse.setHandlers({
            'isloggedIn': function(){
                return $.cookie('PHPSESSID')? true: false;
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
