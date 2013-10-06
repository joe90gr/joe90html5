define([
    'backbone',
    'marionette',
    'mustache',
    'testModel',
    'testCollection',
    'text!testTemplate'
], function(Backbone, Marionette, Mustache, TestModel, TestCollection, TestTemplate){

    var testItem = Marionette.ItemView.extend({
        template: function(data){
            return Mustache.render(TestTemplate,data);
        },
        initialize: function(){}
    });

    var emptyView = Marionette.ItemView.extend({
        template: function(data){
            return Mustache.render('bollocks',data);
        }
    });

    var testView = Marionette.CollectionView.extend({
        model: TestModel,
        itemView: testItem,
        emptyView: emptyView,
        collection: new TestCollection(),
        initialize: function(){
            this.listenTo(this.collection,'remove', this.trig, this);
            this.collection.add(new this.model({
                details:[
                    {name:'jim', age: 33}]
            }))
            this.collection.add(new this.model({
                details:[
                    {name:'ted', age: 55}]
            }))

            var mod;
            for(var key in this.collection.models){
                for(var key1 in this.collection.models[key].attributes.details){
                    if(this.collection.models[key].attributes.details[key1].name == 'ted'){
                        mod = this.collection.models[key];
                    }
                }
            }
            console.log('%c JOE! ', 'background: #222; color: #bada55');
            this.collection.remove(mod);
        },
        trig: function(e){
            console.log('Removed triggered: ', e.attributes.details[0].name)
        }
    });
    return testView;
});
