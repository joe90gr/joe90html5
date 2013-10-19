define(['backbone',
    'marionette',
    'router',
    'twoColumnLayout'], function(Backbone, Marionette, Router, TwoColumnLayout){
    var Console = function(){
        this.main = new Marionette.Application();
        Backbone.history.start();
    };

    Console.prototype = {
        requestResponse : new Backbone.Wreqr.RequestResponse(),
        router : new Router(),
        twoColumnLayout : new TwoColumnLayout()
    };

    return new Console();
});
