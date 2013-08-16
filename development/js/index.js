var appConsole = appConsole || {};

define(['modernizr',
        'backbone',
        'marionette',
        'tweetsModel',
        'tweetsCollection',
        'tweetsView',
        'modalView',
        'formView',
        'router'],
    function (mod,
               Backbone,
               Marionette,
               Tweet,
               TweetList,
               TweetsView,
               ModalView,
               FormView,
               Router
               ) {
    'use strict';
    var Console = function(){
        this.initRouter();
        this.init();
        //this.modalRepeatedRunTest();
    };

    Console.prototype.initRouter = function(){
        appConsole.router = new Router();
        Backbone.history.start();
    };

    Console.prototype.init = function(){
        Backbone.on('all',function(input){
            console.log('fired general event',input);
        });

        appConsole.modalview = new ModalView();

        var myRegion = new Marionette.Region({
            el: '.button-panel'
        });

        var tweetii = new TweetsView();
        var formview = new FormView({collection: tweetii.collection});

        myRegion.show(formview);
    };


    Console.prototype.modalRepeatedRunTest = function(){
        var self = this;
        var xtime = setTimeout(function(){
            appConsole.modalview.trigger('click:open',{title:'test', html:'html'});
            clearTimeout(xtime);
            var ytime = setTimeout(function(){
                appConsole.modalview.trigger('click:close');
                clearTimeout(ytime)
                self.modalRepeatedRunTest();
            },300)
        },300);
    };

    return Console;
});
