class HomePage {
    visit(){
        cy.visit('/');
    }

    getLoginorRegisterButton(){
        return cy.contains('a', 'Login or register');
    }
}
export default new HomePage();