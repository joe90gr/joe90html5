/*global setTimeout clearTimeout console*/
var writeFormat = ['%c JOE! ' , 'background: #222; color: #bada55'];

define(['modernizr',
        'backbone',
        'marionette',
        'jqueryCookie',
        'app-console',
        'router',
        'twoColumnLayout',
        'tweetsController',
        'modalController',
        'formModel',
        'formController',
        'testController',
        'tweeterController',
        'loginController'],
    function ( mod,
               Backbone,
               Marionette,
               JqueryCookie,
               AppConsole,
               Router,
               TwoColumnLayout,
               TweetController,
               ModalController,
               FormModel,
               FormController,
               TestController,
               TweeterController,
               LoginController) {
    'use strict';
    var Console = Marionette.Controller.extend({
        initialize:function(){
            this.router = new Router();
            Backbone.history.start();

            this.setRequestResponseHandlers();

            AppConsole.application.content.show(AppConsole.twoColumnLayout);

            var modal = new ModalController();

            var testController = new TestController(function(thisView){
                AppConsole.twoColumnLayout.side.show(thisView);
            });

            var tweeterController = new TweeterController(AppConsole.twoColumnLayout.content);
            tweeterController.showModule();

//            setTimeout(function(){
//                tweeterController.closeModule();
//                setTimeout(function(){
//                    tweeterController.showModule(AppConsole.twoColumnLayout.side);
//                },1000)
//            },1000);


            var loginController = new LoginController(AppConsole.application.header);
            loginController.showModule();

            //this.modalRepeatedRunTest();
        },

        setRequestResponseHandlers: function(){},

        //TODO: Temporary test rig remove once finished.
        modalRepeatedRunTest: function(){
            var self = this;
            var xtime = setTimeout(function(){

                self.tweetController.close();
                clearTimeout(xtime);
                var ytime = setTimeout(function(){

                    self.tweetController.openView();
                    clearTimeout(ytime);
                    self.modalRepeatedRunTest();
                },100);
            },100);
        }
    });

    return Console;
});
