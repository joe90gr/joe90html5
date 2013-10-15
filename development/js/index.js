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
        appConsole.main = new Marionette.Application();
        appConsole.vent = new Backbone.Wreqr.RequestResponse();

        this.initRouter();
        this.init();
    };

    Console.prototype.initRouter = function(){
        appConsole.router = new Router();
        Backbone.history.start();
    };

    Console.prototype.init = function(){
        appConsole.main.addRegions({
            header: '.header-panel',
            content: '.content-main',
            footer: '.footer-inner'
        });

        appConsole.twoColumnLayout = new TwoColumnLayout();
        appConsole.main.content.show(appConsole.twoColumnLayout);

        var tweetController = new TweetController();
        var formController = new FormController();
        var testController = new TestController();

        appConsole.vent.request("bar");
        appConsole.vent.request("foo");
    };

    return Console;
});
