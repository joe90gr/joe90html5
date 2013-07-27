define(['backbone',
        'text!components/form/form.template',
        'components/tweets/tweets-model' ,
        'components/tweets/tweets-collections'],
    function (Backbone,
              template,
              Tweet,
              tweetsCollection) {

    var FormView = Backbone.View.extend({
        el: $('.button-panel'),
        template: _.template(template),
        events: {
            'submit #new-tweet': 'submit'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.html(this.template);
            return this;
        },
        submit: function(){
            var authorName = this.$el.find('#author-name').val();
            var statusUpdate = this.$el.find('#status-update').val();
            if(this.validate(authorName, statusUpdate)){
                this.$el.find('.error').hide();
                var tweet = new Tweet({
                    author: authorName,
                    status: statusUpdate
                });
                tweetsCollection.add(tweet);

                tweet.save({},{
                    success: function(){
                        console.log('saved success');
                        tweetsCollection.fetch();
                    },
                    error: function(){
                        console.log('an error in our save');
                    }
                });
            }
            else{
                var content = {title:'error',html:
                    '<p>You must enter something into the fields</p>' +
                    '<button onclick="appConsole.modalview.trigger(\'click:close\')">Close</button>' +
                    '' +
                    ''};
                this.$el.find('.error').html('at least enter something').show();
                appConsole.modalview.trigger('click:open', content)
            }

            return false
        },
        validate: function(var1, var2){
            return var1 !='' && var2 !=''
        }
    });
    return FormView;
});
