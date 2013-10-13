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
        'formModel',
        'formCollection',
        'formView',
        'testController',
        'testView',
        'router'],
    function (mod,
               Backbone,
               Marionette,
               TwoColumnLayout,
               TweetController,
               ModalController,
               FormController,
               FormModel,
               FormCollection,
               FormView,
               TestController,
               TestView,
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

        var layout = new TwoColumnLayout();
        layout.addRegions({
            content: '.main-inner',
            side: '.side'
        });

        var formController = new FormController();
        var testController = new TestController();
        var tweetModule = new TweetController();


        TheApp.header.show(formController.formview);
        TheApp.content.show(layout);
        layout.content.show(formController.tweetModule.tweetView);
        layout.side.show(testController.testView);

        //this.modalRepeatedRunTest(layout,tweetModule);
    };

    //TODO: Temporary test rig remove once finished.
    Console.prototype.modalRepeatedRunTest = function(layout,tweetModule){
        var self = this;
        var xtime = setTimeout(function(){
            layout.content.close();

            layout.side.show(tweetModule.tweetView);
            clearTimeout(xtime);
            var ytime = setTimeout(function(){

                layout.content.show(tweetModule.tweetView);
                clearTimeout(ytime);
                self.modalRepeatedRunTest(layout,tweetModule);
            },300);
        },300);
    };

    return Console;
});
