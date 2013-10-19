/*global setTimeout clearTimeout console*/
var writeFormat = ['%c JOE! ' , 'background: #222; color: #bada55'];
var appConsole = appConsole || {};
define(['modernizr',
        'backbone',
        'marionette',
        'app-console',
        'twoColumnLayout',
        'tweetsController',
        'modalController',
        'formController',
        'testController'],
    function ( mod,
               Backbone,
               Marionette,
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
            AppConsole.main.addRegions({
                header: '.header-panel',
                content: '.content-main',
                footer: '.footer-inner'
            });

            AppConsole.main.content.show(AppConsole.twoColumnLayout);

            this.modalController = new ModalController();
            this.tweetController = new TweetController();
            this.formController = new FormController();
            this.testController = new TestController();

            AppConsole.requestResponse.request("bar");
            AppConsole.requestResponse.request("foo");

            //this.modalRepeatedRunTest();
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
