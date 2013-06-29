define(['backbone',
    'components/modal/modal-model'],
    function (Backbone,
              ModalModel ) {

        var ModalCollection = Backbone.Collection.extend({
            model: ModalModel
        });

        return new ModalCollection();
    });
