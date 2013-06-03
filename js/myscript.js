requirejs.config({
	"baseUrl":"js",
	"waitSeconds": 7,
	"useSourceUrl":false,
	"paths":{
		"modernizr":"libs/modernizr",	
		"jquery":"libs/jquery",
		"underscore":"libs/underscore",
		"backbone":"libs/backbone"
	},

});

requirejs(['./mainr'],function(main){

})
