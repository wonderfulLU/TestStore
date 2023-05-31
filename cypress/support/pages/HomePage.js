class HomePage {
    visit(){
        cy.visit('https://automationteststore.com/');
    }

    getLoginorRegisterButton(){
        return cy.contains('a', 'Login or register');
    }
}
export default new HomePage();