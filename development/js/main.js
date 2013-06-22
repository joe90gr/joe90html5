requirejs.config({
	"baseUrl":"js",
	"waitSeconds": 7,
	"useSourceUrl":false,
	"paths":{
		"modernizr":"libs/modernizr",
        "chai":"libs/chai",
        "backbone":"libs/backbone",
        "text": "libs/text"
	},
    shim: {
        'backbone':{
            deps: ['libs/underscore', 'libs/jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['myapp'],function(myapp){

});
