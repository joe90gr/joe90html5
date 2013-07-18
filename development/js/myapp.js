
var appConsole = appConsole || {};
var deps = [
    'modernizr',
    'backbone',
    'components/tweets/tweets-model',
    'components/tweets/tweets-collections',
    'components/tweets/tweets-view',
    'components/modal/modal-view',
    'components/form/form-view'
];

define(deps, function (mod,
                       Backbone,
                       Tweet,
                       TweetList,
                       TweetsView,
                       ModalView,
                       FormView
                       ) {
    'use strict';
    var Console = function(){
        this.init();
        this.router();
    };

    Console.prototype.init = function(){
        Backbone.on('all',function(input){
            console.log('fired general event',input);
        });

        var formview = new FormView();

        //modalview = new ModalView()
        var tweetii = new TweetsView();
    };

    Console.prototype.router = function(){
        var appRouter = Backbone.Router.extend({
            routes: {
                'about': 'showAbout',
                'myid/:id': 'getId'
            },

            showAbout: function(){
                console.log('test route to about');
            },
            getId: function(id){
                console.log('the id is',id);
            }
        });

        var approuter = new appRouter();
        Backbone.history.start();
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
