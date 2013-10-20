define(['backbone',
    'marionette',
    'router',
    'twoColumnLayout',
    'modalController'], function(Backbone, Marionette, Router, TwoColumnLayout, ModalController){
    var AppConsole = function(){
        Backbone.history.start();
    };
    AppConsole.prototype.application = new Marionette.Application();
    AppConsole.prototype.requestResponse = new Backbone.Wreqr.RequestResponse();
    AppConsole.prototype.router = new Router();
    AppConsole.prototype.twoColumnLayout = new TwoColumnLayout();
    AppConsole.prototype.modal = new ModalController();

    return new AppConsole();
});
