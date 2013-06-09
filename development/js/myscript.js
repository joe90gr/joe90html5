requirejs.config({
	"baseUrl":"js",
	"waitSeconds": 7,
	"useSourceUrl":false,
	"paths":{
		"modernizr":"libs/modernizr",	
		"jquery":"libs/jquery",
		"underscore":"libs/underscore",
        "chai":"libs/chai",
		"backbone":"libs/backbone"
	}
});

requirejs(['./main'],function(main){

});
