define(['marionette',
    'app-console',
    'comms',
    'formController',
    'formModel',
    'loginView'],
    function(Marionette,
             AppConsole,
             Comms,
             FormController,
             FormModel,
             LoginView){

    var LoginController = Marionette.Controller.extend({
        initialize: function(){
            //_.bindAll(this,['checkLoginStatus'])
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
            //TODO: this could be a console triggerLogout method
            this.loginView.el = this.formController.formview.render().el;
            this.formController.formview.delegateEvents();
            AppConsole.application.header.show(this.formController.formview);
        },

        showLogoutButton: function(){
            //TODO: this could be a console triggerLoggedin method
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
                initialize: function(){
                },
                clickButton: function(e){
                    var url = "/server/session.php/logout";
                    var data = { logout: 'iphone' };
                    AppConsole.comms.post(url, data, this.logoutButtonSuccess, this.logoutButtonError);
                },
                logoutButtonSuccess: function(){
                    self.checkLoginStatus();
                    console.log('success from button');
                },
                logoutButtonError: function(){
                    console.log('error from button');
                }
            });
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
                            type: 'password'
                        }
                    ],
                    'form-class': 'login-form',
                    'button-title': 'Login'
                }),

                onSubmitCallback: function(el){
                    //TODO: noticed that if element ids return undefined. passes the un and pw login. not good.
                    var test1 = el.find('#username').val();
                    var test2 = el.find('#password').val();
                    var url = "/server/session.php/login";
                    var data = { username: test1, password: test2 };
                    AppConsole.comms.post(url, data, this.loginSuccess.bind(this), this.loginError.bind(this));
                    //AppConsole.requestResponse.request("show-modal", 'Notice','you have entered '+test1+' and '+test2+'');
                }.bind(this)
            });
        },

        loginSuccess: function(){
            console.log('success from login');
            this.checkLoginStatus();
        },
        loginError: function(){
            console.log('error from login');
        }

    });
    return LoginController;
});