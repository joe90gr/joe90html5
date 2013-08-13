requirejs.config({
	"baseUrl":"js",
	"waitSeconds": 7,
	"useSourceUrl":false,
	"paths":{
	    modernizr:"libs/modernizr",
        chai:"libs/chai",
        underscore: "libs/underscore",
        jquery: "libs/jquery",
        backbone:"libs/backbone",
        marionette: "libs/marionette",


        mustache: "libs/mustache",
        text: "libs/text"
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
    //console.log(myapp);
    var Console = new myapp;
    //Console.modalRepeatedRunTest();
});
