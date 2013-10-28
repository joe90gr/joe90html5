/*global setTimeout clearTimeout console*/
var writeFormat = ['%c JOE! ' , 'background: #222; color: #bada55'];

define(['modernizr',
        'backbone',
        'marionette',
        'jqueryCookie',
        'app-console',
        'twoColumnLayout',
        'tweetsController',
        'modalController',
        'formController',
        'testController'],
    function ( mod,
               Backbone,
               Marionette,
               JqueryCookie,
               AppConsole,
               TwoColumnLayout,
               TweetController,
               ModalController,
               FormController,
               TestController
               ) {
    'use strict';
    var Console = Marionette.Controller.extend({
        initialize:function(){
            this.setApplicationRegions();
            this.setRequestResponseHandlers();

            AppConsole.application.content.show(AppConsole.twoColumnLayout);

            this.modal = new ModalController();
            this.tweetController = new TweetController();
            this.formController = new FormController();
            this.testController = new TestController();

            //set login state
            //AppConsole.requestResponse.request("set-login");

            AppConsole.requestResponse.request("bar");
            AppConsole.requestResponse.request("foo");
//            $.ajax({
//                type: "post",
//                url: 'api.php/rest',
//                data:{
//                }
//            });
            //this.modalRepeatedRunTest();
        },

        setApplicationRegions: function(){
            AppConsole.application.addRegions({
                header: '.header-panel',
                content: '.content-main',
                footer: '.footer-inner'
            });
        },

        setRequestResponseHandlers: function(){

        },

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
