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

    var Console = function(){

        this.init();
    };

    Console.prototype.init = function(){
        AppConsole.main.addRegions({
            header: '.header-panel',
            content: '.content-main',
            footer: '.footer-inner'
        });


        AppConsole.main.content.show(AppConsole.twoColumnLayout);

        var modalController = new ModalController();
        var tweetController = new TweetController();
        var formController = new FormController();
        var testController = new TestController();

        AppConsole.requestResponse.request("bar");
        AppConsole.requestResponse.request("foo");
    };

    return Console;
});
