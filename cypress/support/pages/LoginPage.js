class LoginPage {
    visit(){
        cy.visit('/index.php?rt=account/login');
    }

    getLoginField(){
        return cy.get('#loginFrm_loginname');
    }

    getPasswordField(){
        return cy.get('#loginFrm_password');
    }

    getSubmitButton(){
        return cy.get('button[title="Login"]');
    }

    submitLoginForm(username, password){
        cy.log(`Auth user with username: ${username} and pass: ${password}`);

        this.getLoginField().type(username)
        this.getPasswordField().type(password)
        this.getSubmitButton().click()
    }

    getToken(){
        return cy.get('input[name="csrftoken"]').invoke('val').then((token) => {         
            return token;
          })
        };     

    getInstance(){
        return cy.get('input[name="csrfinstance"]').invoke('val').then((instance) => {         
            return instance;
          })
        };
}

export default new LoginPage();

