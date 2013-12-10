define(['backbone',
    'marionette',
    'comms',
    'twoColumnLayout'],
    function(Backbone,
             Marionette,
             Comms,
             TwoColumnLayout){

    var AppConsole = function(){
        this.setApplicationRegions();
        this.setConsoleEventHandlers();
    };
    AppConsole.prototype = {
        application: new Marionette.Application(),
        requestResponse: new Backbone.Wreqr.RequestResponse(),
        twoColumnLayout: new TwoColumnLayout(),
        comms: new Comms(),
        events: {},

        isloggedIn: function(){
            return $.cookie('PHPSESSID')? true: false;
        },

        windowResize: function(){
           var args = _.toArray(arguments);
            var resize = $(window).on('resize', function(){
                _(args).each(function(i,val){
                    args[val]();
                });
            });
        },

        setApplicationRegions: function(){
            this.application.addRegions({
                header: '.header-panel',
                content: '.content-main',
                footer: '.footer-inner'
            });
        },

        setConsoleEventHandlers: function(){
            var self = this;
            _.extend(this.events, Backbone.Events);

            this.requestResponse.setHandlers({
                'foo': function(){
                    console.log('hey foo');
                },
                'bar': function(){
                    console.log('hey bar');
                }
            });

            this.windowResize(function(){
                self.events.trigger("on-window-resize");
            }.bind(this));

            this.events.listenTo(this.events, 'error',function(msg){
                console.log(msg);
            });

            this.events.listenTo(this.events, 'logged-in',function(msg){
                console.log('just triggered logged in');
            });

            this.events.listenTo(this.events, 'logged-out',function(){
                console.log('just triggered logged out');
            });

        },

        sessionManager: function(){
            var self = this;

            return {
                loginRequest: function(data,fn1,fn2){
                    var url = "/server/session.php/login";
                    self.comms.post(url, data).then(this.loginSuccess, this.loginError);
                    console.log('promise false');
                },
                logoutRequest:function(data){
                    var url = "/server/session.php/logout";
                    self.comms.post(url, data).then(this.logoutSuccess, this.loginError);
                },
                loginSuccess: function(msg){
                    self.events.trigger('logged-in');
                    console.log(msg);
                },
                logoutSuccess: function(msg){
                    self.events.trigger('logged-out');
                    console.log(msg);
                },
                loginError: function(msg){
                    //TODO: try to get the origin of the error and then do something.
                    //console.log(msg);
                }
            };
        }
    };

    return new AppConsole();
});
