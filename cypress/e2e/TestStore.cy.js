/// <reference types="cypress"/> 

describe('Registration/Autorization', () => {

  beforeEach(() => { 
    cy.visit('https://automationteststore.com/');

    cy.get('#customer_menu_top').click();    
  })

  let testData = {
    firstName: 'Anastasiya',
    lastName: 'Lushkova',
    email: '111@mail.com',
    telephone: '+123456789',
    fax: '987654321',
    company: 'UDS',
    address1: 'street',
    address2: 'space 57',
    city: 'Kyiv',
    region: 'Kyiv',
    postcode:'02000',
    country: 'Ukraine',
    login: 'Nassty',
    password: '123cghj',
    confirmpassword: '123cghj'
  }  

  it('Registration', () => {

    cy.get('[title="Continue"]').click();

    cy.get('#AccountFrm_firstname').should('be.empty').type(`${testData.firstName}`).should('have.value', `${testData.firstName}`);
    cy.get('#AccountFrm_lastname').should('be.empty').type(`${testData.lastName}`).should('have.value', `${testData.lastName}`);
    cy.get('#AccountFrm_email').should('be.empty').type(`${testData.email}`).should('have.value', `${testData.email}`);
    cy.get('#AccountFrm_telephone').should('be.empty').type(`${testData.telephone}`).should('have.value', `${testData.telephone}`);
    cy.get('#AccountFrm_fax').should('be.empty').type(`${testData.fax}`).should('have.value', `${testData.fax}`);
    cy.get('#AccountFrm_company').should('be.empty').type(`${testData.company}`).should('have.value', `${testData.company}`);
    cy.get('#AccountFrm_address_1').should('be.empty').type(`${testData.address1}`).should('have.value', `${testData.address1}`);
    cy.get('#AccountFrm_address_2').should('be.empty').type(`${testData.address2}`).should('have.value', `${testData.address2}`);
    cy.get('#AccountFrm_city').should('be.empty').type(`${testData.city}`).should('have.value', `${testData.city}`);
    cy.get('#AccountFrm_country_id').select(`${testData.country}`).should('contain', `${testData.country}`);
    cy.get('#AccountFrm_zone_id').select(`${testData.region}`).should('contain', `${testData.region}`);
    cy.get('#AccountFrm_postcode').should('be.empty').type(`${testData.postcode}`).should('have.value', `${testData.postcode}`);
    cy.get('#AccountFrm_loginname').should('be.empty').type(`${testData.login}`).should('have.value', `${testData.login}`);
    cy.get('#AccountFrm_password').should('be.empty').type(`${testData.password}`).should('have.value', `${testData.password}`);
    cy.get('#AccountFrm_confirm').should('be.empty').type(`${testData.confirmpassword}`).should('have.value', `${testData.confirmpassword}`);
    cy.get('#AccountFrm_newsletter1').click();
    cy.get('[class="col-md-6 mt20 mb40"] [onclick]').should('have.attr', 'href');
    cy.get('[class="col-md-6 mt20 mb40"]').should('contain', 'I have read and agree to the');
    cy.get('#AccountFrm_agree').click();
    cy.get('button[title="Continue"]').should('contain', 'Continue').click();

    cy.get('.container-fluid').should('contain', 'Your Account Has Been Created!')
    cy.get('[title="Continue"]').should('contain', 'Continue').click();        
  })

  it('Autorization', () => {   
      
    cy.get('.loginbox.form-horizontal').should('contain', 'I am a returning customer.');
    cy.get('.loginbox.form-horizontal').should('contain', 'Forgot your password?').and('contain', 'Forgot your login?');  
    cy.get('#loginFrm button').should('contain', 'Login').click();
    cy.get('.alert-error').should('contain', 'Error: Incorrect login or password provided.').click();//'.alert-error .close'

    cy.get('#loginFrm .control-label.col-sm-4').eq(0).should('contain', 'Login Name:');
    cy.get('#loginFrm_loginname').should('be.empty').type(`${testData.login}`).should('have.value', `${testData.login}`);
    cy.get('#loginFrm .control-label.col-sm-4').eq(1).should('contain', 'Password:');
    cy.get('#loginFrm_password').should('be.empty').type(`${testData.password}`).should('have.value', `${testData.password}`);
    cy.get('#loginFrm button').should('contain', 'Login').click();
    cy.get('span.subtext').should('not.be.empty');
    cy.get('#customer_menu_top .menu_text').should('contain', 'Welcome back');
  }) 
       
})

