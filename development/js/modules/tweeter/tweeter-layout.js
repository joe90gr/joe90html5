define(['marionette',
    'mustache',
    'text!tweeterTemplate'],
    function(Marionette,
             Mustache,
             TweeterTemplate){
    var TweeterView = Marionette.Layout.extend({
        tagName: 'section',
        regions: {
            head: '.head',
            subcontent: '.subcontent'
        },
        template: function(data){
            return Mustache.render(TweeterTemplate,data);
        }
    });

    return TweeterView;
});
