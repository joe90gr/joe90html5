define([], function(){
    return function(){
        var self = this;
        var LogoutButton = Marionette.ItemView.extend({
            tagName: 'button',
            template:'<button>Logout</button>',
            events: { 'click': 'clickButton' },
            clickButton: function(e){
                AppConsole.sessionManager().logoutRequest({
                    logout: 'iphone'
                });
                //AppConsole.events.trigger('error','an error has occured during logging in')
            }
        });
        return new LogoutButton();
    }
});
