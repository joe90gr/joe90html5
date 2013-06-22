define(['backbone',
    'GRmodal/model-modal'],
    function (Backbone,
              ModalModel ) {

        var ModalCollection = Backbone.Collection.extend({
            model: ModalModel
        });

        return new ModalCollection();
    });
