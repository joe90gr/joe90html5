/*global setTimeout clearTimeout console*/

var appConsole = appConsole || {};
define(['modernizr',
        'backbone',
        'marionette',
        'tweetsController',
        'tweetsModel',
        'tweetsCollection',
        'tweetsView',
        'modalModel',
        'modalView',
        'formView',
        'router'],
    function (mod,
               Backbone,
               Marionette,
               TweetController,
               Tweet,
               TweetList,
               TweetsView,
               ModalModel,
               ModalView,
               FormView,
               Router
               ) {
    'use strict';

    var Console = function(){
        this.init();
        this.initRouter();
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

        var TheApp = new Marionette.Application();

        TheApp.addRegions({
            header: '.header-panel',
            content: '#tweets-container',
            footer: '.footer-inner'
        });

        /*  The Alternative way to add regions (withought Marionette.Application)
        var header = new Marionette.Region({el: '.header-panel'});
        var content = new Marionette.Region({el: '#tweets-container'});
        var footer = new Marionette.Region({el: '.footer-inner'});
        */
        var Test = Marionette.View.extend({
            el: '',
            template: '',
            initialize: function(){
                this.$el.html('render new content');
            }
        });

        var modal = new ModalModel();
        var modalview = new ModalView({model: modal});

        //TODO: since models trigger once since repeated change event with same data
        appConsole.modal = modal;
        //modal.set({title: "March 20", content: "In his eyes she eclipses..."});

        var tweetModule = new TweetController();

        /* previous way of intantiating views (Alternative to XXXController.initialize)
        var tweetList = new TweetList();
        var tweetView = new TweetsView({collection: tweetList});
        */

        var formview = new FormView({collection: tweetModule.tweetList});


        //Experimenting with view switching
        var test = new Test();

        TheApp.header.show(formview);
        TheApp.content.show(tweetModule.tweetView);
        TheApp.content.show(test);

        //TODO: Temporary test rig remove once finished.
        setTimeout(function(){
            tweetModule.tweetView.listenToEvents();
            TheApp.content.show(tweetModule.tweetView);
        },1000);
        //TheApp.footer.show(formview);
    };

    //TODO: Temporary test rig remove once finished.
    Console.prototype.modalRepeatedRunTest = function(){
        var self = this;
        var xtime = setTimeout(function(){
            appConsole.modalview.trigger('click:open',{title:'test', html:'html'});
            clearTimeout(xtime);
            var ytime = setTimeout(function(){
                appConsole.modalview.trigger('click:close');
                clearTimeout(ytime);
                self.modalRepeatedRunTest();
            },300);
        },300);
    };

    return Console;
});
