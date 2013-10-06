requirejs.config({
	"baseUrl":"js",
	"waitSeconds": 7,
	"useSourceUrl":false,
	"paths":{
        modernizr: "libs/modernizr",
        chai: "libs/chai",
        underscore: "libs/underscore",
        jquery: "libs/jquery",
        backbone: "libs/backbone",
        marionette: "libs/backbone.marionette",
        babysitter: "libs/backbone.babysitter",
        wreqr: "libs/backbone.wreqr",
        mustache: "libs/mustache",
        text: "libs/text",

        formModel: 'components/form/form-model',
        formCollection: 'components/form/form-collection',
        formView: 'components/form/form-view',
        formTemplate: 'components/form/form.template',

        modalModel: 'components/modal/modal-model',
        modalView: 'components/modal/modal-view',
        modalTemplate: 'components/modal/modal.template',

        tweetsController: 'components/tweets/tweet-controller',
        tweetsModel: 'components/tweets/tweets-model',
        tweetsCollection: 'components/tweets/tweets-collection',
        tweetsView: 'components/tweets/tweets-view',
        tweetTemplate: 'components/tweets/tweet.template',

        testModel: 'components/test/model',
        testCollection: 'components/test/collection',
        testView: 'components/test/view',
        testTemplate: 'components/test/test.template'
    },
    shim: {
        jquery : {
            exports : '$'
        },
        underscore: {
            exports: '_'
        },
        backbone:{
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette : {
            deps : ['backbone'],
            exports : 'Marionette'
        }
    }
});

require(['index'],function(myapp){
    var Console = new myapp();
});
