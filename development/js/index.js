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
        'formModel',
        'formCollection',
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
               FormModel,
               FormCollection,
               FormView,
               Router
               ) {
    'use strict';

    var Console = function(){
        this.init();
        this.initRouter();
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
            content: '.main-inner',
            side: '.side',
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

        var formview = new FormView({
            model: new FormModel({
                'input': [
                    {
                        id: 'author-name',
                        title: 'Author',
                        name: 'author-name',
                        value: 'the value',
                        type: 'text'
                    },
                    {
                        id: 'status-update',
                        title: 'Status',
                        name: 'status-update',
                        value: 'the value1',
                        type: 'text'
                    }
                ]
            }),
            tweetCollection: tweetModule.tweetList
        });


        //Experimenting with view switching
        var test = new Test();

        TheApp.header.show(formview);
        TheApp.content.show(tweetModule.tweetView);

        TheApp.side.show(test);
        //this.modalRepeatedRunTest(TheApp,tweetModule);
    };

    //TODO: Temporary test rig remove once finished.
    Console.prototype.modalRepeatedRunTest = function(TheApp,tweetModule){
        var self = this;
        var xtime = setTimeout(function(){
            TheApp.content.close();
            tweetModule.tweetView.listenToEvents();
            TheApp.side.show(tweetModule.tweetView);
            clearTimeout(xtime);
            var ytime = setTimeout(function(){
                tweetModule.tweetView.listenToEvents();
                TheApp.content.show(tweetModule.tweetView);
                clearTimeout(ytime);
                self.modalRepeatedRunTest(TheApp,tweetModule);
            },1000);
        },1000);
    };

    return Console;
});
