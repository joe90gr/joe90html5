/*global setTimeout clearTimeout console*/
var writeFormat = ['%c JOE! ' , 'background: #222; color: #bada55'];

define(['modernizr',
        'backbone',
        'marionette',
        'jqueryCookie',
        'app-console',
        'router',
        'twoColumnLayout',
        'tweetsController',
        'modalController',
        'formModel',
        'formController',
        'testController',
        'tweeterController'],
    function ( mod,
               Backbone,
               Marionette,
               JqueryCookie,
               AppConsole,
               Router,
               TwoColumnLayout,
               TweetController,
               ModalController,
               FormModel,
               FormController,
               TestController,
               TweeterController) {
    'use strict';
    var Console = Marionette.Controller.extend({
        initialize:function(){
            this.router = new Router();
            Backbone.history.start();

            this.setRequestResponseHandlers();

            AppConsole.application.content.show(AppConsole.twoColumnLayout);

            this.modal = new ModalController();

            this.testController = new TestController(function(thisView){
                AppConsole.twoColumnLayout.side.show(thisView);
            });

            this.tweeterController = new TweeterController(function(thisLayout){
                AppConsole.twoColumnLayout.content.show(thisLayout);
            });


            //set login state
            //AppConsole.requestResponse.request("set-login");

            AppConsole.requestResponse.request("bar");
            AppConsole.requestResponse.request("foo");

            this.formControllera = new FormController({
                model: new FormModel({
                    input: [
                        {
                            id: 'test-one',
                            title: 'Test 1',
                            name: 'test-name',
                            value: 'test value',
                            type: 'text'
                        },
                        {
                            id: 'test-two',
                            title: 'test 2',
                            name: 'test2 name',
                            value: 'test value2',
                            type: 'text'
                        }
                    ],
                    'button-title': 'Show'
                }),

                onSubmitCallback: function(el){
                    var test1 = el.find('#test-one').val();
                    var test2 = el.find('#test-two').val();
                    AppConsole.requestResponse.request("show-modal", 'Notice','you have entered '+test1+' and '+test2+'');
                }
            });

            AppConsole.application.header.show(this.formControllera.formview);

            //this.modalRepeatedRunTest();
        },

        setRequestResponseHandlers: function(){},

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
