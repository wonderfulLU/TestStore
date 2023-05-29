/// <reference types="cypress"/> 

describe('Registration', () => {

  before(() => {  //запускається перед кожним тестом, який є всередині сьюта
    cy.visit('https://automationteststore.com/');

    cy.get('#customer_menu_top').click();
    cy.get('[title="Continue"]').click();
  })

  let TestData = {
    firstName: 'Anastasiya',
    lastName: 'Lushkova',
    email: 'rty@mail',
    telephone: '+123456789',
    fax: '987654321'
  }
  

  it('Reg1', () => {

    //const TestData = [{firstName}]

    cy.get('#AccountFrm_firstname').should('be.empty').type(TestData.firstName);
    cy.get('#AccountFrm_lastname').should('be.empty').type(TestData.lastName);
    cy.get('#AccountFrm_email').should('be.empty').type(TestData.email);
    cy.get('#AccountFrm_telephone').should('be.empty').type(TestData.telephone);
    cy.get('#AccountFrm_fax').should('be.empty').type(TestData.fax);

    
    
    const ExpResult = {
      firstName: 'Anastasiya',
      lastName: 'Lushkova',
      email: 'rty@mail',
      telephone: '+123456789',
      fax: '987654321'
    }

    cy.get('#AccountFrm_firstname').should('have.value', ExpResult.firstName);
    cy.get('#AccountFrm_lastname').should('have.value', ExpResult.lastName);
    cy.get('#AccountFrm_email').should('have.value', ExpResult.email);
    cy.get('#AccountFrm_telephone').should('have.value', ExpResult.telephone);
    cy.get('#AccountFrm_fax').should('have.value', ExpResult.fax);
  })
})