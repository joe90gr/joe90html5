define(['jquery',
    'backbone',
    'marionette',
    'jqueryCookie',
    'comms',
    'twoColumnLayout'],
    function($, Backbone, Marionette, JqueryCookie, Comms, TwoColumnLayout){

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

            this.windowResize(function(){
                self.events.trigger("on-window-resize");
            }.bind(this));

            this.events.on('error',function(msg){
                console.log(msg);
            });

            this.events.on('logged-in',function(msg){
                console.log('just triggered logged in',msg);
            });

            this.events.on('logged-out',function(){
                console.log('just triggered logged out');
            });

        },

        sessionManager: function(){
            var self = this;

            function loginSuccess(msg){
                self.events.trigger('logged-in', self.userData());
            }

            function logoutSuccess(msg){
                self.events.trigger('logged-out');
            }

            function loginError(msg){
                //TODO: try to get the origin of the error and then do something.
                //console.log(msg);
            }

            return {
                sessionId: $.cookie('PHPSESSID'),

                loginRequest: function(data){
                    var url = "/server/session.php/login";
                    self.comms.post(url, data).then(loginSuccess, loginError);
                },
                logoutRequest:function(data){
                    var url = "/server/session.php/logout";
                    self.comms.post(url, data).then(logoutSuccess, loginError);
                }
            };
        },

        userData: function(){
            var userInfo = $.cookie('userinfo');
            return JSON.parse(userInfo ? userInfo : '{}');
        }

    };

    return new AppConsole();
});
