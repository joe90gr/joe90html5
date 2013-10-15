define(['backbone',
    'marionette',
    'testCollection',
    'testView'], function(Backbone, Marionette, TestCollection, TestView){

    var Controller = function(){
        this.testCollection = new TestCollection();
        this.testView = new TestView({collection: this.testCollection});
        this.initialize();
    };
    Controller.prototype.initialize = function(){
        appConsole.twoColumnLayout.side.show(this.testView);
    };

    return Controller;
});
