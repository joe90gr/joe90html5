define(['marionette',
        'app-console',
        'mustache',
        'text!formTemplate',
        'tweetsModel'],
    function (Marionette,
              AppConsole,
              mustache,
              template,
              Tweet) {

    var FormView = Marionette.ItemView.extend({
        template: function(data){
            return mustache.render(template,data);
        },
        events: {
            'submit .button-panel': 'submit'
        },
        initialize: function(attr){
            this.tweetCollection = attr.tweetCollection;
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
                this.tweetCollection.addRecord(tweet);
            }
            else{
                this.$el.find('.error').html('at least enter something').show();
                AppConsole.modal.show("Notice","Please enter something");
            }

            return false;
        },
        validate: function(var1, var2){
            return var1 !=='' && var2 !=='';
        }
    });
    return FormView;
});
