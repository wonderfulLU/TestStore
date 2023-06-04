/// <reference types="cypress"/> 

import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";
import user from "../fixtures/user.json"

it.skip('Autorization1', () => {   
      
  cy.log('Open website login page');
  cy.visit('https://automationteststore.com/index.php?rt=account/login');

  cy.log('Check user is unauthorized');
  cy.getCookie('customer').should('be.null');

  cy.log('Authorize user');  
  cy.get('.loginbox.form-horizontal').should('contain', 'I am a returning customer.');
  cy.get('.loginbox.form-horizontal').should('contain', 'Forgot your password?').and('contain', 'Forgot your login?');  
  cy.get('#loginFrm button').should('contain', 'Login').click();
  cy.get('.alert-error').should('contain', 'Error: Incorrect login or password provided.').click();//'.alert-error .close'

  cy.get('#loginFrm .control-label.col-sm-4').eq(0).should('contain', 'Login Name:');
  cy.get('#loginFrm .control-label.col-sm-4').eq(1).should('contain', 'Password:');
  cy.get('#loginFrm_loginname').type(user.username);
  cy.get('#loginFrm_password').type(user.password);
  //loginPage.submitLoginForm(`${testData.login}`, `${testData.password}`);
  //cy.get('#loginFrm_loginname').should('be.empty').type(`${testData.login}`).should('have.value', `${testData.login}`);
  //cy.get('#loginFrm_password').should('be.empty').type(`${testData.password}`).should('have.value', `${testData.password}`);
  cy.get('button[title="Login"]').should('contain', 'Login').click();
  cy.get('span.subtext').should('contain', user.firstName);
  cy.get('#customer_menu_top .menu_text').should('contain', 'Welcome back');

})



it('Autorization2', () => { 

    homePage.visit();
    homePage.getLoginorRegisterButton().click();
    cy.log('Check user is unauthorized');
    cy.getCookie('customer').should('be.null');
    loginPage.submitLoginForm(user.username, user.password);

    cy.get('span.subtext').should('contain', user.firstName);    

  }) 

  it.skip('Shoping', () => {   
      
    //homePage.visit();
    //homePage.getLoginorRegisterButton().click();
    loginPage.submitLoginForm(`${testData.username}`, `${testData.password}`);
  
    cy.get('#filter_keyword').should('have.attr', 'placeholder', 'Search Keywords').type(`${testData.keyword}`);
    cy.get('.button-in-search').click();
    cy.get('#category_id').select(`${testData.category}`).should('contain', `${testData.category}`);
    cy.get('button#search_button').should('contain', 'Search').click();
    cy.get('.productname .bgnone').should('contain', `${testData.keyword}`);
    cy.get('.productpagecart .cart').should('contain', 'Add to Cart').click();
    cy.get('#cart_quantity108').clear().type(`${testData.quantity}`).should('have.value', `${testData.quantity}`);
    cy.get('#cart_update').should('contain', 'Update').click();
    cy.get('#cart_checkout1').should('contain', 'Checkout').click();
    cy.get('#checkout_btn').should('contain', 'Confirm Order').click();
    cy.get('span.maintext').should('contain', ' Your Order Has Been Processed!');
       
  })

