define(['backbone',
    'marionette',
    'mustache',
    'testModel',
    'testCollection',
    'testView',
    'text!testTemplate'], function(Backbone, Marionette, Mustache, TestModel, TestCollection, TestView, TestTemplate){

    var Controller = function(){
        this.initialize();
    };
    Controller.prototype = {
        initialize: function(){
            this.testCollection = new TestCollection();
            this.testView = new TestView({collection: this.testCollection});
        }
    };

    return Controller;
});
