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

            this.modal = new ModalController();

            this.testController = new TestController(function(thisView){
                AppConsole.twoColumnLayout.side.show(thisView);
            });

            this.tweeterController = new TweeterController(AppConsole.twoColumnLayout.content);
            this.tweeterController.showTweeterModule();
//            var self=this;
//            setTimeout(function(){
//                self.tweeterController.closeTweeterModule();
//                setTimeout(function(){
//                    self.tweeterController.showTweeterModule();
//                },500)
//            },500);


            //$.cookie('PHPSESSIDa','trtert')  test

            var loginController = new LoginController(AppConsole.application.header);
            loginController.showLoginModule();

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
