define(['backbone',
        'mustache',
        'text!components/form/form.template',
        'components/tweets/tweets-model' ,
        'components/tweets/tweets-collections'],
    function (Backbone,
              mustache,
              template,
              Tweet,
              tweetsCollection) {

    var FormView = Backbone.View.extend({
        el: $('.button-panel'),
        template: template,
        events: {
            'submit #new-tweet': 'submit'
        },
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.html(mustache.render(this.template));
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
                tweetsCollection.create(tweet,{
                    success: function(model,response){
                        console.log('Create Was Successful',model.id, response);
                    },
                    error: function(){
                        console.log('Create Was ERROR', response);
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
