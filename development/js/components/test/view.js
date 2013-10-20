define([
    'app-console',
    'backbone',
    'marionette',
    'mustache',
    'testModel',
    'testCollection',
    'text!testTemplate'
], function(AppConsole, Backbone, Marionette, Mustache, TestModel, TestCollection, TestTemplate){

    var testItem = Marionette.ItemView.extend({
        template: function(data){
            return Mustache.render(TestTemplate,data);
        },
        initialize: function(){}
    });

    var factoryItemView = Marionette.ItemView.extend({
        template: function(data){
            return Mustache.render('bollohcks',data);
        },
        initialize: function(){}
    });

    var testView = Marionette.CollectionView.extend({
        model: TestModel,
        collection: new TestCollection(),
        tagName: 'section',
        itemView: testItem,
        emptyView: factoryItemView,

        initialize: function(){
            //this.listenTo(this.collection,'remove', this.trig, this);
            this.addToCollectionTest();
        },

        onRender: function(){
            console.log(writeFormat[0],writeFormat[1], 'onRender');
        },
        onBeforeClose: function(){
            console.log(writeFormat[0],writeFormat[1], 'onBeforeClose');
        },
        onBeforeItemAdded: function(itemView){
            console.log(writeFormat[0],writeFormat[1], 'onBeforeItemAdded');
        },
        onAfterItemAdded: function(itemView){
            console.log(writeFormat[0],writeFormat[1], 'onAfterItemAdded');
        },
        onItemRemoved: function(itemView){
            console.log(writeFormat[0],writeFormat[1], 'onItemRemoved');
        },
        trig: function(e){
            console.log(writeFormat[0],writeFormat[1], e.attributes.details[0].name);
        },

        addToCollectionTest: function(){
            this.collection.add(new this.model({
                details:[
                    {name:'jim', age: 33}]
            }));
            this.collection.add(new this.model({
                details:[
                    {name:'ted', age: 55}]
            }));
            this.collection.add(new this.model({
                details:[
                    {name:'teddy', age: 60}]
            }));

            for(var key in this.collection.models){
                for(var key1 in this.collection.models[key].attributes.details){
                    if(this.collection.models[key].attributes.details[key1].name == 'ted'){
                        this.mod = this.collection.models[key];
                    }
                }
            }
            setTimeout(function(){
                this.collection.remove(this.mod);
            }.bind(this),1000);
        }
    });
    return testView;
});
