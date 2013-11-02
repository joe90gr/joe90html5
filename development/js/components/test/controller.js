define(['app-console',
    'marionette',
    'testCollection',
    'testView'], function(AppConsole, Marionette, TestCollection, TestView){

    var Controller = Marionette.Controller.extend({
        initialize: function(fn){
            this.testCollection = new TestCollection();
            this.testView = new TestView({collection: this.testCollection});
            fn(this.testView);
        }

    });
    return Controller;
});
