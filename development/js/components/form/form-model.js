define(['backbone'], function(Backbone){
    var formModel = Backbone.Model.extend({
        defaults: {
            'input': [
                {id: '', title: '', name: '', value: '', type: ''},
                {id: '', title: '', name: '', value: '', type: ''}
            ],
            'form-class': '',
            'button-title': ''
        }
    });
    return formModel;
});