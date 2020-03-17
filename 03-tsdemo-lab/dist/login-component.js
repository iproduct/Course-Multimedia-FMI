import '../node_modules/jquery/dist/jquery.js';
export class LoginComponent {
    constructor(jqElementSelector, loginController) {
        this.jqElementSelector = jqElementSelector;
        this.loginController = loginController;
        const keyboardEventHandler = (event) => {
            if (event.keyCode === 13) {
                loginEventHandler();
            }
        };
        const loginEventHandler = () => {
            this.loginController.login(usernameInputElem.val(), passwordInputElem.val())
                .then(() => {
                this.showCurrentUser();
            }).catch(err => {
                this.showError(err);
            });
            return false;
        };
        const logoutEventHandler = () => {
            this.loginController.logout()
                .then(() => {
                this.showCurrentUser();
            }).catch(err => {
                this.showError(err);
            });
            return false;
        };
        const formElem = $("<form class='form-inline' role='form'>").addClass('form-inline');
        const usernameInputElem = $("<input id='username' type='email' placeholder='email'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        const passwordInputElem = $("<input id='password' type='password' placeholder='password' autocomplete='off'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        const loginButtonElem = $('<button type="button">Login</buttton>').addClass('btn btn-primary')
            .click(loginEventHandler);
        const logoutButtonElem = $('<button type="button">Logout</buttton>').addClass('btn btn-default')
            .click(logoutEventHandler);
        formElem.append(usernameInputElem);
        formElem.append(passwordInputElem);
        formElem.append(loginButtonElem);
        formElem.append(logoutButtonElem);
        this.messagesElement = $('<div id="message" class="well well-lg">');
        $(jqElementSelector).append(formElem).append(this.messagesElement);
        this.showCurrentUser();
    }
    showCurrentUser() {
        const user = this.loginController.getCurrentUser();
        this.messagesElement.html(user ? `Welcome ${user.salutation}.` : `No user is logged in.`);
    }
    showError(error) {
        this.messagesElement.html(error);
    }
}
//# sourceMappingURL=login-component.js.map