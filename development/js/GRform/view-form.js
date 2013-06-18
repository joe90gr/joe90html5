define(['backbone',
        '../GRtweets/model-tweets' ,
        '../GRtweets/collections-tweets'],
    function (Backbone,
              Tweet,
              tweetsCollection) {

    var FormView = Backbone.View.extend({
        el: $('.button-panel'),
        events: {
            'submit #new-tweet': 'submit'
        },
        initialize: function(){
            this.render();
        },
        render: function(){

        },
        submit: function(){
            var authorName = this.$el.find('#author-name').val();
            var statusUpdate = this.$el.find('#status-update').val();
            if(this.validate(authorName, statusUpdate)){
                this.$el.find('.error').html('error').hide();
                var tweet = new Tweet({
                    author: authorName,
                    status: statusUpdate
                });
                tweetsCollection.add(tweet);
            }
            else{
                this.$el.find('.error').html('error').show();
            }

            return false
        },
        validate: function(var1, var2){
            return var1 !='' && var2 !=''
        }
    });
    return FormView;
});
