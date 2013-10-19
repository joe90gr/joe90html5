define(['app-console',
    'marionette',
    'testCollection',
    'testView'], function(AppConsole, Marionette, TestCollection, TestView){

    var Controller = Marionette.Controller.extend({
        initialize: function(){
            this.testCollection = new TestCollection();
            this.testView = new TestView({collection: this.testCollection});
            AppConsole.twoColumnLayout.side.show(this.testView);
        }

    });
    return Controller;
});
