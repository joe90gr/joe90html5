define(['backbone',
        'text!GRform/template.template',
        'GRtweets/model-tweets' ,
        'GRtweets/collections-tweets',
        'GRform/model-form'],
    function (Backbone,
              template,
              Tweet,
              tweetsCollection,
              ModelForm) {

    var FormView = Backbone.View.extend({
        model: new ModelForm(),
        el: $('.button-panel'),
        events: {
            'submit #new-tweet': 'submit'
        },
        initialize: function(){
            this.template = _.template(template);
            this.render();
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
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
            }
            else{
                this.$el.find('.error').html(this.model.get('errorMsg')).show();
            }

            return false
        },
        validate: function(var1, var2){
            return var1 !='' && var2 !=''
        }
    });
    return FormView;
});
