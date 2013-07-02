var deps = [
    'modernizr',
    'backbone',
    'components/tweets/tweets-model',
    'components/tweets/tweets-collections',
    'components/tweets/tweets-view',
    'components/modal/modal-model',
    'components/modal/modal-collections',
    'components/modal/modal-view',
    'components/form/form-model',
    'components/form/form-view'
];

define(deps, function (mod,
                       Backbone,
                       Tweet,
                       TweetList,
                       TweetsView,
                       ModalModel,
                       ModalCollection,
                       ModalView,
                       FormModel,
                       FormView
                       ) {


    Backbone.on('all',function(input){
        console.log('fired general event',input);
    });


    var formview = new FormView();

    //modalview = new ModalView()
    var tweetii = new TweetsView();


    var appRouter = Backbone.Router.extend({
        routes: {
            'about': 'showAbout',
            'myid/:id': 'getId'
        },

        showAbout: function(){
            console.log('test route to about');
        },
        getId: function(id){
            console.log('the id is',id);
        }
    });
    var approuter = new appRouter();
    Backbone.history.start();
});
