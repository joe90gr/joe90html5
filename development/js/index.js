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
            this.setApplicationRegions();
            this.setRequestResponseHandlers();

            AppConsole.application.content.show(AppConsole.twoColumnLayout);

            this.modal = new ModalController();
            this.tweetController = new TweetController();
            this.formController = new FormController();
            this.testController = new TestController();

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
            AppConsole.windowResize(function(){
                AppConsole.requestResponse.request("on-window-resize");
            });

            AppConsole.requestResponse.setHandlers({
                "foo": function(){
                    console.log('hey foo');
                },
                "bar": function(){
                    console.log('hey bar');
                }
            });

            AppConsole.requestResponse.request("bar");
            AppConsole.requestResponse.request("foo");
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
