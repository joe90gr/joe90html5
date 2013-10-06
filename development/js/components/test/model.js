define(['backbone'], function(Backbone){

    var testModel = Backbone.Model.extend({
        defaults: {
            details: [
                {name: 'joe90', age: 17},
                {name: 'joe91', age: 18}
            ]
        }
    });
    return testModel;
});
