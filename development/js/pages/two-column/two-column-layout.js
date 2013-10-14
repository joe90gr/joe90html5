define(['marionette', 'mustache', 'text!twoColumnTemplate'], function(Marionette, mustache, twoColumnTemplate){
    var TwoColumnLayout = Marionette.Layout.extend({
        regions: {
            content: '.main-inner',
            side: '.side'
        },
        template: function(data){
            return mustache.render(twoColumnTemplate,data);
        }
    });
    return TwoColumnLayout;
});
