define(['app-console',
    'backbone',
    'marionette',
    'testCollection',
    'testView'], function(AppConsole, Backbone, Marionette, TestCollection, TestView){

    var Controller = function(){
        this.testCollection = new TestCollection();
        this.testView = new TestView({collection: this.testCollection});
        this.initialize();
    };
    Controller.prototype.initialize = function(){
        AppConsole.twoColumnLayout.side.show(this.testView);
    };

    return Controller;
});
