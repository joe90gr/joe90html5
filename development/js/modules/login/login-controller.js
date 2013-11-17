define(['marionette',
    'app-console',
    'formController',
    'formModel',
    'loginView'],
    function(Marionette,
             AppConsole,
             FormController,
             FormModel,
             LoginView){

    var LoginController = Marionette.Controller.extend({
        initialize: function(){
            this.loginView = new LoginView();
            this.logoutButton = this.setupLogoutButton();
            this.setupForm();
            this.checkLoginStatus();
        },

        checkLoginStatus: function(){
            if(!AppConsole.requestResponse.request("isloggedIn")){
                this.showLoginForm();
            }
            else{
                this.showLogoutButton();
            }
        },

        showLoginForm: function(){
            this.loginView.el = this.formController.formview.render().el;
            this.formController.formview.delegateEvents();
            AppConsole.application.header.show(this.formController.formview);
        },

        showLogoutButton: function(){
            this.loginView.el = this.logoutButton.render().el
            this.logoutButton.delegateEvents();
            AppConsole.application.header.show(this.logoutButton);
        },

        setupLogoutButton: function(){
            var self = this;
            var LogoutButton = Marionette.ItemView.extend({
                tagName: 'button',
                template:'<button>Logout</button>',
                events: { 'click': 'clickButton' },
                clickButton: function(){
                    $.ajax({
                        type: "post",
                        url: "/server/session.php/ConsoleSession",
                        data: { username: 'random', password: 'logout' },
                        success: function(){
                            self.checkLoginStatus();
                            console.log('success from button')
                        },
                        error: function(){
                            console.log('error from button')
                        }
                    }).done(function(msg){})
                }
            })
            return new LogoutButton();
        },

        setupForm: function(){
            this.formController = new FormController({
                model: new FormModel({
                    input: [
                        {
                            id: 'username',
                            title: 'Username',
                            name: 'username',
                            value: 'username',
                            type: 'text'
                        },
                        {
                            id: 'password',
                            title: 'Password',
                            name: 'password',
                            value: 'password',
                            type: 'text'
                        }
                    ],
                    'form-class': 'login-form',
                    'button-title': 'Login'
                }),

                onSubmitCallback: function(el){
                    var self = this;
                    //TODO: noticed that if element ids return undefined. passes the un and pw login. not good.
                    var test1 = el.find('#username').val();
                    var test2 = el.find('#password').val();
                    $.ajax({
                        type: "post",
                        url: "/server/session.php/ConsoleSession",
                        data: { username: test1, password: test2 },
                        success: function(){
                            console.log('success from login')
                            self.checkLoginStatus();
                        },
                        error: function(){
                            console.log('error from login')
                        }
                    }).done(function(msg){});
                    //AppConsole.requestResponse.request("show-modal", 'Notice','you have entered '+test1+' and '+test2+'');
                }.bind(this)
            });
        }

    });
    return LoginController;
});