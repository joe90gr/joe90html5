define(['backbone'], function(Backbone){
    var formModel = Backbone.Model.extend({
        defaults: {
            'input': [
                {id: '', title: '', name: '', value: '', type: ''},
                {id: '', title: '', name: '', value: '', type: ''}
            ]
        }
    });
    return formModel;
});