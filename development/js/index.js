/*global setTimeout clearTimeout console*/
var writeFormat = ['%c JOE! ' , 'background: #222; color: #bada55'];
var appConsole = appConsole || {};
define(['modernizr',
        'backbone',
        'marionette',
        'twoColumnLayout',
        'tweetsController',
        'modalController',
        'formController',
        'testController',
        'router'],
    function ( mod,
               Backbone,
               Marionette,
               TwoColumnLayout,
               TweetController,
               ModalController,
               FormController,
               TestController,
               Router
               ) {
    'use strict';

    var Console = function(){
        appConsole.vent = new Backbone.Wreqr.RequestResponse();
        this.init();
        this.initRouter();
        appConsole.vent.request("bar");
        appConsole.vent.request("foo");
    };

    Console.prototype.initRouter = function(){
        appConsole.router = new Router();
        Backbone.history.start();
    };

    Console.prototype.init = function(){
        var TheApp = new Marionette.Application();
        TheApp.addRegions({
            header: '.header-panel',
            content: '.content-main',
            footer: '.footer-inner'
        });

        var twoColumnlayout = new TwoColumnLayout();

        var formController = new FormController();
        var testController = new TestController();
        var tweetController = new TweetController();


        TheApp.header.show(formController.formview);
        TheApp.content.show(twoColumnlayout);
        twoColumnlayout.content.show(formController.tweetView);
        twoColumnlayout.side.show(testController.testView);

        //this.modalRepeatedRunTest(layout,tweetController.tweetView);
    };

    //TODO: Temporary test rig remove once finished.
    Console.prototype.modalRepeatedRunTest = function(layout,mod){
        var self = this;
        var xtime = setTimeout(function(){
            layout.content.close();
            layout.side.show(mod);
            clearTimeout(xtime);
            var ytime = setTimeout(function(){
                layout.content.show(mod);
                clearTimeout(ytime);
                self.modalRepeatedRunTest(layout,mod);
            },1000);
        },1000);
    };

    return Console;
});
