requirejs.config({
	"baseUrl":"js",
	"waitSeconds": 7,
	"useSourceUrl":false,
	"paths":{
	    modernizr:"libs/modernizr",
        chai:"libs/chai",
        underscore: "libs/underscore",
        jquery: "libs/jquery",
        backbone:"backbone",
        marionette: "marionette",


        mustache: "libs/mustache",
        text: "libs/text"
	},
    shim: {
        jquery : {
            exports : 'libs/jquery'
        },
        underscore: {
            exports: '_'
        },
        backbone:{
            deps: ['libs/underscore', 'libs/jquery'],
            exports: 'Backbone'
        },
        marionette : {
            deps : ['libs/jquery', 'libs/underscore', 'backbone'],
            exports : 'Marionette'
        }
    }
});

require(['myapp'],function(myapp){
    //console.log(myapp);
    var Console = new myapp;
    //Console.modalRepeatedRunTest();
});
