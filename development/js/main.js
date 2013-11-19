requirejs.config({
	"baseUrl":"js",
	"waitSeconds": 7,
	"useSourceUrl":false,
	"paths":{
        modernizr: "libs/modernizr",
        chai: "libs/chai",
        underscore: "libs/underscore",
        jquery: "libs/jquery",
        jqueryCookie: 'libs/jquery-cookie',
        backbone: "libs/backbone",
        marionette: "libs/backbone.marionette",
        babysitter: "libs/backbone.babysitter",
        wreqr: "libs/backbone.wreqr",
        mustache: "libs/mustache",
        text: "libs/text",
        router :"utils/router",
        comms: "utils/comms",

        homePage: 'pages/home-page',

        twoColumnLayout: 'pages/two-column/two-column-layout',
        twoColumnTemplate: 'pages/two-column/two-column.template',

        formController: 'components/form/form-controller',
        formModel: 'components/form/form-model',
        formCollection: 'components/form/form-collection',
        formView: 'components/form/form-view',
        formTemplate: 'components/form/form.template',

        modalController: 'components/modal/modal-controller',
        modalModel: 'components/modal/modal-model',
        modalView: 'components/modal/modal-view',
        modalTemplate: 'components/modal/modal.template',

        tweetsController: 'components/tweets/tweet-controller',
        tweetsModel: 'components/tweets/tweets-model',
        tweetsCollection: 'components/tweets/tweets-collection',
        tweetsView: 'components/tweets/tweets-view',
        tweetTemplate: 'components/tweets/tweet.template',

        testController: 'components/test/controller',
        testModel: 'components/test/model',
        testCollection: 'components/test/collection',
        testView: 'components/test/view',
        testTemplate: 'components/test/test.template',

        tweeterController: 'modules/tweeter/tweeter-controller',
        tweeterLayout: 'modules/tweeter/tweeter-layout',
        tweeterTemplate: 'modules/tweeter/tweeter.template',

        loginController: 'modules/login/login-controller',
        loginView: 'modules/login/login-view'
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
