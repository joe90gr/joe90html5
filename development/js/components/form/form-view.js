define(['backbone',
        'marionette',
        'mustache',
        'text!formTemplate',
        'tweetsModel'],
    function (Backbone,
              Marionette,
              mustache,
              template,
              Tweet) {

    var FormView = Marionette.View.extend({

        template: template,
        collection: '',
        events: {
            'submit #new-tweet': 'submit'
        },
        initialize: function(){

        },
        render: function(){
            this.$el.append(mustache.render(this.template));
            this.$el.find('#new-tweet').addClass('button-panel');
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
                this.collection.create(tweet,{
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
